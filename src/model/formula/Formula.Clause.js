import Formula from "./Formula";

class Clause extends Formula {

  constructor(lits = []) {
    super();
    this.lits = lits;
  }

  toString() {
    let res = '';
    for (let i = 0; i < this.lits.length; i++) {
      if (i > 0) {
        res += ' ∨ ';
      }
      res += this.lits[i].toString();
    }
    return res;
  }

  equals(other){ 
    if (!(other instanceof Clause)) return false;
    for (let i = 0; i < this.lits.length; i++) {
      if (!other.lits.includes(this.lits[i])) {
        return false;
      }
    }
    for (let i = 0; i < other.lits.length; i++) {
      if (!this.lits.includes(other.lits[i])) {
        return false;
      }
    }
    return true;
  }

  substitute(variable, term) {
    let res = new Clause();
    for (let i = 0; i < this.lits.length; i++) {
      res.lits.push(this.lits[i].substitute(variable, term));
    }
    return res;
  }

}

export default Clause;