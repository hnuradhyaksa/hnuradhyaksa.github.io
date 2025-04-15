<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    export let value = 0;
  
    // Create tweened store with an initial value and configuration.
    const animated = tweened(value, { duration: 500, easing: cubicOut });
  
    // Whenever the input value changes, update the tweened value.
    $: animated.set(value);
  </script>
  
  <span>{ $animated.toFixed(2) }</span>
  