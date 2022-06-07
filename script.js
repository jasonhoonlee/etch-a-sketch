const gridCanvas = document.querySelector('.grid-canvas');
const slider = document.querySelector('.grid-range');
const gridBackgroundColor = document.querySelector('.grid-background-color .color-picker');
const gridLineColor = document.querySelector('.grid-color .color-picker');
const hideGridLinesBtn = document.querySelector('.hide-grid-lines');

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

function updateGridSizeInfo(e) {
  const gridSize = e.target.value;
  const currentGridSize = document.querySelector('.current-grid-size');
  currentGridSize.textContent = `${gridSize} x ${gridSize}`;
}

function updateGridSize(e) {
  const gridSize = e.target.value;
  gridCanvas.innerHTML = '';
  createGridRows(gridSize);
}

function updateGridBackground(color) {
  gridCanvas.style.backgroundColor = color;
}

function updateGridLineColor(color) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.borderColor = color;
  });
}



function toggleHideGridLines(e) {
  const btnTextContent = e.target.textContent;
  if (btnTextContent === 'Hide Grid Lines') {
    hideGridLinesBtn.textContent = 'Show Grid Lines';
    updateGridLineColor(gridBackgroundColor.value);

  } else {
    hideGridLinesBtn.textContent = 'Hide Grid Lines';
    updateGridLineColor(gridLineColor.value);

  }
}


function toggleBtnDisable(e) {
  const btnTextContent = e.target.textContent;

  if (btnTextContent === 'Hide Grid Lines') {
    gridBackgroundColor.disabled = true;
    gridLineColor.disabled = true;

    gridBackgroundColor.parentElement.parentElement.classList.add('disabled');
    gridLineColor.parentElement.parentElement.classList.add('disabled');

  } else {
    gridBackgroundColor.disabled = false;
    gridLineColor.disabled = false;

    gridBackgroundColor.parentElement.parentElement.classList.remove('disabled');
    gridLineColor.parentElement.parentElement.classList.remove('disabled');

  }
}



//event handlers
slider.addEventListener('input', e => {
  if (e.target.tagName !== 'INPUT') return;
  updateGridSize(e);
  updateGridSizeInfo(e);
})




gridBackgroundColor.addEventListener('input', e => {
  const gridBackgroundColor = e.target.value;
  updateGridBackground(gridBackgroundColor);
})

gridLineColor.addEventListener('input', e => {
  const gridColor = e.target.value;
  updateGridLineColor(gridColor);
})

hideGridLinesBtn.addEventListener('click', e => {
  toggleBtnDisable(e);
  toggleHideGridLines(e);
})

createGridRows(32);





