<script>
  import DropDownMenuItem from "./DropDownMenuItem";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let active = false;

  export let href;
</script>

<style src="DropDownMenuLink.scss">

</style>

<DropDownMenuItem {id} class={className} {classNames} {active}>
  <a class="drop-down-menu-link" {href}>
    <slot />
  </a>
</DropDownMenuItem>
