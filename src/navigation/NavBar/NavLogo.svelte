<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let href = "";
  export let title = "";
  export let src = "";
  export let alt = "";
  export let height = undefined;
  export let width = undefined;
</script>

<style>
  /* These styles were automatically generated from NavLogo.scss */
  .nav-logo {
    margin-right: calc(var(--element-margin, 1.5rem) / 2);
  }

  .nav-logo img {
    vertical-align: middle;
  }
</style>

<a
  {id}
  class={['nav-logo', className].filter(Boolean).join(' ')}
  {href}
  {title}>
  <img class="nav-logo-image" {src} {alt} {height} {width} />
</a>
