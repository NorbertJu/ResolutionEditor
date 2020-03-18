import React from 'react'
import PropTypes from 'prop-types'
import {parseConstants, parseFunctions, parsePredicates, parseClause} from '@fmfi-uk-1-ain-412/js-fol-parser';
import {Constant, Variable, Function, Clause, Literal} from '../model/index'

const Step = ({ index, state, formula, rule, renaming, unifier, reference, onChange ,onDelete, onInsert, onUp, onDown, onRule, onRenaming, onUnifier, onReference }) => (
  <div>
  <button type="button" className="btn btn-light btn-sm" onClick={onInsert} style={{float:"right"}}> + </button>
  
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">{index}</span>
    </div>
    <input type="text" className="form-control" name="item" 
      onChange={e => {
        onChange(e.target.value);
        const input = e.target;
        try {
        const constants = parseConstants(state.language.constants);
        const functions = parseFunctions(state.language.functions);
        const predicates = parsePredicates(state.language.predicates);
        const nonLogicalSymbols = new Set([...constants, ...functions.keys(), ...predicates.keys()]);
        console.log();
        const language = {
          isConstant: (symbol) =>
            constants.includes(symbol),
          isFunction: (symbol) =>
            functions.map(obj => obj.name).includes(symbol),
          isPredicate: (symbol) =>
            predicates.map(obj => obj.name).includes(symbol),
          isVariable: (symbol) =>
            !nonLogicalSymbols.has(symbol),
        }
        function checkArity(symbol, args, arityMap, {expected}) {
          const a = arityMap.filter(obj => obj.name === symbol)[0].arity;
          if (args.length !== a) {
              expected(`${a} argument${(a == 1 ? '' : 's')} to ${symbol}`);
          }
        }
        const factories = {
          variable: (symbol, _) =>
              new Variable(symbol),
          constant: (symbol, _) =>
              new Constant(symbol),
          functionApplication: (funSymbol, args, ee) => {
              checkArity(funSymbol, args, functions, ee);
              return new Function(funSymbol, args);
          },
          literal: (negated, predSymbol, args, ee) => {
              checkArity(predSymbol, args, predicates, ee);
              return new Literal(negated, predSymbol, args);
          },
          clause: (literals, _) =>
              new Clause(literals)
        }
        if (input.value !== "") parseClause(e.target.value, language, factories);
        input.classList.remove("is-invalid");
        } catch (e) {
          const promiseError = document.getElementById("premiseError-"+index);
          promiseError.innerHTML = "<b>" + input.value.substring(0, e.location.start.offset) + "<mark>" +
          input.value.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
          input.value.substring(e.location.end.offset, input.value.length) + "</b><br/>" +
          e.name + ": " + e.message;
          input.classList.add("is-invalid");
        }
      }}
      value={formula}
    />
    <div className="input-group-append">
      <select className="form-control" onChange={e => onRule(e.target.value)} value={rule}>
        <option>Premise</option>
        <option>Resolution</option>
        <option>Factoring</option>
      </select>
      {
        (rule === "Resolution") && 
        <input type="text" placeholder="Renaming" className="form-control" name="renaming" onChange={e => onRenaming(e.target.value)} value={renaming}/>
      }
      {
        (rule === "Resolution" || rule === "Factoring") && 
        <input type="text" placeholder="Unifier" className="form-control" name="unifier" onChange={e => onUnifier(e.target.value)} value={unifier}/>
      }
      {
        (rule === "Resolution" || rule === "Factoring") &&
        <input type="text" placeholder="Reference" className="form-control w-50" name="reference" onChange={e => onReference(e.target.value)} value={reference}/>
      }
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onUp} disabled={onUp===null}> ↑ </button>
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onDown} disabled={onDown===null}> ↓ </button>
      <button className="btn btn-outline-danger" type="button" onClick={onDelete} >X</button>
    </div>
    <div className="invalid-feedback pr-1 pl-1" id={"premiseError-"+index}></div>
  </div>
  </div>
)

Step.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
  formula: PropTypes.string.isRequired,
  rule: PropTypes.string.isRequired
}

export default Step