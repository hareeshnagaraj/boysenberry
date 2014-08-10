/*jshint multistr:true*/
/*

boysenInsertions.js - content script 

-Call script to add listener to every element, which then shows CSS for that element in a fixed position element
-Capture mouse movement, and display x,y coordinates

*/
var currentElement = "";
var currentDetailedCSS = "";
var currentShortCSS = "";
var basicCSS = ["background-color","color","font-family","font-size","font-style","height","letter-spacing","margin","opacity","overflow-x","overflow-y","text-decoration","width"];
var popupElements = ["popupWrap","popupTitle","popupTitleInner","popupClassDisplay","popupClassDisplayOuter","popupTitleDisplayModeToggle","popupClassDisplayBody","popupWrap ui-draggable ui-draggable-handle"];
var details = 0;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
  console.log(request);
	if (request.action == "finishedParsing"){
    appendBox();
    bindMouse();
	}
  if( request.action == "message"){
    var message = request.message;
    console.log(message);
  }
  if(request.action == "toggleDetails"){
  }
});

//Binding the mouse
function bindMouse(){
  $("body").bind("mousemove",function(event){
    $( "*" ).removeClass( "hoverEffect" );
    var offset = $(document).scrollTop();
    var x = event.pageX;
    var y = event.pageY - offset;
    console.log(y);
    var element = document.elementFromPoint(x,y);
    var found = $.inArray(element.className, popupElements) > -1;
    if(!found){
      updateBox(element);
      $(element).addClass("hoverEffect");
    }
  });
}

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
To toggle the dragging of the element
*/
function toggleDrag(){

}

/*
Adds the box to our page
*/
function appendBox(){
  var box = '<div class="popupWrap"> \
              <div class="popupTitle"> \
                <div class="popupTitleInner"> \
                  boysenberry \
                </div> \
                <div id="show_details" class="popupTitleDisplayModeToggle"> \
                  (show details) \
                </div> \
                <div id="search_icon" class="popupTitleDisplayModeToggle"> \
                  (toggle view) \
                </div> \
              </div> \
              <div class="popupClassDisplay"> \
                <div id="boxClassName" class="popupClassDisplayOuter"> \
                  .class { \
                </div> \
                <div id="boxClassBody" class="popupClassDisplayBody"> \
                  width:400px;<br>height:500px;<br>background-color: rgba(241,241,241,0.8);<br>right:20px;<br>top:20px;<br>display: none;<br>overflow-x:hidden; <br> \
                </div> \
                <div class="popupClassDisplayOuter"> \
                  } \
                </div> \
              </div> \
            </div>';
  if(!$(".popupWrap").length){
    $("body").prepend(box);
    $(".popupWrap").draggable({handle:".popupTitle"});

    $("#show_details").click(function(){
      if(details === 0){
        details = 1;
        $("#show_details").html("(hide details)");
        $("#boxClassBody").html(currentDetailedCSS);
      }else{
        details = 0;
        $("#show_details").html("(show details)");
        $("#boxClassBody").html(currentShortCSS);
      }
    });
  }
}
function stripClassName(string){
  string = string.replace("boysenBlue","");
  string = string.replace("boysenRed","");
  string = string.replace("boysenPurple","");
  return string;
}
/*
Updates the box according to which element we are hovering over
*/
function updateBox(element){
  if(element){
    var elementID;
    if(!element.id){
      element.id = "boysen"+Math.floor((Math.random() * 10000) + 1);
    }
    elementID = element.id;
    var accessID = "#"+elementID;
    if($(accessID) !== null){
      var className = stripClassName($(accessID).attr('class'));
      var classCSS = $(accessID).getStyleObject();
      currentShortCSS = grabStyle(classCSS);
      if(!className){
        className = "anonymous_class";
      }
      var classString = "."+className+" {";
      if(className != currentElement){
        $("#boxClassName").html(classString);
        currentElement = className;
      }
      if(details === 0){
        $("#boxClassBody").html(currentShortCSS);
      }
      else{
        $("#boxClassBody").html(currentDetailedCSS);
      }
    }
    signalCopy();
  }
}

function grabStyle(styleObject){
  currentDetailedCSS = "";
  var string = "";
  for (var key in styleObject) {
    var val = styleObject[key];
    var found = $.inArray(key, basicCSS) > -1;
    if(found){
      string += key + ":" + val + "<br>";
    }
    currentDetailedCSS += key + ":" + val + "<br>";
  }
  var marginString = "margin:"+styleObject["margin-top"] + " " + styleObject["margin-right"] + " " + styleObject["margin-bottom"] + " " + styleObject["margin-left"];
  var paddingString = "padding:"+styleObject["padding-top"] + " " + styleObject["padding-right"] + " " + styleObject["padding-bottom"] + " " + styleObject["padding-left"];
  string += marginString+"<br>";
  string += paddingString;
  return string;
}

function signalCopy(){
   chrome.runtime.sendMessage({action: "copy"}, function(response) {
      console.log(response.farewell);
    });
}

/*
 * getStyleObject Plugin for jQuery JavaScript Library
 * From: http://upshots.org/?p=112
 *
 * Copyright: Unknown, see source link
 * Plugin version by Dakota Schneider (http://hackthetruth.org)
 */

(function($){
    $.fn.getStyleObject = function(){
        var dom = this.get(0);
        var style;
        var returns = {};
        if(window.getComputedStyle){
            var camelize = function(a,b){
                return b.toUpperCase();
            };
            style = window.getComputedStyle(dom, null);
            for(var i=0;i<style.length;i++){
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[prop] = val;
            }
            return returns;
        }
        if(dom.currentStyle){
            style = dom.currentStyle;
            for(var prop in style){
                returns[prop] = style[prop];
            }
            return returns;
        }
        return this.css();
    };
})(jQuery);
