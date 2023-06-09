import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Index from "./Index.tsx";
import { AppStateProvider } from "./components/AppStateContext.tsx";
import { LocalStorageProvider } from "./components/LocalStorageContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppStateProvider>
        <LocalStorageProvider>
          <Index />
        </LocalStorageProvider>
      </AppStateProvider>
    </ChakraProvider>
  </React.StrictMode>
);
