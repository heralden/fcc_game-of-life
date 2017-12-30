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

export function updateCells(cells) {
  // WIP
  return cells;
}
