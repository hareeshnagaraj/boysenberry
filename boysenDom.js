/*
Test of altering dom via a function

boysenDom.js
-Changes all elements of a dom
	Add borders to all elements

*/
//Values for border
var red = "1px solid red";
var blue = "1px solid blue";
var purple = "1px solid purple";

//Looping through entire DOM 
var all = document.getElementsByTagName("*");

for (var i=0, max=all.length; i < max; i++) {
     // Do something with the element here
     console.log("el" + all[i]);
     var currentElement = all[i];
     var numChildren = currentElement.childNodes.length;
     
     if(numChildren > 3){
     	currentElement.style.border = red;
     }
     else if(numChildren > 2){
     	currentElement.style.border = blue;
     }
     else if(numChildren > 0){
     	currentElement.style.border = purple;
     }
}