<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let span = null;
  export let smspan = null;
  export let mdspan = null;
  export let lgspan = null;
  export let xlspan = null;

  // TODO: Order doesn't work in CSS grid
  //export let order = null;
  //export let smorder = null;
  //export let mdorder = null;
  //export let lgorder = null;
  //export let xlorder = null;
</script>

<!-- HACK: global because we're putting classes together with strings -->
<style src="GridItem.scss" global>

</style>

<div
  {id}
  class={[
      'grid-item',
      span ? 'span-' + span : null,
      smspan ? 'sm-span-' + smspan : null,
      mdspan ? 'md-span-' + mdspan : null,
      lgspan ? 'lg-span-' + lgspan : null,
      xlspan ? 'xl-span-' + xlspan : null,
      //order ? 'order-' + order : null,
      //smorder ? 'sm-order-' + smorder : null,
      //mdorder ? 'md-order-' + mdorder : null,
      //lgorder ? 'lg-order-' + lgorder : null,
      //xlorder ? 'xl-order-' + xlorder : null,
      className
    ]
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
