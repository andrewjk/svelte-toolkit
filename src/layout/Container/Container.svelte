<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let size = null;
  export let padded = false;
  export let paddedsm = false;
  export let paddedmd = false;
  export let paddedlg = false;
  export let paddedxl = false;
</script>

<style src="Container.scss">

</style>

<div
  {id}
  class={['container', size, className].filter(Boolean).join(' ')}
  class:padded
  class:padded-sm={paddedsm}
  class:padded-md={paddedmd}
  class:padded-lg={paddedlg}
  class:padded-xl={paddedxl}>
  <slot />
</div>
