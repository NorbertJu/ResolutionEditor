import Term from "./Term";

class FunctionTerm extends Term {

  constructor(name, subts) {
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

  subts() {
    return this.subts;
  }

}

export default FunctionTerm;