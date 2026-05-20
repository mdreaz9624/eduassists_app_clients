import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom"; // FIXED
import { router } from './Root/Root.jsx';
import AuthProvider from './contents/AuthContext/AuthProvider.jsx';

// 1. Import TanStack Query pieces
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. Create a QueryClient instance outside the component
const queryClient = new QueryClient()




createRoot(document.getElementById('root')).render(
  <StrictMode>
      
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>  
      
  </StrictMode>
)
