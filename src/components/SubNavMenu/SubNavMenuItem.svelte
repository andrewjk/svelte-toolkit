<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "";
</script>

<li
  {id}
  class={['sub-nav-menu-item', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  role="menuitem">
  <slot />
</li>
