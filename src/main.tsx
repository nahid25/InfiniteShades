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
