const { expect } = require('chai');
const Mtrx = require('mtrx');
const { toPlain } = require('../helpers');

describe('Mtrx: creation', () => {
  it('creates a 1x1 random matrix without arguments', () => {
    const m = new Mtrx();
    expect(m.rows).to.equal(1);
    expect(m.cols).to.equal(1);
    expect(m[0][0]).to.be.within(0, 1);
  });

  it('creates a random matrix with the given shape', () => {
    const m = new Mtrx(2, 3);
    expect(m.rows).to.equal(2);
    expect(m.cols).to.equal(3);
    m.forEach((row) => row.forEach((v) => expect(v).to.be.within(0, 1)));
  });

  it('fills the matrix with a constant number', () => {
    expect(toPlain(new Mtrx(2, 3, 9))).to.deep.equal([[9, 9, 9], [9, 9, 9]]);
  });

  it('fills the matrix using a function of indices', () => {
    expect(toPlain(new Mtrx(2, 3, (i, j) => i + j))).to.deep.equal([[0, 1, 2], [1, 2, 3]]);
  });

  it('creates a diagonal matrix from a numbers array', () => {
    expect(toPlain(new Mtrx([2, 4, 6]))).to.deep.equal([[2, 0, 0], [0, 4, 0], [0, 0, 6]]);
  });

  it('creates an independent copy from a two-dimensional array', () => {
    const source = [[1, 2], [3, 4]];
    const m = new Mtrx(source);
    m[0][0] = 100;
    expect(toPlain(new Mtrx(source))).to.deep.equal([[1, 2], [3, 4]]);
    expect(m).to.be.instanceOf(Array);
  });

  it('throws TypeError for invalid arguments', () => {
    expect(() => new Mtrx('x')).to.throw(TypeError);
    expect(() => new Mtrx([])).to.throw(TypeError);
    expect(() => new Mtrx([[1, 2], [3]])).to.throw(TypeError);
  });

  it('creates zeros, ones and identity matrices', () => {
    expect(toPlain(Mtrx.zeros(2, 3))).to.deep.equal([[0, 0, 0], [0, 0, 0]]);
    expect(toPlain(Mtrx.ones(2))).to.deep.equal([[1, 1], [1, 1]]);
    expect(toPlain(Mtrx.eye(2, 3))).to.deep.equal([[1, 0, 0], [0, 1, 0]]);
  });

  it('Mtrx.clone returns an independent copy and rejects plain arrays', () => {
    const original = new Mtrx([[1, 2], [3, 4]]);
    const copy = Mtrx.clone(original);
    copy[0][0] = 99;
    expect(original[0][0]).to.equal(1);
    expect(() => Mtrx.clone([[1]])).to.throw(TypeError);
  });
});
