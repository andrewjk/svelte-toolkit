<script>
  import { onMount, beforeUpdate } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let value = 0;
  export let total = 0;

  let position = 0;
  let dragging = false;
  let background = null;
  let handle = null;
  let skipRecalc = false;

  onMount(() => {
    calculatePosition();
  });

  beforeUpdate(() => {
    if (background && handle) {
      if (skipRecalc) {
        skipRecalc = false;
      } else {
        calculatePosition();
      }
    }
  });

  function calculatePosition() {
    // Calculate the initial handle position
    const handleRect = handle.getBoundingClientRect();
    const backgroundRect = background.getBoundingClientRect();
    const offsetX = (value / total) * backgroundRect.width;
    position = offsetX - handleRect.width / 2;
  }

  function handleMouseDown(e) {
    dragging = true;
  }

  function handleMouseUp(e) {
    dragging = false;
  }

  function handleMouseMove(e) {
    if (!e.buttons) {
      dragging = false;
    }

    if (dragging) {
      const handleRect = handle.getBoundingClientRect();
      const backgroundRect = background.getBoundingClientRect();
      let offsetX = e.clientX - backgroundRect.left;

      const minWidth = handleRect.width / 2;
      const maxWidth = backgroundRect.width - handleRect.width / 2;

      if (offsetX < minWidth) {
        offsetX = minWidth;
        value = 0;
      } else if (offsetX > maxWidth) {
        offsetX = maxWidth;
        value = total;
      } else {
        const width = backgroundRect.width - handleRect.width;
        value = Math.floor((total / width) * offsetX);
      }

      position = offsetX - handleRect.width / 2;
    }

    // Don't recalc with the value change - we know where everything should be
    skipRecalc = true;
  }
</script>

<div
  {id}
  class={["slider", className].filter(Boolean).join(" ")}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
>
  <div class="slider-background" bind:this={background} />
  <div
    class="slider-handle"
    bind:this={handle}
    style={`left: ${position}px;`}
    on:mousedown={handleMouseDown}
  />
</div>

<style>
  /* These styles were automatically generated from Slider.scss */
  .slider {
    height: var(--input-height, 3.2rem);
    position: relative;
  }

  .slider-background {
    background-color: var(--light-back-color, #fafafa);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    height: 4px;
    position: absolute;
    top: 14px;
    width: 100%;
  }

  .slider-handle {
    background-color: white;
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: 50%;
    height: 1.6rem;
    width: 1.6rem;
    position: absolute;
    top: calc(var(--input-height, 3.2rem) / 2 - 1.6rem / 2);
  }

  .slider-handle:hover,
  .slider-handle:focus {
    border: 1px solid var(--select-color, #3396ff);
  }
</style>
