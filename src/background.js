// Without this background script, there are issues when trying to insert the
// plot on navigation.
// https://stackoverflow.com/a/21071357
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (details.url.includes("maplelegends.com/levels?name")) {
    chrome.tabs.executeScript(null, { file: "content/leveling.js" });
  }
  if (details.url.includes("maplelegends.com/vote")) {
    chrome.tabs.executeScript(null, { file: "content/voting.js" });
    chrome.tabs.insertCSS(null, { file: "content/voting.css" });
  }
});
