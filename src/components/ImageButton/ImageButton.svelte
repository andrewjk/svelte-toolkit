<script>
  import Loading from "../../icons/Loading";

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

<style src="ImageButton.scss">

</style>

<button
  {id}
  class={['image-button', type, size, loading ? 'loading' : null, className]
    .filter(Boolean)
    .join(' ')}
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
    <Loading rotate />
  {:else}
    <slot>{content}</slot>
  {/if}
</button>
