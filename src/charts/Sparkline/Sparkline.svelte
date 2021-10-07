<script>
  import {
    calculateMaxValue,
    calculateItemWidth,
    calculateValueHeight,
  } from "../../utils/chart-utils";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };

  export let height = 20;
  export let width = 100;

  export let color = "";
  export let data = [];

  $: calculatedWidth = !width && container ? container.clientWidth : width;
  $: calculatedSeries = [{ color, data }];
  $: maxValue = calculateMaxValue(data, calculatedSeries);
  $: itemWidth = calculatedWidth / data.length;
  $: valueHeight = (height - 4) / maxValue;

  $: pointSeries = buildPointSeries(data, itemWidth, valueHeight);

  function buildPointSeries(theData, theItemWidth, theValueHeight) {
    return data.map((value, i) => {
      const x = +(i * theItemWidth).toFixed(2);
      const y = +(height - 2 - value * theValueHeight).toFixed(2);
      return { x, y };
    });
  }
</script>

<div {id} class={["chart", className].filter(Boolean).join(" ")}>
  <svg version="1.1" width={calculatedWidth} {height}>
    <g>
      <polyline
        class="chart-line"
        points={pointSeries.map((p) => `${p.x},${p.y}`).join(" ")}
        stroke={color || chartColors[0]}
        stroke-width="2"
        fill="none"
      />
    </g>
  </svg>
</div>

<style>
  /* These styles were automatically generated from Sparkline.scss */
  .chart {
    font-size: 1.2rem;
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  .chart:last-child {
    margin: 0;
  }
</style>
