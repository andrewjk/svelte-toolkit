<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let ariaLabel = "";
</script>

<nav
  {id}
  class={["breadcrumb", className].filter(Boolean).join(" ")}
  aria-label="{ariaLabel}}"
>
  <ol>
    <slot />
  </ol>
</nav>

<style src="Breadcrumb.scss">
</style>
