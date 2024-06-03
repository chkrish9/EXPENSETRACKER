import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./App";
import { GlobalProvider } from "./context/globalContext";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import '/node_modules/primeflex/primeflex.css';
import './styles/global.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
