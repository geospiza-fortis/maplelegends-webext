import VoteHistory from "../components/VoteHistory.svelte";

const INJECT_ID = "vote-history";

function injectVote() {
  if (document.getElementById(INJECT_ID)) {
    return;
  }
  let ref = document.querySelector(".panel-body");
  let div = document.createElement("div");
  div.setAttribute("id", INJECT_ID);
  new VoteHistory({ target: div });
  ref.parentNode.insertBefore(div, ref);
}

injectVote();