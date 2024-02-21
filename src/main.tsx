<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react";
import App from './App.tsx'
import './index.css';
import { LocalStorageProvider } from './utils/LocalStorageContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <LocalStorageProvider>
        <App />
      </LocalStorageProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
=======
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Index from "./Index.tsx";
import { AppStateProvider } from "./components/AppStateContext.tsx";
import { LocalStorageProvider } from "./components/LocalStorageContext.tsx";
import { TagProvider } from "./components/TagContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppStateProvider>
        <TagProvider>
          <LocalStorageProvider>
            <Index />
          </LocalStorageProvider>
        </TagProvider>
      </AppStateProvider>
    </ChakraProvider>
  </React.StrictMode>
);
>>>>>>> main
