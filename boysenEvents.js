/*
boysenEvents.js 
-Registers click of action icon/types the word "boysen"
-Calls content script boysenInsertions.js file for insertion of other elements/javascript
*/

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    console.log("browser action");
    chrome.tabs.executeScript(null, {file: "boysenDom.js"});
});

$(document).ready(function(){
  $("#search_icon").click(function(){
    
  });
});

//Called when the user types the word boysen, as well as when DOM is done parsing
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "boysen"){
      chrome.tabs.executeScript(null, {file: "boysenDom.js"});
      
    }
    if(request.status == "finishedParsing"){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "finishedParsing"}, function(response) {
          console.log(response.reply);
        });
      });
    }
});