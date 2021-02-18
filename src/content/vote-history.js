import { storageGet, storageSet } from "../utils.js";

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
  } else if (url.includes("topg")) {
    data = {
      site: "topg",
      username: parseTopg(url),
    };
  } else {
    // clear the last vote attempt whenever we navigate to a different page
    await storageSet({ "last-vote-attempt": null });
  }

  // kind of a gross heuristic, but we'll wait until we go from a page with a
  // valid login name to a page without a login name as a signal of a successful
  // vote.
  let attempt = await storageGet("last-vote-attempt");
  if (attempt && !data.username) {
    // drop the current data for the page and use the "last" attempt instead
    attempt["timestamp"] = new Date().toISOString();
    let votes = (await storageGet("voting-history")) || [];
    votes.push(attempt);
    await storageSet({
      // Make sure to filter rows where the username is null. It's possible that
      // this could lead to subtle bugs where the extension isn't recording
      // votes at all.
      "voting-history": votes.filter((row) => row.username),
      "last-vote-attempt": null,
    });
  } else {
    await storageSet({ "last-vote-attempt": data });
  }
}

(async () => {
  injectHistory();
})();
