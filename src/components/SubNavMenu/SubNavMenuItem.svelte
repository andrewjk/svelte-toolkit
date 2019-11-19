<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "";

  const context = getContext("subnavmenu");
  if (context) {
    type = context.type;
  }
</script>

<style src="SubNavMenuItem.scss">

</style>

<li
  {id}
  class={['sub-nav-menu-item', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  role="menuitem">
  <slot />
</li>
