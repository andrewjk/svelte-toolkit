<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let rotate = false;
</script>

<svg
  {id}
  class={["icon", className].filter(Boolean).join(" ")}
  class:rotate
  viewBox="0 0 100 100"
  stroke-width="20"
>
  <g>
    <circle cx="50" cy="50" r="40" fill="none" opacity="0.3" />
    <path d="M 22 22 A 40 40 0 0 1 78 22" fill="none" />
  </g>
</svg>

<style>
  /* These styles were automatically generated from Loading.scss */
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
