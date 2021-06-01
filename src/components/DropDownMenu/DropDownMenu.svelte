<script>
  import { getContext, setContext, createEventDispatcher } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let position = null;

  const dispatch = createEventDispatcher();

  // Get the horizontal position from the context (e.g. if this menu is used
  // in a NavMenuDropDown at the end of the NavMenu it will inherit the "end"
  // position)
  var context = getContext("dropdownmenu");
  if (context) {
    position = context.position;
  }

  // Pass the handleClick method to DropDownMenuItems so that we can pass along
  // a change method
  setContext("dropdownmenuitem", {
    handleClick: () => {
      dispatch("change");
    },
  });
</script>

<div
  {id}
  class={["drop-down-menu", position, className].filter(Boolean).join(" ")}
>
  <slot />
</div>

<style src="DropDownMenu.scss">
</style>
