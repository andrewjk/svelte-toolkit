<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let href = "";
  export let title = "";
  export let src = "";
  export let alt = "";
</script>

<a
  {id}
  class={['nav-logo', className].filter(Boolean).join(' ')}
  {href}
  {title}>
  <img class="nav-logo-image" {src} {alt} />
</a>
