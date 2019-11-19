import Formula from "./Formula";

class ExistentialQuant extends Formula {

  constructor(variable, subfs) {
    super(subfs);
    this.variable = variable;
  }

  toString() {
    return `∃${this.variable} ${this.subfs.toString()}`;
  }

}

export default ExistentialQuant;