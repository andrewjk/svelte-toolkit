<script>
  import { createEventDispatcher } from "svelte";

  import ImageButton from "../ImageButton/ImageButton";
  import Cross from "../../icons/Cross";

  export let id = null;
  let className = null;
  export { className as class };

  export let type = "info";
  export let content = "";
  export let closable = false;

  const dispatch = createEventDispatcher();

  let visible = true;

  function close() {
    visible = false;
    dispatch("close");
  }
</script>

<style src="Tag.scss">

</style>

{#if visible}
  <span
    {id}
    class={['tag', type, className].filter(Boolean).join(' ')}>
    <slot>{content}</slot>
    {#if closable}
      <div class="tag-close">
        <ImageButton size="small" on:click={close}>
          <slot name="button">
            <Cross />
          </slot>
        </ImageButton>
      </div>
    {/if}
  </span>
{/if}
