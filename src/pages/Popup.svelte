<script>
  import page from "page";
  import Summary from "./Summary.svelte";
  import About from "./About.svelte";
  import Navbar from "./Navbar.svelte";

  let component = Summary;

  const routes = [
    { url: "/", name: "Home", component: Summary },
    { url: "https://maplelegends.com/vote", name: "Vote" },
    { url: "/about", name: "About", component: About }
  ];

  for (let route of routes) {
    page(route.url, () => (component = route.component));
  }
  page({ hashbang: false });
</script>

<main>
  <Navbar {routes} />
  <svelte:component this={component} />
</main>
