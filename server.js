const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT) || 3000;
const publicDirectory = __dirname;
const prompts = [
  "What would feel a little lighter right now?",
  "Name one thing that is already going right.",
  "What can wait until tomorrow?",
  "Take one slow breath, then choose your next kind step."
];

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function serveFile(request, response) {
  const requestedPath = request.url === "/" ? "/index.html" : request.url;
  const filePath = path.normalize(path.join(publicDirectory, requestedPath));

  if (!filePath.startsWith(publicDirectory)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, file) => {
    if (error) {
      sendJson(response, error.code === "ENOENT" ? 404 : 500, { error: "File not found" });
      return;
    }

    const extension = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream"
    });
    response.end(file);
  });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && requestUrl.pathname === "/api/health") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/prompts") {
    sendJson(response, 200, { prompts });
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  serveFile(request, response);
});

server.listen(port, () => {
  console.log(`Small Reset is running at http://localhost:${port}`);
});
