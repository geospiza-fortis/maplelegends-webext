<script>
  import { onMount } from "svelte";
  import Table from "./Table.svelte";

  let username;
  let votes;

  const choices = ["heart", "cheers", "kiss", "sparkly"];
  let red_choice = "default";
  let blue_choice = "default";
  function randomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  onMount(async () => {
    votes =
      (await chrome.storage.local.get("voting-history"))["voting-history"] ||
      [];
  });
</script>

<style>
  .content {
    padding: 0 4em;
    margin: 0 auto;
  }
  :global(table) {
    margin: 0 auto;
  }
  :global(th, td) {
    padding: 5px;
  }
</style>

<div class="content">
  {#if votes && votes.length > 0}
    <h3>Voting History</h3>
    <p>
      <b>Note:</b>
      This is the time the site was last visited, and does not necessarily mean
      that the vote went through. Check your account details to confirm your
      vote.
    </p>
    <Table data={votes} paginationSize={5} />
    <br />
  {/if}
  <div style="text-align:center">
    <label>
      Username:
      <input bind:value={username} />
    </label>
  </div>
  {#if username}
    <div class="row">
      <div class="col-md-offset-3 col-md-3 text-center">
        <a
          href="https://gtop100.com/topsites/MapleStory/sitedetails/MapleLegends-The-Old-School-MapleStory-Server-MAC-Compatible-16-9-Client-No-Hackers-87398?vote=1&pingUsername={username}">
          <img
            on:mouseover={() => (red_choice = randomChoice())}
            on:mouseout={() => (red_choice = 'default')}
            src="https://maplelegends.com/static/images/vote_button/red/{red_choice}.png"
            alt="Vote on GTOP" />
        </a>
      </div>
      <div class="col-md-3 text-center">
        <a
          href="https://topg.org/maplestory-private-servers/in-605064-{username}">
          <img
            on:mouseover={() => (blue_choice = randomChoice())}
            on:mouseout={() => (blue_choice = 'default')}
            src="https://maplelegends.com/static/images/vote_button/blue/{blue_choice}.png"
            alt="Vote on GTOP" />
        </a>
      </div>
    </div>
  {/if}
</div>
