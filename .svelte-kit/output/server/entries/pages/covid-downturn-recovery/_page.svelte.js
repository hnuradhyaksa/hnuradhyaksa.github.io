import "clsx";
import { f as bind_props, c as pop, p as push, d as stringify, e as ensure_array_like } from "../../../chunks/index.js";
import { p as posts, a as attr } from "../../../chunks/post.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import { b as base } from "../../../chunks/paths.js";
import "d3";
function Post_header($$payload, $$props) {
  push();
  let postId = $$props["postId"];
  let post = posts.find((p) => p.id === postId);
  if (post) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<header class="svelte-z99cyx"><h1 class="post-title svelte-z99cyx">${escape_html(post.title)}</h1> <p class="post-author svelte-z99cyx"><span>By ${escape_html(post.author)}</span></p> <p class="post-date svelte-z99cyx"><span>${escape_html(post.date)}</span></p></header>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p>Post not found.</p>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { postId });
  pop();
}
function Back2home($$payload) {
  $$payload.out += `<a${attr("href", `${stringify(base)}/`)} class="back-to-home svelte-1q2qjn0">←</a>`;
}
function Arrow_chart($$payload, $$props) {
  push();
  $$payload.out += `<svg></svg>`;
  pop();
}
const data = [
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2014,
    "value": 162876.9,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2015,
    "value": 179648.5,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2016,
    "value": 194501.6,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2017,
    "value": 197484.1,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2018,
    "value": 196218.1,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2019,
    "value": 201253.2,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2020,
    "value": 208185.7,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2021,
    "value": 212575.2,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2022,
    "value": 226795.8,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertanian, Peternakan, Perburuan dan Jasa Pertanian",
    "year": 2023,
    "value": 244226.32,
    "sector_eng": "Agriculture, Livestock & Hunting",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2014,
    "value": 8262.69,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2015,
    "value": 9203.53,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2016,
    "value": 9008.92,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2017,
    "value": 9977.31,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2018,
    "value": 9814.43,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2019,
    "value": 10618.23,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2020,
    "value": 10189.31,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2021,
    "value": 11291.91,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2022,
    "value": 12241.08,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Kehutanan dan Penebangan Kayu",
    "year": 2023,
    "value": 14288.11,
    "sector_eng": "Forestry & Logging",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2014,
    "value": 37474.08,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2015,
    "value": 42090.41,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2016,
    "value": 45943.11,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2017,
    "value": 50993.06,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2018,
    "value": 53230.54,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2019,
    "value": 54524.45,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2020,
    "value": 54871.13,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2021,
    "value": 57915.58,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2022,
    "value": 64392.8,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perikanan",
    "year": 2023,
    "value": 67471.33,
    "sector_eng": "Fisheries",
    "parent_sector_eng": "Agriculture, Forestry & Fisheries",
    "parent_sector_order": 2,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2014,
    "value": 54741.65,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2015,
    "value": 40428.9,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2016,
    "value": 41779.35,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2017,
    "value": 50540.11,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2018,
    "value": 61158.27,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2019,
    "value": 59529.9,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2020,
    "value": 46957,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2021,
    "value": 62586.65,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2022,
    "value": 81148.13,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Minyak, Gas dan Panas Bumi",
    "year": 2023,
    "value": 69817.71,
    "sector_eng": "Geothermal, Oil & Gas Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2014,
    "value": 630.76,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2015,
    "value": 518.14,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2016,
    "value": 529.33,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2017,
    "value": 557.26,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2018,
    "value": 526.71,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2019,
    "value": 543.55,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2020,
    "value": 548.53,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2021,
    "value": 564.47,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2022,
    "value": 664.25,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan Bijih Logam",
    "year": 2023,
    "value": 794.14,
    "sector_eng": "Metal Ore Mining",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2014,
    "value": 23162.71,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2015,
    "value": 25579.18,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2016,
    "value": 27591.59,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2017,
    "value": 29748.81,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2018,
    "value": 32515.95,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2019,
    "value": 33818.79,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2020,
    "value": 34013.7,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2021,
    "value": 34711.23,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2022,
    "value": 37510.16,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pertambangan dan Penggalian Lainnya",
    "year": 2023,
    "value": 40641.53,
    "sector_eng": "Other Mining & Quarrying",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2014,
    "value": 909.93,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2015,
    "value": 915.68,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2016,
    "value": 909.25,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2017,
    "value": 1054.15,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2018,
    "value": 1150.64,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2019,
    "value": 1183.17,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2020,
    "value": 1145.62,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2021,
    "value": 1113.86,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2022,
    "value": 1189.12,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Batubara dan Pengilangan Migas",
    "year": 2023,
    "value": 1284.33,
    "sector_eng": "Coal & Oil Refining Industry",
    "parent_sector_eng": "Mining & Quarrying",
    "parent_sector_order": 6,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2014,
    "value": 122086.8,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2015,
    "value": 142809.6,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2016,
    "value": 163287.1,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2017,
    "value": 185800.4,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2018,
    "value": 214642,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2019,
    "value": 248615,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2020,
    "value": 263043.2,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2021,
    "value": 290545.1,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2022,
    "value": 325293.8,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Makanan dan Minuman",
    "year": 2023,
    "value": 362368.14,
    "sector_eng": "Food & Beverage Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2014,
    "value": 115692.6,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2015,
    "value": 129880.2,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2016,
    "value": 145180.4,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2017,
    "value": 156032,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2018,
    "value": 175743.3,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2019,
    "value": 194532.1,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2020,
    "value": 182205.1,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2021,
    "value": 186081.1,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2022,
    "value": 197825.8,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengolahan Tembakau",
    "year": 2023,
    "value": 205446.11,
    "sector_eng": "Tobacco Processing",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2014,
    "value": 7007.86,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2015,
    "value": 7542.23,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2016,
    "value": 8338.62,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2017,
    "value": 8764.31,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2018,
    "value": 9822.99,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2019,
    "value": 10987.41,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2020,
    "value": 11262.49,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2021,
    "value": 12036.92,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2022,
    "value": 12970.23,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Tekstil dan Pakaian Jadi",
    "year": 2023,
    "value": 13577.11,
    "sector_eng": "Textile & Apparel Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2014,
    "value": 6116.66,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2015,
    "value": 6610.51,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2016,
    "value": 7208.34,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2017,
    "value": 8471.81,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2018,
    "value": 9500.45,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2019,
    "value": 9148.22,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2020,
    "value": 8241.93,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2021,
    "value": 8843.2,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2022,
    "value": 9976.69,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kulit, Barang dari Kulit dan Alas Kaki",
    "year": 2023,
    "value": 10669.58,
    "sector_eng": "Leather, Leather Goods & Footwear Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2014,
    "value": 28158.88,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2015,
    "value": 28834.94,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2016,
    "value": 28628.39,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2017,
    "value": 30552.46,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2018,
    "value": 31759.21,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2019,
    "value": 28811.31,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2020,
    "value": 24229.85,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2021,
    "value": 23390.61,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2022,
    "value": 25439.98,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kayu, Barang dari Kayu dan Gabus dan Barang Anyaman dari Bambu, Rotan dan Sejenisnya",
    "year": 2023,
    "value": 26487.13,
    "sector_eng": "Wood, Cork & Bamboo Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2014,
    "value": 21653.48,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2015,
    "value": 23593.12,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2016,
    "value": 25216.69,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2017,
    "value": 27444.39,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2018,
    "value": 31590.42,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2019,
    "value": 35223.53,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2020,
    "value": 35467.77,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2021,
    "value": 36963.68,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2022,
    "value": 42868.56,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kertas dan Barang dari Kertas, Percetakan dan Reproduksi Media Rekaman",
    "year": 2023,
    "value": 45985.95,
    "sector_eng": "Paper, Printing & Media Reproduction Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2014,
    "value": 39589.15,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2015,
    "value": 44564.3,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2016,
    "value": 44532.19,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2017,
    "value": 46978.04,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2018,
    "value": 47844.45,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2019,
    "value": 45987.48,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2020,
    "value": 57446.49,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2021,
    "value": 66204.31,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2022,
    "value": 80256.27,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Kimia, Farmasi dan Obat Tradisional",
    "year": 2023,
    "value": 88645.32,
    "sector_eng": "Chemical, Pharmaceutical & Traditional Medicine",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 0,
    "recovery_category": "Accelerated"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2014,
    "value": 20561.93,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2015,
    "value": 21735.34,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2016,
    "value": 21255.82,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2017,
    "value": 22233.21,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2018,
    "value": 21475.72,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2019,
    "value": 21394.37,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2020,
    "value": 19903.79,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2021,
    "value": 23100.31,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2022,
    "value": 22031.77,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Karet, Barang dari Karet dan Plastik",
    "year": 2023,
    "value": 22920.26,
    "sector_eng": "Rubber & Plastics Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2014,
    "value": 19304.78,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2015,
    "value": 20871.78,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2016,
    "value": 21031.84,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2017,
    "value": 24068.69,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2018,
    "value": 27035.09,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2019,
    "value": 27477.36,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2020,
    "value": 23485.08,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2021,
    "value": 24565.21,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2022,
    "value": 30630.63,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Barang Galian bukan Logam",
    "year": 2023,
    "value": 33390.77,
    "sector_eng": "Non-Metallic Mineral Products Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2014,
    "value": 18385.1,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2015,
    "value": 18465.22,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2016,
    "value": 19629.41,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2017,
    "value": 22604.75,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2018,
    "value": 25184.83,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2019,
    "value": 27777.84,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2020,
    "value": 27563.85,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2021,
    "value": 28604.27,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2022,
    "value": 29850.95,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Logam Dasar",
    "year": 2023,
    "value": 31365.93,
    "sector_eng": "Basic Metal Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2014,
    "value": 20887.86,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2015,
    "value": 23033.28,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2016,
    "value": 23178.24,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2017,
    "value": 23685.47,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2018,
    "value": 25020.4,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2019,
    "value": 27054.87,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2020,
    "value": 22473.77,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2021,
    "value": 22366.99,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2022,
    "value": 25364.99,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Barang dari Logam, Komputer, Barang Elektronik, Optik dan Peralatan Listrik",
    "year": 2023,
    "value": 27238.91,
    "sector_eng": "Electronics & Metals",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2014,
    "value": 995.09,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2015,
    "value": 1080.82,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2016,
    "value": 1143.08,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2017,
    "value": 1094.89,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2018,
    "value": 1146.92,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2019,
    "value": 1289.17,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2020,
    "value": 1239.99,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2021,
    "value": 1257.04,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2022,
    "value": 1415.54,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Mesin dan Perlengkapan YTDL",
    "year": 2023,
    "value": 1515.06,
    "sector_eng": "Machinery & Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2014,
    "value": 5264.84,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2015,
    "value": 5632.31,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2016,
    "value": 5820.67,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2017,
    "value": 5828.57,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2018,
    "value": 5859.18,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2019,
    "value": 5939.67,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2020,
    "value": 5011.66,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2021,
    "value": 5148.71,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2022,
    "value": 4888.92,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Alat Angkutan",
    "year": 2023,
    "value": 5284.33,
    "sector_eng": "Transportation Equipment Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2014,
    "value": 14264.34,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2015,
    "value": 15535.01,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2016,
    "value": 16252.15,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2017,
    "value": 16594.83,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2018,
    "value": 18286.67,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2019,
    "value": 20543.86,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2020,
    "value": 17928.92,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2021,
    "value": 18747.87,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2022,
    "value": 20362.9,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri Furnitur",
    "year": 2023,
    "value": 20396.05,
    "sector_eng": "Furniture Industry",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 2,
    "recovery_category": "Recovered"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2014,
    "value": 4400.44,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2015,
    "value": 4647.49,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2016,
    "value": 4824.54,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2017,
    "value": 5027.56,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2018,
    "value": 5064.59,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2019,
    "value": 5090.16,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2020,
    "value": 4613.47,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2021,
    "value": 4906.09,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2022,
    "value": 5303.6,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Industri pengolahan lainnya, jasa reparasi dan pemasangan mesin dan peralatan",
    "year": 2023,
    "value": 5308.86,
    "sector_eng": "Other Manufacturing, Repair & Installation Services",
    "parent_sector_eng": "Manufacturing Industry",
    "parent_sector_order": 5,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2014,
    "value": 1355.37,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2015,
    "value": 1517.99,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2016,
    "value": 1651.49,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2017,
    "value": 1987.43,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2018,
    "value": 2180.36,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2019,
    "value": 2359.68,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2020,
    "value": 2274.33,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2021,
    "value": 2343.11,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2022,
    "value": 2525.27,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Ketenagalistrikan",
    "year": 2023,
    "value": 2635.92,
    "sector_eng": "Electricity",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2014,
    "value": 4256.91,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2015,
    "value": 4430.49,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2016,
    "value": 4552.94,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2017,
    "value": 4687.72,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2018,
    "value": 4521.75,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2019,
    "value": 4535.34,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2020,
    "value": 4474.86,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2021,
    "value": 4914.48,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2022,
    "value": 5517.62,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Gas dan Produksi Es",
    "year": 2023,
    "value": 7720.05,
    "sector_eng": "Gas Supply & Ice Production",
    "parent_sector_eng": "Electricity & Gas Supply",
    "parent_sector_order": 3,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2014,
    "value": 1434.53,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2015,
    "value": 1573.39,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2016,
    "value": 1705.06,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2017,
    "value": 1853.13,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2018,
    "value": 1948.99,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2019,
    "value": 2015.94,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2020,
    "value": 2125.35,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2021,
    "value": 2303.05,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2022,
    "value": 2443.2,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang",
    "year": 2023,
    "value": 2542.03,
    "sector_eng": "Water Supply, Waste Management & Recycling",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2014,
    "value": 145884.6,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2015,
    "value": 160496.4,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2016,
    "value": 180549.5,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2017,
    "value": 197699,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2018,
    "value": 212519.5,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2019,
    "value": 220274.9,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2020,
    "value": 213813.2,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2021,
    "value": 222708.6,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2022,
    "value": 246876.4,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Konstruksi",
    "year": 2023,
    "value": 263491.03,
    "sector_eng": "Construction",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2014,
    "value": 77734.86,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2015,
    "value": 82312.83,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2016,
    "value": 89213.55,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2017,
    "value": 96719.58,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2018,
    "value": 104643.8,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2019,
    "value": 111703.2,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2020,
    "value": 88254.45,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2021,
    "value": 108950.7,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2022,
    "value": 129623,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Mobil, Sepeda Motor dan Reparasinya",
    "year": 2023,
    "value": 140827.29,
    "sector_eng": "Motor Vehicle & Motorcycle Trade & Repairs",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2014,
    "value": 188999.2,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2015,
    "value": 215303.4,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2016,
    "value": 242977.4,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2017,
    "value": 264180.7,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2018,
    "value": 293578.6,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2019,
    "value": 322096.7,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2020,
    "value": 323761.9,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2021,
    "value": 343733.3,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2022,
    "value": 380315.8,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Perdagangan Besar dan Eceran, Bukan Mobil dan Sepeda Motor",
    "year": 2023,
    "value": 417812.94,
    "sector_eng": "Wholesale & Retail Trade (Non-Vehicles)",
    "parent_sector_eng": "Wholesale and Retail Trade; Motor Vehicles",
    "parent_sector_order": 8,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2014,
    "value": 415.41,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2015,
    "value": 525.58,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2016,
    "value": 615.6,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2017,
    "value": 673.66,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2018,
    "value": 743.81,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2019,
    "value": 820.02,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2020,
    "value": 569.42,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2021,
    "value": 667.24,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2022,
    "value": 1127.85,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Rel",
    "year": 2023,
    "value": 1541.78,
    "sector_eng": "Rail Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2014,
    "value": 13944.32,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2015,
    "value": 15885.09,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2016,
    "value": 17878.35,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2017,
    "value": 20349.13,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2018,
    "value": 22230.98,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2019,
    "value": 24911.15,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2020,
    "value": 23949.76,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2021,
    "value": 25846.45,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2022,
    "value": 32233.94,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Darat",
    "year": 2023,
    "value": 39545.53,
    "sector_eng": "Land Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2014,
    "value": 4102,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2015,
    "value": 4625.97,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2016,
    "value": 4976.97,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2017,
    "value": 5364.57,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2018,
    "value": 5856.52,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2019,
    "value": 6333.36,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2020,
    "value": 5566.29,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2021,
    "value": 5472.83,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2022,
    "value": 6750.06,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Laut",
    "year": 2023,
    "value": 8242.4,
    "sector_eng": "Sea Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2014,
    "value": 492.1,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2015,
    "value": 542.12,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2016,
    "value": 596.09,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2017,
    "value": 636.7,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2018,
    "value": 662.24,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2019,
    "value": 722.25,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2020,
    "value": 533.26,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2021,
    "value": 444.96,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2022,
    "value": 574.34,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Sungai Danau dan Penyeberangan",
    "year": 2023,
    "value": 680.48,
    "sector_eng": "River, Lake & Ferry Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2014,
    "value": 13475.93,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2015,
    "value": 15471.46,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2016,
    "value": 17848.33,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2017,
    "value": 19203.19,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2018,
    "value": 20491.76,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2019,
    "value": 20747.7,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2020,
    "value": 11535.62,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2021,
    "value": 12415.32,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2022,
    "value": 24967.12,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Angkutan Udara",
    "year": 2023,
    "value": 33695.9,
    "sector_eng": "Air Transport",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2014,
    "value": 17570.95,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2015,
    "value": 19582.59,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2016,
    "value": 20860.04,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2017,
    "value": 22949.11,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2018,
    "value": 25174.34,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2019,
    "value": 27172.45,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2020,
    "value": 26903.96,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2021,
    "value": 26626.96,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2022,
    "value": 30861.47,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Pergudangan dan Jasa Penunjang Angkutan Pos dan Kurir",
    "year": 2023,
    "value": 35814.92,
    "sector_eng": "Warehousing & Courier Services",
    "parent_sector_eng": "Transport & Warehousing",
    "parent_sector_order": 7,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2014,
    "value": 11465.33,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2015,
    "value": 12469.28,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2016,
    "value": 13712.58,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2017,
    "value": 15223.49,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2018,
    "value": 17140.28,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2019,
    "value": 19279.2,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2020,
    "value": 12475.62,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2021,
    "value": 12856.13,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2022,
    "value": 15010.77,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Akomodasi",
    "year": 2023,
    "value": 16383.22,
    "sector_eng": "Accommodation Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 4,
    "recovery_category": "Has not recovered"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2014,
    "value": 68481.48,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2015,
    "value": 79006.98,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2016,
    "value": 91226.2,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2017,
    "value": 100834.8,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2018,
    "value": 109703.1,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2019,
    "value": 119875.6,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2020,
    "value": 115678,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2021,
    "value": 123582.4,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2022,
    "value": 139131.6,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Penyediaan Makan Minum",
    "year": 2023,
    "value": 156806.11,
    "sector_eng": "Food & Beverage Services",
    "parent_sector_eng": "Accommodation & Food Services",
    "parent_sector_order": 1,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2014,
    "value": 69883.1,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2015,
    "value": 77087.45,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2016,
    "value": 85149.76,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2017,
    "value": 92928.66,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2018,
    "value": 99216.38,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2019,
    "value": 106706.7,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2020,
    "value": 118381.6,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2021,
    "value": 128713.3,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2022,
    "value": 135659.6,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Informasi dan Komunikasi",
    "year": 2023,
    "value": 145514.15,
    "sector_eng": "Information & Communication",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2014,
    "value": 26765.52,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2015,
    "value": 30184.37,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2016,
    "value": 33212.02,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2017,
    "value": 35175.58,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2018,
    "value": 38189.77,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2019,
    "value": 40104.96,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2020,
    "value": 39839.15,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2021,
    "value": 42765.82,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2022,
    "value": 47991.65,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perantara Keuangan",
    "year": 2023,
    "value": 51179.09,
    "sector_eng": "Financial Intermediation Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2014,
    "value": 6214.31,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2015,
    "value": 7072.77,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2016,
    "value": 8024.25,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2017,
    "value": 8711.35,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2018,
    "value": 9172.8,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2019,
    "value": 9566.21,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2020,
    "value": 9903.21,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2021,
    "value": 10249.51,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2022,
    "value": 10583.09,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Asuransi dan Dana Pensiun",
    "year": 2023,
    "value": 11234.12,
    "sector_eng": "Insurance & Pension Funds",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2014,
    "value": 8134.53,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2015,
    "value": 9032.07,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2016,
    "value": 10228.49,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2017,
    "value": 11024.63,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2018,
    "value": 11868.72,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2019,
    "value": 12574.52,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2020,
    "value": 12518.96,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2021,
    "value": 12803.15,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2022,
    "value": 13844.79,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Keuangan Lainnya",
    "year": 2023,
    "value": 14473.02,
    "sector_eng": "Other Financial Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2014,
    "value": 90.44,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2015,
    "value": 99.26,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2016,
    "value": 111.18,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2017,
    "value": 121.53,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2018,
    "value": 137.55,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2019,
    "value": 149.7,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2020,
    "value": 153.79,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2021,
    "value": 160.92,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2022,
    "value": 173,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Penunjang Keuangan",
    "year": 2023,
    "value": 187.56,
    "sector_eng": "Financial Support Services",
    "parent_sector_eng": "Financial Services & Insurance",
    "parent_sector_order": 4,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2014,
    "value": 24123.31,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2015,
    "value": 27560.77,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2016,
    "value": 29907.42,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2017,
    "value": 32080.24,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2018,
    "value": 35576.47,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2019,
    "value": 38887.75,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2020,
    "value": 41103.05,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2021,
    "value": 42247.42,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2022,
    "value": 44748.26,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Real Estate",
    "year": 2023,
    "value": 46496.44,
    "sector_eng": "Real Estate",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2014,
    "value": 12177.87,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2015,
    "value": 13538.46,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2016,
    "value": 14894.07,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2017,
    "value": 16255.93,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2018,
    "value": 18150.97,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2019,
    "value": 19835.39,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2020,
    "value": 18906.26,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2021,
    "value": 19817.89,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2022,
    "value": 21396.64,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Jasa Perusahaan",
    "year": 2023,
    "value": 23816.58,
    "sector_eng": "Business Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 1,
    "recovery_category": "Recovered and grown"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2014,
    "value": 35658.5,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2015,
    "value": 39137.39,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2016,
    "value": 43157.18,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2017,
    "value": 45740.72,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2018,
    "value": 50511.18,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2019,
    "value": 55243.85,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2020,
    "value": 57424.8,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2021,
    "value": 57422.17,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2022,
    "value": 58448.68,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib",
    "year": 2023,
    "value": 60369.97,
    "sector_eng": "Public Administration, Defense & Mandatory Social Security",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2014,
    "value": 41970.8,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2015,
    "value": 46006.23,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2016,
    "value": 49544.93,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2017,
    "value": 52974.12,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2018,
    "value": 56638.08,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2019,
    "value": 61329.09,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2020,
    "value": 65028.61,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2021,
    "value": 65993.12,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2022,
    "value": 67704.93,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Pendidikan",
    "year": 2023,
    "value": 72605.58,
    "sector_eng": "Education Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2014,
    "value": 9682.65,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2015,
    "value": 10654.13,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2016,
    "value": 11527.46,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2017,
    "value": 12611.73,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2018,
    "value": 13574.42,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2019,
    "value": 14886,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2020,
    "value": 16429.79,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2021,
    "value": 17799.68,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2022,
    "value": 18875.47,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  },
  {
    "sector_idn": "Jasa Kesehatan dan Kegiatan Sosial",
    "year": 2023,
    "value": 20144.16,
    "sector_eng": "Health & Social Services",
    "parent_sector_eng": "Other",
    "parent_sector_order": 9,
    "recovery_status": 3,
    "recovery_category": "Relatively unaffected"
  }
];
function Trend_line_recovery($$payload, $$props) {
  push();
  let groupedData = Object.entries(data.reduce(
    (acc, d) => {
      acc[d.parent_sector_eng] = acc[d.parent_sector_eng] || {};
      acc[d.parent_sector_eng][d.sector_eng] = acc[d.parent_sector_eng][d.sector_eng] || [];
      acc[d.parent_sector_eng][d.sector_eng].push(d);
      return acc;
    },
    {}
  ));
  const getRecoverySymbol = (recovery_status) => {
    switch (recovery_status) {
      case 0:
        return "↑";
      case 1:
        return "↗";
      case 2:
        return "↺";
      case 3:
        return "→";
      case 4:
        return "↘";
      default:
        return "";
    }
  };
  const getRecoveryColor = (recovery_status) => {
    switch (recovery_status) {
      case 0:
        return "#1a9850";
      case 1:
        return "#67bc63";
      case 2:
        return "#f46c42";
      case 3:
        return "#a7d96b";
      case 4:
        return "#d63127";
      default:
        return "#aeaeae";
    }
  };
  const each_array = ensure_array_like(groupedData);
  $$payload.out += `<div><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let [parent, sectors] = each_array[$$index_1];
    const each_array_1 = ensure_array_like(Object.entries(sectors));
    $$payload.out += `<div class="parent-group svelte-1fgy50h"><p>${escape_html(parent)}</p></div> <div class="grid svelte-1fgy50h"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let [sector, sectorData] = each_array_1[$$index];
      $$payload.out += `<div class="sector svelte-1fgy50h"${attr("data-sector", sector)}><p>${escape_html(sector)}</p> <div class="recovery-status svelte-1fgy50h"><span${attr("style", `color: ${stringify(getRecoveryColor(sectorData[sectorData.length - 1]?.recovery_status))}`)}>${escape_html(getRecoverySymbol(sectorData[sectorData.length - 1]?.recovery_status))}  </span> <span class="value svelte-1fgy50h" style="font-weight: 500">${escape_html(sectorData[sectorData.length - 1]?.recovery_category)}</span></div> <div class="value svelte-1fgy50h"><p class="year-display">GRDP in ${escape_html(sectorData[sectorData.length - 1]?.year)}:</p> <p class="value-display">${escape_html(sectorData[sectorData.length - 1]?.value?.toLocaleString("en-US"))} Billion Rupiah</p></div> <svg${attr("data-sector", sector)} class="svelte-1fgy50h"></svg></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<article><div class="completeright">`;
  Post_header($$payload, { postId: 1 });
  $$payload.out += `<!----> <div class="body article-text-center"><p>The first case of Covid-19 in Indonesia was reported five years ago, marking a turning point in the country's economic growth trends. Many sectors experienced declines—some temporary, some sharp—while others have managed to maintain their growth or even thrive. <br class="br"> <br class="br"> The air transportation and accommodation services sectors were among the hardest <span style="color:#e74c3c; font-weight:500">hit</span> by the pandemic. Meanwhile, the pharmaceutical and medical supplies sectors saw a sharp <span style="color:#bad72e; font-weight:500">increase</span>.</p></div></div> <div class="viz"><div class="text"><div class="title">Which Industries Were Most Affected By Covid?</div> <div class="subtitle">Changes (%) in Gross Regional Domestic Product from 2019 to 2020</div></div> <div class="chart">`;
  Arrow_chart($$payload);
  $$payload.out += `<!----></div></div> <div class="completeright"><div class="body article-text-center"><h2 class="h2">Sector by sector</h2> <p>How have industries been performing three years after the first COVID case was reported?</p></div></div> <div class="viz"><div class="chart">`;
  Trend_line_recovery($$payload);
  $$payload.out += `<!----></div></div></article> <footer><hr> <p>Soruce: Badan Pusat Statistik (BPS); PDRB Atas Dasar Harga Berlaku Menurut Subsektor Lapangan Usaha Tahunan</p></footer> `;
  Back2home($$payload);
  $$payload.out += `<!---->`;
}
export {
  _page as default
};
