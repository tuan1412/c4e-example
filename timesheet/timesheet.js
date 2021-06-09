let timeSheetData = [
  {
    project: 'Learn Front-end',
    task: 'Learn HTML',
    timeSpent: 3
  },
  {
    project: 'Learn Front-end',
    task: 'Learn CSS',
    timeSpent: 2
  },
];

let updateIdx;

const bodyWrapperEl = document.getElementById('bodyWrapper');
const inputProjectEl = document.getElementById('projectInp');
const inputTaskEl = document.getElementById('taskInp');
const timeEl = document.getElementById('timeInp');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
  updateIdx = undefined;
  fillForm();
  addBtn.innerText = "Add";
})

addBtn.addEventListener('click', () => {
  let timeSheet = getTimeSheet();

  if (updateIdx) {
    updateTimeSheet(updateIdx, timeSheet);
  } else {
    updateTimeSheet(timeSheetData.length, timeSheet);
  }
  renderTaskList();
  fillForm();
  addBtn.innerText = "Add";
})

function removeTimeSheet(idx) {
  timeSheetData.splice(idx, 1);
}

function updateTimeSheet(idx, timeSheet) {
  timeSheetData[idx] = timeSheet;
}

function fillForm(timeSheet) {
  inputProjectEl.value = timeSheet ? timeSheet.project : '';
  inputTaskEl.value = timeSheet ? timeSheet.project : '';
  timeEl.value = timeSheet ? +timeSheet.timeSpent : '';
}

function getTimeSheet() {
  return {
    project: inputProjectEl.value,
    task: inputTaskEl.value,
    timeSpent: timeEl.value || 0
  }
}

function renderTaskList() {
  bodyWrapperEl.innerHTML = '';

  const timeSheetHtml = timeSheetData.map((data, idx) => {
    return `<tr class="row-item">
        <td>${data.project}</td>
        <td>${data.task}</td>
        <td>${data.timeSpent}</td>
        <td>
          <button data-index=${idx} class="del-btn">X</button>
          <button data-index=${idx} class="up-btn">U</button>
        </td>
      </tr>`
    
  }).join('');

  bodyWrapperEl.insertAdjacentHTML('afterbegin', timeSheetHtml);

  let buttonDelButtons = document.querySelectorAll('.del-btn');
  buttonDelButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const thisEl = event.target;
      const rowIdx = thisEl.getAttribute('data-index');
      removeTimeSheet(rowIdx);
      renderTaskList();
    })
  })

  let buttonUpdateButtons = document.querySelectorAll('.up-btn');
  buttonUpdateButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const thisEl = event.target;
      const rowIdx = thisEl.getAttribute('data-index');
      const timeSheet = timeSheetData[rowIdx];
      fillForm(timeSheet);
      addBtn.innerText = "Update";
      updateIdx = rowIdx;
    })
  })  
}

renderTaskList();