<script>
  export let id = null;
  export let className = null;
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
