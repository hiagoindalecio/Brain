import React from 'react';
import './App.css';

// Components
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { CheckpointsProvider } from './contexts/checkpoints';
import { NotesProvider } from './contexts/notes';

function App() {
  return (
    <NotesProvider>
      <CheckpointsProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </CheckpointsProvider>
    </NotesProvider>
  );
}

export default App;