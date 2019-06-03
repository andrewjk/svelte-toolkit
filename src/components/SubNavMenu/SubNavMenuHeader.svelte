<script>
  export let id = null;
  export let className = null;
</script>

<h2 {id} class={['sub-nav-menu-header', className].filter(Boolean).join(' ')}>
  <slot />
</h2>
