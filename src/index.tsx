import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import * as theme from "./theme";

(async () => {
  const cache = theme.cache();

  ReactDOM.hydrate(
    <React.StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme.theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
