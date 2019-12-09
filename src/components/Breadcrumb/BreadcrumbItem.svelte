<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let href;
  export let current = null;
</script>

<style>
  li {
    display: inline;
  }

  li + li:before {
    content: " / ";
  }
</style>

<li {id} class={['breadcrumb-item', className].filter(Boolean).join(' ')}>
  {#if current}
    <span>
      <slot />
    </span>
  {:else}
    <a {href} aria-current={current ? 'page' : ''}>
      <slot />
    </a>
  {/if}
</li>
