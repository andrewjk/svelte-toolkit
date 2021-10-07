<script>
  import Loading from "../../icons/Loading/Loading.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let type = "primary";
  export let size = "medium";
  export let loading = false;
  export let rounded = false;
  export let outlined = false;
  export let submit = false;
  export let reset = false;
  export let title = "";
  export let disabled = false;
  export let content = "";

  export let hasPopup = null;
</script>

<button
  {id}
  class={["button", type, size, className].filter(Boolean).join(" ")}
  class:loading
  class:rounded
  class:outlined
  type={submit ? "submit" : reset ? "reset" : "button"}
  {title}
  {disabled}
  aria-haspopup={hasPopup}
  on:click
  on:keydown
  on:keypress
  on:keyup
  on:mousedown
  on:mouseup
>
  {#if loading}
    <span class="loading-background">
      <Loading rotate />
    </span>
  {/if}
  <slot>{content}</slot>
</button>

<style>
  /* These styles were automatically generated from Button.scss */
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

  .button.small {
    font-size: 1.4rem;
    min-width: 6.4rem;
    padding: calc(var(--element-padding, 2rem) / 8) calc(var(--element-padding, 2rem) / 2);
  }

  .button,
  .button.medium {
    font-size: 1.75rem;
    min-width: 9.6rem;
    padding: calc(var(--element-padding, 2rem) / 4) var(--element-padding, 2rem);
  }

  .button.large {
    font-size: 2.30rem;
    min-width: 11.2rem;
    padding: calc(var(--element-padding, 2rem) / 2) var(--element-padding, 2rem);
  }

  .button.inline {
    font-size: inherit;
    height: var(--input-height, 3.2rem);
    min-width: auto;
    padding: 0 12px !important;
  }

  .button.rounded {
    border-radius: 9999px;
  }

  .button.primary,
  .button.info,
  .button.success,
  .button.warning,
  .button.danger,
  .button.cancel {
    border: 1px solid transparent;
  }

  .button,
  .button.primary {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .button.primary:hover:not(:disabled):not(.loading) {
    background-color: var(--primary-hover-color, #fa036f);
  }

  .button.info {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .button.info:hover:not(:disabled):not(.loading) {
    background-color: var(--info-hover-color, #0b67fe);
  }

  .button.success {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .button.success:hover:not(:disabled):not(.loading) {
    background-color: var(--success-hover-color, #008642);
  }

  .button.warning {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .button.warning:hover:not(:disabled):not(.loading) {
    background-color: var(--warning-hover-color, #dba90d);
  }

  .button.danger {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }

  .button.danger:hover:not(:disabled):not(.loading) {
    background-color: var(--danger-hover-color, #cb1910);
  }

  .button.cancel {
    background-color: var(--cancel-color, #949494);
    color: var(--cancel-text-color, #fff);
  }

  .button.cancel:hover:not(:disabled):not(.loading) {
    background-color: var(--cancel-hover-color, #767676);
  }

  .button.primary.outlined,
  .button.info.outlined,
  .button.success.outlined,
  .button.warning.outlined,
  .button.danger.outlined,
  .button.cancel.outlined {
    background-color: transparent;
  }

  .button.primary.outlined {
    border: 2px solid var(--primary-color, #fd3f92);
    color: var(--primary-color, #fd3f92);
  }

  .button.primary.outlined:hover:not(:disabled):not(.loading) {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .button.info.outlined {
    border: 2px solid var(--info-color, #4d90fe);
    color: var(--info-color, #4d90fe);
  }

  .button.info.outlined:hover:not(:disabled):not(.loading) {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .button.success.outlined {
    border: 2px solid var(--success-color, #00a852);
    color: var(--success-color, #00a852);
  }

  .button.success.outlined:hover:not(:disabled):not(.loading) {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .button.warning.outlined {
    border: 2px solid var(--warning-color, #f3c42e);
    color: var(--warning-color, #f3c42e);
  }

  .button.warning.outlined:hover:not(:disabled):not(.loading) {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .button.danger.outlined {
    border: 2px solid var(--danger-color, #ee2e24);
    color: var(--danger-color, #ee2e24);
  }

  .button.danger.outlined:hover:not(:disabled):not(.loading) {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }

  .button.warning.outlined {
    border: 2px solid var(--warning-color, #f3c42e);
    color: var(--warning-color, #f3c42e);
  }

  .button.warning.outlined:hover:not(:disabled):not(.loading) {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .button:disabled,
  .button:disabled:hover,
  .button:disabled:focus {
    background-color: var(--disabled-color, #f2f2f2);
    color: var(--disabled-text-color, #c2c2c2);
    cursor: default;
  }

  .button.outlined:disabled,
  .button.outlined:disabled:hover,
  .button.outlined:disabled:focus {
    border-color: var(--disabled-text-color, #c2c2c2);
    color: var(--disabled-text-color, #c2c2c2);
    cursor: default;
  }

  .button.loading {
    cursor: default;
  }

  .loading-background {
    position: absolute;
    background-color: inherit;
    border-radius: inherit;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
