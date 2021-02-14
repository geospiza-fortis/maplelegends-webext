<script>
  let username;
</script>

<style>
  .content {
    padding: 0 4em;
    text-align: center;
    margin: auto;
  }
</style>

<div class="content">
  <label>
    Username:
    <input bind:value={username} />
  </label>
  {#if username}
    <div class="row">
      <div class="col-md-offset-3 col-md-3 text-center">
        <a
          href={`https://gtop100.com/topsites/MapleStory/sitedetails/MapleLegends-The-Old-School-MapleStory-Server-MAC-Compatible-16-9-Client-No-Hackers-87398?vote=1&pingUsername=${username}`}>
          <img
            src="https://maplelegends.com/static/images/vote_button/red/default.png"
            alt="Vote on GTOP" />
        </a>
      </div>
      <div class="col-md-3 text-center">
        <a
          href={`https://topg.org/maplestory-private-servers/in-605064-${username}`}>
          <img
            src="https://maplelegends.com/static/images/vote_button/blue/default.png"
            alt="Vote on GTOP" />
        </a>
      </div>
    </div>
  {/if}
</div>
