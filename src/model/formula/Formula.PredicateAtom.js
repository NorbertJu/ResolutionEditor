<<<<<<< HEAD
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

=======
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

>>>>>>> b48bca53b8673ff637bc96026739d5b489709c96
export default PredicateAtom;