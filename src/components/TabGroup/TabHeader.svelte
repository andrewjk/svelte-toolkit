<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let itemId;
  let className = null;
  export { className as class };
  export let active = false;
  export let boxed = false;

  // ID in this case is a special prop that can't be set by the user because it's used for aria fields
  let id = `${itemId}-header`;

  const dispatch = createEventDispatcher();

  // Register this item with the parent TabGroup, which will handle toggling active for all items
  const context = getContext("tabgroup");
  boxed = context.boxed;
  const { registerHeader, toggleItemId, handleKey } = context;
  registerHeader(id, setActive);

  // This function is called by the parent TabGroup to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChange", value);
    }
  }

  function handleClick() {
    toggleItemId(itemId);
  }
</script>

<button
  {id}
  class={["button", "tab-list-button", boxed ? "boxed" : null, className]
    .filter(Boolean)
    .join(" ")}
  class:active
  type="button"
  role="tab"
  aria-selected={active}
  tabindex="-1"
  aria-controls={itemId}
  on:click={handleClick}
  on:keydown={handleKey}
>
  <slot />
</button>

<style>
  /* These styles were automatically generated from TabHeader.scss */
  .button {
    background-color: var(--button-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    color: var(--button-text-color, rgba(0, 0, 0, 0.7));
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .button:focus {
    background-color: var(--button-hover-color, #cccccc);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    outline: 0;
  }

  .button:hover {
    background-color: var(--button-hover-color, #cccccc);
  }

  /* Remove the black dotted focus border in Firefox */
  .button::-moz-focus-inner {
    border: 0;
  }

  .tab-list-button {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--border-color, #d2d2d2);
    font-size: var(--font-size-title, 1.6rem);
    margin-bottom: -1px;
    padding: calc(var(--element-padding, 2rem) / 2) var(--element-padding, 2rem);
  }

  .tab-list-button:hover,
  .tab-list-button:focus {
    box-shadow: none;
  }

  .tab-list-button.active {
    border-bottom: 1px solid var(--active-color, #ffa500);
  }

  .tab-list-button.boxed {
    border: 1px solid transparent;
    border-radius: var(--border-radius, 2px) var(--border-radius, 2px) 0 0;
    z-index: 500;
  }

  .tab-list-button.boxed.active {
    border: 1px solid var(--border-color, #d2d2d2);
    border-bottom-color: white;
  }
</style>
