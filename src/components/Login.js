import React from 'react';
import './styles/Login.css';

export default function Login({ onCancel }) {
  return (
    <div className="login">
      <header className="login__topbar">
        <div className="login__inner">
          <h1>Iniciar Sesión</h1>
        </div>
      </header>

      <main className="login__stage">
        <form className="login__card" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <input
              type="email"
              placeholder="Correo..."
              aria-label="Correo"
              required
            />
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="Contraseña..."
              aria-label="Contraseña"
              required
            />
          </div>

          <button className="btn btn--primary" type="submit">
            Iniciar Sesión
          </button>

          <button className="btn btn--ghost" type="button" onClick={onCancel}>
            Cancelar
          </button>
        </form>
      </main>
    </div>
  );
}
