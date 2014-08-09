/*
Test of altering dom via a function

boysenDom.js
-Changes all elements of a dom
	Add borders to all elements

TODO 
Fix alignment issues in certain websites, arises when adding border of 1 px
Remove borders

*/

//parseDom used to parse the entire DOM and add the appropriate borders

function parseDom(){
	console.log("parseDom");
	var all = document.getElementsByTagName("*");
	this.red = "1px solid red";
	this.blue = "1px solid blue";
	this.purple = "1px solid purple";
	for (var i=0, max=all.length; i < max; i++) {
	     // Do something with the element here
	     var currentElement = all[i];
	     var currentId = currentElement.id;
	     if(!currentId){
	     	currentId = "boysenID"+i;
	     }
	     console.log(currentElement);
	     console.log(currentId);
	     //Adding the hover listener

	     var numChildren = currentElement.childNodes.length;
	     
	     if(numChildren > 3){
	     	currentElement.style.border = this.red;
	     }
	     else if(numChildren > 2){
	     	currentElement.style.border = this.blue;
	     }
	     else if(numChildren > 0){
	     	currentElement.style.border = this.purple;
	     }
	}
}

parseDom();

