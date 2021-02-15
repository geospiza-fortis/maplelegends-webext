// Add history to local indexeddb about voting history
function parseGtop(location) {
  let result = location.match("pingUsername=(.*)&?");
  return result ? result[1] : null;
}

function parseTopg(location) {
  let result = location.match("605064-(.*)");
  return result ? result[1] : null;
}

async function injectHistory() {
  let data;
  let url = window.location.href;
  if (url.includes("gtop100")) {
    data = {
      site: "gtop100",
      username: parseGtop(url),
    };
  }
  if (url.includes("topg")) {
    data = {
      site: "topg",
      username: parseTopg(url),
    };
  }
  data["timestamp"] = new Date().toISOString();
  let votes =
    (await chrome.storage.local.get("voting-history"))["voting-history"] || [];
  votes.push(data);
  await chrome.storage.local.set({ "voting-history": votes });
}

(async () => {
  injectHistory();
})();
