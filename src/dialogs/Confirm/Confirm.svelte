<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton";

  export let id = null;
  export let className = null;
  export let header = "";
  export let content = "";
  export let callback = null;
  // Buttons can have { content, confirm, cancel, result }
  export let buttons = [];

  const dispatch = createEventDispatcher();

  let visible = true;

  function handleClick(confirm, cancel, result) {
    const dialogResult = confirm
      ? result || true
      : cancel
      ? result || false
      : result;
    if (callback) {
      callback(dialogResult);
    }
    close(dialogResult);
  }

  function close(result) {
    visible = false;
    dispatch("closed", result);
  }
</script>

{#if visible}
  <div class="dialog-background" class:visible>
    <div
      {id}
      class={['dialog', className].filter(Boolean).join(' ')}
      in:fade={{ duration: 100 }}>
      <div class="dialog-header">
        <slot name="header">{header}</slot>
      </div>
      <div class="dialog-body">
        <slot name="body">{content}</slot>
      </div>
      <div class="dialog-footer">
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
          {#each buttons as button}
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
