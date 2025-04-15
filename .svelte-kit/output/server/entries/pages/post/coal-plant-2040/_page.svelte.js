import "clsx";
import { P as Post_header, B as Back2home } from "../../../../chunks/back2home.js";
import { T as noop, S as pop, X as stringify, P as push, W as ensure_array_like, Z as fallback, _ as store_get, $ as unsubscribe_stores, Y as bind_props } from "../../../../chunks/index.js";
import * as d3 from "d3";
import { a as attr } from "../../../../chunks/post.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
import { w as writable } from "../../../../chunks/index2.js";
const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
const data$2 = [
  {
    "year": 1999,
    "operating": 6690,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 6690,
    "prabowo_scenario": 6690
  },
  {
    "year": 2e3,
    "operating": 1720,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 1720,
    "prabowo_scenario": 1720
  },
  {
    "year": 2004,
    "operating": 30,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 30,
    "prabowo_scenario": 30
  },
  {
    "year": 2006,
    "operating": 1980,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 1980,
    "prabowo_scenario": 1980
  },
  {
    "year": 2007,
    "operating": 150,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 150,
    "prabowo_scenario": 150
  },
  {
    "year": 2008,
    "operating": 366.6,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 366.6,
    "prabowo_scenario": 366.6
  },
  {
    "year": 2009,
    "operating": 335,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 335,
    "prabowo_scenario": 335
  },
  {
    "year": 2010,
    "operating": 630,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 630,
    "prabowo_scenario": 630
  },
  {
    "year": 2011,
    "operating": 3770,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 3770,
    "prabowo_scenario": 3770
  },
  {
    "year": 2012,
    "operating": 3975,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 3975,
    "prabowo_scenario": 3975
  },
  {
    "year": 2013,
    "operating": 2394,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 2394,
    "prabowo_scenario": 2394
  },
  {
    "year": 2014,
    "operating": 1020,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 1020,
    "prabowo_scenario": 1020
  },
  {
    "year": 2015,
    "operating": 2336,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 2336,
    "prabowo_scenario": 2336
  },
  {
    "year": 2016,
    "operating": 1370,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 1370,
    "prabowo_scenario": 1370
  },
  {
    "year": 2017,
    "operating": 2439,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 2439,
    "prabowo_scenario": 2439
  },
  {
    "year": 2018,
    "operating": 790,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 790,
    "prabowo_scenario": 790
  },
  {
    "year": 2019,
    "operating": 4411,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 4411,
    "prabowo_scenario": 4411
  },
  {
    "year": 2020,
    "operating": 2926,
    "cancelled": 600,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 2926,
    "prabowo_scenario": 2926
  },
  {
    "year": 2021,
    "operating": 2170,
    "cancelled": 3740,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 2170,
    "prabowo_scenario": 2170
  },
  {
    "year": 2022,
    "operating": 6510,
    "cancelled": 350,
    "planned": 50,
    "plan_retire": 0,
    "net_addition": 6510,
    "prabowo_scenario": 6510
  },
  {
    "year": 2023,
    "operating": 7174,
    "cancelled": 2990,
    "planned": 300,
    "plan_retire": 0,
    "net_addition": 7174,
    "prabowo_scenario": 7174
  },
  {
    "year": 2024,
    "operating": 1902,
    "cancelled": 1780,
    "planned": 3223,
    "plan_retire": 179,
    "net_addition": 4946,
    "prabowo_scenario": 4946
  },
  {
    "year": 2025,
    "operating": 0,
    "cancelled": 1720,
    "planned": 2200,
    "plan_retire": 0,
    "net_addition": 2200,
    "prabowo_scenario": -1433.2875
  },
  {
    "year": 2026,
    "operating": 0,
    "cancelled": 6860,
    "planned": 1400,
    "plan_retire": 0,
    "net_addition": 1400,
    "prabowo_scenario": -2379.9542
  },
  {
    "year": 2027,
    "operating": 0,
    "cancelled": 3850,
    "planned": 0,
    "plan_retire": 230,
    "net_addition": -230,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2028,
    "operating": 0,
    "cancelled": 1830,
    "planned": 0,
    "plan_retire": 435,
    "net_addition": -435,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2029,
    "operating": 0,
    "cancelled": 50,
    "planned": 0,
    "plan_retire": 1971,
    "net_addition": -1971,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2030,
    "operating": 0,
    "cancelled": 1e3,
    "planned": 0,
    "plan_retire": 400,
    "net_addition": -400,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2031,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 670,
    "net_addition": -670,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2032,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 1200,
    "net_addition": -1200,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2033,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 175,
    "net_addition": -175,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2034,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 1230,
    "net_addition": -1230,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2035,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 2380,
    "net_addition": -2380,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2036,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 0,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2037,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 1050,
    "net_addition": -1050,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2038,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 0,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2039,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 30,
    "net_addition": -30,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2040,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 0,
    "net_addition": 0,
    "prabowo_scenario": -3879.9542
  },
  {
    "year": 2041,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 2280,
    "net_addition": -2280
  },
  {
    "year": 2042,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 150,
    "net_addition": -150
  },
  {
    "year": 2043,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 366.6,
    "net_addition": -366.6
  },
  {
    "year": 2044,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 435,
    "net_addition": -435
  },
  {
    "year": 2045,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 630,
    "net_addition": -630
  },
  {
    "year": 2046,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 3770,
    "net_addition": -3770
  },
  {
    "year": 2047,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 3315,
    "net_addition": -3315
  },
  {
    "year": 2048,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 1120,
    "net_addition": -1120
  },
  {
    "year": 2049,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 1020,
    "net_addition": -1020
  },
  {
    "year": 2050,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 2336,
    "net_addition": -2336
  },
  {
    "year": 2051,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 1070,
    "net_addition": -1070
  },
  {
    "year": 2052,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 2439,
    "net_addition": -2439
  },
  {
    "year": 2053,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 790,
    "net_addition": -790
  },
  {
    "year": 2054,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 4311,
    "net_addition": -4311
  },
  {
    "year": 2055,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 2926,
    "net_addition": -2926
  },
  {
    "year": 2056,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 2170,
    "net_addition": -2170
  },
  {
    "year": 2057,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 6460,
    "net_addition": -6460
  },
  {
    "year": 2058,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 6874,
    "net_addition": -6874
  },
  {
    "year": 2059,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 9075,
    "net_addition": -9075
  },
  {
    "year": 2060,
    "operating": 0,
    "cancelled": 0,
    "planned": 0,
    "plan_retire": 424,
    "net_addition": -424
  }
];
function Coal_retirement($$payload, $$props) {
  push();
  d3.range(2014, 2060 + 1);
  d3.sum(data$2.filter((d) => +d.year < 2014), (d) => +d.net_addition || 0);
  $$payload.out += `<div id="chart-container" class="svelte-1466h0o"><div id="chart" class="svelte-1466h0o"></div> <div class="toggle-buttons svelte-1466h0o"><button${attr("class", `svelte-1466h0o ${stringify([
    "selected"
  ].filter(Boolean).join(" "))}`)}>Typical</button> <button${attr("class", `svelte-1466h0o ${stringify([""].filter(Boolean).join(" "))}`)}>Target</button></div> <div class="chart-annotation svelte-1466h0o"><p class="svelte-1466h0o"><strong>Data Source:</strong> Global Coal Plant Tracker, Global Energy Monitor, January 2025
			release.</p> <p class="svelte-1466h0o">Includes both grid-connected and captive coal plants.</p></div></div>`;
  pop();
}
const data$1 = [
  {
    "plant_name": "Adaro Aluminum Smelter",
    "plant_label": "Adaro Aluminum\nSmelter",
    "year": 2025,
    "unit_name": "Phase I",
    "capacity": 1100,
    "status": "pre-permit",
    "is_captive": "yes",
    "level": 3,
    "parent_id": 3,
    "id": 4
  },
  {
    "plant_name": "Adaro Aluminum Smelter",
    "plant_label": "Adaro Aluminum\nSmelter",
    "year": 2026,
    "unit_name": "Phase II",
    "capacity": 1100,
    "status": "announced",
    "is_captive": "yes",
    "level": 3,
    "parent_id": 3,
    "id": 5
  },
  {
    "plant_name": "Asam-Asam",
    "year": 2023,
    "unit_name": "Unit 5",
    "capacity": 100,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 6
  },
  {
    "plant_name": "Asam-Asam",
    "year": 2023,
    "unit_name": "Unit 6",
    "capacity": 100,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 7
  },
  {
    "plant_name": "Banten Suralaya",
    "plant_label": "Banten Suralaya",
    "year": 2024,
    "unit_name": "Unit 09",
    "capacity": 1e3,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 8
  },
  {
    "plant_name": "Banten Suralaya",
    "plant_label": "Banten Suralaya",
    "year": 2025,
    "unit_name": "Unit 10",
    "capacity": 1e3,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 9
  },
  {
    "plant_name": "Captive plant",
    "capacity": 3573,
    "is_captive": "yes",
    "level": 2,
    "parent_id": 1,
    "id": 3
  },
  {
    "plant_name": "Grid-connected plant",
    "capacity": 3600,
    "is_captive": "no",
    "level": 2,
    "parent_id": 1,
    "id": 2
  },
  {
    "plant_name": "Lombok FTP2",
    "year": 2024,
    "unit_name": "Unit 1",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 10
  },
  {
    "plant_name": "Lombok FTP2",
    "year": 2022,
    "unit_name": "Unit 2",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 11
  },
  {
    "plant_name": "Palu",
    "year": 2024,
    "unit_name": "Unit 5",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 12
  },
  {
    "plant_name": "Palu",
    "year": 2024,
    "unit_name": "Unit 6",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 13
  },
  {
    "plant_name": "Parit Baru",
    "year": 2025,
    "unit_name": "Unit 1",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 14
  },
  {
    "plant_name": "Parit Baru",
    "year": 2025,
    "unit_name": "Unit 2",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 15
  },
  {
    "plant_name": "PT IHIP",
    "year": 2024,
    "unit_name": "Unit 2",
    "capacity": 117,
    "status": "construction",
    "is_captive": "yes",
    "level": 3,
    "parent_id": 3,
    "id": 16
  },
  {
    "plant_name": "PT IHIP",
    "year": 2024,
    "unit_name": "Unit 3",
    "capacity": 116,
    "status": "construction",
    "is_captive": "yes",
    "level": 3,
    "parent_id": 3,
    "id": 17
  },
  {
    "plant_name": "Sulut-1",
    "year": 2024,
    "unit_name": "Unit 1",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 18
  },
  {
    "plant_name": "Sulut-1",
    "year": 2024,
    "unit_name": "Unit 2",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 19
  },
  {
    "plant_name": "Sumbagsel-1",
    "year": 2026,
    "unit_name": "Unit 1",
    "capacity": 150,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 20
  },
  {
    "plant_name": "Sumbagsel-1",
    "year": 2026,
    "unit_name": "Unit 2",
    "capacity": 150,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 21
  },
  {
    "plant_name": "Sumsel-1",
    "plant_label": "Sumsel-1",
    "year": 2024,
    "unit_name": "Unit 1",
    "capacity": 300,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 22
  },
  {
    "plant_name": "Sumsel-1",
    "plant_label": "Sumsel-1",
    "year": 2024,
    "unit_name": "Unit 2",
    "capacity": 300,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 23
  },
  {
    "plant_name": "Timor-1",
    "year": 2023,
    "unit_name": "Unit 1",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 24
  },
  {
    "plant_name": "Timor-1",
    "year": 2023,
    "unit_name": "Unit 2",
    "capacity": 50,
    "status": "construction",
    "is_captive": "no",
    "level": 3,
    "parent_id": 2,
    "id": 25
  },
  {
    "plant_name": "Total plant addition",
    "capacity": 7173,
    "level": 1,
    "id": 1
  },
  {
    "plant_name": "Weda Bay",
    "plant_label": "Weda Bay",
    "year": 2024,
    "unit_name": "Unit 12",
    "capacity": 380,
    "status": "construction",
    "is_captive": "yes",
    "level": 3,
    "parent_id": 3,
    "id": 26
  },
  {
    "plant_name": "Weda Bay",
    "plant_label": "Weda Bay",
    "year": 2024,
    "unit_name": "Unit 13",
    "capacity": 380,
    "status": "construction",
    "is_captive": "yes",
    "level": 3,
    "parent_id": 3,
    "id": 27
  },
  {
    "plant_name": "Weda Bay",
    "plant_label": "Weda Bay",
    "year": 2024,
    "unit_name": "Unit 14",
    "capacity": 380,
    "status": "construction",
    "is_captive": "yes",
    "level": 3,
    "parent_id": 3,
    "id": 28
  }
];
function Coal_addition($$payload, $$props) {
  push();
  const formatCapacity = d3.format(",");
  function splitPlantName(name) {
    const safeName = name || "";
    const words = safeName.trim().split(/\s+/);
    if (words.length > 2) {
      const firstLine = words.slice(0, 2).join(" ");
      const secondLine = words.slice(2).join(" ");
      return [firstLine, secondLine];
    }
    return [safeName];
  }
  const filtered = data$1.filter((d) => d.plant_name !== "Total plant addition");
  const groups = filtered.filter((d) => d.level === 2);
  const groupDict = {};
  groups.forEach((g) => {
    groupDict[g.id] = { ...g, children: [] };
  });
  filtered.forEach((d) => {
    if (d.level === 3) {
      const parent = groupDict[d.parent_id];
      if (parent) {
        parent.children.push(d);
      }
    }
  });
  const groupData = Object.values(groupDict);
  const maxParentCapacity = d3.max(groupData, (d) => +d.capacity);
  const parentRadiusScale = d3.scaleSqrt().domain([0, maxParentCapacity]).range([0, 140]);
  groupData.forEach((g) => {
    g.radius = parentRadiusScale(+g.capacity);
  });
  groupData.forEach((g) => {
    if (g.children.length) {
      const root = d3.hierarchy({ children: g.children }).sum((d) => +d.capacity);
      const packLayout = d3.pack().padding(5).size([2 * g.radius, 2 * g.radius]);
      packLayout(root);
      g.packedChildren = root.children;
    }
  });
  const margin = 40;
  let totalWidth, totalHeight;
  {
    {
      let xOffset = margin;
      groupData.forEach((g) => {
        g.cx = xOffset + g.radius;
        g.cy = margin + g.radius;
        xOffset += 2 * g.radius + margin;
      });
      totalWidth = groupData.reduce((sum, g) => sum + 2 * g.radius, 0) + (groupData.length + 1) * margin;
      totalHeight = d3.max(groupData, (g) => 2 * g.radius) + 2 * margin;
    }
  }
  {
    $$payload.out += "<!--[!-->";
    const each_array_4 = ensure_array_like(groupData);
    $$payload.out += `<svg${attr("width", totalWidth)}${attr("height", totalHeight)}><defs><pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="4" height="4"><path d="M0,0 L4,4" stroke="black" stroke-width="2"></path></pattern></defs><!--[-->`;
    for (let $$index_7 = 0, $$length = each_array_4.length; $$index_7 < $$length; $$index_7++) {
      let group = each_array_4[$$index_7];
      const each_array_5 = ensure_array_like(splitPlantName(group.plant_name));
      $$payload.out += `<g${attr("transform", `translate(${group.cx}, ${group.cy})`)}><circle${attr("r", group.radius)} fill="#d9d9d9" stroke="none"></circle><text text-anchor="middle" x="0"${attr("y", -group.radius - 20)} style="font-family: Roboto, sans-serif; font-size: 0.74rem; font-weight: 600;" fill="#333"><!--[-->`;
      for (let index = 0, $$length2 = each_array_5.length; index < $$length2; index++) {
        let line = each_array_5[index];
        $$payload.out += `<tspan x="0"${attr("dy", index === 0 ? "0" : "1.2em")}>${escape_html(line)}</tspan>`;
      }
      $$payload.out += `<!--]--></text><text text-anchor="middle" x="0"${attr("y", group.radius + 20)} style="font-family: Roboto, sans-serif; font-size: 0.74rem;" fill="#7f7f7f">${escape_html(formatCapacity(group.capacity))} Megawatts</text>`;
      if (group.packedChildren) {
        $$payload.out += "<!--[-->";
        const each_array_6 = ensure_array_like(group.packedChildren);
        $$payload.out += `<!--[-->`;
        for (let $$index_6 = 0, $$length2 = each_array_6.length; $$index_6 < $$length2; $$index_6++) {
          let child = each_array_6[$$index_6];
          $$payload.out += `<g${attr("transform", `translate(${child.x - group.radius}, ${child.y - group.radius})`)}><circle${attr("r", child.r)}${attr("fill", child.data.status === "announced" ? "#eee" : child.data.status === "pre-permit" ? "#eee" : child.data.status === "construction" ? "#bbb" : "#ffffff")}${attr("stroke", child.data.status === "pre-permit" ? "#ccc" : "none")}${attr("stroke-width", child.data.status === "pre-permit" ? "1.5pt" : "0")}></circle>`;
          if ([4, 5, 8, 9, 22, 23, 26, 27, 28].includes(child.data.id)) {
            $$payload.out += "<!--[-->";
            const each_array_7 = ensure_array_like(child.data.plant_label.split("\n"));
            $$payload.out += `<text text-anchor="middle" dominant-baseline="middle" fill="#333"><!--[-->`;
            for (let index = 0, $$length3 = each_array_7.length; index < $$length3; index++) {
              let line = each_array_7[index];
              $$payload.out += `<tspan x="0"${attr("dy", index === 0 ? "-0.4em" : "1.2em")} style="font-family: Roboto, sans-serif; font-size: 0.74rem;">${escape_html(line)}</tspan>`;
            }
            $$payload.out += `<!--]--> <tspan x="0" dy="1.6em" style="font-family: Roboto, sans-serif; font-size: 0.6rem;" fill="#7f7f7f">${escape_html(child.data.unit_name)}</tspan></text>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></g>`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></g>`;
    }
    $$payload.out += `<!--]--></svg>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const data = [
  {
    "type": "Coal Supercritical",
    "capex_2022": 2.42,
    "opex_2022": 3.26,
    "capex_2030": 2.35,
    "opex_2030": 3.17,
    "capex_2050": 2.28,
    "opex_2050": 3.08
  },
  {
    "type": "CCGT (Combined Cycle Gas Turbine)",
    "capex_2022": 2.48,
    "opex_2022": 5.27,
    "capex_2030": 2.37,
    "opex_2030": 5.02,
    "capex_2050": 2.19,
    "opex_2050": 4.92
  },
  {
    "type": "Biomass Agricultural",
    "capex_2022": 2.79,
    "opex_2022": 3.59,
    "capex_2030": 2.54,
    "opex_2030": 3.53,
    "capex_2050": 2.24,
    "opex_2050": 3.41
  },
  {
    "type": "Geothermal Large (Flash or Dry)",
    "capex_2022": 6.05,
    "opex_2022": 0.74,
    "capex_2030": 5.21,
    "opex_2030": 0.64,
    "capex_2050": 4.3,
    "opex_2050": 0.52
  },
  {
    "type": "Hydropower Large",
    "capex_2022": 6.65,
    "opex_2022": 1.26,
    "capex_2030": 6.4,
    "opex_2030": 1.21,
    "capex_2050": 5.92,
    "opex_2050": 1.12
  },
  {
    "type": "Solar PV Utility Scale",
    "capex_2022": 4.92,
    "opex_2022": 0.87,
    "capex_2030": 2.97,
    "opex_2030": 0.52,
    "capex_2050": 2.18,
    "opex_2050": 0.42
  },
  {
    "type": "Wind - Onshore",
    "capex_2022": 5.45,
    "opex_2022": 2.01,
    "capex_2030": 4.43,
    "opex_2030": 1.66,
    "capex_2050": 3.63,
    "opex_2050": 1.37
  },
  {
    "type": "Diesel Generator",
    "capex_2022": 2.87,
    "opex_2022": 10.34,
    "capex_2030": 2.87,
    "opex_2030": 10.1,
    "capex_2050": 2.8,
    "opex_2050": 9.87
  }
];
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function linear(t) {
  return t;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = (
      /** @type {Array<any>} */
      b.map((bi, i) => {
        return get_interpolator(
          /** @type {Array<any>} */
          a[i],
          bi
        );
      })
    );
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) {
      throw new Error("Object cannot be null");
    }
    if (is_date(a) && is_date(b)) {
      const an = a.getTime();
      const bn = b.getTime();
      const delta = bn - an;
      return (t) => new Date(an + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = (
      /** @type {number} */
      b - /** @type {number} */
      a
    );
    return (t) => a + t * delta;
  }
  return () => b;
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    target_value = new_value;
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = linear,
      interpolate = get_interpolator
    } = { ...defaults, ...opts };
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = raf.now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(
          /** @type {any} */
          value,
          new_value
        );
        if (typeof duration === "function")
          duration = duration(
            /** @type {any} */
            value,
            new_value
          );
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(
      /** @type {any} */
      target_value,
      /** @type {any} */
      value
    ), opts),
    subscribe: store.subscribe
  };
}
function Animated_number($$payload, $$props) {
  push();
  var $$store_subs;
  let value = fallback($$props["value"], 0);
  const animated = tweened(value, { duration: 500, easing: cubicOut });
  animated.set(value);
  $$payload.out += `<span>${escape_html(store_get($$store_subs ??= {}, "$animated", animated).toFixed(2))}</span>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { value });
  pop();
}
function Lcoe_button($$payload, $$props) {
  push();
  let years, tableTitle, sortedData, minDelta;
  const calculateDelta = (d) => {
    const futureYear = 2030;
    let base, futureVal;
    {
      base = d["capex_2022"];
      futureVal = d[`capex_${futureYear}`];
    }
    return base === 0 ? 0 : (futureVal - base) / base;
  };
  const getValue = (d, year) => {
    {
      return d[`capex_${year}`];
    }
  };
  function hexToRgb(hex) {
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    return {
      r: bigint >> 16 & 255,
      g: bigint >> 8 & 255,
      b: bigint & 255
    };
  }
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  function getDeltaColor(delta) {
    const minColorHex = "#6bbeaa";
    const maxColorHex = "#fbf5b2";
    const minVal = minDelta;
    const maxVal = 0;
    if (minVal === maxVal) {
      return maxColorHex;
    }
    const ratio = (delta - minVal) / (maxVal - minVal);
    const minRgb = hexToRgb(minColorHex);
    const maxRgb = hexToRgb(maxColorHex);
    const r = Math.round(minRgb.r + ratio * (maxRgb.r - minRgb.r));
    const g = Math.round(minRgb.g + ratio * (maxRgb.g - minRgb.g));
    const b = Math.round(minRgb.b + ratio * (maxRgb.b - minRgb.b));
    return rgbToHex(r, g, b);
  }
  years = [2022, 2030];
  tableTitle = "Projected Capital Expenditure (CAPEX)";
  sortedData = data.slice().sort((a, b) => calculateDelta(a) - calculateDelta(b));
  minDelta = sortedData.length ? Math.min(...sortedData.map((d) => calculateDelta(d))) : 0;
  const each_array = ensure_array_like(years);
  const each_array_1 = ensure_array_like(sortedData);
  $$payload.out += `<div class="container svelte-1i0m3qw"><div class="header svelte-1i0m3qw"><div class="header-text"><div class="table-title svelte-1i0m3qw">${escape_html(tableTitle)}</div> <div class="table-subtitle svelte-1i0m3qw">in USD¢/kWh</div></div> <div class="header-controls svelte-1i0m3qw"><div class="toggle-buttons svelte-1i0m3qw"><button${attr("class", `svelte-1i0m3qw ${stringify(["selected"].filter(Boolean).join(" "))}`)}>CAPEX</button> <button${attr("class", `svelte-1i0m3qw ${stringify([""].filter(Boolean).join(" "))}`)}>OPEX + Fuel</button></div> <div class="toggle-instructions svelte-1i0m3qw">Select both to show the projected LCOE</div></div></div> <table class="lcoe-table svelte-1i0m3qw"><thead><tr><th class="svelte-1i0m3qw">Technology</th><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let year = each_array[$$index];
    $$payload.out += `<th class="year-cell svelte-1i0m3qw">`;
    if (year === 2030 && true) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button class="year-toggle-btn svelte-1i0m3qw">+</button>`;
    } else {
      $$payload.out += "<!--[!-->";
      {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--> <div class="year-header svelte-1i0m3qw"><span class="year-label svelte-1i0m3qw">${escape_html(year)}</span></div></th>`;
  }
  $$payload.out += `<!--]--><th class="svelte-1i0m3qw">Δ</th></tr></thead><tbody class="svelte-1i0m3qw"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
    let d = each_array_1[$$index_2];
    const each_array_2 = ensure_array_like(years);
    $$payload.out += `<tr><td class="svelte-1i0m3qw">${escape_html(d.type)}</td><!--[-->`;
    for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
      let year = each_array_2[$$index_1];
      $$payload.out += `<td class="svelte-1i0m3qw">`;
      Animated_number($$payload, { value: getValue(d, year) });
      $$payload.out += `<!----></td>`;
    }
    $$payload.out += `<!--]--><td${attr("style", `background-color: ${stringify(getDeltaColor(calculateDelta(d)))}; font-weight: light; border: 2px solid white;`)} class="svelte-1i0m3qw">`;
    Animated_number($$payload, { value: calculateDelta(d) * 100 });
    $$payload.out += `<!---->%</td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table> <div class="table-annotation svelte-1i0m3qw"><p><strong>Data Source:</strong> Indonesia LCOE Calculator, IESR, 2023 release.</p></div></div>`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<article><div class="completeright">`;
  Post_header($$payload, { postId: 3 });
  $$payload.out += `<!----> <div class="body article-text-center"><p>Coal is one of the most carbon-intensive fuels and has become a target for phase-out in efforts to limit global temperature rise. 
                Unfortunately, it has been a key fuel for economic growth for a developing country like Indonesia. 
                It has remained dominant in the generation mix for years, though efforts are underway to reduce its role.</p> <p>During the G20 meeting in Rio, President Prabowo <a href="https://setkab.go.id/en/g20-summit-president-prabowo-subianto-highlights-indonesias-green-energy-vision-global-climate-role/" target="_blank">set a target for a complete coal phase-out by 2040</a>. 
                That means Indonesia must reduce 58.13 GW of coal capacity to zero in just 15 years, requiring the retirement of nearly 4 GW of coal plants annually.</p></div></div></article> <div class="chart-container svelte-190dxn">`;
  Coal_retirement($$payload);
  $$payload.out += `<!----></div> <article><div class="completeright"><div class="body article-text-center"><p>This reduction is not only ambitious but also exceptionally abrupt. 
                The timeline is extremely tight, especially considering Indonesia's historical reliance on coal.
                Based on data from the <a href="https://globalenergymonitor.org/projects/global-coal-plant-tracker/" target="_blank">Global Coal Plant Tracker</a> compiled by Global Energy Monitor, the typical scenario given the current generation mix would only allow Indonesia to completely phase out coal power by 2060.</p> <p>Such a rapid transition is likely to pose considerable technical, economic, and institutional challenges, requiring careful planning and strong coordination across sectors.</p> <p>Despite Indonesia canceling over 18 GW of planned capacity additions for 2023-2030, 
                ongoing projects will still increase net coal power capacity, which is set to peak in 2026. 
                At least 7.17 GW of new coal capacity — roughly evenly split between captive and grid-connected power plants — is expected to come online by then.</p> <p></p></div></div></article> <div class="chart-container svelte-190dxn">`;
  Coal_addition($$payload);
  $$payload.out += `<!----></div> <article><div class="completeright"><div class="body article-text-center"><p>In total, Indonesia is still planning to add at least 18 coal-fired power plants to meet residential electricity demand and another 7 for industrial use by 2030, amounting to 3.60 GW of grid-connected capacity and 3.57 GW of captive capacity.</p> <h2 class="h2">What does the future hold?</h2> <p>Prior to outlining Indonesia's coal phase-out commitment, President Prabowo emphasized the country's vast geothermal potential. 
                He pledged to meet future electricity demand with 75 GW of renewable energy, placing geothermal among the technologies expected to anchor Indonesia's low-carbon transition.</p> <p>Unlike variable renewables such as solar and wind, geothermal offers a unique advantage: it provides baseload power. That reliability makes geothermal an attractive candidate to replace coal in Indonesia's energy mix. 
                The country sits on the world's largest geothermal reserves after the United States, yet less than 10% has been tapped.</p> <p>However, tapping geothermal at scale is not without challenges. 
                While geothermal is cost-competitive over the long term, its high upfront investment and exploration risks continue to pose major hurdles, according to LCOE data.</p> <p>In 2023, the LCOE for geothermal in Indonesia was higher than that of solar PV or wind. 
                By 2030 and 2050, projections suggest geothermal costs will decline gradually, though not as steeply as solar or wind, which continue to benefit from faster innovation and global cost reductions.</p></div></div></article> <div class="chart-container svelte-190dxn">`;
  Lcoe_button($$payload);
  $$payload.out += `<!----></div> <article><div class="completeright"><div class="body article-text-center"><p>Despite this, geothermal's long project lifetimes and dispatchable nature could offer strategic value as Indonesia balances its generation mix. When paired with intermittent renewables and storage, geothermal can serve as the backbone of a more resilient and clean energy system.</p> <p>Ultimately, the future of geothermal in Indonesia will hinge on policy certainty, risk-sharing mechanisms for exploration, and investments in transmission to bring remote resources to demand centers.</p> <p>If these barriers can be overcome, geothermal won't just complement the energy transition.</p> <p>It could anchor it.</p></div></div></article> `;
  Back2home($$payload);
  $$payload.out += `<!----> <footer></footer>`;
}
export {
  _page as default
};
