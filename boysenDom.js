/*
Test of altering dom via a function

boysenDom.js
-Changes all elements of a dom
	Add borders to all elements

*/
//Values for border
var red = "1px solid red";

//Looping through entire DOM 
var all = document.getElementsByTagName("*");

for (var i=0, max=all.length; i < max; i++) {
     // Do something with the element here
     console.log("el" + all[i]);
     var currentElement = all[i];
     currentElement.style.border = red;
}