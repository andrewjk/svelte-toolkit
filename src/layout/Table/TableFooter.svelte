<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<tfoot
  {id}
  class={className}>
  <slot />
</tfoot>
