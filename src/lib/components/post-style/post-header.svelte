<script>
  import { posts } from '$lib/data/post.js';

  export let postId;

  let post = posts.find(p => p.id === postId);
</script>

{#if post}
  <header>
      <h1 class="post-title">{post.title}</h1>
      <p class="post-author">
          <span>By {post.author}</span>
      </p>
      <p class="post-date">
          <span>{post.date}</span>
      </p>
  </header>
{:else}
  <p>Post not found.</p>
{/if}

<style>
  header {
      margin-top: 117px;
      margin-bottom: 4rem;
      text-align: center;
  }

  .post-title {
      font-family: 'Vollkorn';
      font-size: 2rem;
      font-weight: 600;
      font-style: italic;
      color: black;
      line-height: 2.4rem;
      margin-bottom: 1rem;
  }

  .post-author {
      font-family: 'Roboto';
      font-size: 1rem;
      font-weight: 500;
      color: black;
      margin-bottom: 0.4rem;
  }

  .post-date {
      font-family: 'Roboto';
      font-size: 0.7rem;
      font-weight: 500;
      color: #808080;
      letter-spacing: 1px;
      margin-top: 0.4rem;
  }

</style>