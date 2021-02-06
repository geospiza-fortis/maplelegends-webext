<script>
  import { onMount } from "svelte";

  let loggedin = false;
  let accountDetails;
  let characters;

  function parseAccountCharacters(content) {
    return [...content.querySelectorAll(".spa")]
      .filter(node => node.innerText)
      .map(node => node.innerText);
  }

  onMount(async () => {
    let resp = await fetch("https://maplelegends.com/my/account");
    let html = await resp.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    loggedin = doc.querySelector("#loginform") == null;
    accountDetails = doc.querySelector("#page-content");
    if (loggedin && accountDetails) {
      characters = parseAccountCharacters(accountDetails);
    }
  });
</script>

<main>
  <a href="https://maplelegends.com">Go to MapleLegends</a>
  {#if loggedin}
    {#if characters}
      <h2>Character List</h2>
      <ul>
        {#each characters as char}
          <li>{char}</li>
        {/each}
      </ul>
    {/if}
    {@html accountDetails.innerHTML}
  {:else}
    <p>Not logged in.</p>
  {/if}
</main>
