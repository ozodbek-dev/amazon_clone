import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@mui/material";
import {theme} from "@/shared/utils/theme.ts";
import {BrowserRouter, } from "react-router-dom";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
          <App />
          </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
)
