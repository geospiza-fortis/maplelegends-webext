// Without this background script, there are issues when trying to insert the
// plot on navigation.
// https://stackoverflow.com/a/21071357
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  chrome.tabs.executeScript(null, { file: "content-bundle.js" });
});
