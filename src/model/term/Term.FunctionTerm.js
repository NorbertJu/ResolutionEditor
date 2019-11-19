import Term from "./Term";

class FunctionTerm extends Term {

  constructor(name, subts = []) {
    super(name);
    this.subts = subts;
  }

  toString() {
    let res = this.name + '(';
    for (let i = 0; i < this.subts.length; i++) {
      if (i > 0) {
        res += ', ';
      }
      res += this.subts[i].toString();
    }
    res += ')';
    return res;
  }

  equals(other) {
    if (!(other instanceof FunctionTerm) || this.name !== other.name || this.subts.length !== other.subts.length) return false;
    for (let i = 0; i < this.subts.length; i++) {
      if (!this.subts[i].equals(other.subts[i])) return false;
    }
    return true;
  }

  substitue(variable, term){
    let res = new FunctionTerm(this.name)
    for (let i = 0; i < this.subts.length; i++) {
      res.subts.push(this.subts[i].substitute(variable, term));
    }
    return res;
  }

}

export default FunctionTerm;