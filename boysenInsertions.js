/*

boysenInsertions.js - content script 

-Call script to add listener to every element, which then shows CSS for that element in a fixed position element
-Capture mouse movement, and display x,y coordinates

*/

/*
addElement is used to add the boysen div that contains the required information
*/
function addElement(){
	$(".boysenWrapper").show();
}

$("body").prepend("<div class=\"boysenWrapper\"><div id=\"boysenWrapperTitle\"><div>boysenberry</div></div></div>");

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	if (request.action == "init"){
	  addElement();
	  console.log(request);
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
};