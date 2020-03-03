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

  * getResolvents(cl2, renaming, unifier) {
    const newCl1 = this.substitute(renaming).substitute(unifier);
    const newCl2 = cl2.substitute(unifier);
    for (let lit1 of newCl1.lits){
      const nlit1 = lit1.negation();
      for (let lit2 of newCl2.lits){
        if (nlit1.equals(lit2)){
          yield new Clause(newCl1.lits.filter(lit => !lit.equals(lit1))
          .concat(newCl2.lits.filter(lit => !lit.equals(lit2))));
          break;
        }
      }
    }
  }

  isResolventOf(cl1, cl2, renaming, unifier){
    for (const resolvent of cl1.getResolvents(cl2, renaming, unifier)) {
      if (this.equals(resolvent)){
        return true;
      }
    }
    return false;
  }

  * getFactors(unifier) {
    const lm = this.substitute(unifier).getLitsMultiset();
    for (let [lit, n] of lm) {
      if (n >= 2) {
        yield new Clause(lm.flatMap(([lit1, n1]) => new Array(lit1 == lit ? n1 - 1 : n1).fill(lit1)));
      }
    }
  }

  isFactorOf(cl, unifier){
    for (const factor of cl.getFactors(unifier)){
      if (this.equals(factor)) {
        return true;
      }
    }
    return false;
  }

}

export default Clause;