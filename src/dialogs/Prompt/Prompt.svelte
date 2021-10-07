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
  export let options = [];
  export let value = "";
  export let callback = null;
  export let buttonContent = "OK";
  export let placeholder = "";

  const dispatch = createEventDispatcher();

  let visible = true;
  let input = null;

  onMount(() => {
    // Focus the input control
    input.focus();
  });

  function handleKey(e) {
    switch (e.keyCode) {
      case keyCodes.esc: {
        close(null);
        break;
      }
    }
  }

  function handleInputKey(e) {
    switch (e.keyCode) {
      case keyCodes.enter: {
        close(value);
        break;
      }
    }
  }

  function handleClick(confirm, cancel) {
    const dialogResult = confirm ? value : null;
    close(dialogResult);
  }

  function close(result) {
    visible = false;
    if (callback) {
      callback(result);
    }
    dispatch("closed");
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
      transition:fade={{ duration: 200 }}
    >
      <div class="dialog-header">
        <slot name="header">{header}</slot>
      </div>
      <div class="dialog-body">
        <slot name="body">
          <label for="prompt-input">{content}</label>
        </slot>
        {#if options && options.length}
          <select
            id="prompt-input"
            bind:value
            bind:this={input}
            {placeholder}
            on:keydown={handleInputKey}
          >
            {#each options as option}
              <option>{option}</option>
            {/each}
          </select>
        {:else}
          <input
            id="prompt-input"
            type="text"
            bind:value
            bind:this={input}
            {placeholder}
            on:keydown={handleInputKey}
          />
        {/if}
      </div>
      <div class="dialog-footer">
        <slot name="footer">
          <DialogButton
            confirm={true}
            on:click={(e) => handleClick(true, false)}
          >
            {buttonContent}
          </DialogButton>
          <DialogButton
            cancel={true}
            on:click={(e) => handleClick(false, true)}
          >
            Cancel
          </DialogButton>
        </slot>
      </div>
    </div>
  </div>
{/if}

<style>
  /* These styles were automatically generated from Prompt.scss */
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
