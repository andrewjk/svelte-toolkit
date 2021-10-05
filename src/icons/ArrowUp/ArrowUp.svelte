<script>
  export let id = null;
  let className = null;
  export { className as class };
</script>

<svg
  {id}
  class={["icon", className].filter(Boolean).join(" ")}
  viewBox="0 0 100 100"
  stroke-linejoin="round"
  stroke-width="12"
>
  <g>
    <polygon points="25,60 50,30 75,60" />
  </g>
</svg>

<style src="ArrowUp.scss">
</style>
