import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ENV from "./config/env";
import "./index.css"; // Import Tailwind CSS
import { store } from "./stores";


ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
