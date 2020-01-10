<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<tbody
  {id}
  class={className}>
  <slot />
</tbody>
