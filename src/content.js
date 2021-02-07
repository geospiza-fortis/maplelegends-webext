import pRetry from "p-retry";
import { parseLevelsTable } from "./utils.js";
import LevelHistoryPlot from "./LevelHistoryPlot.svelte";

document.body.style.border = "10px solid purple";

const PLOT_ID = "extensionPlot";
function insertPlot() {
  // Insert a plot into a custom element
  let content = document.querySelector("#page-content");
  if (document.getElementById(PLOT_ID)) {
    return;
  }
  let tableData = parseLevelsTable(content);
  if (tableData.length == 0) {
    throw new pRetry.AbortError("missing table data");
  }
  let titleRow = document.querySelector(".page-title").parentNode;

  let plotDiv = document.createElement("div");
  plotDiv.setAttribute("id", PLOT_ID);
  new LevelHistoryPlot({ target: plotDiv, props: { data: tableData } });
  titleRow.parentNode.insertBefore(plotDiv, titleRow.nextSibling);
}

(async () => {
  console.log(await pRetry(insertPlot, { retries: 5 }));
})();
