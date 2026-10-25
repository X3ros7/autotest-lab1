const { expect } = require('chai');
const Mtrx = require('mtrx');
const { toPlain } = require('../helpers');

describe('Mtrx: functional helpers and aggregates', () => {
  const sample = () => new Mtrx([[1, 2, 0], [3, 4, 4], [5, 6, 3]]);

  it('mapMtrx builds a new matrix and passes indices to the callback', () => {
    const m = sample();
    expect(toPlain(m.mapMtrx((v, i, j) => v + i + j))).to.deep.equal([
      [1, 3, 2],
      [4, 6, 7],
      [7, 9, 7]
    ]);
    expect(toPlain(m)).to.deep.equal(toPlain(sample()));
  });

  it('everyMtrx checks that all elements satisfy the predicate', () => {
    expect(sample().everyMtrx((v) => v >= 0)).to.equal(true);
    expect(sample().everyMtrx((v) => v > 0)).to.equal(false);
  });

  it('someMtrx checks that at least one element satisfies the predicate', () => {
    expect(sample().someMtrx((v) => v > 5)).to.equal(true);
    expect(sample().someMtrx((v) => v > 100)).to.equal(false);
  });

  it('reduceMtrx reduces all elements with and without an initial value', () => {
    expect(sample().reduceMtrx((s, v) => s + v)).to.equal(28);
    expect(sample().reduceMtrx((s, v) => s + v, 100)).to.equal(128);
  });

  it('sum adds all elements, rows (0) or columns (1)', () => {
    expect(sample().sum()).to.equal(28);
    expect(sample().sum(0)).to.deep.equal([3, 11, 14]);
    expect(sample().sum(1)).to.deep.equal([9, 12, 7]);
  });

  it('min finds the smallest element, per row (0) or per column (1)', () => {
    expect(sample().min()).to.equal(0);
    expect(sample().min(0)).to.deep.equal([0, 3, 3]);
    expect(sample().min(1)).to.deep.equal([1, 2, 0]);
  });

  it('max finds the largest element, per row (0) or per column (1)', () => {
    expect(sample().max()).to.equal(6);
    expect(sample().max(0)).to.deep.equal([2, 4, 6]);
    expect(sample().max(1)).to.deep.equal([5, 6, 4]);
  });
});
