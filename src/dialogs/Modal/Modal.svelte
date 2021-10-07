<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton.svelte";

  export let id = null;
  let className = null;
  export { className as class };
</script>

<div class="dialog-background" tabindex="-1">
  <div
    {id}
    class={["dialog", className].filter(Boolean).join(" ")}
    tabindex="0"
    transition:fade={{ duration: 200 }}
  >
    <div class="dialog-header">
      <slot name="header" />
    </div>
    <div class="dialog-body">
      <slot name="body" />
    </div>
    <div class="dialog-footer">
      <slot name="footer" />
    </div>
  </div>
</div>

<style>
  /* These styles were automatically generated from Modal.scss */
  .dialog {
    background-color: white;
    border-radius: var(--border-radius, 2px);
    margin: var(--element-margin, 1.5rem);
    max-height: 32rem;
    min-height: 14rem;
    max-width: 48rem;
    min-width: 32rem;
    overflow: auto;
    z-index: 9900;
    display: flex;
    flex-direction: column;
  }

  .dialog-background {
    background-color: rgba(0, 0, 0, 0.5);
    cursor: default;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9000;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .dialog-header {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 2.4rem;
    margin: 0;
    padding: var(--element-padding, 2rem) var(--element-padding, 2rem) 0;
    flex: 0 0 auto;
  }

  .dialog-body {
    padding: var(--element-padding, 2rem);
    flex: 1 1 auto;
  }

  .dialog-footer {
    background-color: var(--middle-back-color, #e5e5e5);
    padding: calc(var(--element-padding, 2rem) / 4 * 3);
    text-align: right;
    flex: 0 0 auto;
  }
</style>
