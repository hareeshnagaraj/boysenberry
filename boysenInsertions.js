/*

boysenInsertions.js - content script 

-Call script to add listener to every element, which then shows CSS for that element in a fixed position element
-Capture mouse movement, and display x,y coordinates

*/
var currentElement;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
  console.log(request);
	if (request.action == "finishedParsing"){
    appendBox();
    $("body").bind("mousemove",function(event){
      var x = event.pageX;
      var y = event.screenY;
      var element = document.elementFromPoint(x,y);
      updateBox(element);
    });
	}
});


/*	Listen for the keyboard shortcut */

//’secret’ specifies the numerical keystrokes that make up the word “mario”
var secret = "667989836978";
var input = "";
var timer;

//The following function sets a timer that checks for user input. You can change the variation in how long the user has to input by changing the number in ‘setTimeout.’ In this case, it’s set for 500 milliseconds or ½ second.
$(document).keyup(function(e) {
   input += e.which;
   clearTimeout(timer);
   timer = setTimeout(function() { input = ""; }, 500);
   check_input();
});

//Once the time is up, this function is run to see if the user’s input is the same as the secret code
function check_input() {
    if(input == secret) {
      //the code used to reveal mario and the world is then put here   
      chrome.runtime.sendMessage({action: "boysen"}, function(response) {
        console.log(response.farewell);
      });
    }
    console.log(input);
}

function alertMsg() {
  console.log("somethign was clicked");
}

/*
Adds the box to our page
*/
function appendBox(){
  var box = '<div class="popupWrap"><div class="popupTitle"><div class="popupTitleInner">boysenberry</div><div id="search_icon" class="popupTitleDisplayModeToggle">toggle view</div></div><div class="popupClassDisplay"><div class="popupClassDisplayOuter">.class {</div><div class="popupClassDisplayBody">width:400px;<br>height:500px;<br>background-color: rgba(241,241,241,0.8);<br>right:20px;<br>top:20px;<br>display: none;<br>overflow-x:hidden; <br></div><div class="popupClassDisplayOuter">}</div></div></div>';
  $("body").prepend(box);
}

function updateBox(element){
  console.log(element);
}

