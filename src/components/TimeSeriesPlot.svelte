<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import "chartjs-adapter-dayjs";
  // plot a single trend-line
  export let data;
  export let label;
  export let transform = data => data;

  let plotElement;
  onMount(() => {
    new Chart(plotElement, {
      type: "line",
      data: {
        datasets: [
          {
            label: label,
            data: transform(data),
            backgroundColor: "rgba(0,0,255,0.5)",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{ type: "time" }]
        }
      }
    });
  });
</script>

<div>
  <canvas bind:this={plotElement} />
</div>
