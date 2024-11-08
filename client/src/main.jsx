import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './routers/Router.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-screen-xl mx-auto'></div>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} ></RouterProvider>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
