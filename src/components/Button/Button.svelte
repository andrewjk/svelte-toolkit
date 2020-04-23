<script>
  import Loading from "../../icons/Loading";

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

<style src="Button.scss">

</style>

<button
  {id}
  class={['button', type, size, className].filter(Boolean).join(' ')}
  class:loading
  class:rounded
  class:outlined
  type={submit ? 'submit' : reset ? 'reset' : 'button'}
  {title}
  {disabled}
  aria-haspopup={hasPopup}
  on:click
  on:keydown
  on:keypress
  on:keyup
  on:mousedown
  on:mouseup>
  {#if loading}
    <span class="loading-background">
      <Loading rotate />
    </span>
  {/if}
  <slot>{content}</slot>
</button>
