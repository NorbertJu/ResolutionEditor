class Formula {

  constructor(subfs) {
    this.subfs = subfs;
  }

  subfs() {
    return this.subfs;
  }

  toString() {
    new Error('Unimplemented');
  }

  equals(other){ 
    new Error('Unimplemented');
  }

  substitute(map) {
    new Error('Unimplemented');
  }

}

export default Formula;