<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let value = 0;
  export let color = "";

  let x = 0;
  let y = 0;
  let radius = 0;
  let startAngle = 0;
  let endAngle = 0;

  $: path = buildPath(x, y, radius, startAngle, endAngle);

  // Register this item with the parent PieChart, which will set our angles and default color
  const { registerItem } = getContext("piechart");
  registerItem(value, setInfo);

  function setInfo(
    newx,
    newy,
    newRadius,
    newStartAngle,
    newEndAngle,
    newColor
  ) {
    x = newx;
    y = newy;
    radius = newRadius;
    startAngle = newStartAngle;
    endAngle = newEndAngle;
    if (!color) {
      color = newColor;
    }
  }

  function buildPath(newx, newy, newRadius, newStartAngle, newEndAngle) {
    // HACK: Drawing an arc of 360 degrees doesn't work
    if (newStartAngle === 0 && newEndAngle === 360) {
      newEndAngle = 359.9999;
    }

    // Use some trig to find the points on the circumference at the start and end angles
    const startx = newx + newRadius * Math.sin((Math.PI * newStartAngle) / 180);
    const starty = newx + newRadius * Math.cos((Math.PI * newStartAngle) / 180);

    const endx = newx + newRadius * Math.sin((Math.PI * newEndAngle) / 180);
    const endy = newy + newRadius * Math.cos((Math.PI * newEndAngle) / 180);

    const largeArc = newEndAngle - newStartAngle > 180 ? 1 : 0;

    // Build the path - move to the origin, line to the start angle on the circumference,
    // arc to the end angle on the circumference, and then close back to the start
    return `M${x},${y} L${startx},${starty} A${radius},${radius} 0 ${largeArc} 0 ${endx},${endy} Z`;
  }
</script>

<path
  {id}
  class={['chart-segment', className].filter(Boolean).join(' ')}
  d={path}
  fill={color} />
