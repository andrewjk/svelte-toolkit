<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let size = "medium";
  export let value = 0;
  export let total = 100;

  $: percent = Math.min(value / total * 100, 100)
</script>

<style>
  /* These styles were automatically generated from Progress.scss */
  .progress {
    background-color: var(--light-back-color, #fafafa);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    height: 1.5rem;
    line-height: 1.5rem;
    margin: 0 0 var(--element-margin, 1.5rem);
    overflow: hidden;
  }

  .progress:last-child {
    margin: 0;
  }

  .progress-bar {
    background-color: rgba(0, 0, 0, 0.3);
    float: left;
    font-size: 1.2rem;
    height: 100%;
    line-height: 1.5rem;
    text-align: center;
    transition: width 0.4s ease;
    width: 0;
  }

  .progress.small {
    height: 0.8rem;
  }

  .progress.medium {
    height: 1.5rem;
  }

  .progress.large {
    height: 2.2rem;
  }

  .progress.primary .progress-bar {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .progress.info .progress-bar {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .progress.success .progress-bar {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .progress.warning .progress-bar {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .progress.danger .progress-bar {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }
</style>

<div {id} class={['progress', type, size, className].filter(Boolean).join(' ')}>
  <div class="progress-bar" style={`width: ${percent}%`}/>
</div>
