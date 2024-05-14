import App from "./App";
import React from "react";
import { Toaster } from "sonner";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "animate.css/animate.min.css";
import "animate.css/animate.compat.css";
import "rc-drawer/assets/index.css";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-notifications-component/dist/theme.css";

import { DrawerContext } from "./contexts/drawer.context";
import { AppContextProvider } from "./contexts/app.context";
import { ReactNotifications } from "react-notifications-component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <DrawerContext>
        <Toaster position="top-right" richColors duration={3000} />
        <ReactNotifications />
        <App />
      </DrawerContext>
    </AppContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
