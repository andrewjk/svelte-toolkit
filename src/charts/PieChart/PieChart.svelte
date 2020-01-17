<script>
  import { onMount } from "svelte";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };
  export let size = 200;
  export let radius = 50;
  export let cutout = 10;

  export let data = [];

  // NOTE: Take two pixels off the radius so that the stroke doesn't go outside the border
  $: radiusSize = (radius / 100) * size - 2;
  $: cutoutSize = (cutout / 100) * size - 2;
  $: segments = buildSegments(size, data, radiusSize, cutoutSize);

  function buildSegments(theSize, theData, theRadiusSize, theCutoutSize) {
    const segments = [];
    const x = theSize / 2;
    const y = theSize / 2;
    const totalValue = theData.reduce((a, b) => a + parseInt(b.value), 0);
    // Start at the top of the chart, at 180 + 360 so that we don't have to take wrapping angles into account
    let startAngle = 540;
    for (let i = 0; i < theData.length; i++) {
      // Subtract the angle to go clockwise
      const endAngle = startAngle - (theData[i].value / totalValue) * 360;
      const largeArc = startAngle - endAngle > 180 ? 1 : 0;
      segments.push({
        label: theData[i].label,
        value: theData[i].value,
        color: theData[i].color,
        path: buildPath(
          x,
          y,
          theRadiusSize,
          theCutoutSize,
          startAngle,
          endAngle,
          largeArc
        )
      });
      startAngle = endAngle;
    }
    return segments;
  }

  function buildPath(
    x,
    y,
    theRadiusSize,
    theCutoutSize,
    startAngle,
    endAngle,
    largeArc
  ) {
    // HACK: Drawing an arc of 360 degrees doesn't work
    if (startAngle - endAngle === 360) {
      endAngle = 359.9999;
    }

    // Use some trig to find the points on the circumference at the start and end angles
    const startx = x + theRadiusSize * Math.sin((Math.PI * startAngle) / 180);
    const starty = x + theRadiusSize * Math.cos((Math.PI * startAngle) / 180);

    const endx = x + theRadiusSize * Math.sin((Math.PI * endAngle) / 180);
    const endy = y + theRadiusSize * Math.cos((Math.PI * endAngle) / 180);

    if (cutout) {
      // Use some trig to find the points on the cutout at the start and end angles
      const cutoutStartx =
        x + theCutoutSize * Math.sin((Math.PI * startAngle) / 180);
      const cutoutstarty =
        x + theCutoutSize * Math.cos((Math.PI * startAngle) / 180);

      const cutoutendx =
        x + theCutoutSize * Math.sin((Math.PI * endAngle) / 180);
      const cutoutendy =
        y + theCutoutSize * Math.cos((Math.PI * endAngle) / 180);

      // Build the path - move to the cutout start, line to the start angle on the circumference,
      // arc to the end angle on the circumference, line to the cutout end, and then arc to the
      // cutout start
      const path = `
        M${cutoutStartx},${cutoutstarty}
        L${startx},${starty}
        A${theRadiusSize},${theRadiusSize} 0 ${largeArc} 1 ${endx},${endy}
        L${cutoutendx},${cutoutendy}
        A${theCutoutSize},${theCutoutSize} 0 ${largeArc} 0 ${cutoutStartx},${cutoutstarty}`;
      return path;
    } else {
      // Build the path - move to the origin, line to the start angle on the circumference,
      // arc to the end angle on the circumference, and then close back to the start
      const path = `M${x},${y} L${startx},${starty} A${theRadiusSize},${theRadiusSize} 0 ${largeArc} 1 ${endx},${endy} Z`;
      return path;
    }
  }
</script>

<style src="PieChart.scss">

</style>

<svg
  {id}
  class={['chart', className].filter(Boolean).join(' ')}
  version="1.1"
  width={size}
  height={size}>
  <g>
    {#each segments as segment, i}
      <path
        class="chart-segment"
        d={segment.path}
        fill={segment.color || chartColors[i % chartColors.length]}>
        <title>{`${segment.label}\n${segment.value}`}</title>
      </path>
    {/each}
  </g>
</svg>
