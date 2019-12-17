<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let width = null;
  export let smwidth = null;
  export let mdwidth = null;
  export let lgwidth = null;
  export let xlwidth = null;

  export let order = null;
  export let smorder = null;
  export let mdorder = null;
  export let lgorder = null;
  export let xlorder = null;

  export let nowrap = false;
  export let smnowrap = false;
  export let mdnowrap = false;
  export let lgnowrap = false;
  export let xlnowrap = false;

  export let spaced = null;

  const context = getContext("grid");
  if (context) {
    spaced = context.spaced;
  }
</script>

<!-- HACK: global because we're putting classes together with strings -->
<style src="GridItem.scss" global>

</style>

<div
  {id}
  class={
    [
      'grid-item',
      width ? 'width-' + width : null,
      smwidth ? 'sm-width-' + smwidth : null,
      mdwidth ? 'md-width-' + mdwidth : null,
      lgwidth ? 'lg-width-' + lgwidth : null,
      xlwidth ? 'xl-width-' + xlwidth : null,
      order ? 'order-' + order : null,
      smorder ? 'sm-order-' + smorder : null,
      mdorder ? 'md-order-' + mdorder : null,
      lgorder ? 'lg-order-' + lgorder : null,
      xlorder ? 'xl-order-' + xlorder : null,
      nowrap ? 'nowrap' : null,
      smnowrap ? 'sm-nowrap' : null,
      mdnowrap ? 'md-nowrap' : null,
      lgnowrap ? 'lg-nowrap' : null,
      xlnowrap ? 'xl-nowrap' : null,
      spaced ? 'spaced' : null,
      className
    ]
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
