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

<style src="ChevronLeft.scss">
</style>
