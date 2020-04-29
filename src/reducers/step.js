import { CHANGE_STEP, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions'
import { parseClause, parseSubstitution } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Variable, Constant, Function, Literal, Clause } from '../model/index'

const step = (step, action, state, language) => {
  switch (action.type) {
    case CHANGE_STEP: {
      let formula = {
        ...step.formula,
        error: ""
      }
      if (!action.check) {
        formula.input = action.text;
      }
      return {
        ...step,
        formula: validateClause(formula, language)
      };
    }

    case CHANGE_RULE: {
      return { ...step, rule: action.text };
    }

    case CHANGE_RENAMING: {
      return {
        ...step,
        renaming: validateRenaming({
          ...step.renaming,
          input: action.text,
          error: ""
        }, language)
      };
    }

    case CHANGE_UNIFIER: {
      return { ...step, unifier: validateUnifier({
        ...step.unifier,
        input: action.text,
        error: ""
      }, language) };
    }

    case CHANGE_REFERENCE1: {
      let reference1 = {
        ...step.reference1,
        input: action.text,
        error: ""
      };
      if (action.text !== "") {
        if (state.rank.get(action.id) < parseInt(action.text) || parseInt(action.text) < 1) {
          reference1.error = {
            name: "IndexError",
            message: "Index out of range."
          };
        } else if (isNaN(parseInt(action.text))) {
          reference1.error = {
            name: "SyntaxError",
            message: "Expected number but \"" + action.text + "\" found."
          };
        } else {
          reference1.object = parseInt(action.text) - 1;
          reference1.error = ""
        }
      } else {
        reference1.object = parseInt(action.text) - 1;
        reference1.error = ""
      }
      return { ...step, reference1 };
    }

    case CHANGE_REFERENCE2: {
      let reference2 = {
        ...step.reference2,
        input: action.text,
        error: ""
      };
      if (action.text !== "") {
        if (state.rank.get(action.id) < parseInt(action.text) || parseInt(action.text) < 1) {
          reference2.error = {
            name: "IndexError",
            message: "Index out of range."
          };
        } else if (isNaN(parseInt(action.text))) {
          reference2.error = {
            name: "SyntaxError",
            message: "Expected number but \"" + action.text + "\" found."
          };
        } else {
          reference2.object = parseInt(action.text) - 1;
          reference2.error = ""
        }
      } else {
        reference2.object = parseInt(action.text) - 1;
        reference2.error = ""
      }
      return { ...step, reference2 };
    }

    case CHANGE_CONST:
    case CHANGE_FUN:
    case CHANGE_PRED: {
      return {
        ...step,
        formula: validateClause({ ...step.formula, error: "" }, language),
        renaming: validateRenaming({ ...step.renaming, error: "" }, language),
        unifier: validateUnifier({ ...step.unifier, error: "" }, language)
      };
    }

    default:
      return step
  }
}

function validateRenaming(renaming, language) {
  try {
    if (renaming.input !== "") {
      let subs = parseSubstitution(renaming.input, getSymbols(language), getFactories(language));
      renaming.object = new Map(subs);
      console.log(renaming);
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
  return renaming;
}

function validateUnifier(unifier, language) {
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
  return unifier;
}

function validateSubs(subs) {
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

function validateClause(formula, language) {
  try {
    formula.object = parseClause(
      formula.input,
      getSymbols(language),
      getFactories(language)
    );
  } catch (e) {
    formula.error = e;
  }
  return formula;
}

function getFactories(language) {
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

function getSymbols(language) {
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

export default step;