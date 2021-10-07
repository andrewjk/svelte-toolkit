<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<svg
  {id}
  class={["icon", className].filter(Boolean).join(" ")}
  viewBox="0 0 100 100"
  stroke-width="12"
>
  <g>
    <path d="M70,10 L30,50 L70,90" fill="none" />
  </g>
</svg>

<style>
  /* These styles were automatically generated from ChevronLeft.scss */
  .icon {
    display: inline-block;
    max-width: 1em;
    width: 100%;
    stroke: currentColor;
    fill: currentColor;
  }

  .icon.rotate {
    animation: rotation .6s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
