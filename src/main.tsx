import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './routes.tsx';
import "react-datepicker/dist/react-datepicker.css";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider>
            <AppRoutes/>
        </ChakraProvider>
    </React.StrictMode>
);
