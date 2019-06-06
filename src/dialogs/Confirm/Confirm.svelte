<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  export let className = null;
  export let header = "";
  export let content = "";
  export let callback = null;
  // Buttons can have { content, confirm, cancel, result }
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
    on:keydown={handleKey}>
    <div
      {id}
      class={['dialog', className].filter(Boolean).join(' ')}
      tabindex="0"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}>
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
              on:click={e => handleClick(true, false)}>
              OK
            </DialogButton>
            <DialogButton
              cancel={true}
              on:click={e => handleClick(false, true)}>
              Cancel
            </DialogButton>
          {/if}
          {#each buttons as button, index}
            <DialogButton
              confirm={button.confirm}
              cancel={button.cancel}
              on:click={e => handleClick(button.confirm, button.cancel, button.result)}>
               {button.content}
            </DialogButton>
          {/each}
        </slot>
      </div>
    </div>
  </div>
{/if}
