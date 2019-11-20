<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "";
</script>

<style src="Panel.scss">

</style>

<div
  {id}
  class={['panel', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
