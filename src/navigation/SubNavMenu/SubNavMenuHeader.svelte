<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style>
  /* These styles were automatically generated from SubNavMenuHeader.scss */
  .sub-nav-menu-header {
    font-size: var(--font-size, 1.4rem);
    line-height: 2rem;
    text-transform: uppercase;
    margin-bottom: calc(var(--element-margin, 1.5rem) / 2);
  }
</style>

<h2
  {id}
  class={['sub-nav-menu-header', className].filter(Boolean).join(' ')}>
  <slot />
</h2>
