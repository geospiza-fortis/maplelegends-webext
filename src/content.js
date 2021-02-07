import pRetry from "p-retry";
import { parseLevelsTable } from "./utils.js";
import LevelHistoryPlot from "./components/LevelHistoryPlot.svelte";

const PLOT_ID = "extensionPlot";
function insertPlot() {
  // Insert a plot into a custom element
  if (document.getElementById(PLOT_ID)) {
    return;
  }
  let content = document.querySelector("#page-content");
  let tableData = parseLevelsTable(content);
  if (tableData.length == 0) {
    throw new pRetry.AbortError("missing table data");
  }

  let titleRow = document.querySelector(".page-title").parentNode;
  let plotDiv = document.createElement("div");
  plotDiv.setAttribute("id", PLOT_ID);
  plotDiv.setAttribute("class", "row");
  new LevelHistoryPlot({ target: plotDiv, props: { data: tableData } });
  titleRow.parentNode.insertBefore(plotDiv, titleRow.nextSibling);
}

(async () => {
  console.log(await pRetry(insertPlot, { retries: 10 }));
})();
