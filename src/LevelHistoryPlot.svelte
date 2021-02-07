<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import "chartjs-adapter-dayjs";
  export let data;
  let plotElement;
  onMount(() => {
    new Chart(plotElement, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Level History",
            data: data.map(row => ({ x: row.Date, y: row.Level })),
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
