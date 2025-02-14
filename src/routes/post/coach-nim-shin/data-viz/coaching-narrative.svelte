<script>
  import { createEventDispatcher, onMount } from "svelte";
  
  export let narratives = [];
  
  const dispatch = createEventDispatcher();
  let narrativeContainer;
  
  onMount(() => {
    const sections = narrativeContainer.querySelectorAll(".narrative-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"), 10);
            dispatch("activeChange", { index });
          }
        });
      },
      { threshold: 0.5 }
    );
  
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  });
</script>
  
<div class="narrative-container" bind:this={narrativeContainer}>
  <!-- Placeholder for lagging start -->
  <div class="narrative-placeholder"></div>
  
  {#each narratives as narrative, i}
    <div
      class="narrative-section"
      data-index={i}
      style="font-size: {narrative.fontSize}; padding: {narrative.padding};"
    >
      {#if narrative.image}
        <img
          src={narrative.image}
          alt="Narrative Image {i + 1}"
          class="narrative-image"
        />
      {/if}
      {#if narrative.title}
        <h2 class="narrative-title">{narrative.title}</h2>
      {/if}
      {#if narrative.content}
        <p class="narrative-content">{narrative.content}</p>
      {/if}
    </div>
  {/each}
</div>

  
<style>
  .narrative-container {
    /* Container styling if needed */
  }
  .narrative-placeholder {
  height: 50vh; /* adjust as needed */
  }
  .narrative-section {
    margin-bottom: 100vh;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
  }
  .narrative-image {
    max-width: 100%;
    display: block;
    margin-bottom: 10px;
  }

  .narrative-title {
    margin: 0 0 10px;
    color: #000;
    font-family: 'Vollkorn';
    font-size: 1.5rem;
    font-weight: 500;
    font-style: italic;
    margin-bottom: 1.4rem;
  }
  
  .narrative-content {
    margin: 0;
    color: #333;
    font-family: 'Roboto';
    font-size: 1.1rem;
    font-weight: 350;
    line-height: 1.65rem;
  }
</style>
