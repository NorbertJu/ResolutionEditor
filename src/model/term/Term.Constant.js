import Term from "./Term";

class Constant extends Term {

  constructor(name) {
    super(name);
  }

  toString() {
    return this.name;
  }

}

export default Constant;