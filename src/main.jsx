import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider, theme } from "antd";

const { darkAlgorithm } = theme;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
