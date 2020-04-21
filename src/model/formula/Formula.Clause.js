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
    for (const tuple of this.getLitsMultiset()) {
      if (tuple[0].equals(key)){
        return true;
      }
    }
    return false;
  }

  get(key){
    for (const tuple of this.getLitsMultiset()) {
      if (tuple[0].equals(key)){
        return tuple[1];
      }
    }
    return undefined;
  }

  * getResolvents(cl2, renaming, unifier) {
    const lm1 = this.substitute(renaming).substitute(unifier).getLitsMultiset();
    const lm2 = cl2.substitute(unifier).getLitsMultiset();
    for (const [lit1, _] of lm1){
      const nlit1 = lit1.negation();
      for (const [lit2, _] of lm2){
        if (nlit1.equals(lit2)){
          yield new Clause(lm1.flatMap(([l1, n1]) => new Array(lit1 === l1 ? n1 - 1 : n1).fill(l1))
          .concat(lm2.flatMap(([l2, n2]) => new Array(lit2 === l2 ? n2 - 1 : n2).fill(l2))));
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
    for (const [lit, n] of lm) {
      if (n >= 2) {
        yield new Clause(lm.flatMap(([lit1, n1]) => new Array(lit1 === lit ? n1 - 1 : n1).fill(lit1)));
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