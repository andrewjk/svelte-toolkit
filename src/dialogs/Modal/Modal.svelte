<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import DialogButton from "../DialogButton/DialogButton";

  export let id = null;
  let className = null;
  export { className as class };
</script>

<style src="../Dialog.scss">

</style>

<div class="dialog-background" tabindex="-1">
  <div
    {id}
    class={['dialog', className].filter(Boolean).join(' ')}
    tabindex="0"
    transition:fade={{ duration: 200 }}>
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
