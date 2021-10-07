<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let content = "";
</script>

<style>
  /* These styles were automatically generated from Badge.scss */
  .badge {
    background-color: var(--light-back-color, #fafafa);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: 2rem;
    display: inline-block;
    font-weight: bold;
    font-size: var(--font-size-small, 1.1rem);
    margin: 0 calc(var(--element-margin, 1.5rem) / 4);
    padding: 0 calc(var(--element-padding, 2rem) / 4);
    text-align: center;
    vertical-align: top;
  }

  .badge.boxed {
    border-radius: 4px;
  }

  .badge.primary,
  .badge.info,
  .badge.success,
  .badge.warning,
  .badge.danger {
    border: 1px solid rgba(0, 0, 0, 0.06);
    color: white;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
  }

  .badge.primary {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .badge.info {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .badge.success {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .badge.warning {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .badge.danger {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }

  .badge.cancel {
    background-color: var(--cancel-color, #949494);
  }
</style>

<span {id} class={['badge', type, className].filter(Boolean).join(' ')}>
  <slot>{content}</slot>
</span>
