<script>
  import Loading from "../../icons/Loading/Loading.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let type = "";
  export let size = "medium";
  export let loading = false;
  export let submit = false;
  export let reset = false;
  export let title = "";
  export let disabled = false;
  export let content = "";

  export let hasPopup = null;
</script>

<button
  {id}
  class={["image-button", type, size, loading ? "loading" : null, className]
    .filter(Boolean)
    .join(" ")}
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
    <Loading rotate />
  {:else}
    <slot>{content}</slot>
  {/if}
</button>

<style>
  /* These styles were automatically generated from ImageButton.scss */
  .image-button {
    background-color: transparent;
    border: none;
    border-radius: 50%;
    color: inherit;
    cursor: pointer;
    padding: 0.3rem;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .image-button:hover,
  .image-button:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* Remove the black dotted focus border in Firefox */
  .image-button::-moz-focus-inner {
    border: 0;
  }

  .image-button-content {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .image-button,
  .image-button.medium {
    height: 2.8rem;
    width: 2.8rem;
  }

  .image-button.large {
    height: 3.8rem;
    width: 3.8rem;
  }

  .image-button.small {
    height: 1.8rem;
    width: 1.8rem;
  }

  .image-button.primary,
  .image-button.info,
  .image-button.success,
  .image-button.warning,
  .image-button.danger,
  .image-button.cancel {
    border: 1px solid transparent;
    color: white;
  }

  .image-button.primary {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .image-button.primary:hover:not(:disabled):not(.loading) {
    background-color: var(--primary-hover-color, #fa036f);
  }

  .image-button.info {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .image-button.info:hover:not(:disabled):not(.loading) {
    background-color: var(--info-hover-color, #0b67fe);
  }

  .image-button.success {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .image-button.success:hover:not(:disabled):not(.loading) {
    background-color: var(--success-hover-color, #008642);
  }

  .image-button.warning {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .image-button.warning:hover:not(:disabled):not(.loading) {
    background-color: var(--warning-hover-color, #dba90d);
  }

  .image-button.danger {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }

  .image-button.danger:hover:not(:disabled):not(.loading) {
    background-color: var(--danger-hover-color, #cb1910);
  }

  .image-button.cancel {
    background-color: var(--cancel-color, #949494);
  }

  .image-button.cancel:hover:not(:disabled):not(.loading) {
    background-color: var(--cancel-hover-color, #767676);
  }

  .image-button:disabled,
  .image-button:disabled:hover,
  .image-button:disabled:focus {
    background-color: var(--disabled-color, #f2f2f2);
    color: var(--disabled-text-color, #c2c2c2);
    cursor: default;
  }

  .image-button.loading {
    cursor: default;
  }
</style>
