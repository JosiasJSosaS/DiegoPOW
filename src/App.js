import React, { useState } from 'react';
import './App.css';
import HomePublic from './components/HomePublic';
import Login from './components/Login';
import Register from './components/Register';
import Autorizar from './components/Autorizar';
import ListsView from './components/ListsView';

export default function App() {
  // 'public' (inicio), 'auth', 'login', 'register', 'listas'
  const [screen, setScreen] = useState('public');

  if (screen === 'login')
    return <Login onCancel={() => setScreen('public')} />;

  if (screen === 'register')
    return <Register onCancel={() => setScreen('public')} />;

  if (screen === 'auth')
    return (
      <Autorizar
        onLogin={() => setScreen('login')}
        onRegister={() => setScreen('register')}
      />
    );

  if (screen === 'listas')
    return (
      <ListsView
        onGoLogin={() => setScreen('login')}
        onGoPeliculas={() => setScreen('public')}
      />
    );

  // Home (público)
  return (
    <HomePublic
      onRequireAuth={() => setScreen('auth')}
      onGoLogin={() => setScreen('login')}
      onGoLists={() => setScreen('listas')}  
    />
  );
}
