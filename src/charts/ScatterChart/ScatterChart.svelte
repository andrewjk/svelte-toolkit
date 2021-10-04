<script>
  import { onMount } from "svelte";
  import XAxis from "../XAxis/XAxis.svelte";
  import YAxis from "../YAxis/YAxis.svelte";
  import ChartGridLines from "../ChartGridLines/ChartGridLines.svelte";
  import {
    calculateStepValue,
    calculateStepLabels,
    calculateItemWidth,
    calculateValueHeight,
    calculateChartBottom,
    calculateChartLeft,
  } from "../../utils/chart-utils";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };

  export let height = 200;
  export let width = 400;

  export let xLabel = "";
  export let yLabel = "";

  export let color = "";
  export let data = [];
  export let series = [];

  export let xStepCount = 2;
  export let xStepValue = 0;
  export let yStepCount = 2;
  export let yStepValue = 0;

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
  $: maxXValue = calculateMaxValue(data, calculatedSeries, "x");
  $: calculatedXStepValue =
    xStepValue || calculateStepValue(maxXValue, xStepCount);
  $: xStepLabels = calculateStepLabels(xStepCount, calculatedXStepValue);
  $: maxYValue = calculateMaxValue(data, calculatedSeries, "y");
  $: calculatedYStepValue =
    yStepValue || calculateStepValue(maxYValue, yStepCount);
  $: yStepLabels = calculateStepLabels(yStepCount, calculatedYStepValue);
  $: itemWidth = calculateValueHeight(
    calculatedWidth - chartLeft,
    textHeight,
    calculatedXStepValue,
    xStepCount
  );
  $: valueHeight = calculateValueHeight(
    chartBottom,
    textHeight,
    calculatedYStepValue,
    yStepCount
  );

  $: chartBottom = calculateChartBottom(xLabel, height, textHeight);
  $: chartLeft = calculateChartLeft(yStepLabels, yLabel, textHeight, textWidth);

  $: pointSeries = buildPointSeries(
    calculatedSeries,
    chartLeft,
    chartBottom,
    itemWidth,
    valueHeight
  );

  onMount(() => {
    const bbox = measurer.getBBox();
    textWidth = bbox.width;
    textHeight = bbox.height * 1.5;
  });

  function calculateMaxValue(data, series, field) {
    // HACK: Yeah, nested reduces
    return series.reduce((a, b) => {
      return Math.max(
        a,
        parseInt(b.data.reduce((c, d) => Math.max(c, d[field]), 0))
      );
    }, 0);
  }

  function buildPointSeries(
    theSeries,
    theChartLeft,
    theChartBottom,
    theItemWidth,
    theValueHeight
  ) {
    return theSeries.map((ser) => {
      return ser.data.map((item, i) => {
        const x = +(theChartLeft + item.x * theItemWidth).toFixed(2);
        const y = +(theChartBottom - item.y * theValueHeight).toFixed(2);
        return { x, y };
      });
    });
  }
</script>

<div
  {id}
  class={["chart", className].filter(Boolean).join(" ")}
  bind:this={container}
>
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
          stepLabels={xStepLabels}
          stepValue={calculatedXStepValue}
          {chartLeft}
          {chartBottom}
        />
        <YAxis
          showAxis={showYAxis}
          {valueHeight}
          {textHeight}
          {yLabel}
          stepLabels={yStepLabels}
          stepValue={calculatedYStepValue}
          {chartLeft}
          {chartBottom}
        />
        <ChartGridLines
          {showHLines}
          {showVLines}
          width={calculatedWidth}
          xStepValue={calculatedXStepValue}
          {xStepLabels}
          yStepValue={calculatedYStepValue}
          {yStepLabels}
          {itemWidth}
          {valueHeight}
          {chartLeft}
          {chartBottom}
          type="line"
        />
        {#each calculatedSeries as ser, i}
          {#each pointSeries[i] as point, j}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={ser.color || chartColors[i % chartColors.length]}
            >
              <title>
                {`${ser.name ? ser.name + "\n" : ""}${
                  ser.data[j].label + "\n"
                }${ser.data[j].x}, ${ser.data[j].y}`}
              </title>
            </circle>
          {/each}
        {/each}
      {/if}
    </g>
  </svg>
</div>

<style src="ScatterChart.scss">
</style>
