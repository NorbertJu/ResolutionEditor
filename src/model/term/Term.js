class Term {

  constructor(name) {
    this.name = name;
  }

  toString() {
    return "";
  }

  substitute(map) {
    return new Term(this.name);
  }

}

export default Term;