<script>
  export let post;
</script>

<a class="post-card" href={post.link}>
  <div
    class="thumbnail"
    style="background-image: url({post.thumbnail});"
  >
    <div class="post-date">{post.date}</div>
  </div>

  <div class="text-container">
    <h3 class="post-title">{post.title}</h3>
  </div>
</a>

<style>
  /* keep your blur keyframes */
  @keyframes blurIn {
    from { backdrop-filter: blur(0) }
    to   { backdrop-filter: blur(8px) }
  }
  @keyframes blurOut {
    from { backdrop-filter: blur(8px) }
    to   { backdrop-filter: blur(0) }
  }

  .post-card {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-rows: 70% 30%;
    row-gap: 0.48rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-decoration: none;
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(0);
    animation: blurOut 0.3s ease forwards;
    overflow: visible;
  }
  .post-card:hover {
    animation: blurIn 0.3s ease forwards;
  }

  .thumbnail {
    grid-row: 1 / 2;
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.12));
  }

  .post-date {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 2;
    background: rgba(0,0,0,0.25);
    color: #ffffff;
    font-family: Inter, sans-serif;
    font-size: 0.54rem;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
  }

  .text-container {
    grid-row: 2 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(255,255,255,0.7);
  }

  .post-title {
    margin: 0;
    font-family: Inter, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #000;
    text-align: left;
  }

  /* hide the subtitle */
  .post-summary {
    display: none;
  }
</style>