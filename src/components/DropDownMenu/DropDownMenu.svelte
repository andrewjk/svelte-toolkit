<script>
  import { getContext, setContext, tick } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let position;

  var context = getContext("dropdownmenu");
  if (context) {
    position = context.position;
  }
  /*
  export let position = "below";
  export let alignment = "left";

  let expanded = false;
  let container;
  let button;
  let menu;

  function toggleDropDown(e) {
    if (e) e.preventDefault();
    expanded = !expanded;
    if (expanded) {
      positionList();
      document.addEventListener("click", handleCloseClick);
    } else {
      document.removeEventListener("click", handleCloseClick);
    }
  }

  function handleCloseClick(e) {
    if (!container.contains(e.target)) {
      toggleDropDown();
    }
  }

  async function positionList() {
    await tick();
    // TODO: Take into account window width in case the menu would be outside the bounds
    var rect = button.getBoundingClientRect();
    var menuRect = menu.getBoundingClientRect();
    switch (position) {
      case "above":
        menu.style.bottom = rect.height + "px";
        break;
      case "below":
        menu.style.top = rect.height + "px";
        break;
    }
    switch (alignment) {
      case "left":
        menu.style.left = "0px";
        break;
      case "center":
        menu.style.left = rect.width / 2 - menuRect.width / 2 + "px";
        break;
      case "right":
        menu.style.left = rect.width - menuRect.width + "px";
        break;
    }
  }*/
</script>

<style src="DropDownMenu.scss">

</style>

<div
  {id}
  class={['drop-down-menu', position, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</div>
