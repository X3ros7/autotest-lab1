const { expect } = require('chai');
const Mtrx = require('mtrx');
const { toPlain } = require('../helpers');

describe('Mtrx: properties and element access', () => {
  const sample = () => new Mtrx([[1, 2, 0], [3, 4, 4], [5, 6, 3]]);

  it('det computes the determinant of a square matrix', () => {
    expect(sample().det).to.be.closeTo(10, 1e-9);
    expect(new Mtrx([[1, 2], [3, 4]]).det).to.be.closeTo(-2, 1e-9);
  });

  it('det is 0 for a singular matrix and NaN for a non-square one', () => {
    expect(new Mtrx([[1, 2], [2, 4]]).det).to.equal(0);
    expect(Mtrx.ones(2, 3).det).to.be.NaN;
  });

  it('rank is calculated correctly', () => {
    expect(sample().rank).to.equal(3);
    expect(new Mtrx([[1, 2], [2, 4]]).rank).to.equal(1);
    expect(Mtrx.zeros(3).rank).to.equal(0);
  });

  it('get and set read and write elements, set ignores non-numbers', () => {
    const m = Mtrx.zeros(2);
    m.set(0, 1, 7);
    m.set(1, 1, 'x');
    expect(m.get(0, 1)).to.equal(7);
    expect(m.get(1, 1)).to.equal(0);
  });

  it('changeRows adds and removes rows', () => {
    const m = new Mtrx(2, 2, 0);
    m.changeRows(1, 5);
    expect(toPlain(m)).to.deep.equal([[0, 0], [0, 0], [5, 5]]);
    m.changeRows(-2);
    expect(toPlain(m)).to.deep.equal([[0, 0]]);
  });

  it('changeCols adds and removes columns', () => {
    const m = new Mtrx(2, 2, 0);
    m.changeCols(1, 7);
    expect(toPlain(m)).to.deep.equal([[0, 0, 7], [0, 0, 7]]);
    m.changeCols(-2);
    expect(toPlain(m)).to.deep.equal([[0], [0]]);
  });

  it('resetLike replaces the content or throws TypeError', () => {
    const m = new Mtrx(2, 2, 1);
    m.resetLike([[1, 2, 3]]);
    expect(toPlain(m)).to.deep.equal([[1, 2, 3]]);
    m.resetLike([1, 2]);
    expect(toPlain(m)).to.deep.equal([[1, 0], [0, 2]]);
    expect(() => m.resetLike('abc')).to.throw(TypeError);
  });
});
