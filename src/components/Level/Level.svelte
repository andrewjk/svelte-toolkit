<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="Level.scss">

</style>

<div
  {id}
  class={['level', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
