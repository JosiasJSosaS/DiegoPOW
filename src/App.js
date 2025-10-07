import React, { useState } from 'react';
import './App.css';

import HomePublic from './components/HomePublic';
import Login from './components/Login';
import Register from './components/Register';
import Autorizar from './components/Autorizar';
import ListsView from './components/ListsView';
import ListDetail from './components/ListDetail';
import UsersView from './components/UsersView'; // NUEVO

export default function App() {
  // pantallas posibles:
  // 'public' | 'auth' | 'login' | 'register' | 'listas' | 'listDetail' | 'usuarios'
  const [screen, setScreen] = useState('public');

  // ======= LOGIN =======
  if (screen === 'login')
    return <Login onCancel={() => setScreen('public')} />;

  // ======= REGISTRO =======
  if (screen === 'register')
    return <Register onCancel={() => setScreen('public')} />;

  // ======= AUTORIZAR =======
  if (screen === 'auth')
    return (
      <Autorizar
        onLogin={() => setScreen('login')}
        onRegister={() => setScreen('register')}
      />
    );

  // ======= LISTAS =======
  if (screen === 'listas')
  return (
    <ListsView
      onGoLogin={() => setScreen('login')}
      onGoPeliculas={() => setScreen('public')}
      onOpenListDetail={() => setScreen('listDetail')}
      onGoUsers={() => setScreen('usuarios')}   // 👈 NUEVO
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

  // ======= USUARIOS =======
  if (screen === 'usuarios')
    return (
      <UsersView
        onGoPeliculas={() => setScreen('public')}
        onGoListas={() => setScreen('listas')}
        onGoLogin={() => setScreen('login')}
      />
    );

  // ======= HOME (público por defecto) =======
  return (
    <HomePublic
      onRequireAuth={() => setScreen('auth')}
      onGoLogin={() => setScreen('login')}
      onGoLists={() => setScreen('listas')}
      onGoUsers={() => setScreen('usuarios')}   // NUEVO
    />
  );
}
