<script>
  export let href;
  export let current = null;
</script>

<style>
  li {
    display: inline;
  }

  li+li:before {
    content: ' / '
  }
</style>

<li>
  <a {href} aria-current={current ? 'page' : ''}>
    <slot />
  </a>
</li>
