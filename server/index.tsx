import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { path, React, ReactDOMServer } from "../deps.ts";
import App from "../client/App.tsx";
const __dirname = new URL(".", import.meta.url).pathname;
const { files } = await Deno.emit(
  path.resolve(__dirname, "../client/index.tsx"),
  {
    bundle: "module",
    compilerOptions: { lib: ["dom", "dom.iterable", "esnext"] },
  },
);

const jsBundlePath = "/bundle.js";

const router = new Router();
router
  .get("/", (context) => {
    const app = ReactDOMServer.renderToString(<App />);
    context.response.type = "text/html";
    context.response.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
        <script type="module" src="${jsBundlePath}"></script>
    </head>
    <body>
        <div id="root">
        ${app}
        </div>
    </body>
    </html>`;
  })
  .get(jsBundlePath, (context) => {
    context.response.type = "application/javascript";
    context.response.body = files["deno:///bundle.js"];
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;
app.listen({ port });

console.log(`Server is running on port ${port}`);
