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
  // WIP
  return cells;
}
