<script>
  import { createEventDispatcher } from "svelte";

  import ImageButton from "../ImageButton/ImageButton.svelte";
  import Cross from "../../icons/Cross/Cross.svelte";

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

{#if visible}
  <span {id} class={["tag", type, className].filter(Boolean).join(" ")}>
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

<style>
  /* These styles were automatically generated from Tag.scss */
  .tag {
    background-color: var(--light-back-color, #fafafa);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: 4px;
    font-weight: bold;
    font-size: 1.3rem;
    line-height: 1.6;
    margin-right: calc(var(--element-margin, 1.5rem) / 4);
    padding: 0 calc(var(--element-padding, 2rem) / 4);
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .tag.primary,
  .tag.info,
  .tag.success,
  .tag.warning,
  .tag.danger {
    border: 1px solid rgba(0, 0, 0, 0.06);
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
  }

  .tag.primary {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .tag.info {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .tag.success {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .tag.warning {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .tag.danger {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }

  .tag.cancel {
    background-color: var(--cancel-color, #949494);
  }

  .tag-close {
    margin-left: calc(var(--element-margin, 1.5rem) / 4);
    margin-right: calc(var(--element-margin, 1.5rem) * -1 / 4);
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
