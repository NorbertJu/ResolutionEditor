import Term from "./Term";

class Variable extends Term {

  constructor(name) {
    super(name);
  }

  equals(other) {
    return other instanceof Variable && this.name === other.name
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