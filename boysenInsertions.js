/*

boysenInsertions.js
-Call script to add listener to every element, which then shows CSS for that element in a fixed position element
-Capture mouse movement, and display x,y coordinates

*/
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

	if (request.action == "init"){
	  sendResponse({reply: "goodbye"});
	  console.log(request);
	}
});