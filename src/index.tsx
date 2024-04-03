import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// render a loading message
root.render(
  <React.StrictMode>
    <AppRouter user={
      {
        username: 'user',
        password: 'pass'
      }
    }/>
  </React.StrictMode>,
);

reportWebVitals();