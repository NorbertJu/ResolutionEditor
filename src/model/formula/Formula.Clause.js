import Formula from "./Formula";

class Clause extends Formula {

  constructor(lits = []) {
    super();
    this.lits = lits;
  }

  toString() {
    return this.lits.map( lit => lit.toString() ).join(' ∨ ');
  }

  equals(other){ 
    if (!(other instanceof Clause) && this.lits.size !== other.lits.size) return false;
    for (let [lit, count] of this.lits){
      if (!other.has(lit)) return false;
      if (other.get(lit) != count) return false;
    }
    return true;
  }

  substitute(map) {
    let res = new Clause();
    for (let [lit, count] of this.lits) {
      let subLit = lit.substitute(map);
      if (res.has(subLit)){
        res.set(subLit, res.get(subLit) + count);
      } else {
        res.set(subLit, count);
      }
    }
    return res;
  }

  get() {
    
  }

  has(key){
    for (let [lit, count] of this.lits) {
      if (lit.equals(key)){
        return true;
      }
    }
    return false;
  }

  get(key){
    for (let [lit, count] of this.lits) {
      if (lit.equals(key)){
        return count;
      }
    }
    return undefined;
  }

  set(key, value){
    if (this.has(key)){
      this.lits.delete(key);
    }
    this.lits.set(key, value);
    return this.lits;
  }

}

export default Clause;