/*
Test of altering dom via a function

boysenDom.js
-Changes all elements of a dom
  Add borders to all elements

TODO 
Fix alignment issues in certain websites, arises when adding border of 1 px
Remove borders

*/
function checkBody(string){
  var isBody = string.indexOf("HTMLBodyElem");
  var isHTML = string.indexOf("HTMLHtmlElem");
  if(isBody == -1 && isHTML == -1){
    return true;
  }
  else{
    return false;
  }
}
//parseDom used to parse the entire DOM and add the appropriate borders


function addBorderToElement(currentElement, that){
  var currentWidth = currentElement.clientWidth;
  var currentHeight = currentElement.clientHeight;
  currentElement.style.width = currentWidth - 2;
  var numChildren = currentElement.childNodes.length;

  if(numChildren > 3){
    currentElement.style.border = that.red;
  }
  else if(numChildren > 2){
    currentElement.style.border = that.blue;
  }
  else if(numChildren > 0){
    currentElement.style.border = that.purple;
  }
}

function parseDom(){
  console.log("parseDom");
  var all = document.getElementsByTagName("*");
  this.red = "1px solid red";
  this.blue = "1px solid blue";
  this.purple = "1px solid purple";
  var max=all.length;
  for (var i=0; i < max; i++) {
    // Do something with the element here
    addBorderToElement(all[i], this);
  }

  chrome.runtime.sendMessage({status: 'finishedParsing'});
  console.log("finished");
}

parseDom();