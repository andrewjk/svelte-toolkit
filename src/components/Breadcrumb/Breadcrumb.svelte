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

<style>
  /* These styles were automatically generated from Breadcrumb.scss */
  .breadcrumb ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
