import {
  cellArray,
  copyCells,
  setCell,
  setMultiple,
  neighboringCells,
  updateCells
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

it('returns a cell array with setMultiple that is equivalent of multiple setCell calls', () => {
  let cells = cellArray(6, 4);
  cells = setMultiple(cells, true, [0,0], [0,1]);

  let targetCells = cellArray(6, 4);
  targetCells = setCell(targetCells, 0, 0, true);
  targetCells = setCell(targetCells, 0, 1, true);

  expect(cells).toEqual(targetCells);
});

describe('updateCells', () => {

  it('generates blinker', () => {
    let cells = setMultiple(cellArray(6, 4), true,
      [0,1], [1,1], [2,1]
    );
    cells = updateCells(cells);

    let targetCells = setMultiple(cellArray(6, 4), true,
      [1,0], [1,1], [1,2]
    );

    expect(cells).toEqual(targetCells);
  });

  it('kills lone cells', () => {
    let cells = setCell(
      cellArray(6, 4), 0, 0, true
    );
    cells = updateCells(cells);

    const targetCells = cellArray(6, 4);

    expect(cells).toEqual(targetCells);
  });

});
