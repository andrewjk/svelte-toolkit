<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let position = "start";
  export let ariaLabel = "";

  setContext("navmenu", {
    position,
  });
</script>

<nav
  {id}
  class={["nav-menu", position, className].filter(Boolean).join(" ")}
  aria-label={ariaLabel}
>
  <ul class="nav-menu-bar" role="menubar">
    <slot />
  </ul>
</nav>

<style>
  /* These styles were automatically generated from NavMenu.scss */
  .nav-menu {
    flex-grow: 1;
    margin: 0;
    overflow: visible;
    padding: 0;
  }

  .nav-menu-bar {
    display: flex;
    align-items: center;
    padding: 0;
  }

  .nav-menu.start .nav-menu-bar {
    justify-content: flex-start;
  }

  .nav-menu.end .nav-menu-bar {
    justify-content: flex-end;
  }
</style>
