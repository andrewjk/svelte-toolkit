<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let content = "";
  export let type = "";
</script>

{#if content}
  <div
    {id}
    class={["field-message", type, className].filter(Boolean).join(" ")}
  >
    <slot>{content}</slot>
  </div>
{/if}

<style>
  /* These styles were automatically generated from FieldMessage.scss */
  .field-message {
    color: var(--label-text-color, #777);
    font-size: 1.3rem;
    margin: calc(var(--element-margin, 1.5rem) / 4) 0 0;
  }

  .field-message.info {
    color: var(--info-color, #4d90fe);
  }

  .field-message.success {
    color: var(--success-color, #00a852);
  }

  .field-message.warning {
    color: var(--warning-color, #f3c42e);
  }

  .field-message.danger {
    color: var(--danger-color, #ee2e24);
  }
</style>
