import React from 'react';
import './styles/Register.css';

export default function Register({ onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // aquí luego puedes integrar tu backend
    alert('Registro enviado ✅ (demo)');
  };

  return (
    <div className="reg">
      <header className="reg__topbar">
        <div className="reg__inner">
          <h1>Registrar</h1>
        </div>
      </header>

      <main className="reg__stage">
        <form className="reg__card" onSubmit={handleSubmit}>
          <div className="field">
            <input type="text" placeholder="Nombre..." aria-label="Nombre" required />
          </div>

          <div className="field">
            <input type="email" placeholder="Correo..." aria-label="Correo" required />
          </div>

          <div className="field">
            <input type="password" placeholder="Contraseña..." aria-label="Contraseña" required />
          </div>

          <button className="btn btn--primary" type="submit">Registrar</button>
          <button className="btn btn--ghost" type="button" onClick={onCancel}>Cancelar</button>
        </form>
      </main>
    </div>
  );
}
