<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton.svelte";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let header = "";
  export let content = "";
  export let callback = null;
  // Buttons can have { content, confirm, cancel, type, result }
  export let buttons = [];

  const dispatch = createEventDispatcher();

  let visible = true;
  let footer = null;

  onMount(() => {
    // Focus the first button in the footer
    const buttonElements = footer.getElementsByTagName("button");
    if (buttonElements.length) {
      buttonElements[0].focus();
    }
  });

  function handleKey(e) {
    switch (e.keyCode) {
      case keyCodes.esc: {
        close(false);
        break;
      }
    }
  }

  function handleClick(confirm, cancel, result) {
    const dialogResult = confirm
      ? result || true
      : cancel
      ? result || false
      : result;
    close(dialogResult);
  }

  function close(result) {
    visible = false;
    if (callback) {
      callback(result);
    }
    dispatch("closed", result);
  }
</script>

{#if visible}
  <div
    class="dialog-background"
    class:visible
    tabindex="-1"
    on:keydown={handleKey}
  >
    <div
      {id}
      class={["dialog", className].filter(Boolean).join(" ")}
      tabindex="0"
      transition:fade={{ duration: 200 }}
    >
      <div class="dialog-header">
        <slot name="header">{header}</slot>
      </div>
      <div class="dialog-body">
        <slot name="body">{content}</slot>
      </div>
      <div class="dialog-footer" bind:this={footer}>
        <slot name="footer">
          {#if !buttons || !buttons.length}
            <DialogButton
              confirm={true}
              on:click={(e) => handleClick(true, false)}
            >
              OK
            </DialogButton>
            <DialogButton
              cancel={true}
              on:click={(e) => handleClick(false, true)}
            >
              Cancel
            </DialogButton>
          {/if}
          {#each buttons as button, index}
            <DialogButton
              confirm={button.confirm}
              cancel={button.cancel}
              type={button.type}
              on:click={(e) =>
                handleClick(button.confirm, button.cancel, button.result)}
            >
              {button.content}
            </DialogButton>
          {/each}
        </slot>
      </div>
    </div>
  </div>
{/if}

<style>
  /* These styles were automatically generated from Confirm.scss */
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
