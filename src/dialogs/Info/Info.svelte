<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let header = "";
  export let content = "";
  export let callback = null;
  export let buttonContent = "OK";

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

  function handleClick() {
    close();
  }

  function close() {
    visible = false;
    if (callback) {
      callback();
    }
    dispatch("closed");
  }
</script>

<style src="../Dialog.scss" global>

</style>

{#if visible}
  <div class="dialog-background" class:visible tabindex="-1">
    <div
      {id}
      class={['dialog', className].concat(classNames).filter(Boolean).join(' ')}
      transition:fade={{ duration: 200 }}>
      <div class="dialog-header">
        <slot name="header">{header}</slot>
      </div>
      <div class="dialog-body">
        <slot name="body">{content}</slot>
      </div>
      <div class="dialog-footer" bind:this={footer}>
        <slot name="footer">
          <DialogButton confirm={true} on:click={handleClick}>
             {buttonContent}
          </DialogButton>
        </slot>
      </div>
    </div>
  </div>
{/if}
