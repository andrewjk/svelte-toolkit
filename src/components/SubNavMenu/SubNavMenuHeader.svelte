<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<h2 {id} class={['sub-nav-menu-header', className].concat(classNames).filter(Boolean).join(' ')}>
  <slot />
</h2>
