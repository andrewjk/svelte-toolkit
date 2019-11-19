<script>
  import { getContext, setContext } from "svelte";

  import ChevronDown from "../../icons/ChevronDown.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let active = false;

  let expanded = false;

  // HACK: To avoid an accessibility warning - but I think it's fine to use an anchor with href="#" on a drop-down?
  const href = "#";

  var context = getContext("navmenu");
  if (context) {
    setContext("dropdownmenu", {
      position: context.position
    });
  }

  function showDropDown() {
    expanded = true;
  }

  function hideDropDown() {
    expanded = false;
  }

  function toggleDropDown() {
    expanded = !expanded;
  }

  function handleMouseEnter(e) {
    showDropDown();
  }

  function handleMouseLeave(e) {
    hideDropDown();
  }

  function handleMouseDown(e) {
    toggleDropDown();
  }

  function handleTouchStart(e) {
    // NOTE: These seem both to be required to prevent the mouse events from being fired on touch screens:
    e.preventDefault();
    e.stopPropagation();
    toggleDropDown();
  }
</script>

<style src="NavMenuDropDown.scss">

</style>

<li
  {id}
  class={['nav-menu-drop-down', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  class:active
  role="menuitem"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}>
  <a
    {href}
    class="nav-menu-link"
    aria-haspopup="true"
    on:mousedown={handleMouseDown}
    on:touchstart={handleTouchStart}>
    <slot />
    <slot name="button">
      <ChevronDown />
    </slot>
  </a>
  {#if expanded}
    <slot name="menu" />
  {/if}
</li>
