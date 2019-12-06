<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = null;
</script>

<style src="Card.scss">

</style>

<div
  {id}
  class={['card', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
