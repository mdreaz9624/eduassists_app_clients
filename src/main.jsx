import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom"; // FIXED
import { router } from './Root/Root.jsx';
import AuthProvider from './contents/AuthContext/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>
)
