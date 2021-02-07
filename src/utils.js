import { zip } from "lodash";
import dayjs from "dayjs";

function parseLevelsTable(content) {
  let formatters = [
    parseInt,
    (text) => dayjs(text).toISOString(),
    (text) => text,
  ];
  let rows = [...content.querySelectorAll("tr")];
  let header = [...rows[0].querySelectorAll("th")].map((cell) =>
    cell.innerText.trim()
  );
  let data = rows.slice(1);

  let results = [];
  for (let row of data) {
    let parsed = [...row.querySelectorAll("td")].map((cell, i) =>
      formatters[i](cell.innerText.trim())
    );
    let obj = Object.fromEntries(zip(header, parsed));
    results.push(obj);
  }
  return results;
}

export { parseLevelsTable };
