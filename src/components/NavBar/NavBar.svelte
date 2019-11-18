<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let position = "";
</script>

<style src="NavBar.scss" global>

</style>

<div
  {id}
  class={['nav-bar', className].concat(classNames).filter(Boolean).join(' ')}
  class:start={position === "start"}
  class:end={position === "end"}
  role="navigation">
  <slot/>
</div>
