import Formula from "./Formula";

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
      if (other.get(tuple[0]) !== tuple[1]) return false;
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
    for (let lit of this.lits){
      contains = false;
      for (let tuple of this.litsMultiset){
        if (tuple[0].equals(lit)) {
          tuple[1]++;
          contains = true;
          break;
        }
      }
      if (!contains) {
        this.litsMultiset.push([lit, 1]);
      }
    }
    return this.litsMultiset;
  }
  
  has(key){
    for (let tuple of this.getLitsMultiset()) {
      if (tuple[0].equals(key)){
        return true;
      }
    }
    return false;
  }

  get(key){
    for (let tuple of this.getLitsMultiset()) {
      if (tuple[0].equals(key)){
        return tuple[1];
      }
    }
    return undefined;
  }

  resolution(cl1, cl2, sub){
    let newCl1 = cl1.substitute(sub);
    let newCl2 = cl2.substitute(sub);
    for (let lit1 of newCl1.lits){
      for (let lit2 of newCl2.lits){
        if (lit1.equals(lit2.negation())){
          if (this.equals(new Clause(newCl1.lits.filter(lit => !lit.equals(lit1))
            .concat(newCl2.lits.filter(lit => !lit.equals(lit2)))))){
            return true;
          }
          break;
        }
      }
    }
    return false;
  }

  factorisation(cl, sub){
    let newCl = cl.substitute(sub);
    for (let i = 0; i < newCl.lits.length; i++){
      for (let j = i+1; j < newCl.lits.length; j++){
        if (newCl.lits[i].equals(newCl.lits[j])){
          if (this.equals(new Clause(newCl.lits.filter(lit => !lit.equals(newCl.lits[i]))
            .concat([newCl.lits[i]])))) {
            return true;
          }
          break;
        }
      }
    }
    return false;
  }

}

export default Clause;