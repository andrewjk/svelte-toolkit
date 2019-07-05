<script>
  import { createEventDispatcher, getContext } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  import Tag from "../Tag/Tag.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let index = 0;

  const dispatch = createEventDispatcher();

  function handleClose(e) {
    dispatch("close", index);
  }
</script>

<Tag {id} class={className} {classNames} closable={true} on:close={handleClose}>
  <slot />
</Tag>
