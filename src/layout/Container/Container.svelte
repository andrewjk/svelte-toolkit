<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let size = null;
  export let padded = false;
  export let paddedsm = false;
  export let paddedmd = false;
  export let paddedlg = false;
  export let paddedxl = false;
</script>

<style>
  /* These styles were automatically generated from Container.scss */
  .container {
    margin: 0 auto;
    max-width: 120rem;
    width: 100%;
  }

  .container.small {
    max-width: 480px;
  }

  .container.medium {
    max-width: 760px;
  }

  .container.large {
    max-width: 1040px;
  }

  .container.xlarge {
    max-width: 1320px;
  }

  .container.padded {
    padding: var(--element-padding, 2rem);
  }

  @media (min-width: 480px) {
    .container.padded-sm {
      padding: var(--element-padding, 2rem);
    }
  }

  @media (min-width: 760px) {
    .container.padded-md {
      padding: var(--element-padding, 2rem);
    }
  }

  @media (min-width: 1040px) {
    .container.padded-lg {
      padding: var(--element-padding, 2rem);
    }
  }

  @media (min-width: 1320px) {
    .container.padded-xl {
      padding: var(--element-padding, 2rem);
    }
  }
</style>

<div
  {id}
  class={['container', size, className].filter(Boolean).join(' ')}
  class:padded
  class:padded-sm={paddedsm}
  class:padded-md={paddedmd}
  class:padded-lg={paddedlg}
  class:padded-xl={paddedxl}>
  <slot />
</div>
