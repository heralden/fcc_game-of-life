import {
  cellArray,
  copyCells,
  setCell,
  neighboringCells
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

it('returns an array of all 8 neighboring cell coordinates', () => {
  const cells = cellArray(6, 4);
  const neighbors = neighboringCells(cells, 0, 0);

  expect(neighbors).toEqual([
    { y: 3, x: 0 },
    { y: 3, x: 1 },
    { y: 0, x: 1 },
    { y: 1, x: 1 },
    { y: 1, x: 0 },
    { y: 1, x: 5 },
    { y: 0, x: 5 },
    { y: 3, x: 5 }
  ]);
});
