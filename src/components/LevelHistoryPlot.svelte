<script>
  import TimeSeriesPlot from "./TimeSeriesPlot.svelte";
  // Data gathered by the content script
  export let data;
</script>

<TimeSeriesPlot
  {data}
  label="Level History"
  transform={data => data.map(row => ({ x: row.Date, y: row.Level }))} />
