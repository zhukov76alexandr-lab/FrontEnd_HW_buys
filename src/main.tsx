import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Buy } from './buy/Buy'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {makeServer} from './mirage/server'

const queryClient = new QueryClient()

makeServer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Buy />
    </QueryClientProvider>
  </StrictMode>,
)
