const gridCanvas = document.querySelector('.grid-canvas');
const slider = document.querySelector('.grid-range .slider');
const gridBackgroundColor = document.querySelector('.grid-background-color .color-picker');
const gridLineColor = document.querySelector('.grid-color .color-picker');
const hideGridLinesBtn = document.querySelector('.hide-grid-lines');
const penColor = document.querySelector('.pen-color .color-picker');

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



function activateGridDrawing() {

  let isDrawing = false;
  gridCanvas.addEventListener('mousedown', e => {
    isDrawing = true;
  });
  gridCanvas.addEventListener('mouseup', e => {
    isDrawing = false;
  });

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('mouseover', e => {
      if (isDrawing === true) {
        cell.style.backgroundColor = penColor.value;
        cell.style.borderColor = penColor.value;
        cell.classList.add('drawn');
      }
    })
  })
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
  activateGridDrawing();
}

function updateGridBackground(e) {
  const gridBackgroundColor = e.target.value;
  gridCanvas.style.backgroundColor = gridBackgroundColor;
}

function updateGridLineColor(color) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    if (!cell.classList.contains('drawn')) {
      cell.style.borderColor = color;
    }
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


function toggleDisable(e) {
  const btnTextContent = e.target.textContent;

  if (btnTextContent === 'Hide Grid Lines') {
    gridBackgroundColor.disabled = true;
    gridLineColor.disabled = true;
    slider.disabled = true;

    gridBackgroundColor.parentElement.parentElement.classList.add('disabled');
    gridLineColor.parentElement.parentElement.classList.add('disabled');
    slider.parentElement.classList.add('disabled');
    console.log(slider)

  } else {
    gridBackgroundColor.disabled = false;
    gridLineColor.disabled = false;
    slider.disabled = false;

    gridBackgroundColor.parentElement.parentElement.classList.remove('disabled');
    gridLineColor.parentElement.parentElement.classList.remove('disabled');
    slider.classList.remove('disabled');
    console.log(slider)
  }
}



//event handlers
slider.addEventListener('input', e => {
  if (e.target.tagName !== 'INPUT') return;
  updateGridSize(e);
  updateGridSizeInfo(e);
});

gridBackgroundColor.addEventListener('input', e => {
  updateGridBackground(e);
});

gridLineColor.addEventListener('input', e => {
  const gridColor = e.target.value;
  updateGridLineColor(gridColor);
});

hideGridLinesBtn.addEventListener('click', e => {
  toggleDisable(e);
  toggleHideGridLines(e);
});







//initialize app
createGridRows(32);
activateGridDrawing()







