import { StrictMode } from "react";
import { render } from "react-dom";
import "./index.css";
import AuthProvider from "./contexts/AuthContext";
import App from "./App";

render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
  document.querySelector("#root")
);
