<script>
  export let showAxis = true;

  export let valueHeight = 0;
  export let textHeight = 0;

  export let yLabel = "";
  export let stepLabels = [];
  export let stepValue = 0;

  export let chartLeft = 0;
  export let chartBottom = 0;
</script>

<style src="YAxis.scss">

</style>

{#if showAxis}
  <line
    class="chart-axis"
    x1={chartLeft}
    y1={chartBottom}
    x2={chartLeft}
    y2={0} />
{/if}
{#if yLabel}
  <text
    text-anchor="middle"
    dominant-baseline="hanging"
    x={0}
    y={chartBottom / 2}
    transform={`rotate(-90, ${0}, ${chartBottom / 2})`}>
    {yLabel}
  </text>
{/if}
{#each stepLabels as label, i}
  <text
    text-anchor="end"
    dominant-baseline="middle"
    x={chartLeft - textHeight / 4}
    y={chartBottom - i * stepValue * valueHeight}>
    {label}
  </text>
{/each}
