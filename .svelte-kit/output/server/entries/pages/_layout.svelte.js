import { T as head, V as slot, W as bind_props, S as pop, P as push } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/escaping.js";
import { a as attr } from "../../chunks/attributes.js";
function _layout($$payload, $$props) {
  push();
  let data = $$props["data"];
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(data.siteMetadata.title)}</title>`;
    $$payload2.out += `<meta name="description"${attr("content", data.siteMetadata.description)}> <meta name="author"${attr("content", data.siteMetadata.author)}> <link rel="canonical"${attr("href", data.siteMetadata.url)}> <meta property="og:title"${attr("content", data.siteMetadata.title)}> <meta property="og:url"${attr("content", data.siteMetadata.url)}> <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "{data.siteMetadata.author}",
            "url": "{data.siteMetadata.url}",
            "sameAs": [
                "{data.siteMetadata.github}"
            ]
        }
    <\/script>`;
  });
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _layout as default
};
