<script>
    import { createEventDispatcher } from 'svelte';
  
    export let data = [];               // rawCountryData array
    const dispatch = createEventDispatcher();
  
    let searchTerm = '';
    let suggestions = [];
  
    // update suggestions once user has typed ≥2 letters
    $: suggestions = searchTerm.length >= 2
      ? data
          .filter(d => d.country.toLowerCase().startsWith(searchTerm.toLowerCase()))
          .map(d => d.country)
      : [];
  
    function onInput(e) {
      searchTerm = e.target.value;
    }
  
    function selectCountry(name) {
      searchTerm = name;
      suggestions = [];
      const selected = data.find(d => d.country === name);
      dispatch('select', selected);
    }
  
    function reset() {
      searchTerm = '';
      suggestions = [];
      dispatch('reset');
    }
  </script>
  
  <style>
    .search-container {
      position: relative;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
    }
    ul.dropdown li {
      padding: 0.5rem;
      cursor: pointer;
    }
    ul.dropdown li:hover {
      background: #f0f0f0;
    }
    button.reset-btn {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      padding: 0.3rem 0.6rem;
    }
  </style>
  
  <div class="search-container">
    <input
      type="text"
      placeholder="Search country"
      bind:value={searchTerm}
      on:input={onInput}
    />
    {#if suggestions.length}
      <ul class="dropdown">
        {#each suggestions as country}
          <li on:click={() => selectCountry(country)}>
            {country}
          </li>
        {/each}
      </ul>
    {/if}
    <button class="reset-btn" on:click={reset}>
      Reset
    </button>
  </div>