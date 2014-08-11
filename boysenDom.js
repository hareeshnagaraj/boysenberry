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
  var elementFromID = document.getElementById(currentElement.id);
  if(elementFromID === null){
    return;
  }
  if(numChildren > 3){
    elementFromID.className += " boysenRed";
  }
  else if(numChildren > 2){
    elementFromID.className += " boysenBlue";
  }
  else if(numChildren > 0){
    elementFromID.className += " boysenPurple";
  }
}


function removeGif(){
  $(".gifBox").remove();
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
      element.id = "boysen"+i;
    }
    if(document.getElementById(element.id) !== null){
      addBorderToElement(all[i]);
    }
  }
  chrome.runtime.sendMessage({status: 'finishedParsing'});
  console.log("finished");
}

/*
Function to remove added classes
Catch a typeerror
*/
function removeClasses(selected){
    try{
      selected.className = selected.className.replace("boysenBlue" , '' );
      selected.className = selected.className.replace("boysenPurple" , '' );
      selected.className = selected.className.replace("boysenRed" , '' );
      selected.className = selected.className.replace("hoverEffect" , '' );
    }
    catch(e){
      // console.log(e);
    }
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
  
  $('.popupWrap').addClass("bounceOutDown animated");
  setTimeout(function(){
    $(".popupWrap").hide();
  }, 3000);
}

//Unbind mouse
function unbindMouse(){
  $("body").unbind("mousemove");
}

//add a loading display
function showLoader(){
  $("body").prepend('<div class="gifBox"></div>');
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