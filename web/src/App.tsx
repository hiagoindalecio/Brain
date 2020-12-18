import React from 'react';
import './App.css';
//import NavigationContainer from 'react-navigation';

// Components
import Routes from './routes';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;