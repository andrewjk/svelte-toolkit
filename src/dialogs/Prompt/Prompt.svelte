<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton.svelte";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  export let className = null;
  export let header = "";
  export let content = "";
  export let value = "";
  export let callback = null;
  export let buttonContent = "OK";

  const dispatch = createEventDispatcher();

  let visible = true;
  let input = null;

  onMount(() => {
    // Focus the text box
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
    on:keydown={handleKey}>
    <div
      {id}
      class={['dialog', className].filter(Boolean).join(' ')}
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}>
      <div class="dialog-header">
        <slot name="header">{header}</slot>
      </div>
      <div class="dialog-body">
        <slot name="body">
          <label>{content}</label>
        </slot>
        <div class="block">
          <input
            type="text"
            bind:value
            bind:this={input}
            on:keydown={handleInputKey} />
        </div>
      </div>
      <div class="dialog-footer">
        <slot name="footer">
          <DialogButton confirm={true} on:click={e => handleClick(true, false)}>
             {buttonContent}
          </DialogButton>
          <DialogButton cancel={true} on:click={e => handleClick(false, true)}>
            Cancel
          </DialogButton>
        </slot>
      </div>
    </div>
  </div>
{/if}
