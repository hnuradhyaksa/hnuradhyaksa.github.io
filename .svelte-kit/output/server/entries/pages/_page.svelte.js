import "clsx";
import { e as ensure_array_like, d as stringify, f as bind_props, c as pop, p as push } from "../../chunks/index.js";
import { a as attr, p as posts } from "../../chunks/post.js";
import { e as escape_html } from "../../chunks/escaping.js";
import { f as fallback } from "../../chunks/utils.js";
function Grid($$payload, $$props) {
  push();
  let posts2 = fallback($$props["posts"], () => [], true);
  const each_array = ensure_array_like(posts2);
  $$payload.out += `<div${attr("class", `grid ${stringify(posts2.length === 1 ? "single-post" : "")} svelte-e2wrhj`)}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let post = each_array[$$index];
    $$payload.out += `<a class="thumb svelte-e2wrhj"${attr("href", post.link)}><div class="post svelte-e2wrhj"><div class="post-image svelte-e2wrhj"><img${attr("src", post.thumbnail)}${attr("alt", post.title)} class="thumbnail svelte-e2wrhj"></div> <h1 class="post-title svelte-e2wrhj">${escape_html(post.title)}</h1> <div class="post-summary svelte-e2wrhj">${escape_html(post.summary)}</div> <div class="post-date svelte-e2wrhj"><span>${escape_html(post.date)}</span> `;
    if (post.client) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<b><span class="client-name svelte-e2wrhj">— ${escape_html(post.client)}</span></b>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></a>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { posts: posts2 });
  pop();
}
function Back2top($$payload, $$props) {
  push();
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="completeright svelte-1j09ygo"><div class="intro svelte-1j09ygo"><h2 class="svelte-1j09ygo"><i class="svelte-1j09ygo">Hi, I'm Adhyaksa. This is where I share my collection of short visualization essays—most of which are provoked by everyday events I observe.</i></h2> <br class="svelte-1j09ygo"> <div class="sidebar-text svelte-1j09ygo"><a href="#aboutme" class="svelte-1j09ygo">GET TO KNOW ME!</a></div></div> <div class="container svelte-1j09ygo">`;
  Grid($$payload, { posts });
  $$payload.out += `<!----></div> <div class="category-header svelte-1j09ygo"><hr class="svelte-1j09ygo"> <div id="aboutme" class="svelte-1j09ygo"><h2 class="svelte-1j09ygo">Here's a bit about me!</h2></div> <div class="blogcontainer article-text svelte-1j09ygo"><p class="svelte-1j09ygo">I'm a Business Intelligence Analyst at GovTech Health Indonesia, where I explore, analyze, and visualize public health data to help promote more informed policymaking.</p> <p class="svelte-1j09ygo">I'm especially interested in the power of data visualization because I believe it enhances the impact of data. I believe that fully interactive storytelling could do justice to the potential of the data.</p></div> <br class="svelte-1j09ygo"> <h2 class="svelte-1j09ygo">Let's connect!</h2> <br class="svelte-1j09ygo"> <div class="sidebar-text svelte-1j09ygo"><a href="mailto:hnuradhyaksa@gmail.com" class="svelte-1j09ygo">EMAIL</a>  <a href="https://www.linkedin.com/in/nuradhyaksa/" target="_blank" class="svelte-1j09ygo">LINKEDIN</a>  <a href="https://public.tableau.com/app/profile/nur.adhyaksa.hamid/vizzes" target="_blank" class="svelte-1j09ygo">TABLEAU PUBLIC</a>  <a href="https://bsky.app/profile/nuradhyaksa.bsky.social" target="_blank" class="svelte-1j09ygo">BLUESKY</a>  <a href="https://github.com/hnuradhyaksa" target="_blank" class="svelte-1j09ygo">GITHUB</a> </div></div></div> `;
  Back2top($$payload);
  $$payload.out += `<!---->`;
}
export {
  _page as default
};
