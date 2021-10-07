<script>
  import { createEventDispatcher, getContext } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  import Tag from "../Tag/Tag.svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let index = 0;
  export let type = null;

  const dispatch = createEventDispatcher();

  function handleClose(e) {
    dispatch("close", index);
  }
</script>

<Tag
  {id}
  class={["tag-input-value", className].filter(Boolean).join(" ")}
  {type}
  closable={true}
  on:close={handleClose}
>
  <slot />
</Tag>

<style>
  /* These styles were automatically generated from TagInputValue.scss */
  :global(.tag-input-value) {
    line-height: calc(var(--input-height, 3.2rem) - 12px) !important;
    margin: 4px 0 4px 4px;
  }
</style>
