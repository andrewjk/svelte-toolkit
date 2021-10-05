<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let href;
  export let current = null;
</script>

<li {id} class={["breadcrumb-item", className].filter(Boolean).join(" ")}>
  {#if current}
    <span>
      <slot />
    </span>
  {:else}
    <a {href} aria-current={current ? "page" : ""}>
      <slot />
    </a>
  {/if}
</li>

<style src="BreadcrumbItem.scss">
</style>
