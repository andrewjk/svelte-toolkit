<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton";

  export let id = null;
  export let className = null;
  export let header = "";
  export let content = "";
  export let callback = null;
  export let buttonContent = "OK";

  const dispatch = createEventDispatcher();

  let visible = true;

  function handleClick() {
    if (callback) {
      callback();
    }
    close();
  }

  function close() {
    visible = false;
    dispatch("closed");
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
          <DialogButton confirm={true} on:click={handleClick}>
             {buttonContent}
          </DialogButton>
        </slot>
      </div>
    </div>
  </div>
{/if}
