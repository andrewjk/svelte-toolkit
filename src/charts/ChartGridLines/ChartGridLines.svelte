<script>
  export let showHLines = false;
  export let showVLines = false;

  export let width = 0;

  export let labels = [];
  export let xStepValue = 0;
  export let xStepLabels = [];
  export let yStepValue = 0;
  export let yStepLabels = [];
  export let itemWidth = 0;
  export let valueHeight = 0;

  export let chartLeft = 0;
  export let chartBottom = 0;

  export let type = "bar";
</script>

<style>
  /* These styles were automatically generated from ChartGridLines.scss */
  .chart-gridline {
    stroke: var(--light-border-color, #aaa);
    stroke-width: 1px;
  }
</style>

{#if showHLines}
  {#each yStepLabels as label, i}
    <line
      class="chart-gridline"
      x1={chartLeft}
      y1={chartBottom - i * yStepValue * valueHeight}
      x2={width}
      y2={chartBottom - i * yStepValue * valueHeight} />
  {/each}
{/if}

{#if showVLines}
  {#if xStepLabels.length && xStepValue}
    {#each xStepLabels as label, i}
      <line
        class="chart-gridline"
        x1={chartLeft + i * xStepValue * itemWidth}
        y1={chartBottom}
        x2={chartLeft + i * xStepValue * itemWidth}
        y2={0} />
    {/each}
  {:else}
    {#each labels as label, i}
      <line
        class="chart-gridline"
        x1={chartLeft + i * itemWidth + (type === 'bar' ? 0 : itemWidth / 2)}
        y1={chartBottom}
        x2={chartLeft + i * itemWidth + (type === 'bar' ? 0 : itemWidth / 2)}
        y2={0} />
    {/each}
  {/if}
{/if}
