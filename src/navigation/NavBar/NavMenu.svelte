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

<style src="NavMenu.scss">
</style>
