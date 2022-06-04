const gridCanvas = document.querySelector('.grid-canvas');

//create rows
function createGridRows() {
  for (let i = 1; i < 11; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.classList.add(`grid-row-${i}`);
    createGridCells(row);
    gridCanvas.appendChild(row);
  }
}

//create cells
function createGridCells(row) {
  for (let i = 1; i < 11; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.appendChild(cell);
  }
}

createGridRows();


