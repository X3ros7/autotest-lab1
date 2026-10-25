const { expect } = require('chai');
const Mtrx = require('mtrx');
const { toPlain, expectMatrixClose } = require('../helpers');

describe('Mtrx: transformations', () => {
  const invertible = () => new Mtrx([[1, 2, 0], [3, 4, 4], [5, 6, 3]]);
  const identity3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

  it('T transposes square and rectangular matrices', () => {
    expect(toPlain(invertible().T())).to.deep.equal([[1, 3, 5], [2, 4, 6], [0, 4, 3]]);
    const t = new Mtrx([[1, 2, 3], [4, 5, 6]]).T();
    expect(toPlain(t)).to.deep.equal([[1, 4], [2, 5], [3, 6]]);
  });

  it('cof removes the given row and column', () => {
    const n = new Mtrx([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(toPlain(n.cof(1, 1))).to.deep.equal([[1, 3], [7, 9]]);
    expect(n.rows).to.equal(3);
  });

  it('inv computes the inverse matrix', () => {
    expectMatrixClose(invertible().inv(), [
      [-1.2, -0.6, 0.8],
      [1.1, 0.3, -0.4],
      [-0.2, 0.4, -0.2]
    ]);
  });

  it('A * inv(A) is the identity', () => {
    const a = invertible();
    expectMatrixClose(Mtrx.mul(a, a.inv()), identity3);
  });

  it('inv throws Error for non-square and singular matrices', () => {
    expect(() => Mtrx.ones(2, 3).inv()).to.throw(Error, /square/i);
    expect(() => new Mtrx([[1, 2], [2, 4]]).inv()).to.throw(Error);
  });

  it('compan computes the adjugate matrix', () => {
    expectMatrixClose(invertible().compan(), [
      [-12, -6, 8],
      [11, 3, -4],
      [-2, 4, -2]
    ]);
  });

  it('LUP returns the expected L, U and P factors', () => {
    const { L, U, P } = invertible().LUP();
    expectMatrixClose(L, [[1, 0, 0], [0.2, 1, 0], [0.6, 0.5, 1]]);
    expectMatrixClose(U, [[5, 6, 3], [0, 0.8, -0.6], [0, 0, 2.5]]);
    expect(toPlain(P)).to.deep.equal([[0, 0, 1], [1, 0, 0], [0, 1, 0]]);
  });

  it('LUP satisfies P * A = L * U and throws for singular matrices', () => {
    const a = invertible();
    const { L, U, P } = a.LUP();
    expectMatrixClose(Mtrx.mul(P, a), toPlain(Mtrx.mul(L, U)));
    expect(() => Mtrx.zeros(2).LUP()).to.throw(Error, /singular/i);
  });
});
