<script>
  import {
    setContext,
    onMount,
    beforeUpdate,
    createEventDispatcher,
    tick,
  } from "svelte";
  import { keyCodes } from "../../utils/key-codes";
  import {
    rgbToHex,
    hexToRgb,
    rgbToHsl,
    hslToRgb,
  } from "../../utils/color-utils";

  export let id = null;
  let className = null;
  export { className as class };

  export let value = null;
  export let standardColors = [
    "#000000", // Black
    "#FFFFFF", // White
    "#404040", // Dark grey
    "#808080", // Light grey
    "#C00000", // Dark red
    "#FF0000", // Light red
    "#FF6600", // Orange
    "#FFBB66", // Tan
    "#666600", // Olive
    "#F0F000", // Yellow
    "#00C000", // Dark green
    "#00FF00", // Light green
    "#0080FF", // Light blue
    "#00F0F0", // Cyanish
    "#000080", // Dark blue
    "#0000FF", // Blue
    "#660066", // Dark purple
    "#6600FF", // Light purple
    "#FF66FF", // Pink
    "#FF0066", // Whatever this is
  ];

  let oldValue = "";
  let skipRedraw = false;
  let rgbValue = [0, 0, 0];
  let previewCanvas = null;
  let hsCanvas = null;
  let hsImageData = null;
  let hsSelectorLocation = [-99, -99];
  let lCanvas = null;
  let lImageData = null;
  let lSelectorLocation = [-99, -99];
  let dragging = false;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    await tick();
    drawPreviewCanvas();
    drawHSCanvas();
    drawLCanvas();
  });

  beforeUpdate(() => {
    if (previewCanvas && hsCanvas && lCanvas) {
      // Redraw if the value has changed to reset the selector locations, except when dragging or clicking
      if (oldValue !== value) {
        if (skipRedraw) {
          skipRedraw = false;
        } else {
          hsImageData = null;
          lImageData = null;
        }
      }
      oldValue = value;
      drawPreviewCanvas();
      drawHSCanvas();
      drawLCanvas();
    }
  });

  function drawPreviewCanvas(e) {
    // NOTE: Drawing the preview canvas first means that we can take any meaningful user-entered
    // value (e.g. 'red', '#ff0000') and get the hex equivalent
    const context = previewCanvas.getContext("2d");

    const width = previewCanvas.width;
    const height = previewCanvas.height;

    context.fillStyle = value;
    context.fillRect(0, 0, width, height);
    rgbValue = context.getImageData(0, 0, 1, 1).data;
  }

  // A function for directly setting a pixel's data
  function setPixel(data, x, y, r, g, b, a) {
    const index = (x + y * data.width) * 4;
    data.data[index + 0] = r;
    data.data[index + 1] = g;
    data.data[index + 2] = b;
    data.data[index + 3] = a;
  }

  function drawHSCanvas(e) {
    if (hsImageData) {
      return;
    }

    const context = hsCanvas.getContext("2d");

    // This is how you do a color wheel
    // It looks nice but doesn't have the greys and blacks
    // const x = hsCanvas.width / 2;
    // const y = hsCanvas.height / 2;
    // const radius = 100;
    // const counterClockwise = false;

    // for (let angle = 0; angle <= 360; angle += 1) {
    //    const startAngle = (angle - 2) * Math.PI / 180;
    //    const endAngle = angle * Math.PI / 180;
    //    context.beginPath();
    //    context.moveTo(x, y);
    //    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    //    context.closePath();
    //    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    //    gradient.addColorStop(0, 'hsl(' + angle + ', 10%, 100%)');
    //    gradient.addColorStop(1, 'hsl(' + angle + ', 100%, 50%)');
    //    context.fillStyle = gradient;
    //    context.fill();
    // }

    const width = hsCanvas.width;
    const height = hsCanvas.height;

    // Create a new batch of pixels with the same dimensions as the image
    hsImageData = context.createImageData(width, height);

    const hsl = rgbToHsl(rgbValue[0], rgbValue[1], rgbValue[2]);

    // Get the HS canvas's pixel values
    hsSelectorLocation = [0, 0];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const h = x / width;
        const s = 1 - y / height;
        if (
          Math.round(h * 10) / 10 === Math.round(hsl[0] * 10) / 10 &&
          Math.round(s * 10) / 10 === Math.round(hsl[1] * 10) / 10
        ) {
          hsSelectorLocation = [x, y];
        }
        let rgb = hslToRgb(h, s, 0.5);
        if (!rgb) {
          rgb = [255, 255, 255];
        }
        setPixel(hsImageData, x, y, rgb[0], rgb[1], rgb[2], 255);
      }
    }

    // Copy the image data onto the canvas
    context.putImageData(hsImageData, 0, 0);
  }

  function drawLCanvas(e) {
    if (lImageData) {
      return;
    }

    const context = lCanvas.getContext("2d");

    const width = lCanvas.width;
    const height = lCanvas.height;

    // Create a new batch of pixels with the same dimensions as the image
    lImageData = context.createImageData(width, height);

    const hsl = rgbToHsl(rgbValue[0], rgbValue[1], rgbValue[2]);

    // Get the L canvas's pixel values
    lSelectorLocation = [0, 0];
    for (let y = 0; y < height; y++) {
      const h = hsl[0];
      const s = hsl[1];
      const l = 1 - y / height;
      if (Math.round(l * 10) / 10 === Math.round(hsl[2] * 10) / 10) {
        lSelectorLocation = [width / 2, y];
      }
      let rgb = hslToRgb(h, s, l);
      if (!rgb) {
        rgb = [255, 255, 255];
      }
      for (let x = 0; x < width; x++) {
        setPixel(lImageData, x, y, rgb[0], rgb[1], rgb[2], 255);
      }
    }

    // Copy the image data onto the canvas
    context.putImageData(lImageData, 0, 0);
  }

  function handleHsCanvasMouseDown(e) {
    const rect = hsCanvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    // Lazy hitboxing
    if (
      x > hsSelectorLocation[0] - 4 &&
      x < hsSelectorLocation[0] + 4 &&
      y > hsSelectorLocation[1] - 4 &&
      y < hsSelectorLocation[1] + 4
    ) {
      dragging = true;
    }
  }

  function handleHsCanvasMouseMove(e) {
    if (dragging) {
      setValueFromHsCanvasMouseEvent(e);
    }
  }

  function handleHsCanvasMouseUp(e) {
    if (dragging) {
      dragging = false;
    } else {
      setValueFromHsCanvasMouseEvent(e);
    }
  }

  function setValueFromHsCanvasMouseEvent(e) {
    const context = hsCanvas.getContext("2d");

    const rect = hsCanvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    // TODO: Too many translations!

    const rgb = context.getImageData(x, y, 1, 1).data;
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

    let valueRgb = hexToRgb(value);
    if (!valueRgb) {
      valueRgb = [255, 255, 255];
    }
    const valueHsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

    const newRgb = hslToRgb(valueHsl[0], valueHsl[1], hsl[2]);
    const hex = rgbToHex(newRgb[0], newRgb[1], newRgb[2]);

    hsSelectorLocation = [x, y];
    value = hex;

    // Force the l image to be redrawn with the new color
    lImageData = null;

    // Don't redraw with the value change - we know where everything should be
    skipRedraw = true;
  }

  function handleLCanvasMouseDown(e) {
    const rect = lCanvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    // Lazy hitboxing
    if (
      x > lSelectorLocation[0] - 4 &&
      x < lSelectorLocation[0] + 4 &&
      y > lSelectorLocation[1] - 4 &&
      y < lSelectorLocation[1] + 4
    ) {
      dragging = true;
    }
  }

  function handleLCanvasMouseMove(e) {
    if (dragging) {
      setValueFromLCanvasMouseEvent(e);
    }
  }

  function handleLCanvasMouseUp(e) {
    if (dragging) {
      dragging = false;
    } else {
      setValueFromLCanvasMouseEvent(e);
    }
  }

  function setValueFromLCanvasMouseEvent(e) {
    const context = lCanvas.getContext("2d");

    const rect = lCanvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    const rgb = context.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

    lSelectorLocation = [lSelectorLocation[0], y];
    value = hex;

    // Don't redraw with the value change - we know where everything should be
    skipRedraw = true;
  }

  function handleStandardColorClick(e) {
    let index = 0;
    const colorNodes = e.target.parentNode.childNodes;
    for (let i = 0; i < colorNodes.length; i++) {
      if (colorNodes[i] === e.target) {
        index = i;
        break;
      }
    }
    value = standardColors[index];

    // Force everything to be redrawn in the right place
    hsImageData = null;
    lImageData = null;
  }
</script>

<div {id} class={["palette", className].filter(Boolean).join(" ")}>
  <div class="palette-colors">
    <!-- HACK: Need to specify dimensions because it's not initially shown and thus has scrollWidth/Height = 0 -->
    <div class="palette-canvas-container">
      <canvas
        class="palette-hs"
        bind:this={hsCanvas}
        width={200}
        height={200}
        on:mousedown={handleHsCanvasMouseDown}
        on:mousemove={handleHsCanvasMouseMove}
        on:mouseup={handleHsCanvasMouseUp}
      />
      {#if hsSelectorLocation[0] >= 0}
        <div
          class="palette-selector"
          style={`left: ${hsSelectorLocation[0] - 5}px; top: ${
            hsSelectorLocation[1] - 5
          }px`}
        />
      {/if}
    </div>
    <div class="palette-canvas-container">
      <canvas
        class="palette-l"
        bind:this={lCanvas}
        width={25}
        height={200}
        on:mousedown={handleLCanvasMouseDown}
        on:mousemove={handleLCanvasMouseMove}
        on:mouseup={handleLCanvasMouseUp}
      />
      {#if lSelectorLocation[0] >= 0}
        <div
          class="palette-selector"
          style={`left: ${lSelectorLocation[0] - 5}px; top: ${
            lSelectorLocation[1] - 5
          }px`}
        />
      {/if}
    </div>
    <div class="palette-standard-colors">
      {#each standardColors as color}
        <div
          class="palette-color"
          style={`background-color: ${color}`}
          on:click={handleStandardColorClick}
        />
      {/each}
    </div>
  </div>
  <canvas class="palette-preview" bind:this={previewCanvas} />
</div>

<style>
  /* These styles were automatically generated from Palette.scss */
  .palette {
    display: inline-block;
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  .palette:last-child {
    margin: 0;
  }

  .palette-colors {
    display: flex;
  }

  .palette-hs {
    display: inline-block;
    height: 200px;
    width: 200px;
    margin-right: calc(var(--element-margin, 1.5rem) / 2);
  }

  .palette-l {
    display: inline-block;
    height: 200px;
    width: 25px;
    margin-right: calc(var(--element-margin, 1.5rem) / 2);
  }

  .palette-standard-colors {
    display: inline-flex;
    flex-wrap: wrap;
    height: 200px;
    width: 40px;
    vertical-align: top;
  }

  .palette-color {
    flex: 0 0 50%;
    max-width: 50%;
    border: 1px solid #FFFFFF;
  }

  .palette-spacer {
    display: inline-block;
    width: 100%;
  }

  .palette-preview {
    height: 25px;
    width: 100%;
    margin: calc(var(--element-margin, 1.5rem) / 2) 0 0 0;
  }

  .palette-canvas-container {
    position: relative;
  }

  .palette-selector {
    border: 2px solid white;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    pointer-events: none;
    position: absolute;
  }
</style>
