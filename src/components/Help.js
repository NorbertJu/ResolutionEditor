import React from 'react'

const Help = () => (
  <div className="mt-2 d-inline-block ">
    <h4>Help</h4>
    <div className="mb-2">
      <p className="mb-0">Language - Declarations of non-logical symbols:</p>
      <ul className="fs-sm">
        <li >Symbols declarations must be comma-separated</li>
        <li >A constant declaration is just the constant symbol</li>
        <li >A function or predicate symbol declaration has the form symbol/arity (e.g. f/1)</li>
      </ul>
    </div>
    <div>
      <p className="mb-0">Proof - Alternative ways of writing logical symbols:</p>
      <ul className="fs-sm">
        <li >Disjunction: ∨, ||, |, \/</li>
        <li >Negation: ¬, -, !, ~</li>
        <li >Substitution: ↦, ->, ⟼, |-> or (var, term)</li>
        <li >Empty clause: □, ▫︎, ◽︎, ◻︎, ⬜︎, ▢, ⊥, [], _|_</li>
      </ul>
    </div>
  </div>
);
export default Help