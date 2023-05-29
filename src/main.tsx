import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Index from "./Index.tsx";
import { AppStateProvider } from "./components/AppStateContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppStateProvider>
        <Index />
      </AppStateProvider>
    </ChakraProvider>
  </React.StrictMode>
);
