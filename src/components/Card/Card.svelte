<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = null;
</script>

<style>
  /* These styles were automatically generated from Card.scss */
  .card {
    background-color: white;
    border: 1px solid var(--border-color, #d2d2d2);
    margin: -1px 0;
    padding: var(--element-padding, 2rem);
  }

  .card.transparent {
    background-color: transparent;
  }

  .card.light {
    background-color: var(--light-back-color, #fafafa);
  }

  .card.dark {
    background-color: var(--dark-back-color, #888);
    border-color: var(--dark-back-color, #888);
    color: white;
  }

  .card.primary :global(a),
  .card.info :global(a),
  .card.success :global(a),
  .card.warning :global(a),
  .card.danger :global(a) {
    color: inherit;
    border-bottom: 1px solid;
  }

  .card.primary :global(a:hover),
  .card.primary :global(a:focus),
  .card.info :global(a:hover),
  .card.info :global(a:focus),
  .card.success :global(a:hover),
  .card.success :global(a:focus),
  .card.warning :global(a:hover),
  .card.warning :global(a:focus),
  .card.danger :global(a:hover),
  .card.danger :global(a:focus) {
    border-bottom: 1px double;
  }

  .card.primary {
    background-color: var(--light-primary-color, #fff5fa);
    border: 1px solid var(--light-primary-border-color, #fd3f92);
    color: var(--light-primary-text-color, #f4036c);
  }

  .card.info {
    background-color: var(--light-info-color, #f6f9ff);
    border: 1px solid var(--light-info-border-color, #4d90fe);
    color: var(--light-info-text-color, #0563fe);
  }

  .card.success {
    background-color: var(--light-success-color, #eefff6);
    border: 1px solid var(--light-success-border-color, #00a852);
    color: var(--light-success-text-color, #008340);
  }

  .card.warning {
    background-color: var(--light-warning-color, #fefcf5);
    border: 1px solid var(--light-warning-border-color, #f3c42e);
    color: var(--light-warning-text-color, #b28a0a);
  }

  .card.danger {
    background-color: var(--light-danger-color, #fef5f4);
    border: 1px solid var(--light-danger-border-color, #ee2e24);
    color: var(--light-danger-text-color, #c6180f);
  }
</style>

<div
  {id}
  class={['card', type, className].filter(Boolean).join(' ')}>
  <slot />
</div>
