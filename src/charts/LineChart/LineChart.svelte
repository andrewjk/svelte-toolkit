<script>
  import { onMount } from "svelte";
  import XAxis from "../XAxis/XAxis";
  import YAxis from "../YAxis/YAxis";
  import ChartGridLines from "../ChartGridLines/ChartGridLines";
  import {
    calculateMaxValue,
    calculateStepValue,
    calculateStepLabels,
    calculateItemWidth,
    calculateValueHeight,
    calculateChartBottom,
    calculateChartLeft
  } from "../../utils/chart-utils";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };

  export let height = 200;
  export let width = 400;

  export let xLabel = "";
  export let yLabel = "";

  export let labels = [];
  export let color = "";
  export let data = [];
  export let series = [];

  export let stepCount = 2;
  export let stepValue = 0;

  export let showPoints = true;
  export let showXAxis = true;
  export let showYAxis = true;
  export let showHLines = false;
  export let showVLines = false;

  let container;
  let measurer;
  let textWidth = 0;
  let textHeight = 0;

  $: calculatedWidth = !width && container ? container.clientWidth : width;
  $: calculatedSeries = data ? [{ color, data }] : series;
  $: maxValue = calculateMaxValue(data, calculatedSeries, stepCount);
  $: calculatedStepValue = stepValue || calculateStepValue(maxValue, stepCount);
  $: stepLabels = calculateStepLabels(stepCount, calculatedStepValue);
  $: itemWidth = calculateItemWidth(calculatedWidth, chartLeft, labels);
  $: valueHeight = calculateValueHeight(
    chartBottom,
    textHeight,
    calculatedStepValue,
    stepCount
  );

  $: chartBottom = calculateChartBottom(xLabel, height, textHeight);
  $: chartLeft = calculateChartLeft(stepLabels, yLabel, textHeight, textWidth);

  $: pointSeries = calculatePointSeries(
    calculatedSeries,
    chartLeft,
    chartBottom,
    itemWidth,
    valueHeight
  );

  onMount(() => {
    const bbox = measurer.getBBox();
    textWidth = bbox.width;
    textHeight = bbox.height * 1.2;
  });

  function calculatePointSeries(
    theSeries,
    theChartLeft,
    theChartBottom,
    theItemWidth,
    theValueHeight
  ) {
    return theSeries.map(ser => {
      return ser.data.map((value, i) => {
        const x = theChartLeft + i * theItemWidth + theItemWidth / 2;
        const y = theChartBottom - value * theValueHeight;
        return { x, y };
      });
    });
  }
</script>

<style src="LineChart.scss">

</style>

<div
  {id}
  class={['chart', className].filter(Boolean).join(' ')}
  bind:this={container}>
  <svg version="1.1" width={calculatedWidth} {height}>
    <g>
      {#if !container}
        <text bind:this={measurer}>8</text>
      {/if}
      {#if container}
        <XAxis
          showAxis={showXAxis}
          {height}
          width={calculatedWidth}
          {itemWidth}
          {textHeight}
          {xLabel}
          {labels}
          {chartLeft}
          {chartBottom} />
        <YAxis
          showAxis={showYAxis}
          {valueHeight}
          {textHeight}
          {yLabel}
          {stepLabels}
          stepValue={calculatedStepValue}
          {chartLeft}
          {chartBottom} />
        <ChartGridLines
          {showHLines}
          {showVLines}
          width={calculatedWidth}
          {labels}
          stepValue={calculatedStepValue}
          {stepLabels}
          {itemWidth}
          {valueHeight}
          {chartLeft}
          {chartBottom}
          type="line" />
        {#each calculatedSeries as ser, i}
          <polyline
            class="chart-line"
            points={pointSeries[i].map(p => `${p.x},${p.y}`).join(' ')}
            stroke={ser.color || chartColors[i]}
            stroke-width="2"
            fill="none" />
          {#if showPoints}
            {#each pointSeries[i] as point, j}
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                stroke={ser.color || chartColors[i]}
                stroke-width="2"
                fill="white">
                <title>
                  {`${ser.name ? ser.name + '\n' : ''}${labels[j] + '\n'}${ser.data[j]}`}
                </title>
              </circle>
            {/each}
          {/if}
        {/each}
      {/if}
    </g>
  </svg>
</div>
