import Formula from "./Formula";

class Literal extends Formula {

  constructor(neg, name, terms = []) {
    super();
    this.neg = neg;
    this.name = name;
    this.terms = terms;
  }

  toString() {
    let res = '';
    if (this.neg) {
      res += '¬';
    }
    res += this.name + '(';
    for (let i = 0; i < this.terms.length; i++) {
      if (i > 0) {
        res += ', ';
      }
      res += this.terms[i].toString();
    }
    res += ')';
    return res;
  }

  equals(other) {
    if (!(other instanceof Literal) || this.neg !== other.neg || other.name !== this.name || this.terms.length !== other.terms.length) return false;
    for (let i = 0; i < this.terms.length; i++) {
      if (!this.terms[i].equals(other.terms[i])) return false;
    }
    return true;
  }

  substitute(map){
    let res = new Literal(this.neg, this.name);
    for (let i = 0; i < this.terms.length; i++) {
      res.terms.push(this.terms[i].substitute(map));
    }
    return res;
  }

}

export default Literal;