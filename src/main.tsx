import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./routes.tsx";
import "react-datepicker/dist/react-datepicker.css";
import { ModalProvider } from "./contexts/ModalContext/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </ChakraProvider>
  </React.StrictMode>
);
