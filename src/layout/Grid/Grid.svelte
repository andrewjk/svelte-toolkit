<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let cols = null;
  export let smcols = null;
  export let mdcols = null;
  export let lgcols = null;
  export let xlcols = null;

  export let spaced = null;
</script>

<div
  {id}
  class={[
    "grid",
    spaced ? "spaced" : null,
    cols ? "cols-" + cols : null,
    smcols ? "sm-cols-" + smcols : null,
    mdcols ? "md-cols-" + mdcols : null,
    lgcols ? "lg-cols-" + lgcols : null,
    xlcols ? "xl-cols-" + xlcols : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")}
>
  <slot />
</div>

<!-- HACK: global because we're putting classes together with strings -->
<style src="Grid.scss" global>
</style>
