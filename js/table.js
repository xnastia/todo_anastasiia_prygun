var items = []

function init(){
    loadData();
    render();
}

function addRow(table, note, index){
    var newRow = document.createElement('tr');

    var idTd = document.createElement('td');
    idTd.innerText = (index+1) + ".";
    newRow.appendChild(idTd);

    var nameTd = document.createElement('td');
    nameTd.innerText = note["name"];
    newRow.appendChild(nameTd);

    var descriptionTd = document.createElement('td');
    descriptionTd.innerText = note["description"];
    newRow.appendChild(descriptionTd);

    var removeTd = document.createElement('td');
    removeTd.innerHTML = "<a href='javascript: remove("+index+")'><span class='glyphicon glyphicon-remove'></span></a>"
    newRow.appendChild(removeTd);

    table.appendChild(newRow)
}

function render(){
  items_count = document.getElementById('items-count')
  items_count.innerText = items.length.toString();
  table = document.getElementById('tasks')
  table.innerHTML = "";
  for(var i=0; i < items.length; i++){
      addRow(table, items[i], i);
  }
}

function showModal(){
  modal = document.getElementById('mymodal')
  modal.style.display = "block"
}

function hideModal(){
  modal = document.getElementById('mymodal')
  modal.style.display = "none"
}

function isValid(note){
    return note["name"].length > 0 && note["description"].length > 0
}

function add(form){
  const error = document.getElementById('error')
  error.innerText = ""
  error.style.display="none"
  const name = document.getElementById('name')
  const description = document.getElementById('description')
  item = {name: name.value, description: description.value}
  if (isValid(item) ){
    items.push(item);
    description.value = name.value = ""
    hideModal();
    saveData();
    render();
  }
  else{
    error.innerText = "Please fill name and description properly"
    error.style.display="block"
  }
}

function remove(index){
  items.splice(index, 1)
  saveData()
  render()
}

function loadData() {
  items = JSON.parse(localStorage.getItem('notes') || "[]");
}

function saveData() {
  localStorage.setItem('notes', JSON.stringify(items));
}