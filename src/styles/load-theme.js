
export default function loadTheme(theme) {
    // Loop through each theme prop, and set the theme values
    Object.keys(theme).forEach((key) => {
        setThemeValue(key, theme[key]);
    });
}

function setThemeValue(name, value) {
    // Set the theme value
    document.documentElement.style.setProperty(name, value);
    // Set related theme values, such as text and hover colors
    transforms.filter(t => t[0] === name).forEach(t => {
        t[1].call(null, value);
    });
}

const transforms = [
    ['--link-color', function (c) { setThemeValue('--link-hover-color', c); }],
    ['--select-color', function (c) { setThemeValue('--select-text-color', findColorInvert(c)); }],
    ['--button-color', function (c) { setThemeValue('--button-text-color', findColorInvert(c)); }],
    ['--button-color', function (c) { setThemeValue('--button-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--list-color', function (c) { setThemeValue('--list-text-color', findColorInvert(c)); }],
    ['--primary-color', function (c) { setThemeValue('--primary-text-color', findColorInvert(c)); }],
    ['--primary-color', function (c) { setThemeValue('--primary-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--primary-color', function (c) { setThemeValue('--light-primary-color', scaleColor(c, { 'lightness': 0.95 })); }],
    ['--primary-color', function (c) { setThemeValue('--light-primary-text-color', scaleColor(c, { 'lightness': -0.22 })); }],
    ['--primary-color', function (c) { setThemeValue('--light-primary-border-color', c); }],
    ['--info-color', function (c) { setThemeValue('--info-text-color', findColorInvert(c)); }],
    ['--info-color', function (c) { setThemeValue('--info-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--info-color', function (c) { setThemeValue('--light-info-color', scaleColor(c, { 'lightness': 0.95 })); }],
    ['--info-color', function (c) { setThemeValue('--light-info-text-color', scaleColor(c, { 'lightness': -0.22 })); }],
    ['--info-color', function (c) { setThemeValue('--light-info-border-color', c); }],
    ['--success-color', function (c) { setThemeValue('--success-text-color', findColorInvert(c)); }],
    ['--success-color', function (c) { setThemeValue('--success-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--success-color', function (c) { setThemeValue('--light-success-color', scaleColor(c, { 'lightness': 0.95 })); }],
    ['--success-color', function (c) { setThemeValue('--light-success-text-color', scaleColor(c, { 'lightness': -0.22 })); }],
    ['--success-color', function (c) { setThemeValue('--light-success-border-color', c); }],
    ['--warning-color', function (c) { setThemeValue('--warning-text-color', findColorInvert(c)); }],
    ['--warning-color', function (c) { setThemeValue('--warning-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--warning-color', function (c) { setThemeValue('--light-warning-color', scaleColor(c, { 'lightness': 0.95 })); }],
    ['--warning-color', function (c) { setThemeValue('--light-warning-text-color', scaleColor(c, { 'lightness': -0.22 })); }],
    ['--warning-color', function (c) { setThemeValue('--light-warning-border-color', c); }],
    ['--danger-color', function (c) { setThemeValue('--danger-text-color', findColorInvert(c)); }],
    ['--danger-color', function (c) { setThemeValue('--danger-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--danger-color', function (c) { setThemeValue('--light-danger-color', scaleColor(c, { 'lightness': 0.95 })); }],
    ['--danger-color', function (c) { setThemeValue('--light-danger-text-color', scaleColor(c, { 'lightness': -0.22 })); }],
    ['--danger-color', function (c) { setThemeValue('--light-danger-border-color', c); }],
    ['--confirm-color', function (c) { setThemeValue('--confirm-text-color', findColorInvert(c)); }],
    ['--confirm-color', function (c) { setThemeValue('--confirm-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--cancel-color', function (c) { setThemeValue('--cancel-text-color', findColorInvert(c)); }],
    ['--cancel-color', function (c) { setThemeValue('--cancel-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
    ['--disabled-color', function (c) { setThemeValue('--disabled-text-color', findColorInvert(c)); }],
    ['--disabled-color', function (c) { setThemeValue('--disabled-hover-color', scaleColor(c, { 'lightness': -0.2 })); }],
]

// These are adapted from Bulma at https://github.com/jgthms/bulma/blob/master/sass/utilities/functions.sass
function powerNumber(number, exp) {
    let value = 1;
    for (let i = 0; i < Math.abs(exp); i++) {
        value = value * number;
    }
    return value;
}

function colorLuminance(color) {
    let rgb = colorToRgb(color);
    for (let i = 0; i < rgb.length; i++) {
        let value = rgb[i] / 255;
        if (value < 0.03928) {
            value = value / 12.92;
        } else {
            value = (value + .055) / 1.055;
            value = powerNumber(value, 2);
        }
        rgb[i] = value;
    }
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}

function findColorInvert(color) {
    if (colorLuminance(color) > 0.55) {
        return 'rgba(0, 0, 0, 0.7)';
    } else {
        return '#fff';
    }
}

// These are our own things

function colorToRgb(color) {
    let el = document.createElement("div");
    el.style.color = color;
    document.body.appendChild(el);
    let rgb = window.getComputedStyle(el).color.match(/\d+/g).map(c => parseInt(c, 10));
    document.body.removeChild(el);
    return rgb;
}

function scaleColor(color, adjustment) {
    let rgb = colorToRgb(color);
    Object.keys(adjustment).forEach((key) => {
        let change = adjustment[key];
        switch (key) {
            case "red": rgb[0] = scale(rgb[0], change, 0, 255); break;
            case "green": rgb[1] = scale(rgb[1], change, 0, 255); break;
            case "blue": rgb[2] = scale(rgb[2], change, 0, 255); break;
        }
    });
    let hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    Object.keys(adjustment).forEach((key) => {
        let change = adjustment[key];
        switch (key) {
            case "saturation": hsl[1] = scale(hsl[1], change, 0, 1); break;
            case "lightness": hsl[2] = scale(hsl[2], change, 0, 1); break;
        }
    });
    rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    return rgbToHex(Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]));
}

function scale(value, change, min, max) {
    if (change > 0) {
        return value + (max - value) * change;
    } else {
        return value + (value - min) * change;
    }
}

// These are from https://stackoverflow.com/a/5624139

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// These are taken from https://gist.github.com/mjackson/5311256

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}
