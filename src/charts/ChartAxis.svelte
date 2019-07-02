<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let x1 = 0;
  export let x2 = 0;
  export let y1 = 0;
  export let y2 = 0;
  export let step = 20;
  export let labels = [];
</script>

<line
  {id}
  class={['chart-axis', className].filter(Boolean).join(' ')}
  {x1}
  {y1}
  {x2}
  {y2} />
{#each labels as label, index}
  <text text-anchor="middle" x={x1 + step * index + step / 2} y={y1 + 20}>{label}</text>
{/each}
