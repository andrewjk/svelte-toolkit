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

<style>
  /* These styles were automatically generated from DropDownMenu.scss */
  .drop-down-menu {
    background-color: var(--list-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    color: var(--list-text-color, rgba(0, 0, 0, 0.7));
    list-style: none;
    margin: 0;
    padding: calc(var(--element-padding, 2rem) / 2) 0;
    position: absolute;
    width: 20rem;
    z-index: 10000;
  }

  .drop-down-menu.start {
    left: 0;
    right: auto;
  }

  .drop-down-menu.end {
    left: auto;
    right: 0;
    text-align: right;
  }
</style>
