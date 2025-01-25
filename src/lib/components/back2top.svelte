<script>
    import { onMount } from 'svelte';
  
    let showButton = false;
  
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    onMount(() => {
      const onScroll = () => {
        showButton = window.scrollY > 300;
      };
  
      window.addEventListener('scroll', onScroll);
  
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    });
  </script>
  
  <style>

    .to-top-button {
      font-family: Inter, sans-seriff;
      font-feature-settings: 'liga' 1, 'calt' 1;
      font-style: normal;
      font-weight: 400;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #fff;
      color: #bbb;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
  </style>
  
  {#if showButton}
    <button class="to-top-button" on:click={scrollToTop} title="Back to Top">↑</button>
  {/if}
  