/*
boysenEvents.js 
-Registers click of action icon/types the word "boysen"
-Calls content script boysenInsertions.js file for insertion of other elements/javascript
*/

// Called when the user clicks on the browser action.
chrome.tabs.executeScript(null, {file: "boysenDom.js"});
	// Send message to content script when boysenDom is finished
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: "init"}, function(response) {
    console.log(response.reply);
  });
});

//Called when the user types the word boysen
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action == "boysen"){
//       console.log(request);
//       chrome.tabs.executeScript(null, {file: "boysenDom.js"});
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 		  chrome.tabs.sendMessage(tabs[0].id, {action: "init"}, function(response) {
// 		    console.log(response.reply);
// 		  });
// 	  });
//     }
// });