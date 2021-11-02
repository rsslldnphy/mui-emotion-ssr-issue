import React from "react";
import * as UI from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const App = () => {
  return (
    <>
      <div
        css={css`
          color: red;
        `}
      >
        Lorem ipsum
      </div>
      <UI.Box
        css={css`
          color: green;
        `}
      >
        Lorem ipsum
      </UI.Box>
    </>
  );
};

export default App;
