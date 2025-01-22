import { e as escape_html } from "./escaping.js";
import "clsx";
import { b as base } from "./paths.js";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
const posts = [
  {
    id: 1,
    thumbnail: `${base}/thumbnails/covid-downturn-thumbnail.png`,
    date: "JANUARY 2025",
    client: "",
    title: "After Crisis: How Are Industries Post-Covid?",
    summary: "Explore the performance of industries in Indonesia post-Covid through trends and arrow charts.",
    link: `${base}/covid-downturn-recovery`,
    author: "Nur Adhyaksa Hamid"
  }
];
export {
  attr as a,
  posts as p
};
