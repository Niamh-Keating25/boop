import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import reportWebVitals from "./reportWebVitals";
import { getLoggedInUser } from "./api";
import { LoginPage } from "./pages/Login/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAccountPage } from "./pages/Create-Account/CreateAccountPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <h1>Loading...</h1>
  </React.StrictMode>,
);

getLoggedInUser().then((user) => {
  root.render(
    <React.StrictMode>
      <AppRouter user={user}/>
    </React.StrictMode>,
  );
}).catch((error) => {
  console.log(error);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="*" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
          </Routes>
        </BrowserRouter>
    </React.StrictMode>,
  );
})

// render a loading message


reportWebVitals();