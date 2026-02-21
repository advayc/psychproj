import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Activity from './pages/Activity';
import Admin from './pages/Admin';
import Learn from './pages/Learn';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-center" theme="dark" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
