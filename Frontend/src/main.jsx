import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'remixicon/fonts/remixicon.css'

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
);
