import Term from "./Term";

class Variable extends Term {

  constructor(name) {
    super(name);
  }

  toString() {
    return this.name;
  }

}

export default Variable;