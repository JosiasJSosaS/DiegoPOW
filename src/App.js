import React, { useState } from 'react';
import './App.css';
import HomePublic from './components/HomePublic';
import Login from './components/Login';
import Register from './components/Register';
import Autorizar from './components/Autorizar';
import ListsView from './components/ListsView';
import ListDetail from './components/ListDetail'; // nueva pantalla

export default function App() {
  // pantallas posibles:
  // 'public' | 'auth' | 'login' | 'register' | 'listas' | 'listDetail'
  const [screen, setScreen] = useState('public');

  // ======= LOGIN =======
  if (screen === 'login')
    return <Login onCancel={() => setScreen('public')} />;

  // ======= REGISTRO =======
  if (screen === 'register')
    return <Register onCancel={() => setScreen('public')} />;

  // ======= AUTORIZAR (pantalla con "Iniciar sesión" y "Nuevo usuario") =======
  if (screen === 'auth')
    return (
      <Autorizar
        onLogin={() => setScreen('login')}
        onRegister={() => setScreen('register')}
      />
    );

  // ======= LISTAS (vista principal de listas) =======
  if (screen === 'listas')
    return (
      <ListsView
        onGoLogin={() => setScreen('login')}
        onGoPeliculas={() => setScreen('public')}
        onOpenListDetail={() => setScreen('listDetail')} // <-- click en una lista
      />
    );

  // ======= DETALLE DE LISTA =======
  if (screen === 'listDetail')
    return (
      <ListDetail
        listTitle="Lista de Ejemplo"
        creator="UsuarioX"
        onGoLogin={() => setScreen('login')}
        onGoPeliculas={() => setScreen('public')}
        onGoListas={() => setScreen('listas')}
        onBack={() => setScreen('listas')}
      />
    );

  // ======= HOME (público por defecto) =======
  return (
    <HomePublic
      onRequireAuth={() => setScreen('auth')}
      onGoLogin={() => setScreen('login')}
      onGoLists={() => setScreen('listas')}
    />
  );
}
