<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let id = null;
  export let className = null;
  export let type = "default";
  export let content = "";
  export let closable = true;
  export let duration = -1;

  const dispatch = createEventDispatcher();

  let visible = true;

  onMount(() => {
    if (duration > 0) {
      setTimeout(close, duration);
    }
  });

  function close() {
    visible = false;
    dispatch('closed');
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
    class={['notification', type, className].filter(Boolean).join(' ')}
    out:fade>
    <div class="notification-content">
      <slot>{content}</slot>
    </div>
    {#if closable}
      <div class="notification-close">
        <button class="close-button" on:click={close} />
      </div>
    {/if}
  </div>
{/if}
