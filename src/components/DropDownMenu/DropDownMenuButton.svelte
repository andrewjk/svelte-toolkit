<script>
  import DropDownMenuItem from "./DropDownMenuItem";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let active = false;
</script>

<style src="DropDownMenuButton.scss">

</style>

<DropDownMenuItem {id} class={className} {classNames} {active}>
  <button class="drop-down-menu-button" on:click>
    <slot />
  </button>
</DropDownMenuItem>
