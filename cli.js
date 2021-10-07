#!/usr/bin/env node
const path = require("path");
const fs = require("fs").promises;
const fssync = require("fs");
const sass = require("node-sass");

(async () => {
  // The first argv is the command e.g. "theme"
  // The other argvs are the arguments for the command

  if (process.argv.length < 3) {
    console.error("Svelte Toolkit: no command supplied");
    return;
  }

  const command = process.argv[2];
  const args = parseArgs(process.argv.slice(3));

  switch (command) {
    case "theme": {
      await theme(args);
      break;
    }
    default: {
      console.error(`Svelte Toolkit: unknown command '${command}'`);
    }
  }
})();

// TODO: This is not smart
function parseArgs(array) {
  let args = {};
  let key = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].startsWith("-")) {
      if (key && !args[key]) {
        args[key] = true;
      }
      key = array[i].substring(1);
    } else {
      args[key] = array[i];
    }
  }
  return args;
}

async function theme(args) {
  const force = args.force || args.f;
  const src = args.src || args.s || "./node_modules/svelte-toolkit/src";
  const configFile = args.config || args.c || "./stk.config.json";
  const themeFile = path.join(src, "styles", "_theme.scss");

  const config = await loadConfig(configFile);

  // Only build the theme if something has changed and it's necessary to do so
  if (force) {
    console.log("Svelte Toolkit: forced; building theme...");
  } else {
    if (!(await shouldBuildTheme(config, configFile, themeFile))) {
      return;
    }
  }

  // Build _theme.scss which will be imported by every component's scss styles
  await buildThemeFile(config, themeFile);

  for await (const file of getFiles(src)) {
    // If it's a Svelte component file and there is a corresponding scss style
    // file, then compile the styles and copy them into the component file
    if (path.extname(file) === ".svelte") {
      const styleFile = path.join(
        path.dirname(file),
        path.basename(file).replace(".svelte", ".scss")
      );
      if (fssync.existsSync(styleFile)) {
        try {
          await processFile(file, styleFile);
        } catch (err) {
          console.error(`ERROR: ${err} (${file})`);
          break;
        }
      }
    }
  }
}

async function loadConfig(configFile) {
  if (configFile && fssync.existsSync(configFile)) {
    const data = await fs.readFile(configFile);
    return JSON.parse(data);
  }
}

async function shouldBuildTheme(config, configFile, themeFile) {
  if (config && config.theme) {
    // If the config file is newer than the theme file, do the build
    if (fssync.statSync(configFile).mtime > fssync.statSync(themeFile).mtime) {
      console.log(
        "Svelte Toolkit: config file has been updated; building theme..."
      );
      return true;
    }

    // If the theme file is empty (as might happen when the svelte-toolkit dependency has been updated), do the build
    var content = await fs.readFile(themeFile, "utf8");
    if (!content || content.trim().length === 0) {
      console.log("Svelte Toolkit: theme file is empty; building theme...");
      return true;
    }

    // Don't build
    console.log("Svelte Toolkit: up to date; skipping build");
    return false;
  }

  // Don't build
  console.log("Svelte Toolkit: no config file; skipping build");
  return false;
}

async function buildThemeFile(config, themeFile) {
  if (config && config.theme) {
    let theme = "";
    for (const [key, value] of Object.entries(config.theme)) {
      theme += setThemeValue(key, value);
    }
    await fs.writeFile(themeFile, theme);
  }
}

function setThemeValue(name, value) {
  let theme = `$${name.substring(2)}: ${value};\n`;
  // Set related theme values, such as text and hover colors
  transforms
    .filter((t) => t[0] === name)
    .forEach((t) => {
      theme += setThemeValue(t[1][0], t[1][1]);
    });
  return theme;
}

// From https://stackoverflow.com/a/45130990
async function* getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function processFile(file, styleFile) {
  // Compile SASS into CSS
  // Mimic prettier formatting so that styles don't get reformatted on save
  var css = await compileSass(styleFile);
  css = css
    .toString()
    .replace(/\n/g, "\n  ")
    .replace(/\n  \n/g, "\n\n")
    .trim();

  // Replace the <style> tags in the component with the CSS styles
  var content = await fs.readFile(file, "utf8");
  content = content.replace(
    /<style( src="(.+?)")?>(.|\r|\n)+?<\/style>/gi,
    `<style>\n  /* These styles were automatically generated from ${path.basename(
      styleFile
    )} */\n  ${css}\n</style>`
  );

  // Write the updated content to the component file
  await fs.writeFile(file, content);
}

function compileSass(file) {
  return new Promise((resolve, reject) => {
    const options = {
      file,
      outputStyle: "expanded",
    };
    sass.render(options, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result.css);
    });
  });
}

// HACK: This is duplicated in some form in _variables.scss and load-theme.js
const transforms = [
  ["--link-color", ["--link-hover-color", "$link-color"]],
  [
    "--select-color",
    ["--select-text-color", "find-color-invert($select-color)"],
  ],
  [
    "--button-color",
    ["--button-text-color", "find-color-invert($button-color)"],
  ],
  [
    "--button-color",
    ["--button-hover-color", "scale-color($button-color, $lightness: -20%)"],
  ],
  ["--list-color", ["--list-text-color", "find-color-invert($list-color)"]],
  [
    "--primary-color",
    ["--primary-text-color", "find-color-invert($primary-color)"],
  ],
  [
    "--primary-color",
    ["--primary-hover-color", "scale-color($primary-color, $lightness: -20%)"],
  ],
  [
    "--primary-color",
    ["--light-primary-color", "scale-color($primary-color, $lightness: 95%)"],
  ],
  [
    "--primary-color",
    [
      "--light-primary-text-color",
      "scale-color($primary-color, $lightness: -22%)",
    ],
  ],
  ["--primary-color", ["--light-primary-border-color", "$primary-color"]],
  ["--info-color", ["--info-text-color", "find-color-invert($info-color)"]],
  [
    "--info-color",
    ["--info-hover-color", "scale-color($info-color, $lightness: -20%)"],
  ],
  [
    "--info-color",
    ["--light-info-color", "scale-color($info-color, $lightness: 95%)"],
  ],
  [
    "--info-color",
    ["--light-info-text-color", "scale-color($info-color, $lightness: -22%)"],
  ],
  ["--info-color", ["--light-info-border-color", "$info-color"]],
  [
    "--success-color",
    ["--success-text-color", "find-color-invert($success-color)"],
  ],
  [
    "--success-color",
    ["--success-hover-color", "scale-color($success-color, $lightness: -20%)"],
  ],
  [
    "--success-color",
    ["--light-success-color", "scale-color($success-color, $lightness: 95%)"],
  ],
  [
    "--success-color",
    [
      "--light-success-text-color",
      "scale-color($success-color, $lightness: -22%)",
    ],
  ],
  ["--success-color", ["--light-success-border-color", "$success-color"]],
  [
    "--warning-color",
    ["--warning-text-color", "find-color-invert($warning-color)"],
  ],
  [
    "--warning-color",
    ["--warning-hover-color", "scale-color($warning-color, $lightness: -20%)"],
  ],
  [
    "--warning-color",
    ["--light-warning-color", "scale-color($warning-color, $lightness: 95%)"],
  ],
  [
    "--warning-color",
    [
      "--light-warning-text-color",
      "scale-color($warning-color, $lightness: -22%)",
    ],
  ],
  ["--warning-color", ["--light-warning-border-color", "$warning-color"]],
  [
    "--danger-color",
    ["--danger-text-color", "find-color-invert($danger-color)"],
  ],
  [
    "--danger-color",
    ["--danger-hover-color", "scale-color($danger-color, $lightness: -20%)"],
  ],
  [
    "--danger-color",
    ["--light-danger-color", "scale-color($danger-color, $lightness: 95%)"],
  ],
  [
    "--danger-color",
    [
      "--light-danger-text-color",
      "scale-color($danger-color, $lightness: -22%)",
    ],
  ],
  ["--danger-color", ["--light-danger-border-color", "$danger-color"]],
  [
    "--confirm-color",
    ["--confirm-text-color", "find-color-invert($confirm-color)"],
  ],
  [
    "--confirm-color",
    ["--confirm-hover-color", "scale-color($confirm-color, $lightness: -20%)"],
  ],
  [
    "--cancel-color",
    ["--cancel-text-color", "find-color-invert($cancel-color)"],
  ],
  [
    "--cancel-color",
    ["--cancel-hover-color", "scale-color($cancel-color, $lightness: -20%)"],
  ],
  [
    "--disabled-color",
    ["--disabled-text-color", "find-color-invert($disabled-color)"],
  ],
  [
    "--disabled-color",
    [
      "--disabled-hover-color",
      "scale-color($disabled-color, $lightness: -20%)",
    ],
  ],
];
