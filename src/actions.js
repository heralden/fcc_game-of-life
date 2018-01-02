import countBy from 'lodash/countBy';
import flatten from 'lodash/flatten';

export function cellArray(width, height) {
  return Array(height).fill(
    Array(width).fill(false)
  );
}

export function copyCells(cells) {
  return cells.map((arr) => arr.slice());
}

export function setCell(cells, y, x, val) {
  const newCells = copyCells(cells);
  newCells[y][x] = val;
  return newCells;
}

export function neighboringCells(cells, y, x) {
  const width = cells[0].length;
  const height = cells.length;

  const north = { y: y - 1, x }
      , east = { y, x: x + 1 }
      , south = { y: y + 1, x }
      , west = { y, x: x - 1 };

  const neighbors = [
    north, east, south, west
  ];

  for (let dir in neighbors) {
    // Fix overflowing coordinates
    const neighbor = neighbors[dir];

    if (neighbor.x >= width) 
      neighbor.x -= width;
    else if (neighbor.x < 0)
      neighbor.x += width;

    if (neighbor.y >= height)
      neighbor.y -= height;
    else if (neighbor.y < 0)
      neighbor.y += height;
  }

  const northEast = { y: north.y, x: east.x }
      , southEast = { y: south.y, x: east.x }
      , southWest = { y: south.y, x: west.x }
      , northWest = { y: north.y, x: west.x };

  return [
    north, northEast, east, southEast,
    south, southWest, west, northWest
  ];
}

export function updateCells(cells) {
  const liveCells = [];
  let liberties = {};

  cells.forEach((arr, y) => arr.forEach((e, x) => {
    if (e) liveCells.push({ y, x });
  }));

  if (liveCells.length) {
    liberties = countBy(flatten(
      liveCells.map(e => 
        neighboringCells(cells, e.y, e.x)
      )
    ), (e) => e.y + ',' + e.x);
    // This creates an object containing a count of how
    // many live neighboring cells each coordinates have.
  }

  for (let yx in liberties) {
    const liveNeighbors = liberties[yx];
    const [ y, x ] = yx.split(',');

    if (liveNeighbors === 3)
      cells = setCell(cells, y, x, true);
    else if (liveNeighbors !== 2)
      cells = setCell(cells, y, x, false);
  }

  return cells;
}
