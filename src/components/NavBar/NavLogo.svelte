<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let href = "";
  export let title = "";
  export let src = "";
  export let alt = "";
  export let height = undefined;
  export let width = undefined;
</script>

<style src="NavLogo.scss">

</style>

<a
  {id}
  class={['nav-logo', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  {href}
  {title}>
  <img class="nav-logo-image" {src} {alt} {height} {width} />
</a>
