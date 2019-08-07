<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import Cross from "../Icons/Cross.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "info";
  export let content = "";
  export let closable = false;
  export let duration = -1;
  export let solid = false;

  const dispatch = createEventDispatcher();

  let visible = true;

  onMount(() => {
    if (duration > 0) {
      setTimeout(close, duration);
    }
  });

  function close() {
    visible = false;
    dispatch("closed");
  }
</script>

<style>
  .notification {
    display: inline-flex;
  }

  .notification-content {
    flex: 1 1 auto;
  }

  .notification-close {
    flex: 0 0 auto;
  }
</style>

{#if visible}
  <div
    {id}
    class={['notification', type, solid ? 'solid' : null, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    out:fade>
    <div class="notification-content">
      <slot>{content}</slot>
    </div>
    {#if closable}
      <div class="notification-close">
        <button class="close-button" type="button" on:click={close}>
          <Cross />
        </button>
      </div>
    {/if}
  </div>
{/if}
