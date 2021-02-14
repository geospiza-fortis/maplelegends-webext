<script>
  // navbar by benweitzel translated into svelte by geospiza
  // https://gist.github.com/benweitzel/8621181
  export let routes;
</script>

<style>
  #navbar ul {
    margin: 0;
    padding: 5px;
    list-style-type: none;
    text-align: center;
    background-color: #000;
  }

  #navbar ul li {
    display: inline;
  }

  #navbar ul li a {
    text-decoration: none;
    padding: 0.2em 1em;
    color: #fff;
    background-color: #000;
  }

  #navbar ul li a:hover {
    color: #000;
    background-color: #fff;
  }
</style>

<div id="navbar">
  <ul>
    {#each routes as route}
      <li>
        <a href={route.url}>{route.name}</a>
      </li>
    {/each}
  </ul>

</div>
