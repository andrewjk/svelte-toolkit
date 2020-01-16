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

  export let showXAxis = true;
  export let showYAxis = true;
  export let showHLines = false;

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

  onMount(() => {
    const bbox = measurer.getBBox();
    textWidth = bbox.width;
    textHeight = bbox.height * 1.2;
  });

  //beforeUpdate(() => {
  //  if (!textWidth) {
  //    calculateTextSize();
  //  }
  //});

  //function calculateTextSize() {
  //  const ns = "http://www.w3.org/2000/svg";
  //  const svg = document.createElementNS(ns, "svg");
  //  const textNode = document.createTextNode("8");
  //  const text = document.createElementNS(ns, "text");
  //  text.appendChild(textNode);
  //  svg.appendChild(text);
  //  document.body.appendChild(svg);
  //  const bbox = text.getBBox();
  //  textWidth = bbox.width;
  //  textHeight = bbox.height * 1.2;
  //  svg.removeChild(text);
  //  document.body.removeChild(svg);
  //}
</script>

<style src="BarChart.scss">

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
          width={calculatedWidth}
          stepValue={calculatedStepValue}
          {stepLabels}
          {valueHeight}
          {chartLeft}
          {chartBottom} />
        {#each labels as label, i}
          {#each calculatedSeries as ser, j}
            {#if ser.data.length > i}
              <rect
                class="chart-bar"
                x={chartLeft + i * itemWidth + itemWidth / 4 + (j * itemWidth) / 2 / calculatedSeries.length + 1}
                y={chartBottom - Math.max(1, ser.data[i] * valueHeight)}
                width={Math.max(1, itemWidth / 2 / calculatedSeries.length - 1)}
                height={Math.max(1, ser.data[i] * valueHeight)}
                fill={ser.color || chartColors[j]}>
                <title>
                  {`${ser.name ? ser.name + '\n' : ''}${label + '\n'}${ser.data[i]}`}
                </title>
              </rect>
            {/if}
          {/each}
        {/each}
      {/if}
    </g>
  </svg>
</div>
