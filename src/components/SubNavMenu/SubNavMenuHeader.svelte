<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<h2 {id} class={['sub-nav-menu-header', className].filter(Boolean).join(' ')}>
  <slot />
</h2>
