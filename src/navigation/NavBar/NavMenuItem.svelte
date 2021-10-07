<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let active = false;
</script>

<style>
  /* These styles were automatically generated from NavMenuItem.scss */
  .nav-menu-item {
    display: inline-block;
    font-size: var(--font-size-title, 1.6rem);
    margin: 0;
    padding: 0;
    position: relative;
    white-space: nowrap;
  }

  .nav-menu-item :global(a) {
    background-color: var(--nav-bar-item-back-color, transparent);
    color: var(--nav-bar-item-text-color, #222);
    padding: calc(var(--element-padding, 2rem) / 4) var(--element-padding, 2rem);
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .nav-menu-item :global(a:hover),
  .nav-menu-item :global(a:focus) {
    background-color: var(--nav-bar-item-hover-back-color, rgba(0, 0, 0, 0.1));
    color: var(--nav-bar-item-hover-text-color, #222);
  }

  .nav-menu-item.active:after {
    background-color: var(--active-color, #ffa500);
    content: " ";
    display: block;
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: -1px;
    left: 0;
  }
</style>

<li
  role="menuitem"
  {id}
  class={['nav-menu-item', className].filter(Boolean).join(' ')}
  class:active>
  <slot />
</li>
