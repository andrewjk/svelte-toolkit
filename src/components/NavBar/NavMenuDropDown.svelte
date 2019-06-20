<script>
  import ChevronDown from "../Icons/ChevronDown.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let active = false;
  export let expanded = false;

  // HACK: To avoid an accessibility warning - but I think it's fine to use an anchor with href="#" on a drop-down?
  const href = "#";

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

<style>

</style>

<li
  {id}
  class={['nav-menu-item', 'nav-menu-drop-down', className]
    .filter(Boolean)
    .join(' ')}
  class:active
  role="menuitem"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}>
  <a
    {href}
    aria-haspopup="true"
    on:mousedown={handleMouseDown}
    on:touchstart={handleTouchStart}>
    <slot />
    <ChevronDown />
  </a>
  {#if expanded}
    <div class="drop-down-menu">
      <slot name="menu" />
    </div>
  {/if}
</li>
