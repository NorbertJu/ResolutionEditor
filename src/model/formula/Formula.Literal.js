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
    if (this.neg) res += '¬';
    return res + this.name + '(' + this.terms.map(term => term.toString()).join(', ') + ')';
  }

  equals(other) {
    return other instanceof Literal &&
      this.neg === other.neg &&
      this.name === other.name &&
      this.terms.length === other.terms.length &&
      this.terms.every((term, i) => term.equals(other.terms[i]))
  }

  negation(){
    return new Literal(
      !this.neg,
      this.name,
      this.terms
    )
  }

  substitute(map){
    return new Literal(
      this.neg,
      this.name,
      this.terms.map( term => term.substitute(map))
    );
  }

}

export default Literal;