import {
  cellArray,
  copyCells,
  setCell
} from './actions';

it('returns an empty cell array of specified size', () => {
  const cells = cellArray(6, 4);

  expect(cells.length).toBe(4);
  expect(cells[0].length).toBe(6);
  expect(cells.every(arr => arr.every(e => e === false))).toBe(true);
});

it('returns a cell array with the value of a cell changed', () => {
  const cells = cellArray(6, 4);

  const newCells = setCell(cells, 0, 0, true);

  const targetCells = copyCells(cells);
  targetCells[0][0] = true;

  expect(newCells).toEqual(targetCells);
});
