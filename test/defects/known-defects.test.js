const { expect } = require('chai');
const Mtrx = require('mtrx');
const { toPlain } = require('../helpers');

describe('Mtrx: known defects (these tests are expected to fail)', () => {
  it('multiplies a 2x3 matrix by a 3x2 matrix correctly', () => {
    const a = new Mtrx([[1, 2, 3], [4, 5, 6]]);
    const b = new Mtrx([[1, 2], [3, 4], [5, 6]]);
    expect(toPlain(Mtrx.mul(a, b))).to.deep.equal([[22, 28], [49, 64]]);
  });

  it('multiplies a 3x2 matrix by a 2x3 matrix correctly', () => {
    const a = new Mtrx([[1, 2], [3, 4], [5, 6]]);
    const b = new Mtrx([[1, 2, 3], [4, 5, 6]]);
    expect(toPlain(Mtrx.mul(a, b))).to.deep.equal([
      [9, 12, 15],
      [19, 26, 33],
      [29, 40, 51]
    ]);
  });

  it('leftMul behaves as documented in the library README: m.leftMul(n) equals Mtrx.mul(m, n)', () => {
    const m = new Mtrx([[1, 2], [3, 4]]);
    const n = new Mtrx([[0, 1], [1, 0]]);
    expect(toPlain(m.leftMul(n))).to.deep.equal(toPlain(Mtrx.mul(m, n)));
  });
});
