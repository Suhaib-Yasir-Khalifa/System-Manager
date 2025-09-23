import '../../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createRoot } from 'react-dom/client'
import App from './App'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
