const { expect } = require('chai');

const toPlain = (matrix) => Array.from(matrix, (row) => Array.from(row));

const expectMatrixClose = (actual, expected, delta = 1e-9) => {
  const plain = toPlain(actual);
  expect(plain, 'row count').to.have.lengthOf(expected.length);
  plain.forEach((row, i) => {
    expect(row, `column count in row ${i}`).to.have.lengthOf(expected[i].length);
    row.forEach((value, j) => {
      expect(value, `element [${i}][${j}]`).to.be.closeTo(expected[i][j], delta);
    });
  });
};

module.exports = { toPlain, expectMatrixClose };
