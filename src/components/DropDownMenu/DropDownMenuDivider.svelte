<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style>
  /* These styles were automatically generated from DropDownMenuDivider.scss */
  .drop-down-menu-divider {
    margin: calc(var(--element-margin, 1.5rem) / 4) var(--element-margin, 1.5rem);
    border-bottom: 1px solid var(--border-color, #d2d2d2);
  }
</style>

<div
  {id}
  class={['drop-down-menu-divider', className].filter(Boolean).join(' ')}>
</div>
