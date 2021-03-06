import React from 'react';
import './App.css';

// Components
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { CheckpointsProvider } from './contexts/checkpoints';
import { NotesProvider } from './contexts/notes';
import { TasksProvider } from './contexts/tasks';
import { FriendsProvider } from './contexts/friends';

function App() {
  return (
    <TasksProvider>
      <NotesProvider>
        <CheckpointsProvider>
          <AuthProvider>
            <FriendsProvider>
              <Routes />
            </FriendsProvider>
          </AuthProvider>
        </CheckpointsProvider>
      </NotesProvider>
    </TasksProvider>
  );
}

export default App;