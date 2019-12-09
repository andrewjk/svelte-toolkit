<script>
  export let id = null;
  let className = null;
  export { className as class };

  export let position = null;
</script>

<style src="LevelItem.scss">

</style>

<div
  {id}
  class={['level-item', position, className].filter(Boolean).join(' ')}>
  <slot />
</div>
