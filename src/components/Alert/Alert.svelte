<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";

  import ImageButton from "../ImageButton/ImageButton.svelte";
  import Cross from "../../icons/Cross/Cross.svelte";

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
          duration: 800,
        };
      }
      case "bottom": {
        alert.style.left = window.innerWidth / 2 - alert.offsetWidth / 2 + "px";
        return {
          y: window.innerHeight + 100 - alert.offsetHeight,
          duration: 800,
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

{#if visible}
  <div
    {id}
    class={["alert", type, position, className].filter(Boolean).join(" ")}
    role="alert"
    in:fly={transitionArgs()}
    out:fade={{ duration: duration > 0 ? 400 : 0 }}
    bind:this={alert}
  >
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

<style>
  /* These styles were automatically generated from Alert.scss */
  .alert {
    background-color: var(--light-back-color, #fafafa);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    display: flex;
    margin: 0 0 var(--element-margin, 1.5rem);
    padding: calc(var(--element-padding, 2rem) / 2) var(--element-padding, 2rem);
    position: fixed;
  }

  .alert:last-child {
    margin: 0;
  }

  .alert-content {
    flex: 1 1 auto;
  }

  .alert-close {
    flex: 0 0 auto;
    margin-left: var(--element-margin, 1.5rem);
    margin-right: calc(var(--element-margin, 1.5rem) * -1 / 2);
  }

  .alert.top-left {
    left: 20px;
    top: 20px;
  }

  .alert.top {
    top: 20px;
    margin: 0 auto;
  }

  .alert.top-right {
    top: 20px;
    right: 20px;
  }

  .alert.bottom-left {
    left: 20px;
    bottom: 20px;
  }

  .alert.bottom {
    bottom: 20px;
    margin: 0 auto;
  }

  .alert.bottom-right {
    right: 20px;
    bottom: 20px;
  }

  .alert.primary,
  .alert.info,
  .alert.success,
  .alert.warning,
  .alert.danger {
    border: 1px solid rgba(0, 0, 0, 0.06);
    color: white;
  }

  .alert.primary {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .alert.info {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .alert.success {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .alert.warning {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .alert.danger {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }
</style>
