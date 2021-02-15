<script>
  import { onMount } from "svelte";
  import Table from "./Table.svelte";
  import { storageGet } from "../utils.js";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import localizedFormat from "dayjs/plugin/localizedFormat";
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  export let loggedIn = false;
  let username;
  let votes;

  const columns = [
    {
      name: "username",
      format: row => (loggedIn ? row.username : `<a>${row.username}</a>`),
      onClick: row => {
        username = row.username;
      },
      html: true
    },
    { name: "site", format: row => row.site },
    {
      name: "last visited (localtime)",
      format: row => dayjs(row.timestamp).format("LLL")
    },
    { name: "relative", format: row => dayjs(row.timestamp).fromNow() }
  ];

  const choices = ["heart", "cheers", "kiss", "sparkly"];
  let red_choice = "default";
  let blue_choice = "default";
  function randomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  onMount(async () => {
    votes = (await storageGet("voting-history")) || [];
    console.log(votes);
    if (votes.length > 0) {
      username = votes[votes.length - 1].username;
    }
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
  {#if !loggedIn}
    <h3>Vote for an account</h3>
    <p>
      Enter a valid account name or click on a username in the Voting History to
      continue.
    </p>
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
  {/if}
  {#if votes}
    <h3>Voting History</h3>
    <p>
      <b>Note:</b>
      This is the time the site was last visited, and does not necessarily mean
      that the vote went through. Check your
      <a href="https://maplelegends.com/my/account">account details</a>
      to confirm your vote.
    </p>
    {#if votes.length > 0}
      <Table data={votes} {columns} paginationSize={5} />
    {:else}
      <p>
        <i>No votes recorded yet.</i>
      </p>
    {/if}
    <br />
  {/if}
</div>
