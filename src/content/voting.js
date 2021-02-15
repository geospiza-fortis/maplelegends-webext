import VoteHistory from "../components/VoteHistory.svelte";

const INJECT_ID = "vote-history";

function injectVote() {
  let ref = document.querySelector(".panel-body");

  let loggedIn = document.querySelector("#loginform") == null;

  if (!loggedIn) {
    // remove text about logging in
    let logText = document.querySelector("p.text-center");
    if (logText && logText.textContent.includes("logged in to vote")) {
      logText.previousSibling.remove();
      logText.remove();
    }
  }

  let div = document.getElementById(INJECT_ID);
  if (div) {
    div.remove();
  }

  div = document.createElement("div");
  div.setAttribute("id", INJECT_ID);
  new VoteHistory({ target: div, props: { loggedIn: loggedIn } });
  ref.parentNode.insertBefore(div, ref);
}

injectVote();
