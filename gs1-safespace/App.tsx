import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Routes from './src/navigation/Routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}