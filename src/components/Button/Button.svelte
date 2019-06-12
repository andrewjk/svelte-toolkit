<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let size = "";
  export let loading = false;
  export let disabled = false;
  export let content = "";
</script>

<button
  {id}
  class={['button', type, size, loading ? 'loading' : null, className].filter(Boolean).join(' ')}
  {disabled}
  on:click>
  <slot>{content}</slot>
</button>
