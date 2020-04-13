import Formula from "./Formula";

class PredicateAtom extends Formula {

  constructor(name, terms = []) {
    super();
    this.name = name;
    this.terms = terms;
  }

  toString() {
    return `${ this.name }(${ this.terms.join(', ') })`;
  }

}

export default PredicateAtom;