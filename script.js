const gridCanvas = document.querySelector('.grid-canvas');
const slider = document.querySelector('.grid-range');


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

// Updating grid
function updateGridSizeInfo(size) {
  const currentGridSize = document.querySelector('.current-grid-size');
  currentGridSize.textContent = `${size} x ${size}`
}

function updateGrid(size) {
  gridCanvas.innerHTML = '';
  createGridRows(size);
}

slider.addEventListener('input', e => {
  if (e.target.tagName !== 'INPUT') return;
  const gridSize = e.target.value;
  updateGrid(gridSize);
  updateGridSizeInfo(gridSize)

})





createGridRows(32);





