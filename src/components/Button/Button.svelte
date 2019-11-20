<script>
  import Loading from "../../icons/Loading";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "primary";
  export let size = "medium";
  export let loading = false;
  export let submit = false;
  export let reset = false;
  export let title = "";
  export let disabled = false;
  export let content = "";
</script>

<style src="Button.scss">

</style>

<button
  {id}
  class={['button', type, size, loading ? 'loading' : null, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  type={submit ? 'submit' : reset ? 'reset' : 'button'}
  {title}
  {disabled}
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
