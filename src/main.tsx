import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./routes.tsx";
import "react-datepicker/dist/react-datepicker.css";
import { InfoModalProvider } from "./contexts/InfoModalContext/index.tsx";
import { FormModalProvider } from "./contexts/FormModalContext/index.tsx";
import { ScheduleProvider } from "./contexts/ScheduleContext/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ScheduleProvider>
        <FormModalProvider>
          <InfoModalProvider>
            <AppRoutes />
          </InfoModalProvider>
        </FormModalProvider>
      </ScheduleProvider>
    </ChakraProvider>
  </React.StrictMode>
);
