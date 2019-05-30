<script>
  import { onMount } from "svelte";

  export let id = null;
  export let name = null;
  export let className = null;
  export let content = "Please correct the following errors:";

  export let validator = null;

  onMount(() => {
    // Make sure we have a validator
    if (!validator) {
      throw `Validator required for input '${name}'`;
    }
  });
</script>

{#if validator.messages.length}
  <div {id} class={['validation-summary', className].filter(Boolean).join(' ')}>
    <slot>{content}</slot>
    <ul>
      {#each validator.messages as message}
        <li>{message}</li>
      {/each}
    </ul>
  </div>
{/if}
