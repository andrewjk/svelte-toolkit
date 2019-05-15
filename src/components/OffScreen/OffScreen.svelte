<script>
  import { onMount, beforeUpdate, setContext } from "svelte";

  export let visible = "false";
  export let direction = "left";

  function handleBackgroundClick(e) {
    visible = false;
  }
</script>

<style>
  .off-screen-background {
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .off-screen-background.visible {
    display: block;
  }

  .off-screen {
    background: white;
    position: fixed;
  }

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

<div
  class={'off-screen-background ' + (visible ? ' visible' : '')}
  on:click={handleBackgroundClick}>
  <div class={'off-screen ' + direction}>
    <slot />
  </div>
</div>
