<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<style>
  /* These styles were automatically generated from PageFooter.scss */
  .page-footer {
    background-color: var(--footer-back-color, #fafafa);
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    color: var(--footer-text-color, rgba(0, 0, 0, 0.7));
    display: table;
    line-height: var(--footer-line-height, 4rem);
    padding: 0 var(--element-padding, 2rem);
    width: 100%;
  }
</style>

<footer
  {id}
  class={['page-footer', className].filter(Boolean).join(' ')}>
  <slot />
</footer>
