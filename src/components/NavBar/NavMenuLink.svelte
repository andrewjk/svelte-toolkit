<script>
  import NavMenuItem from "./NavMenuItem";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let active = false;

  export let href;
</script>

<style src="NavMenuLink.scss">

</style>

<NavMenuItem {id} class={className} {classNames} {active}>
  <a class="nav-menu-link" {href}>
    <slot />
  </a>
</NavMenuItem>
