/*
boysenEvents.js 
-Registers click of action icon/types the word "boysen"
-Calls content script boysenInsertions.js file for insertion of other elements/javascript
*/

/*
Function to copy 
*/
function copy(tobeCopied){
    var clipboardholder= document.getElementById("clipboardholder");
    clipboardholder.style.display = "block";
    clipboardholder.value = tobeCopied;
    clipboardholder.select();
    document.execCommand("Copy");
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "beginParse"}, function(response) {
      });
    });
});

//Called when the user types the word boysen, as well as when DOM is done parsing
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "boysen"){
      chrome.tabs.executeScript(null, {file: "boysenDom.js"});
    }
    if( request.action == "copy"){
      console.log("tobeCopied : " + request.string);
      copy(request.string);
    }
    if(request.status == "finishedParsing"){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "finishedParsing"}, function(response) {
        });
      });
    }
});

//keyboard shortcuts
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(command == "show_details"){
      chrome.tabs.sendMessage(tabs[0].id, {action: "beginParse"}, function(response) {
      });
    }
    if(command == "copy"){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "beginCopy"}, function(response) {
        });
      });
    }
  });
});