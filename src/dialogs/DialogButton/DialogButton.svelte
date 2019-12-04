<script>
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let content = "";

  export let confirm = false;
  export let cancel = false;
  export let type = null;

  function handleKey(e) {
    // Handle tabbing manually to trap focus within the dialog
    if (e.keyCode === keyCodes.tab) {
      if (e.shiftKey) {
        const el =
          e.target.previousElementSibling ||
          e.target.parentNode.lastElementChild;
        if (el) {
          el.focus();
        }
      } else {
        const el =
          e.target.nextElementSibling || e.target.parentNode.firstElementChild;
        if (el) {
          el.focus();
        }
      }
      e.preventDefault();
    }
  }
</script>

<style src="DialogButton.scss">

</style>

<button
  {id}
  class={['button', 'dialog-button', confirm ? 'confirm' : null, cancel ? 'cancel' : null, type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  type="button"
  on:keydown={handleKey}
  on:click>
  <slot>{content}</slot>
</button>
