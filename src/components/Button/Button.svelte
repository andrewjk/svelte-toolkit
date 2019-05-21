<script>
  export let id = null;
  export let className = null;
  export let type = "";
  export let size = "";
  export let loading = false;
  export let disabled = false;
  export let content = "";
</script>

<style>
  .button.info {
    color: blue;
  }
  .button.success {
    color: limegreen;
  }
  .button.warning {
    color: orange;
  }
  .button.danger {
    color: red;
  }
</style>

<button
  {id}
  class={['button', className, type, size, loading ? 'loading' : null].filter(Boolean).join(' ')}
  {disabled}
  on:click>
  <slot>{content}</slot>
</button>
