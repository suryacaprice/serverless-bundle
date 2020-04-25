const fs = require("fs-extra");

function WebpackBinPermission(options) {
  this.options = options || {};
}

WebpackBinPermission.prototype.apply = function(compiler) {
  compiler.plugin("done", () => {
    const permissions = this.options.permissions || "777";
    const binPath = `${compiler.outputPath}/bin`;
    const sharedlibpath = `${compiler.outputPath}/sharedlib`;
    const commonpath = `${compiler.outputPath}/common`;
    fs.readdir(binPath, (err, items) => {
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i += 1) {
          fs.chmodSync(`${binPath}/${items[i]}`, permissions);
        }
      }
    });
    fs.readdir(sharedlibpath, (err, items) => {
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i += 1) {
          fs.chmodSync(`${sharedlibpath}/${items[i]}`, permissions);
        }
      }
    });
    fs.readdir(commonpath, (err, items) => {
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i += 1) {
          fs.chmodSync(`${commonpath}/${items[i]}`, permissions);
        }
      }
    });
  });
};

module.exports = WebpackBinPermission;
