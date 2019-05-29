<script>
  export let id = null;
  export let className = null;
  export let content = "";

  export let confirm = false;
  export let cancel = false;
</script>

<button
  {id}
  class={['button', 'dialog-button', confirm ? 'select' : cancel ? 'cancel' : null, className].filter(Boolean).join(' ')}
  on:click>
  <slot>{content}</slot>
</button>
