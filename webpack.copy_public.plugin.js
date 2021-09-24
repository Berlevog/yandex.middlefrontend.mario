const fs = require("fs-extra");
const path = require("path");

class CopyPublicPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(
      "Copy Public Plugin",
      (stats /* stats is passed as an argument when done hook is tapped.  */) => {
        fs.copySync(path.join(__dirname, "public"), path.join(__dirname, "build"), {
          dereference: true,
          filter: (file) => {
            return file !== path.join(__dirname, "public", "index.html");
          },
        });
      }
    );
  }
}

module.exports = CopyPublicPlugin;
