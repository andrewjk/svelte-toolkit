<script>
  import { setContext, onMount, beforeUpdate } from "svelte";
  import ChartAxis from "../ChartAxis/ChartAxis";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };

  export let height = 200;
  export let width = 400;

  export let xLabel = "";
  export let yLabel = "";

  export let labels = [];
  export let color = chartColors[0];
  export let data = [];
  export let series = [];

  export let stepCount = 2;

  export let showXAxis = true;
  export let showYAxis = true;
  export let showHLines = false;

  let container;
  let measurer;
  let textWidth = 0;
  let textHeight = 0;

  $: calculatedWidth = !width && container ? container.clientWidth : width;
  $: calculatedSeries = data ? [{ color, data }] : series;
  $: stepValue = calculateStepValue(data, calculatedSeries, stepCount);
  $: stepLabels = calculateStepLabels(stepCount, stepValue);
  $: itemWidth = (calculatedWidth - chartLeft) / labels.length;
  $: valueHeight = chartBottom / (stepValue * stepCount);

  let xLabelBottom = height;
  $: chartLabelBottom = xLabel ? height - textHeight : height;
  $: chartBottom = xLabel ? height - textHeight * 2 : height - textHeight;
  let yLabelLeft = 0;
  $: chartLeft = calculateChartLeft(stepLabels, yLabel, textHeight, textWidth);

  onMount(() => {
    const bbox = measurer.getBBox();
    textWidth = bbox.width;
    textHeight = bbox.height * 1.2;
  });

  function calculateStepValue(theData, theSeries, theStepCount) {
    // HACK: Yeah, nested reduces
    const maxValue = theSeries.reduce((a, b) => {
      return Math.max(a, parseInt(b.data.reduce((c, d) => Math.max(c, d), 0)));
    }, 0);
    return calculateStepValue2(maxValue, theStepCount);
  }

  function calculateStepValue2(range, stepCount) {
    // Get the next power of 10 e.g. for 75 it would be 100
    let maxUpper = parseInt(
      "1" +
        Array.prototype.join.call({ length: range.toString().length + 1 }, "0")
    );
    // Special case: if we already have a power of 10, use that instead of the next one
    if (maxUpper === parseInt(range + "0")) {
      maxUpper = range.toString();
    }
    // Start with the naive step value
    let step = range / stepCount;
    // Make it a decimal value and round it up
    step = Math.ceil(step / (maxUpper / 10));
    // If the step would be a multiple of 3, 7 or 9, round it up to the next even number (for aesthetic purposes)
    if (step === 3 || step === 7 || step === 9) {
      step = step + (step % 2);
    }
    // Convert the step back from the decimal value
    step = step * (maxUpper / 10);
    return step;
  }

  function calculateStepLabels(theStepCount, theStepValue) {
    // Calculate the step value and labels
    const newStepLabels = [];
    for (var i = 0; i < theStepCount + 1; i++) {
      newStepLabels.push(theStepValue * i);
    }
    return newStepLabels;
  }

  function calculateChartLeft(theStepLabels, theYlabel, theTextHeight, theTextWidth) {
    // Get the longest label width
    const maxLabelWidth = theStepLabels.reduce((a, b) => {
      return Math.max(a.toString().length, b.toString().length);
    }, 0);
    let theChartLeft = theYlabel ? textHeight * 1.5 : textHeight / 2;
    theChartLeft += maxLabelWidth * textWidth;
    return theChartLeft;
  }
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
        <!-- x axis -->
        {#if showXAxis}
          <line
            {id}
            class="chart-axis"
            x1={chartLeft}
            y1={chartBottom}
            x2={calculatedWidth}
            y2={chartBottom} />
        {/if}
        {#if xLabel}
          <text
            text-anchor="middle"
            dominant-baseline="text-after-edge"
            x={calculatedWidth - (calculatedWidth - chartLeft) / 2}
            y={height}>
            {xLabel}
          </text>
        {/if}
        {#each labels as label, i}
          <text
            text-anchor="middle"
            dominant-baseline="text-after-edge"
            x={chartLeft + itemWidth * i + itemWidth / 2}
            y={chartLabelBottom}>
            {label}
          </text>
        {/each}
        <!-- y axis -->
        {#if showYAxis}
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
            y={chartBottom - ((chartBottom - textHeight) / (stepLabels.length - 1)) * i}>
            {label}
          </text>
          {#if showHLines}
            <line
              class="chart-gridline"
              x1={chartLeft}
              y1={chartBottom - ((chartBottom - textHeight) / (stepLabels.length - 1)) * i}
              x2={calculatedWidth}
              y2={chartBottom - ((chartBottom - textHeight) / (stepLabels.length - 1)) * i} />
          {/if}
        {/each}
        <!-- values -->
        {#each labels as label, i}
          {#each calculatedSeries as ser, j}
            {#if ser.data.length > i}
              <rect
                class="chart-bar"
                x={chartLeft + i * itemWidth + itemWidth / 4 + (j * itemWidth) / 2 / calculatedSeries.length + 1}
                y={chartBottom - Math.max(1, ser.data[i] * valueHeight - textHeight)}
                width={Math.max(1, itemWidth / 2 / calculatedSeries.length - 1)}
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
