const fs = require("fs-extra");
const concat = require("concat");
const path = require("path");

const build = async () => {
  const dest = "web-component/assets/quml-editor/";
  const files = [
    "./dist/questionset-editor-library-wc/runtime.js",
    "./dist/questionset-editor-library-wc/polyfills.js",
    "./dist/questionset-editor-library-wc/scripts.js",
    "./dist/questionset-editor-library-wc/main.js"
  ];

  // Ensure directories exist
  await fs.ensureDir("dist/questionset-editor-library-wc");
  await fs.ensureDir(dest);

  // Concatenate JS files into single bundle
  await concat(files, path.join(dest, "sunbird-questionset-editor.js"));
  
  // Copy assets folder
  await fs.copy("./dist/questionset-editor-library-wc/assets", path.join(dest, "assets"));
  
  // Copy styles.css
  await fs.copy("./dist/questionset-editor-library-wc/styles.css", path.join(dest, "styles.css"));
  
  // Copy README
  await fs.copy("README.md", path.join(dest, "README.md"));
  
  // Copy index.html from vanilla-js example
  await fs.copy("web-component-examples/vanilla-js/index.html", path.join(dest, "index.html"));
  
  // Copy questionsetEditorConfig.json
  await fs.copy("web-component-examples/vanilla-js/questionsetEditorConfig.json", path.join(dest, "questionsetEditorConfig.json"));
  
  // Update the documentation link in the copied index.html
  const indexPath = path.join(dest, "index.html");
  let indexContent = fs.readFileSync(indexPath, "utf8");
  indexContent = indexContent.replace(
    'href="assets/quml-editor/styles.css"',
    'href="styles.css"'
  ).replace(
    'src="assets/quml-editor/sunbird-questionset-editor.js"',
    'src="sunbird-questionset-editor.js"'
  );
  fs.writeFileSync(indexPath, indexContent);

  // Copy library assets
  await fs.copy("projects/questionset-editor-library/src/lib/assets/", path.join(dest, "assets"));

  // Copy font files (.ttf, .woff, .woff2) from dist to dest
  const filesNames = fs.readdirSync("dist/questionset-editor-library-wc");
  const allowedFiles = [".ttf", ".woff", ".woff2"];

  filesNames.forEach((file) => {
    if (allowedFiles.includes(path.extname(file))) {
      fs.copySync(`dist/questionset-editor-library-wc/${file}`, path.join(dest, file));
    }
  });

  console.log("Files concatenated successfully!!!");

  // Cleanup old files from web-component root if they exist
  const filesToRemove = [
    "sunbird-questionset-editor.js",
    "styles.css",
    "README.md"
  ];
  filesToRemove.forEach(file => {
    const filePath = path.join("web-component", file);
    if (fs.existsSync(filePath)) {
      fs.removeSync(filePath);
    }
  });

  // Remove old font files from web-component root
  if (fs.existsSync("web-component")) {
    const rootFiles = fs.readdirSync("web-component");
    rootFiles.forEach(file => {
      if (allowedFiles.includes(path.extname(file))) {
        const filePath = path.join("web-component", file);
        if (fs.existsSync(filePath)) {
          fs.removeSync(filePath);
        }
      }
    });
  }

  // Cleanup redundant assets from web-component/assets/ if they exist (keeping only quml-editor)
  const assetsRoot = "web-component/assets";
  if (fs.existsSync(assetsRoot)) {
    const assetsFiles = fs.readdirSync(assetsRoot);
    assetsFiles.forEach(file => {
      if (file !== "quml-editor") {
        const filePath = path.join(assetsRoot, file);
        if (fs.existsSync(filePath)) {
          fs.removeSync(filePath);
        }
      }
    });
  }

  // Also update vanilla-js example
  const vanillaJsDest = "web-component-examples/vanilla-js/";
  await fs.ensureDir(vanillaJsDest);
  await concat(files, path.join(vanillaJsDest, "sunbird-questionset-editor.js"));
  await fs.copy("./dist/questionset-editor-library-wc/styles.css", path.join(vanillaJsDest, "styles.css"));
  await fs.copy("./dist/questionset-editor-library-wc/assets", path.join(vanillaJsDest, "assets"));
  
  // Copy font files to vanilla-js example too
  filesNames.forEach((file) => {
    if (allowedFiles.includes(path.extname(file))) {
      fs.copySync(`dist/questionset-editor-library-wc/${file}`, path.join(vanillaJsDest, file));
    }
  });
};
build();
