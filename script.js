var list = [];
let index = 0;
let tagsList = document.querySelector(".tags-list");
var modal = document.getElementById("editModal");
var span = document.getElementsByClassName("close")[0];

//function ran when page loads
//https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_webstorage_local
function Init(){
  if (typeof(Storage) !== "undefined") {
    list = JSON.parse(localStorage.getItem('tags'))
    ShowTags();
  } else {
      window.alert("Sorry, your browser does not support Web Storage...");
  }
}

//get index of the element to be deleted
function GetIndex(element){
  var allElements = document.getElementsByTagName('li');;
  for (i = 0; i < allElements.length; i++) {
    if (allElements[i].contains(element)) break;
  }
  return i
}

//delete tag
function Delete(currentEl){
  list.splice(GetIndex(currentEl), 1);
  currentEl.parentNode.parentNode.removeChild(currentEl.parentNode);
  localStorage.setItem('tags', JSON.stringify(list));
}

//parses input into a valid list of new tags
function DealWithInput(id) {
  input = document.getElementById(id).value
  //split input by , ; and newline
  inputAsList = input.split(/[,;\n]+/)
  //filter out non numeric values
  var validInput = inputAsList.filter(function(el) {
    return !isNaN(parseFloat(el)) && isFinite(el);
  });
  return validInput
}

//displays current tags
function ShowTags() {
  let tags = "";
  index = 0;
  for (tag of list) {
    if (parseFloat(tag) >= 0) {
      tags += "<li class=\"red\">" + tag + "<button onclick=\"Delete(this);\">X</button> </li>";
    } else {
      tags += "<li class=\"blue\">" + tag + "<button onclick=\"Delete(this);\">X</button> </li>";
    }
    index += 1
  }
  tagsList.innerHTML = tags;
}

//add new tags
function Add() {
  //deal with input
  list.push.apply(list, DealWithInput("tags"))
  //display 
  ShowTags()
  document.getElementById("tags").value = ""
  localStorage.setItem('tags', JSON.stringify(list));
}

//function which returns the string of tag values which can be edited
function GetEditList() {
  output = ""
  list.forEach(function (item) {
    output += item + ","
  });
  //return without last comma
  return output.slice(0, -1) 
}

//function to save changes made in edit box
function Save() {
  var input = document.getElementById("edit-tags").value
  list.length = 0
  list.push.apply(list, DealWithInput("edit-tags"))
  modal.style.display = "none";
  //remove previous tags
  document.getElementById('tags-list').innerHTML = '';
  //load in edited state
  ShowTags()
  localStorage.setItem('tags', JSON.stringify(list));
}

//function which opens editing area
function Edit() {
  /*https://www.w3schools.com/howto/howto_css_modals.asp*/
  modal.style.display = "block";
  //exit from modal window
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  //set text in edit textarea
  document.getElementById("edit-tags").value = GetEditList()
}