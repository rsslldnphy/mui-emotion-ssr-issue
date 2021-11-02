import { createTheme } from "@mui/material";
import createCache from "@emotion/cache";

export const cache = () => createCache({ key: "css" });

export const theme = createTheme({
  typography: {
    h1: {
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    body2: {
      color: "red",
    },
  },
});

export default theme;
