<script>
  import { base } from '$app/paths'
</script>

<style>
  
  .back-to-home {
      font-family: Inter, sans-seriff;
      font-feature-settings: 'liga' 1, 'calt' 1;
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      position: fixed;
      top: 20px;
      left: 20px;
      padding: 10px 20px;
      color: #bbbbbb;
      font-size: 1.5rem;
      text-decoration: none;
      cursor: pointer;
      z-index: 1000;
  }
</style>
  
  <a href="{base}/" class="back-to-home">
    ←
  </a>
  