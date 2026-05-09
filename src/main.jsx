import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom"; // FIXED
import { router } from './Root/Root.jsx';
import AuthProvider from './contents/AuthContext/AuthProvider.jsx';
import { LoadingProvider } from './contents/LoadingContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LoadingProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LoadingProvider>
  </StrictMode>
)
