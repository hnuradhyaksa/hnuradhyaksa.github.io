<script context="module" lang="ts">
  export interface Post {
    thumbnail: string;
    date: string;
    client: string;
    title: string;
    summary: string;
    link: string;
  }
</script>

<script lang="ts">
  export let posts: Post[] = [];
</script>

<div class="grid {posts.length === 1 ? 'single-post' : ''}">
  {#each posts as post}
    <a class="thumb" href={post.link}>
      <div class="post">
        <div class="post-image">
          <img src={post.thumbnail} alt={post.title} class="thumbnail" />
        </div>
        <h1 class="post-title">
          {post.title}
        </h1>
        <div class="post-summary">
          {post.summary}
        </div>
        <div class="post-date">
          <span>{post.date}</span>
          {#if post.client}
            <b><span class="client-name">&mdash; {post.client}</span></b>
          {/if}
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 100%;
  }

  .single-post {
    max-width: 400px;
    align-items: start;
  }

  .thumb {
    text-decoration: none;
    color: inherit;
  }

  .post {
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .post-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }

  .post:hover .thumbnail {
    filter: grayscale(0%);
  }

  .post-date {
    font-family: 'Roboto';
    font-size: 0.7rem;
    font-weight: 500;
    color: #808080;
    margin-bottom: 0.5rem;
  }

  .client-name {
    color: #0084db;
  }

  .post-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .post-summary {
    font-family: 'Vollkorn';
    font-size: 1rem;
    font-weight: 400;
    font-style: italic;
    color: #808080;
    margin-bottom: 1rem;
  }
</style>
