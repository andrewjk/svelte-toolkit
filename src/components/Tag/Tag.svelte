<script>
  import { createEventDispatcher } from "svelte";

  import Cross from "../Icons/Cross.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let type = "info";
  export let content = "";
  export let closable = false;

  const dispatch = createEventDispatcher();

  let visible = true;

  function close() {
    visible = false;
    dispatch("close");
  }
</script>

{#if visible}
  <span
    {id}
    class={['tag', type, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}>
    <slot>{content}</slot>
    {#if closable}
      <button class="close-button" on:click={close}>
        <Cross />
      </button>
    {/if}
  </span>
{/if}
