const { expect } = require('chai');
const Mtrx = require('mtrx');
const { toPlain, expectMatrixClose } = require('../helpers');

describe('Mtrx: arithmetic', () => {
  const a = () => new Mtrx([[1, 2], [3, 4]]);
  const swap = () => new Mtrx([[0, 1], [1, 0]]);

  it('add sums matrices element-wise without changing the operands', () => {
    const x = a();
    const y = Mtrx.ones(2);
    expect(toPlain(Mtrx.add(x, y))).to.deep.equal([[2, 3], [4, 5]]);
    expect(toPlain(x.add(y))).to.deep.equal([[2, 3], [4, 5]]);
    expect(toPlain(x)).to.deep.equal([[1, 2], [3, 4]]);
  });

  it('add and sub throw TypeError for different shapes', () => {
    expect(() => Mtrx.add(a(), Mtrx.ones(3))).to.throw(TypeError);
    expect(() => Mtrx.sub(a(), Mtrx.ones(3))).to.throw(TypeError);
  });

  it('sub subtracts matrices element-wise', () => {
    expect(toPlain(Mtrx.sub(a(), Mtrx.ones(2)))).to.deep.equal([[0, 1], [2, 3]]);
  });

  it('mul multiplies a matrix by a number in both orders', () => {
    expect(toPlain(Mtrx.mul(a(), 2))).to.deep.equal([[2, 4], [6, 8]]);
    expect(toPlain(Mtrx.mul(2, a()))).to.deep.equal([[2, 4], [6, 8]]);
  });

  it('mul multiplies square matrices', () => {
    expect(toPlain(Mtrx.mul(a(), new Mtrx([[5, 6], [7, 8]])))).to.deep.equal([[19, 22], [43, 50]]);
    expect(toPlain(Mtrx.mul(a(), Mtrx.eye(2)))).to.deep.equal([[1, 2], [3, 4]]);
  });

  it('matrix multiplication is not commutative, leftMul and rightMul differ', () => {
    expect(toPlain(Mtrx.mul(a(), swap()))).to.deep.equal([[2, 1], [4, 3]]);
    expect(toPlain(Mtrx.mul(swap(), a()))).to.deep.equal([[3, 4], [1, 2]]);
    expect(toPlain(a().rightMul(swap()))).to.deep.equal([[2, 1], [4, 3]]);
    expect(toPlain(a().leftMul(swap()))).to.deep.equal([[3, 4], [1, 2]]);
  });

  it('mul throws TypeError for unsupported operands', () => {
    expect(() => Mtrx.mul('a', 1)).to.throw(TypeError);
  });

  it('div divides a matrix by a number and a number by a matrix', () => {
    expect(toPlain(Mtrx.div(new Mtrx([[2, 4], [6, 8]]), 2))).to.deep.equal([[1, 2], [3, 4]]);
    expect(toPlain(Mtrx.div(6, new Mtrx([[1, 2], [3, 6]])))).to.deep.equal([[6, 3], [2, 1]]);
  });

  it('dividing an invertible matrix by itself gives the identity', () => {
    const n = new Mtrx([[1, 2, 0], [3, 4, 4], [5, 6, 3]]);
    expectMatrixClose(Mtrx.div(n, n), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  });

  it('div throws TypeError when the divisor matrix is singular', () => {
    expect(() => Mtrx.div(Mtrx.ones(2), Mtrx.ones(2))).to.throw(TypeError);
  });
});
