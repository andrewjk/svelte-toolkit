<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "info";
  export let size = "";
  export let loading = false;
  export let submit = false;
  export let reset = false;
  export let disabled = false;
  export let content = "";
</script>

<button
  {id}
  class={['button', type, size, loading ? 'loading' : null, className].concat(classNames).filter(Boolean).join(' ')}
  type={submit ? 'submit' : reset ? 'reset' : 'button'}
  {disabled}
  on:click>
  <slot>{content}</slot>
</button>
