chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'imgur.com' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(){
    console.log("clicked");
    console.log("inserting");
    chrome.tabs.executeScript(null, {file: "main.js"}); //content scripts don't like incognito. Inserting manually.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var current = tabs[0];
      chrome.tabs.sendMessage(current.id, {command: "execute"}, function(links){
        console.log("received");
        console.log(links);
        for( var k=0; k<links.length; k++){
            chrome.tabs.create({url: links[k], active: false});
        }
        
      });
    });
});
