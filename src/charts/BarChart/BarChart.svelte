<script>
  import { onMount } from "svelte";
  import XAxis from "../XAxis/XAxis.svelte";
  import YAxis from "../YAxis/YAxis.svelte";
  import ChartGridLines from "../ChartGridLines/ChartGridLines.svelte";
  import {
    calculateMaxValue,
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

  export let labels = [];
  export let color = "";
  export let data = [];
  export let series = [];

  export let stepCount = 2;
  export let stepValue = 0;

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
  $: maxValue = calculateMaxValue(data, calculatedSeries);
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
    textHeight = bbox.height * 1.5;
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
  //  textHeight = bbox.height * 1.5;
  //  svg.removeChild(text);
  //  document.body.removeChild(svg);
  //}
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
          {labels}
          {chartLeft}
          {chartBottom}
        />
        <YAxis
          showAxis={showYAxis}
          {valueHeight}
          {textHeight}
          {yLabel}
          {stepLabels}
          stepValue={calculatedStepValue}
          {chartLeft}
          {chartBottom}
        />
        <ChartGridLines
          {showHLines}
          {showVLines}
          width={calculatedWidth}
          {labels}
          yStepValue={calculatedStepValue}
          yStepLabels={stepLabels}
          {itemWidth}
          {valueHeight}
          {chartLeft}
          {chartBottom}
        />
        {#each labels as label, i}
          {#each calculatedSeries as ser, j}
            {#if ser.data.length > i}
              <rect
                class="chart-bar"
                x={chartLeft +
                  i * itemWidth +
                  itemWidth / 4 +
                  (j * itemWidth) / 2 / calculatedSeries.length +
                  2}
                y={chartBottom - Math.max(1, ser.data[i] * valueHeight)}
                width={Math.max(1, itemWidth / 2 / calculatedSeries.length - 2)}
                height={Math.max(1, ser.data[i] * valueHeight)}
                fill={ser.color || chartColors[j % chartColors.length]}
              >
                <title>
                  {`${ser.name ? ser.name + "\n" : ""}${label + "\n"}${
                    ser.data[i]
                  }`}
                </title>
              </rect>
            {/if}
          {/each}
        {/each}
      {/if}
    </g>
  </svg>
</div>

<style>
  /* These styles were automatically generated from BarChart.scss */
  .chart {
    font-size: 1.2rem;
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  .chart:last-child {
    margin: 0;
  }
</style>
