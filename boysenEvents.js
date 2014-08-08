/*
boysenEvents.js 
-Registers click of action icon
-Calls content script file for insertion of other elements/javascript
*/

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  window.alert('Welcome to Boysen');
});