import React from 'react';
import './App.css';
//import NavigationContainer from 'react-navigation';

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