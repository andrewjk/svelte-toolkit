<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";

  import ImageButton from "../ImageButton/ImageButton";
  import Cross from "../../icons/Cross";

  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let content = "";
  export let position = "top";
  export let closable = true;
  export let duration = 5000;

  const dispatch = createEventDispatcher();

  let visible = true;
  let alert;

  function transitionArgs() {
    switch (position) {
      case "top-left":
      case "bottom-left": {
        return { x: -100, duration: 800 };
      }
      case "top": {
        alert.style.left = window.innerWidth / 2 - alert.offsetWidth / 2 + "px";
        return { y: -100, duration: 800 };
      }
      case "top-right":
      case "bottom-right": {
        return {
          x: window.innerWidth + 100 - alert.offsetWidth,
          duration: 800
        };
      }
      case "bottom": {
        alert.style.left = window.innerWidth / 2 - alert.offsetWidth / 2 + "px";
        return {
          y: window.innerHeight + 100 - alert.offsetHeight,
          duration: 800
        };
      }
    }
  }

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

<style src="Alert.scss">

</style>

{#if visible}
  <div
    {id}
    class={['alert', type, position, className].filter(Boolean).join(' ')}
    role="alert"
    in:fly={transitionArgs()}
    out:fade
    bind:this={alert}>
    <div class="alert-content">
      <slot>{content}</slot>
    </div>
    {#if closable}
      <div class="alert-close">
        <ImageButton size="small" on:click={close}>
          <slot name="button">
            <Cross />
          </slot>
        </ImageButton>
      </div>
    {/if}
  </div>
{/if}
