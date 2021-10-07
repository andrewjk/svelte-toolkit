<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let type = "";

  const context = getContext("subnavmenu");
  if (context) {
    type = context.type;
  }
</script>

<li
  {id}
  class={["sub-nav-menu-item", type, className].filter(Boolean).join(" ")}
  role="menuitem"
>
  <slot />
</li>

<style>
  /* These styles were automatically generated from SubNavMenuItem.scss */
  .sub-nav-menu-item {
    display: inline-block;
    margin: 0;
    padding: 0 calc(var(--element-padding, 2rem) / 2);
  }

  .sub-nav-menu-item:first-child {
    padding-left: 0;
  }

  .sub-nav-menu-item:last-child {
    padding-right: 0;
  }

  .sub-nav-menu-item.line {
    border-right: 1px solid var(--border-color, #d2d2d2);
    margin: 0 calc(var(--element-margin, 1.5rem) / 2) 0 0;
    padding: 0 calc(var(--element-margin, 1.5rem) / 2) 0 0;
  }

  .sub-nav-menu-item.line:last-child {
    border-right: 0;
    margin-right: 0;
    padding-right: 0;
  }

  .sub-nav-menu-item.vertical {
    display: block;
    padding: calc(var(--element-padding, 2rem) / 4) 0;
  }

  .sub-nav-menu-item.vertical:first-child {
    padding-top: 0;
  }

  .sub-nav-menu-item.vertical:last-child {
    padding-bottom: 0;
  }
</style>
