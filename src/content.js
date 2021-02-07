import { parseLevelsTable } from "./utils.js";

document.body.style.border = "10px solid purple";
let content = document.querySelector("#page-content");
console.log(JSON.stringify(parseLevelsTable(content)));
