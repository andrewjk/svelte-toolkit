<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let active = false;

  let handleClick;

  // If we received a context with a handleClick function in it (from the
  // parent DropDownMenu), we call it on click
  var context = getContext("dropdownmenuitem");
  if (context) {
    handleClick = context.handleClick;
  }
</script>

<div
  {id}
  class={["drop-down-item", className].filter(Boolean).join(" ")}
  class:active
  role="menuitem"
  on:click={() => (handleClick ? handleClick() : null)}
>
  <slot />
</div>

<style src="DropDownMenuItem.scss">
</style>
