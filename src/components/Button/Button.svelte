<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "info";
  export let size = "medium";
  export let loading = false;
  export let image = false;
  export let submit = false;
  export let reset = false;
  export let title = "";
  export let disabled = false;
  export let content = "";
</script>

<button
  {id}
  class={['button', type, size, loading ? 'loading' : null, image ? 'image' : null, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  type={submit ? 'submit' : reset ? 'reset' : 'button'}
  {title}
  {disabled}
  on:click>
  <slot>{content}</slot>
</button>
