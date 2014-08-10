/*
Test of altering dom via a function

boysenDom.js
-Changes all elements of a dom
  Add borders to all elements

TODO 
Fix alignment issues in certain websites, arises when adding border of 1 px
Remove borders

*/
var isOpen = false;

//parseDom used to parse the entire DOM and add the appropriate borders
function addBorderToElement(currentElement){
  var currentWidth = currentElement.clientWidth;
  var currentHeight = currentElement.clientHeight;
  var numChildren = currentElement.childNodes.length;
  var smallWidth = currentElement.width - 2;

  if(numChildren > 3){
      document.getElementById(currentElement.id).className += " boysenRed";
  }
  else if(numChildren > 2){
     document.getElementById(currentElement.id).className += " boysenBlue";
  }
  else if(numChildren > 0){
     document.getElementById(currentElement.id).className += " boysenPurple";
  }
  document.getElementById(currentElement.id).width = smallWidth;
}

/*
Function to add border clases appropriately
*/
function parseDom(){
  console.log("parseDom");
  var all = document.getElementsByTagName("*");
  var max=all.length;
  var elementID;
  for (var i=0; i < max; i++) {
    // Do something with the element here
    var element = all[i];
    elementID = element.id;
    if(!element.id){
      element.id = "boysen"+Math.floor((Math.random() * 10000) + 1);
    }
    if(document.getElementById(element.id) != null){
      addBorderToElement(all[i]);
    } 
  }

  chrome.runtime.sendMessage({status: 'finishedParsing'});
  console.log("finished");
}

/*
Function to remove added classes
*/
function removeClasses(selected){
  selected.className = selected.className.replace("boysenBlue" , '' );
  selected.className = selected.className.replace("boysenPurple" , '' );
  selected.className = selected.className.replace("boysenRed" , '' );
  selected.className = selected.className.replace("hoverEffect" , '' );
}

/*
Function to reset the borders and remove the box
*/
function clearDom(){
  console.log("clearDom");
  var all = document.getElementsByTagName("*");
  var max=all.length;
  var elementID;
  for (var i=0; i < max; i++) {
    // Do something with the element here
    var element = all[i];
    elementID = element.id;
    var selected = document.getElementById(elementID);
    if(selected !== null){
      removeClasses(selected);
    }
  }
  unbindMouse();
  $(".popupWrap").fadeOut().delay(500).remove();
}

//Unbind mouse
function unbindMouse(){
  $("body").unbind("mousemove");
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  console.log(request);
  if (request.action == "beginParse"){
    if(!isOpen){
      parseDom();
      isOpen = true;
    }
    else{
      clearDom();
      isOpen = false;
    }
  }
});