import Term from "./Term";

class Variable extends Term {

  constructor(name) {
    super(name);
  }

  equals(other) {
    return other instanceof Variable && this.name === other.name
  }

  substitute(map){
    if (map && map.has(this.name)) {
      return map.get(this.name);
    }
    return new Variable(this.name);
  }

}

export default Variable;