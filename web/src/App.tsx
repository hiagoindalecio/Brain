import React from 'react';
import './App.css';

// Components
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { CheckpointsProvider } from './contexts/checkpoints';

function App() {
  return (
    <CheckpointsProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </CheckpointsProvider>
  );
}

export default App;