<script>
  import { onMount } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let content = "Please correct the following errors:";

  export let validator = null;

  let messages = [];

  onMount(() => {
    // Make sure we have a validator
    if (!validator) {
      throw `Validator required for summary '${name}'`;
    }
    validator.setValid = setValid;
    messages = validator.messages;
  });

  function setValid() {
    messages = validator.messages;
  }
</script>

{#if messages.length}
  <div {id} class={['validation-summary', className].filter(Boolean).join(' ')}>
    <slot>{content}</slot>
    <ul>
      {#each messages as message}
        <li>{message}</li>
      {/each}
    </ul>
  </div>
{/if}
