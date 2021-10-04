<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let type = "";
  export let ariaLabel = "";

  setContext("subnavmenu", {
    type,
  });
</script>

<nav
  {id}
  class={["sub-nav-menu", type, className].filter(Boolean).join(" ")}
  aria-label={ariaLabel}
>
  <ul role="menubar">
    <slot />
  </ul>
</nav>

<style src="SubNavMenu.scss">
</style>
