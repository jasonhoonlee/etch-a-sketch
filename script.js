const gridCanvas = document.querySelector('.grid-canvas');

//create rows
function createGridRows(gridSize) {
  for (let i = 1; i <= gridSize; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.classList.add(`grid-row-${i}`);
    createGridCells(row, gridSize);
    gridCanvas.appendChild(row);
  }
}

//create cells
function createGridCells(row, gridSize) {
  for (let i = 1; i <= gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.appendChild(cell);
  }
}

createGridRows(64);


