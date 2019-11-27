import Term from "./Term";

class Constant extends Term {

  constructor(name) {
    super(name);
  }

  toString() {
    return this.name;
  }

  equals(other) {
    if (!(other instanceof Constant) || this.name !== other.name) return false;
    return true;
  }

  substitute(map){
    return new Constant(this.name);
  }

}

export default Constant;