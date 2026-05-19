import { createReadStream, existsSync, readFileSync, statSync, watch } from "node:fs";
import { spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || "0.0.0.0";
const reloadClients = new Set();
let buildTimer = null;
let isBuilding = false;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
};

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = normalize(join(root, requested));

  if (!filePath.startsWith(root)) {
    return null;
  }

  return filePath;
}

function getLanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((item) => item && item.family === "IPv4" && !item.internal)
    .map((item) => item.address);
}

function injectReloadClient(html) {
  const script = `
<script>
(() => {
  if (!("EventSource" in window)) return;
  const source = new EventSource("/__reload");
  source.addEventListener("reload", () => window.location.reload());
})();
</script>`;
  return html.includes("</body>") ? html.replace("</body>", `${script}\n</body>`) : `${html}${script}`;
}

function notifyReloadClients() {
  for (const response of reloadClients) {
    response.write("event: reload\\ndata: now\\n\\n");
  }
}

function runBuild() {
  if (isBuilding) return;
  isBuilding = true;
  console.log("Rebuilding iPad preview...");
  const result = spawnSync(process.execPath, ["build-ipad.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status === 0) {
    console.log("Preview rebuilt. Reloading connected browsers.");
    notifyReloadClients();
  } else {
    console.error("Build failed. Fix the error above and save again.");
  }
  isBuilding = false;
}

function scheduleBuild() {
  clearTimeout(buildTimer);
  buildTimer = setTimeout(runBuild, 250);
}

function watchSourceFiles() {
  const watchTargets = ["app.js", "styles.css", "build-ipad.mjs", "v2.0/data"];
  for (const target of watchTargets) {
    const targetPath = join(root, target);
    if (!existsSync(targetPath)) continue;
    watch(targetPath, { recursive: target === "v2.0/data" }, (_event, fileName) => {
      if (!fileName || String(fileName).endsWith("~")) return;
      scheduleBuild();
    });
  }
}

createServer((request, response) => {
  if (request.url === "/__reload") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    });
    response.write("\\n");
    reloadClients.add(response);
    request.on("close", () => reloadClients.delete(response));
    return;
  }

  const filePath = resolveRequestPath(request.url || "/");

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const stats = statSync(filePath);
    if (!stats.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });

    if (extname(filePath).toLowerCase() === ".html") {
      response.end(injectReloadClient(readFileSync(filePath, "utf8")));
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, host, () => {
  console.log(`Song Brocade web app: http://localhost:${port}/`);
  for (const address of getLanAddresses()) {
    console.log(`LAN access: http://${address}:${port}/`);
  }
  console.log("Watching source files. Save changes to rebuild and auto-refresh.");
  watchSourceFiles();
});
