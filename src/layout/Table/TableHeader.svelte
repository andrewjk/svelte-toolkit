<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<thead
  {id}
  class={className}>
  <slot />
</thead>
