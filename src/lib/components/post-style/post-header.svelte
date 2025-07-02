<script>
  import { posts } from '$lib/data/post.js';

  export let postId;

  let post = posts.find(p => p.id === postId);
</script>

{#if post}
  <header>
      <h1 class="post-title">{post.title}</h1>
      <p class="post-subtitle">
        <span>{post.subtitle}</span>
      </p>
      <p class="post-author">
          By <span class="author-name"> {post.author}</span>
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
      font-family: 'Lora';
      font-size: 2rem;
      font-weight: 600;
      color: black;
      line-height: 2.8rem;
      margin-bottom: 1rem;
  }

  .post-subtitle {
      font-family: 'Inter';
      font-size: 1rem;
      font-weight: 250;
      color: black;
      line-height: 1.6rem;
      margin-bottom: 0.4rem;
  }

  .post-author {
      font-family: 'Inter';
      font-size: 1rem;
      font-weight: 500;
      color: black;
      margin-bottom: 0.4rem;
  }

  .author-name{
      text-decoration: underline;
  }

  .post-date {
      font-family: 'Inter';
      font-size: 0.86rem;
      font-weight: 400;
      color: black;
      opacity: 0.6;
      margin-top: 0.4rem;
  }

</style>