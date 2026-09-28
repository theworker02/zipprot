
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

const crypto = require("crypto");
function digest(text, algo = "sha256") {
  return crypto.createHash(algo).update(String(text)).digest("hex");
}
function run(argv) {
  const algo = argv[0] && ["sha256","sha1","md5","sha512"].includes(argv[0]) ? argv[0] : "sha256";
  const text = (algo === argv[0] ? argv.slice(1) : argv).join(" ") || "sample";
  return digest(text, algo);
}

module.exports = { readInput, digest, run };
