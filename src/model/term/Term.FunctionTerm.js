<<<<<<< HEAD
import Term from "./Term";

class FunctionTerm extends Term {

  constructor(name, subts = []) {
    super(name);
    this.subts = subts;
  }

  toString() {
    return `${ this.name }(${ this.subts.join(', ') })`;
  }

  equals(other) {
    return other instanceof FunctionTerm &&
      this.name === other.name &&
      this.subts.length === other.subts.length &&
      this.subts.every((subt, i) => subt.equals(other.subts[i]))
  }

  substitute(map){
    return new FunctionTerm(
      this.name,
      this.subts.map( subt => subt.substitute(map))
    );
  }

}

=======
import Term from "./Term";

class FunctionTerm extends Term {

  constructor(name, subts = []) {
    super(name);
    this.subts = subts;
  }

  toString() {
    return this.name + '(' + this.subts.map(subt => subt.toString()).join(', ') + ')';
  }

  equals(other) {
    return other instanceof FunctionTerm &&
      this.name === other.name &&
      this.subts.length === other.subts.length &&
      this.subts.every((subt, i) => subt.equals(other.subts[i]))
  }

  substitute(map){
    return new FunctionTerm(
      this.name,
      this.subts.map( subt => subt.substitute(map))
    );
  }

}

>>>>>>> b48bca53b8673ff637bc96026739d5b489709c96
export default FunctionTerm;