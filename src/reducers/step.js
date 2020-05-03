import { CHANGE_STEP, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER} from '../actions'
import { parseClause, parseSubstitution } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Variable, Constant, Function, Literal, Clause } from '../model/index'

export const step = (step, action) => {
  switch (action.type) {
    case CHANGE_STEP: {
      return {
        ...step,
        formula: {
          ...step.formula,
          input: action.text
        }
      };
    }

    case CHANGE_RULE: {
      return { ...step, rule: action.text };
    }

    case CHANGE_RENAMING: {
      return {
        ...step,
        renaming:{
          ...step.renaming,
          input: action.text
        }
      };
    }

    case CHANGE_UNIFIER: {
      return { ...step, unifier: {
        ...step.unifier,
        input: action.text
      }};
    }

    case CHANGE_REFERENCE1: {
      return { ...step, reference1 : {
        ...step.reference1,
        input: action.text
      }};
    }

    case CHANGE_REFERENCE2: {
      return { ...step, reference2 : {
        ...step.reference2,
        input: action.text
      }};
    }

    default:
      return step
  }
}

export function validateRenaming(renaming, language) {
  renaming.error = "";
  try {
    if (renaming.input !== "") {
      let subs = parseSubstitution(renaming.input, getSymbols(language), getFactories(language));
      renaming.object = new Map(subs);
      for (const [key, value] of renaming.object) {
        if (!(value instanceof Variable)) {
          renaming.error = {
            name: "TypeError",
            message: "\"" + key + "\" is renamed to \"" + value + "\", which is not a variable"
          }
        }
      }
      if (!renaming.error) {
        renaming.error = validateSubs(subs);
      }
    } else {
      renaming.object = undefined;
    }
  } catch (e) {
    renaming.error = e;
  }
  return [renaming.error ? false : true, renaming];
}

export function validateUnifier(unifier, language) {
  unifier.error = "";
  try {
    if (unifier.input !== "") {
      let subs = parseSubstitution(unifier.input, getSymbols(language), getFactories(language));
      unifier.object = new Map(subs);
      unifier.error = validateSubs(subs);
    } else {
      unifier.object = undefined;
    }
  } catch (e) {
    unifier.error = e;
  }
  return [unifier.error ? false : true, unifier];
}

export function validateReference(reference, id, state) {
  reference.error = "";
  if (reference.input !== "") {
    if (state.rank.get(id) < parseInt(reference.input) || parseInt(reference.input) < 1) {
      reference.error = {
        name: "IndexError",
        message: "Index out of range."
      };
    } else if (isNaN(parseInt(reference.input))) {
      reference.error = {
        name: "SyntaxError",
        message: "Expected number but \"" + reference.input + "\" found."
      };
    } else {
      reference.object = parseInt(reference.input) - 1;
      reference.error = ""
    }
  } else {
    reference.error = {
      name: "EmptyError",
      message: "This field cannot be empty"
    }
  }
  return [reference.error ? false : true, reference];
}

export function validateSubs(subs) {
  for (let i = 0; i < subs.length; i++) {
    for (let j = i + 1; j < subs.length; j++) {
      if (subs[i][0] === subs[j][0]) {
        return {
          name: "DuplicityError",
          message: "Symbol \"" + subs[i][0] + "\" is already being substituted"
        };
      }
    }
  }
  return "";
}

export function validateClause(formula, language) {
  formula.error = "";
  try {
    formula.object = parseClause(
      formula.input,
      getSymbols(language),
      getFactories(language)
    );
  } catch (e) {
    formula.error = e;
  }
  return [formula.error ? false : true, formula];
}

export function getFactories(language) {
  function checkArity(symbol, args, arityMap, { expected }) {
    const a = arityMap.get(symbol);
    if (args.length !== a) {
      expected(`${a} argument${(a == 1 ? '' : 's')} to ${symbol}`);
    }
  }
  return {
    variable: (symbol, _) =>
      new Variable(symbol),
    constant: (symbol, _) =>
      new Constant(symbol),
    functionApplication: (funSymbol, args, ee) => {
      checkArity(funSymbol, args, language.funs.object, ee);
      return new Function(funSymbol, args);
    },
    literal: (negated, predSymbol, args, ee) => {
      checkArity(predSymbol, args, language.preds.object, ee);
      return new Literal(negated, predSymbol, args);
    },
    clause: (literals, _) =>
      new Clause(literals)
  }
}

export function getSymbols(language) {
  const nonLogicalSymbols = new Set([...language.consts.object, ...language.funs.object.keys(), ...language.preds.object.keys()]);
  return {
    isConstant: (symbol) =>
      language.consts.object.has(symbol),
    isFunction: (symbol) =>
      language.funs.object.has(symbol),
    isPredicate: (symbol) =>
      language.preds.object.has(symbol),
    isVariable: (symbol) =>
      !nonLogicalSymbols.has(symbol),
  }
}