items = []

function init(){
    loadData();
    render();
}

function addRow(table, note, index){
    const newRow = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.innerText = (index+1) + ".";
    newRow.appendChild(idTd);

    const envelopeTd = document.createElement("td");
    envelopeTd.innerHTML = "<span class='glyphicon glyphicon-envelope'></span>";
    newRow.appendChild(envelopeTd);

    const nameTd = document.createElement("td");
    nameTd.innerText = note["name"];
    newRow.appendChild(nameTd);

    const descriptionTd = document.createElement("td");
    descriptionTd.innerText = note["description"];
    newRow.appendChild(descriptionTd);

    const editTd = document.createElement('td');
    editTd.innerHTML = "<a href='javascript: editNote("+index+")'><span class='glyphicon glyphicon-edit'></span></a>"
    newRow.appendChild(editTd);

    const removeTd = document.createElement('td');
    removeTd.innerHTML = "<a href='javascript: remove("+index+")'><span class='glyphicon glyphicon-remove'></span></a>"
    newRow.appendChild(removeTd);

    table.appendChild(newRow)
}

function render(){
  const items_count = document.getElementById('task-list__items-count')
  items_count.innerText = items.length.toString();

  const table = document.getElementById('tasks')
  table.innerHTML = "";
  for(let i=0; i < items.length; i++){
      addRow(table, items[i], i);
  }
}

function showModal(){
  const modal = document.getElementById('task-list__modal')
  modal.classList.remove("hidden");
}

function hideModal(){
  const modal = document.getElementById('task-list__modal')
  modal.classList.add("hidden");
}

function isValid(note){
  return note["name"].length > 0 && note["description"].length > 0
}

function add(){
  const nameField = document.getElementById('task-list__modal__name-input')
  const descriptionField = document.getElementById('task-list__modal__description-input')
  const indexField = document.getElementById('task-list__modal__index')

  const item = {name: nameField.value, description: descriptionField.value}

  if (isValid(item) ){
    if (indexField.value === ""){
      items.push(item);
    }
    else {
      items[parseInt(indexField.value)] = item
    }

    saveData();
    render();
    hideModal();
  }
  else{
    const error = document.getElementById('task-list__modal__error-message')
    error.innerText = "Please fill name and description properly"
    error.classList.remove("hidden");
  }
}

function hideError(){
  const errorMsg = document.getElementById('task-list__modal__error-message')

  errorMsg.innerText = ""
  errorMsg.classList.add("hidden");
}

function renderFormTitle(title){
  const formTitle = document.getElementById('task-list__modal__form-title')
  formTitle.innerText = title
}

function editNote(index){
  if(canEdit()){
    const nameField = document.getElementById('task-list__modal__name-input')
    const descriptionField = document.getElementById('task-list__modal__description-input')
    const indexField = document.getElementById('task-list__modal__index')

    hideError();

    if (index == null){
      indexField.value = "";
      nameField.value = "";
      descriptionField.value = "";
      renderFormTitle("New Note");
    }
    else {
      renderFormTitle("Edit Note #" + (index+1));

      const note = items[index]
      indexField.value = index;
      nameField.value = note["name"];
      descriptionField.value = note["description"];
    }
    showModal()
  }
}

function canEdit(){
  const modal = document.getElementById('task-list__modal')
  return modal.classList.contains("hidden")
}
function remove(index){
  if(canEdit()){
    items.splice(index, 1)
    saveData()
    render()
  }
}

function loadData() {
  items = JSON.parse(localStorage.getItem('notes') || "[]");
}

function saveData() {
  localStorage.setItem('notes', JSON.stringify(items));
}