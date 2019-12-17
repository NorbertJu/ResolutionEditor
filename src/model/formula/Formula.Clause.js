import Formula from "./Formula";
import { throwStatement } from "@babel/types";

class Clause extends Formula {

  constructor(lits = []) {
    super();
    this.lits = lits;
    this.litsMultiset = null;
  }

  toString() {
    return this.lits.map( lit => lit.toString() ).join(' ∨ ');
  }

  equals(other){ 
    if (!(other instanceof Clause) || this.lits.length !== other.lits.length) return false;
    for (let tuple of this.getLitsMultiset()){
      if (!other.has(tuple[0])) return false;
      if (other.get(tuple[0]) != tuple[1]) return false;
    }
    return true;
  }

  substitute(map) {
    return new Clause (
      this.lits.map( lit => lit.substitute(map))
    );
  }

  getLitsMultiset() {
    if (this.litsMultiset != null) {
      return this.litsMultiset;
    }
    this.litsMultiset = [];
    var contains = false;
    for (let lit in this.lits){
      contains = false;
      for (let tuple in this.litsMultiset){
        if (tuple[0] === lit.name) {
          tuple[1]++;
          contains = true;
          break;
        }
      }
      if (!contains) {
        this.litsMultiset.push([lit.name, 1]);
      }
    }
    return this.litsMultiset = [];
  }
  
  has(key){
    for (let tuple of this.litsMultiset) {
      if (tuple[0] === key){
        return true;
      }
    }
    return false;
  }

  get(key){
    for (let tuple of this.lits) {
      if (tuple[0] === key){
        return tuple[1];
      }
    }
    return undefined;
  }

}

export default Clause;