class Term {

  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }

  substitute(map) {
    new Error('Unimplemented');
  }

  equals() {
    new Error('Unimplemented');
  }

}

export default Term;