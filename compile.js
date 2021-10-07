const path = require("path");
const fs = require("fs").promises;
const fssync = require("fs");
const sass = require("node-sass");

(async () => {
  const dir = "./src";
  for await (const file of getFiles(dir)) {
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
})();

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
    /<style>(.|\r|\n)+?<\/style>/,
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
