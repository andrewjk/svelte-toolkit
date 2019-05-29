<script>
  export let id = null;
  export let className = null;
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
