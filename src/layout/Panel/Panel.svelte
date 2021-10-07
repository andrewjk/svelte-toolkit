<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "";
</script>

<style>
  /* These styles were automatically generated from Panel.scss */
  .panel {
    background-color: white;
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    margin: 0 0 var(--element-margin, 1.5rem);
    padding: var(--element-padding, 2rem);
    width: 100%;
  }

  .panel:last-child {
    margin-bottom: 0;
  }

  .panel.transparent {
    background-color: transparent;
  }

  .panel.light {
    background-color: var(--light-back-color, #fafafa);
  }

  .panel.dark {
    background-color: var(--dark-back-color, #888);
    border-color: var(--dark-back-color, #888);
    color: white;
  }

  .panel.primary {
    background-color: var(--primary-color, #fd3f92);
    border-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .panel.info {
    background-color: var(--info-color, #4d90fe);
    border-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .panel.success {
    background-color: var(--success-color, #00a852);
    border-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .panel.warning {
    background-color: var(--warning-color, #f3c42e);
    border-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .panel.danger {
    background-color: var(--danger-color, #ee2e24);
    border-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }
</style>

<div
  {id}
  class={['panel', type, className].filter(Boolean).join(' ')}>
  <slot />
</div>
