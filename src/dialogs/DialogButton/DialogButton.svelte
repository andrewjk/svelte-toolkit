<script>
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
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

<button
  {id}
  class={[
    "button",
    "dialog-button",
    confirm ? "confirm" : null,
    cancel ? "cancel" : null,
    type,
    className,
  ]
    .filter(Boolean)
    .join(" ")}
  type="button"
  on:keydown={handleKey}
  on:click
>
  <slot>{content}</slot>
</button>

<style>
  /* These styles were automatically generated from DialogButton.scss */
  .button {
    background-color: var(--button-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    color: var(--button-text-color, rgba(0, 0, 0, 0.7));
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .button:focus {
    background-color: var(--button-hover-color, #cccccc);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    outline: 0;
  }

  .button:hover {
    background-color: var(--button-hover-color, #cccccc);
  }

  /* Remove the black dotted focus border in Firefox */
  .button::-moz-focus-inner {
    border: 0;
  }

  .dialog-button {
    margin-left: calc(var(--element-margin, 1.5rem) / 4 * 3);
    font-size: 1.75rem;
    min-width: 9.6rem;
    padding: calc(var(--element-padding, 2rem) / 4) var(--element-padding, 2rem);
  }

  .dialog-button.confirm {
    background-color: var(--confirm-color, #3396ff);
    border: 1px solid transparent;
    color: var(--confirm-text-color, #fff);
  }

  .dialog-button.confirm:hover:not(:disabled):not(.loading) {
    background-color: var(--confirm-hover-color, #0077f5);
  }

  .dialog-button.cancel {
    background-color: var(--cancel-color, #949494);
    border: 1px solid transparent;
    color: var(--cancel-text-color, #fff);
  }

  .dialog-button.cancel:hover:not(:disabled):not(.loading) {
    background-color: var(--cancel-hover-color, #767676);
  }

  .dialog-button.primary,
  .dialog-button.info,
  .dialog-button.success,
  .dialog-button.warning,
  .dialog-button.danger {
    border: 1px solid transparent;
  }

  .dialog-button.primary {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .dialog-button.primary:hover:not(:disabled):not(.loading) {
    background-color: var(--primary-hover-color, #fa036f);
  }

  .dialog-button.info {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .dialog-button.info:hover:not(:disabled):not(.loading) {
    background-color: var(--info-hover-color, #0b67fe);
  }

  .dialog-button.success {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .dialog-button.success:hover:not(:disabled):not(.loading) {
    background-color: var(--success-hover-color, #008642);
  }

  .dialog-button.warning {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .dialog-button.warning:hover:not(:disabled):not(.loading) {
    background-color: var(--warning-hover-color, #dba90d);
  }

  .dialog-button.danger {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }

  .dialog-button.danger:hover:not(:disabled):not(.loading) {
    background-color: var(--danger-hover-color, #cb1910);
  }
</style>
