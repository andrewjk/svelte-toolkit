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

<style>
  /* These styles were automatically generated from SubNavMenu.scss */
  .sub-nav-menu {
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  .sub-nav-menu ul {
    list-style: outside none;
    margin: 0;
    padding: 0;
  }

  .sub-nav-menu:last-child {
    margin: 0;
  }
</style>
