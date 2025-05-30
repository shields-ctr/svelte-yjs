<script>
  import { getContext } from 'svelte';

  let script = getContext('script');
  let users = getContext('bots');
  let channels = getContext('channels');
</script>

<h1>Dialog</h1>
{#if script.getState?.().synced}
  {#each script.dialog as line}
    <p>
      {line.time} {line.nick} {line.command} 
      {#each line.args as arg}
        {arg}&nbsp
      {/each}
    </p>
  {/each}
{/if}

<style>
  th {
    vertical-align: middle;
    text-align: end;
    writing-mode: vertical-lr;
  }
  /* th:nth-child(n+2) { writing-mode: vertical-lr; } */
  form { padding: 0.25em; }
  td, th {
    margin: 0;
    padding: 0;
  }
</style>