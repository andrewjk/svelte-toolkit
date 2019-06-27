<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  export let id = null;
  let className = null;
  export { className as class };
  export let visible = false;
  export let position = "left";

  const dispatch = createEventDispatcher();

  let offscreen;

  function transitionArgs() {
    switch (position) {
      case "left": {
        return { x: -1 * offscreen.offsetWidth, duration: 600, opacity: 1 };
      }
      case "top": {
        return { y: -1 * offscreen.offsetHeight, duration: 600, opacity: 1 };
      }
      case "right": {
        return {
          x: window.innerWidth,
          duration: 600,
          opacity: 1
        };
      }
      case "bottom": {
        return {
          y: window.innerHeight,
          duration: 600,
          opacity: 1
        };
      }
    }
  }

  function close() {
    visible = false;
    dispatch("closed");
  }
</script>

<style>
  .off-screen.left {
    left: 0;
    top: 0;
    bottom: 0;
  }
  .off-screen.right {
    top: 0;
    right: 0;
    bottom: 0;
  }
  .off-screen.top {
    left: 0;
    top: 0;
    right: 0;
  }
  .off-screen.bottom {
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

{#if visible}
  <div class="off-screen-background" on:click={close}>
    <div
      {id}
      class={['off-screen', position, className].filter(Boolean).join(' ')}
      transition:fly={transitionArgs()}
      bind:this={offscreen}>
      <slot />
    </div>
  </div>
{/if}
