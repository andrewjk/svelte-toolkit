<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let position = "";
</script>

<style>
  /* These styles were automatically generated from NavBar.scss */
  .nav-bar {
    display: flex;
    align-items: center;
  }

  .nav-menu {
    flex-grow: 1;
    margin: 0;
    overflow: visible;
    padding: 0;
  }
</style>

<div
  {id}
  class={['nav-bar', className].filter(Boolean).join(' ')}
  class:start={position === "start"}
  class:end={position === "end"}
  role="navigation">
  <slot/>
</div>
