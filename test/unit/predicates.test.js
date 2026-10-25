const { expect } = require('chai');
const Mtrx = require('mtrx');
const { toPlain } = require('../helpers');

describe('Mtrx: predicates and comparison', () => {
  it('isMtrx distinguishes Mtrx instances from plain arrays', () => {
    expect(Mtrx.isMtrx(new Mtrx([[1, 2]]))).to.equal(true);
    expect(Mtrx.isMtrx([[1, 2]])).to.equal(false);
  });

  it('isMtrxLike accepts only rectangular arrays of numbers', () => {
    expect(Mtrx.isMtrxLike([[1, 2], [3, 4]])).to.equal(true);
    expect(Mtrx.isMtrxLike([])).to.equal(false);
    expect(Mtrx.isMtrxLike([[1], [2, 3]])).to.equal(false);
    expect(Mtrx.isMtrxLike([['a']])).to.equal(false);
  });

  it('isDiag recognises diagonal matrices', () => {
    expect(Mtrx.isDiag(Mtrx.eye(3))).to.equal(true);
    expect(Mtrx.isDiag(new Mtrx([[1, 2], [3, 4]]))).to.equal(false);
    expect(Mtrx.isDiag(Mtrx.zeros(2, 3))).to.equal(false);
  });

  it('isSingular recognises singular matrices', () => {
    expect(Mtrx.isSingular(new Mtrx([[1, 2], [2, 4]]))).to.equal(true);
    expect(Mtrx.isSingular(Mtrx.ones(2, 3))).to.equal(true);
    expect(Mtrx.isSingular(new Mtrx([[1, 2, 0], [3, 4, 4], [5, 6, 3]]))).to.equal(false);
  });

  it('isSameShape compares dimensions', () => {
    expect(Mtrx.isSameShape(Mtrx.ones(2, 3), [[1, 2, 3], [4, 5, 6]])).to.equal(true);
    expect(Mtrx.isSameShape(Mtrx.ones(2, 3), Mtrx.ones(3, 2))).to.equal(false);
  });

  it('equal, equalAll and equalAny compare element-wise', () => {
    const a = new Mtrx([[1, 2], [3, 4]]);
    const b = new Mtrx([[1, 0], [3, 0]]);
    expect(toPlain(Mtrx.equal(a, b))).to.deep.equal([[true, false], [true, false]]);
    expect(Mtrx.equalAll(a, a)).to.equal(true);
    expect(Mtrx.equalAll(a, b)).to.equal(false);
    expect(Mtrx.equalAny(a, b)).to.equal(true);
    expect(Mtrx.equalAny(a, new Mtrx([[9, 9], [9, 9]]))).to.equal(false);
  });

  it('equal functions throw TypeError for different shapes', () => {
    const a = new Mtrx([[1, 2], [3, 4]]);
    expect(() => Mtrx.equal(a, Mtrx.ones(3))).to.throw(TypeError);
    expect(() => Mtrx.equalAll(a, Mtrx.ones(3))).to.throw(TypeError);
  });
});
