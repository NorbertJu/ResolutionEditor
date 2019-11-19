import Formula from "./Formula";

class Negation extends Formula {

  constructor(subfs) {
    super(subfs);
  }

  toString() {
    return `¬${this.subfs.toString()}`;
  }

}

export default Negation;