<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "info";
  export let content = "";
</script>

<span {id} class={['tag', type, className].concat(classNames).filter(Boolean).join(' ')}>
  <slot>{content}</slot>
</span>
