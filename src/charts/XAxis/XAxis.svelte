<script>
  export let showAxis = true;

  export let height = 0;
  export let width = 0;
  export let itemWidth = 0;
  export let textHeight = 0;

  export let xLabel = "";
  export let labels = [];

  export let stepLabels = [];
  export let stepValue = 0;

  export let chartLeft = 0;
  export let chartBottom = 0;

  //export let type = "bar";

  $: chartLabelBottom = xLabel ? height - textHeight : height;
</script>

<style src="XAxis.scss">

</style>

{#if showAxis}
  <line
    class="chart-axis"
    x1={chartLeft}
    y1={chartBottom}
    x2={width}
    y2={chartBottom} />
{/if}
{#if xLabel}
  <text
    text-anchor="middle"
    dominant-baseline="text-after-edge"
    x={width - (width - chartLeft) / 2}
    y={height}>
    {xLabel}
  </text>
{/if}
{#if stepLabels.length && stepValue}
  {#each stepLabels as label, i}
    <text
      text-anchor="middle"
      dominant-baseline="text-after-edge"
      x={chartLeft + i * stepValue * itemWidth}
      y={chartLabelBottom}>
      {label}
    </text>
  {/each}
{:else}
  {#each labels as label, i}
    <text
      text-anchor="middle"
      dominant-baseline="text-after-edge"
      x={chartLeft + itemWidth * i + itemWidth / 2}
      y={chartLabelBottom}>
      {label}
    </text>
  {/each}
{/if}
