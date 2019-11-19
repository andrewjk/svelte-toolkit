<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "";
  export let ariaLabel = "";

  setContext("subnavmenu", {
    type
  });
</script>

<style src="SubNavMenu.scss">

</style>

<nav
  {id}
  class={['sub-nav-menu', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  aria-label={ariaLabel}>
  <ul role="menubar">
    <slot />
  </ul>
</nav>
