<script>
  import { getContext, setContext, tick } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let position = null;

  var context = getContext("dropdownmenu");
  if (context) {
    position = context.position;
  }
</script>

<style src="DropDownMenu.scss">

</style>

<div
  {id}
  class={['drop-down-menu', position, className].filter(Boolean).join(' ')}>
  <slot />
</div>
