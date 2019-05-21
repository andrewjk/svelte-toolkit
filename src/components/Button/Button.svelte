<script>
  export let id = null;
  export let className = null;
  export let type = "";
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
