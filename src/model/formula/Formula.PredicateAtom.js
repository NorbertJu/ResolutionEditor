import Formula from "./Formula";

class PredicateAtom extends Formula {

  constructor(name, terms = []) {
    super();
    this.name = name;
    this.terms = terms;
  }

  toString() {
    let res = this.name + '(';
    for (let i = 0; i < this.terms.length; i++) {
      if (i > 0) {
        res += ', ';
      }
      res += this.terms[i].toString();
    }
    res += ')';
    return res;
  }

}

export default PredicateAtom;