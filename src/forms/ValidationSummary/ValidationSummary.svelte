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
  <div {id} class={["validation-summary", className].filter(Boolean).join(" ")}>
    <slot>{content}</slot>
    <ul>
      {#each messages as message}
        <li>{message}</li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  /* These styles were automatically generated from ValidationSummary.scss */
  .validation-summary {
    background-color: var(--light-danger-color, #fef5f4);
    border: 1px solid var(--danger-color, #ee2e24);
    border-radius: var(--border-radius, 2px);
    color: var(--danger-color, #ee2e24);
    margin: 0 0 var(--element-margin, 1.5rem);
    padding: calc(var(--element-padding, 2rem) / 2);
  }

  .validation-summary ul {
    margin: 0;
  }

  .validation-summary:last-child {
    margin: 0;
  }
</style>
