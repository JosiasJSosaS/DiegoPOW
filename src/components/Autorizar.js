import React from 'react';
import './styles/Autorizar.css';
import { FaUser, FaUserPlus } from 'react-icons/fa';

const Card = ({ icon, label, onClick }) => (
  <button className="card" type="button" onClick={onClick}>
    <div className="card__icon">{icon}</div>
    <span className="card__label">{label}</span>
  </button>
);

export default function Autorizar({ onLogin, onRegister }) {
  return (
    <div className="autorizar">
      <header className="topbar">
        <div className="topbar__inner">
          <h1>Autorizar</h1>
        </div>
      </header>

      <main className="stage">
        <section className="panel">
          <Card icon={<FaUser size={56} />} label="Iniciar Sesión" onClick={onLogin} />
          <Card icon={<FaUserPlus size={56} />} label="Nuevo Usuario" onClick={onRegister} />
        </section>
      </main>
    </div>
  );
}
