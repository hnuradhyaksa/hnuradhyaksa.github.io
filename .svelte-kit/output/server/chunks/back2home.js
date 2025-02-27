import { f as bind_props, c as pop, p as push, d as stringify } from "./index.js";
import { p as posts, a as attr } from "./post.js";
import { e as escape_html } from "./escaping.js";
import { b as base } from "./paths.js";
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
  $$payload.out += `<a${attr("href", `${stringify(base)}/`)} class="back-to-home svelte-5xxjpx">←</a>`;
}
export {
  Back2home as B,
  Post_header as P
};
