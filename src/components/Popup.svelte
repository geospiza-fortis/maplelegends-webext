<script>
  import { onMount } from "svelte";
  import OnlinePlot from "./OnlinePlot.svelte";

  const BASE_URL = "https://maplelegends.com";
  let loggedin = false;
  let accountDetails;
  let serverStatus;
  let uniqueUsers;

  onMount(async () => {
    let resp = await fetch(`${BASE_URL}/my/account`);
    let html = await resp.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    serverStatus = doc.querySelector("#server_status").parentNode;
    uniqueUsers = doc.querySelector(".unique_users_tooltip");
    loggedin = doc.querySelector("#loginform") == null;
    accountDetails = doc.querySelector("#page-content");
    // replace links in account details so they point to the maplelegends base
    for (let node of accountDetails.querySelectorAll("a")) {
      // always open in a new tab
      node.target = "_blank";
      node.href = `${BASE_URL}/${node.href.split("/").reverse()[0]}`;
    }
    // also fix images, we add mapleio to the list of valid urls
    // which are coming from the api. We do something hacky here...
    for (let node of accountDetails.querySelectorAll("img")) {
      node.src = `${BASE_URL}/api/${node.src.split("/").reverse()[0]}`;
    }
  });
</script>

<main>
  <h1>
    <a href="https://maplelegends.com" target="_blank">MapleLegends</a>
  </h1>
  <h2>Server Info</h2>
  {#if serverStatus && uniqueUsers}
    Server Status:
    <b>
      {@html serverStatus.innerHTML}
    </b>
    <br />
    {@html uniqueUsers.innerHTML}
  {:else}
    <p>Waiting for response...</p>
  {/if}
  <OnlinePlot />
  {#if loggedin}
    {@html accountDetails.innerHTML}
  {:else}
    <h2>Account details</h2>
    <p>Not logged in.</p>
  {/if}
</main>
