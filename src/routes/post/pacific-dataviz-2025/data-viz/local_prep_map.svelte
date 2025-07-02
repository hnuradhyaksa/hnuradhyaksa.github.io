<script>
    import { onMount } from 'svelte';
    let container;
  
    onMount(async () => {
      const res = await fetch('/figma/pacific-dataviz-2025/asset-web.html');
      let html = await res.text();
  
      // 1) make sure the frame ever shows
      html = html.replace(
        /(<div id="f2h-frame-1080"[^>]*?)(>)/,
        `$1 data-min-width="0"$2`
      );
  
      // 2) rewrite the PNG path to an absolute URL
      html = html.replace(
        /data-src="figma2html\/1080px\.png"/g,
        'data-src="/figma/pacific-dataviz-2025/figma2html/1080px.png"'
      );
  
      container.innerHTML = html;
  
      // 3) re-inject all scripts
      Array.from(container.querySelectorAll('script')).forEach(old => {
        const s = document.createElement('script');
        for (const { name, value } of old.attributes) {
          s.setAttribute(name, value);
        }
        s.textContent = old.textContent;
        container.appendChild(s);
      });
  
      // 4) safety fallback
      container.querySelectorAll('.f2h-frame').forEach(f => (f.style.display = 'block'));
      container.querySelectorAll('.f2h-img').forEach(img => {
        const src = img.getAttribute('data-src');
        if (src && img.src !== src) img.src = src;
      });
    });
  </script>
  
  <div bind:this={container}></div>
  
  <style>
    :global(#asset-web-box .f2h-frame) {
      display: block !important;
    }
  </style>