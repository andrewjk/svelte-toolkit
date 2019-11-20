<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="Card.scss">

</style>

<div
  {id}
  class={['card', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
