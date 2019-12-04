import Term from "./Term";

class Constant extends Term {

  constructor(name) {
    super(name);
  }

  equals(other) {
    return other instanceof Constant && this.name === other.name
  }

  substitute(map){
    return new Constant(this.name);
  }

}

export default Constant;