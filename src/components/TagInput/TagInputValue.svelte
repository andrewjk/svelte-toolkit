<script>
  import { createEventDispatcher, getContext } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  import Tag from "../Tag/Tag";

  export let id = null;
  let className = null;
  export { className as class };

  export let index = 0;

  const dispatch = createEventDispatcher();

  function handleClose(e) {
    dispatch("close", index);
  }
</script>

<style src="TagInputValue.scss">

</style>

<Tag
  {id}
  class={['tag-input-value', className].filter(Boolean).join(' ')}
  closable={true}
  on:close={handleClose}>
  <slot />
</Tag>
