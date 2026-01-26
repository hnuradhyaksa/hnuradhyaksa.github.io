<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    export let value = 0;
  
    const animated = tweened(value, { duration: 500, easing: cubicOut });
  
    $: animated.set(value);
  </script>
  
  <span>{ $animated.toFixed(2) }</span>
  