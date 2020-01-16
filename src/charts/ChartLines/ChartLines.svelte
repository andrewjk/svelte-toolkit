<script>
  export let showHLines = false;
  //export let showVLines = false;

  export let width = 0;

  export let stepValue = 0;
  export let stepLabels = [];
  export let valueHeight = 0;

  export let chartLeft = 0;
  export let chartBottom = 0;

  //export let type = "bar";
</script>

<style src="ChartLines.scss">

</style>

{#if showHLines}
  {#each stepLabels as label, i}
    <line
      class="chart-line"
      x1={chartLeft}
      y1={chartBottom - i * stepValue * valueHeight}
      x2={width}
      y2={chartBottom - i * stepValue * valueHeight} />
  {/each}
{/if}
