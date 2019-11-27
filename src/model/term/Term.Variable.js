import Term from "./Term";

class Variable extends Term {

  constructor(name) {
    super(name);
  }

  toString() {
    return this.name;
  }

  equals(other) {
    if (!(other instanceof Variable) || this.name !== other.name) return false;
    return true;
  }

  substitute(map){
    for (let [variable, term] of map){
      if (this.equals(variable)){
        return term;
      }
    }
    return new Variable(this.name);
  }

}

export default Variable;