const gridCanvas = document.querySelector('.grid-canvas');
const slider = document.querySelector('.grid-range .slider');
const gridBackgroundColor = document.querySelector('.grid-background-color .color-picker');
const gridLineColor = document.querySelector('.grid-color .color-picker');
const hideGridLinesBtn = document.querySelector('.hide-grid-lines');
const penColor = document.querySelector('.pen-color .color-picker');
const rainbowModeBtn = document.querySelector('.rainbow-mode');
const eraserBtn = document.querySelector('.eraser');


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

        if (rainbowMode === true && eraserMode === false) {

          const randomColor = generateRandomColor();
          cell.style.backgroundColor = randomColor;
          cell.style.borderColor = randomColor;
          cell.classList.add('drawn');
          cell.classList.remove('erased');

        } else if (eraserMode === true) {

          cell.style.backgroundColor = gridBackgroundColor.value;
          if (showGridLinesMode) {
            //if showGridLine mode is on, make border color current background color
            cell.style.borderColor = gridLineColor.value;
          } else {
            //if showGridLine mode is off, make border color current gridLine color
            cell.style.borderColor = gridBackgroundColor.value;
          }
          cell.classList.add('erased');
          cell.classList.remove('drawn');

        } else {
          cell.style.backgroundColor = penColor.value;
          cell.style.borderColor = penColor.value;

          cell.classList.add('drawn');
          cell.classList.remove('erased');
        }
      }
    })
  })
}




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

    if (cell.classList.contains('erased')) {
      // if showGridLine mode is on
      if (showGridLinesMode === true) cell.style.borderColor = gridLineColor.value;
      // if showGridLine mode is off
      else cell.style.borderColor = gridBackgroundColor.value;
    }
  });
}




function toggleHideGridLines(e) {
  // toggle showGridLinesMode
  showGridLinesMode = !showGridLinesMode;
  const btnTextContent = e.target.textContent;
  if (btnTextContent === 'Hide Grid Lines') {
    hideGridLinesBtn.textContent = 'Show Grid Lines';
    updateGridLineColor(gridBackgroundColor.value);
  } else {
    hideGridLinesBtn.textContent = 'Hide Grid Lines';
    updateGridLineColor(gridLineColor.value);
  }
}


function toggleRainbowMode() {
  rainbowModeBtn.classList.toggle('active');
  rainbowMode = !rainbowMode;
}


function toggleEraserMode() {
  eraserBtn.classList.toggle('active');
  eraserMode = !eraserMode;
}








// function toggleDisable(e) {
//   const btnTextContent = e.target.textContent;

//   gridBackgroundColor.disabled = !gridBackgroundColor.disabled
//   gridLineColor.disabled = !gridLineColor.disabled;
//   slider.disabled = !slider.disabled;

//   gridBackgroundColor.parentElement.parentElement.classList.toggle('disabled');
//   gridLineColor.parentElement.parentElement.classList.toggle('disabled');
//   slider.parentElement.classList.toggle('disabled');


//   // if (btnTextContent === 'Eraser') {
//   //   hideGridLinesBtn.disabled = !hideGridLinesBtn.disabled;
//   //   penColor.disabled = !penColor.disabled;
//   //   rainbowModeBtn.disabled = !rainbowModeBtn.disabled;

//   //   hideGridLinesBtn.classList.toggle('disabled');
//   //   penColor.parentElement.parentElement.classList.toggle('disabled');
//   //   rainbowModeBtn.classList.toggle('disabled');
//   // }
// }


function disableUI(element) {
  element.disabled = !element.disabled;
}

function greyOutUIBox(element) {
  element.classList.toggle('disabled');
}




function generateRandomColor() {
  let randomColor = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  if (randomColor.length < 6) {
    let randomPaddingNumber = Math.floor(Math.random() * 10);
    randomColor = randomColor.padStart(6, randomPaddingNumber);
  }
  randomColor = '#' + randomColor;
  return randomColor;
}




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

  disableUI(gridBackgroundColor);
  disableUI(gridLineColor);
  disableUI(slider);

  greyOutUIBox(gridBackgroundColor.parentElement.parentElement);
  greyOutUIBox(gridLineColor.parentElement.parentElement);
  greyOutUIBox(slider.parentElement);

  toggleHideGridLines(e);
});



rainbowModeBtn.addEventListener('click', toggleRainbowMode);

eraserBtn.addEventListener('click', (e) => {

  toggleEraserMode();

});

//initialize app
let rainbowMode = false;
let eraserMode = false;
let showGridLinesMode = true;

createGridRows(32);
activateGridDrawing();







