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

<style>
  /* These styles were automatically generated from DropDownMenuItem.scss */
  .drop-down-item {
    cursor: default;
    margin: 0;
    padding: 2px 6px;
    width: 100%;
  }

  .drop-down-item:hover {
    background-color: var(--select-color, #3396ff);
    color: var(--select-text-color, #fff);
  }

  .drop-down-item.active {
    background-color: var(--select-color, #3396ff);
    color: var(--select-text-color, #fff);
  }

  .drop-down-item {
    padding: 0;
  }

  .drop-down-item :global(a) {
    color: inherit;
    display: block;
    padding: calc(var(--element-padding, 2rem) / 4) var(--element-padding, 2rem);
    width: 100%;
  }

  .drop-down-item :global(a:hover),
  .drop-down-item :global(a:focus) {
    background-color: var(--select-color, #3396ff);
    color: var(--select-text-color, #fff);
    text-decoration: none;
  }

  .drop-down-item :global(button.link) {
    background-color: transparent;
    border: none;
    color: inherit;
    display: block;
    cursor: pointer;
    text-align: left;
    padding: calc(var(--element-padding, 2rem) / 4) var(--element-padding, 2rem);
    width: 100%;
  }

  .drop-down-item :global(button.link:hover),
  .drop-down-item :global(button.link:focus) {
    background-color: var(--select-color, #3396ff);
    color: var(--select-text-color, #fff);
    text-decoration: none;
  }
</style>
