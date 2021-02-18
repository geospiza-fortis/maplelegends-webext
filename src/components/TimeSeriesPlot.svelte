<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import "chartjs-adapter-dayjs";
  // plot a single trend-line
  export let data;
  export let label;
  export let transform = data => data;

  // view-source:https://www.chartjs.org/samples/latest/utils.js
  let colors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };

  let plotElement;
  onMount(() => {
    new Chart(plotElement, {
      type: "line",
      data: {
        datasets: [
          {
            label: label,
            data: transform(data),
            backgroundColor: colors.blue,
            borderColor: colors.blue,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
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
