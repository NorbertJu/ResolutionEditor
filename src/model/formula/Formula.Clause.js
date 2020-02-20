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

  * getResolvents(cl1, cl2) {
    for (let lit1 of cl1.lits){
      const nlit1 = lit1.negation();
      for (let lit2 of cl2.lits){
        if (nlit1.equals(lit2)){
          yield new Clause(cl1.lits.filter(lit => !lit.equals(lit1))
          .concat(cl2.lits.filter(lit => !lit.equals(lit2))));
          break;
        }
      }
    }
  }

  isResolvent(cl1, cl2, renaming, unifier){
    const newCl1 = cl1.substitute(renaming).substitute(unifier);
    const newCl2 = cl2.substitute(unifier);
    for (const resolvent of this.getResolvents(newCl1, newCl2)) {
      if (this.equals(resolvent)){
        return true;
      }
    }
    return false;
  }

  * getFactors(cl) {
    for (let i = 0; i < cl.lits.length; i++){
      yield [new Clause(cl.lits.filter((_, k) => i !== k)), i];
    }
  }

  isFactor(cl, unifier){
    const newCl = cl.substitute(unifier);
    for (const [factor, i] of this.getFactors(newCl)){
      if (this.equals(factor)) {
        for (let j = i+1; j < newCl.lits.length; j++){
          if (newCl.lits[i].equals(newCl.lits[j])){
            return true;
          }
        }
      }
    }
    return false;
  }

}

export default Clause;