import "regenerator-runtime/runtime";
import path from "path";
import { promises as fs } from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import * as proxy from "http-proxy-middleware";
import App from "../src/App";
import * as theme from "../src/theme";
import dotenv from "dotenv";
import livereload from "livereload";

dotenv.config({ path: `.env` });
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const buildpath = process.env.NODE_ENV === "development" ? "dist" : "build";

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === "development") {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(buildpath);

  app.use(
    /(:?js|css).map$/,
    proxy.createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
}

app.get("/", async (req, res) => {
  try {
    const cache = theme.cache();
    const emotion = createEmotionServer(cache);

    const app = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme.theme}>
          <CssBaseline />
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </ThemeProvider>
      </CacheProvider>
    );

    const indexFile = path.resolve(`./${buildpath}/index.html`);
    const data = await fs.readFile(indexFile, "utf8");

    const emotionChunks = emotion.extractCriticalToChunks(app);
    const emotionCss = emotion.constructStyleTagsFromChunks(emotionChunks);

    const html = data
      .replace("</title>", `</title>${emotionCss}`)
      .replace('<div id="root"></div>', `<div id="root">${app}</div>`);

    return res.send(html);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something went wrong");
  }
});

app.use(express.static(`./${buildpath}`));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
