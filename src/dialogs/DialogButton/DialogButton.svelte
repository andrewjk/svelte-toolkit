<script>
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let content = "";

  export let confirm = false;
  export let cancel = false;

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

<button
  {id}
  class={['button', 'dialog-button', confirm ? 'select' : 'cancel', className]
    .filter(Boolean)
    .join(' ')}
  on:keydown={handleKey}
  on:click>
  <slot>{content}</slot>
</button>
