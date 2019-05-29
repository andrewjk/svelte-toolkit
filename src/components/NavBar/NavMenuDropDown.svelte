<script>
  import ChevronDown from "../Icons/ChevronDown";

  export let id = null;
  export let className = null;
  export let active = false;
  export let expanded = false;

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

<div
  {id}
  class={['nav-menu-item', 'nav-menu-drop-down', className].filter(Boolean).join(' ')}
  class:active
  role="menuitem"
  aria-haspopup="true"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}>
  <a href="#" on:mousedown={handleMouseDown} on:touchstart={handleTouchStart}>
    <slot />
    <ChevronDown />
  </a>
  {#if expanded}
    <div class="drop-down-menu">
      <slot name="menu" />
    </div>
  {/if}
</div>
