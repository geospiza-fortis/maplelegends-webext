<script>
  import TimeSeriesPlot from "./TimeSeriesPlot.svelte";
  // Data gathered by the content script
  export let data;
</script>

<div class="col-md-offset-1 col-md-10">
  <TimeSeriesPlot
    {data}
    label="Level History"
    transform={data => data.map(row => ({ x: row.Date, y: row.Level }))} />
</div>
