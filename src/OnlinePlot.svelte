<script>
  import { onMount } from "svelte";
  import TimeSeriesPlot from "./components/TimeSeriesPlot.svelte";

  let data;
  onMount(async () => {
    // fetch data
    let resp = await fetch(
      "https://storage.googleapis.com/geospiza/query/maplelegends-online-count-7-day.json"
    );
    data = await resp.json();
    console.log(data);
  });

  function transform(data) {
    return data.map(row => ({
      x: row.timestamp.replace(" ", "T").slice(0, 16),
      y: row.usercount
    }));
  }
</script>

<style>
  #plot {
    width: 400px;
  }
</style>

{#if data}
  <div id="plot">
    <TimeSeriesPlot {data} label="Online User Count" {transform} } />
  </div>
{/if}
