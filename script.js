const gridCanvas = document.querySelector('.grid-canvas');
const slider = document.querySelector('.grid-range');
const gridBackgroundColor = document.querySelector('.grid-background-color .color-picker');


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

function updateGridSizeInfo(size) {
  const currentGridSize = document.querySelector('.current-grid-size');
  currentGridSize.textContent = `${size} x ${size}`;
}

function updateGrid(size) {
  gridCanvas.innerHTML = '';
  createGridRows(size);
}

function updateGridBackground(color) {
  gridCanvas.style.backgroundColor = color;
}


//event handlers
slider.addEventListener('input', e => {
  if (e.target.tagName !== 'INPUT') return;
  const gridSize = e.target.value;
  updateGrid(gridSize);
  updateGridSizeInfo(gridSize);
})

gridBackgroundColor.addEventListener('input', e => {
  const gridBackgroundColor = e.target.value;
  updateGridBackground(gridBackgroundColor);
})





createGridRows(32);





