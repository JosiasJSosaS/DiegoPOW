import React, { useMemo, useState } from 'react';
import './styles/HomePublic.css';    // reutilizamos variables y layout/base
import './styles/UsersView.css';     // estilos específicos de usuarios
import { FiSearch, FiUser, FiList, FiFilm, FiMenu, FiUserPlus } from 'react-icons/fi';

const mockUsers = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  name: `Usuario ${i + 1}`,
  avatar: `https://picsum.photos/seed/avatar${i}/256/256`,
  tag: i % 3 === 0 ? 'Nuevo' : i % 3 === 1 ? 'Pro' : 'Creador',
}));

export default function UsersView({ onGoPeliculas, onGoListas, onGoLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return !t ? mockUsers : mockUsers.filter(u => u.name.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className={`hp ${menuOpen ? 'hp--menu-open' : ''}`}>
      <div className="hp__overlay" onClick={() => setMenuOpen(false)} />

      <header className="hp__topbar">
        <div className="hp__topbar__inner">
          <div className="hp__brand">
            <button className="hp__burger" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menú">
              <FiMenu size={20} />
            </button>
            <h1>Usuarios</h1>
          </div>
          <div className="hp__actions">
            <button className="hp__signin" onClick={onGoLogin}>
              <FiUser size={18} /> Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="hp__layout" onClick={() => menuOpen && setMenuOpen(false)}>
        {/* Sidebar */}
        <aside className="hp__sidebar">
          <nav>
            <button type="button" className="nav__item" onClick={onGoPeliculas}>
              <FiFilm /> Películas
            </button>
            <button type="button" className="nav__item" onClick={onGoListas}>
              <FiList /> Listas
            </button>
            <button type="button" className="nav__item nav__item--active">
              <FiUser /> Usuarios
            </button>
          </nav>

          <div className="hp__profile">
            <div className="pfp" aria-hidden />
            <div className="pfp__text">Perfil</div>
          </div>
        </aside>

        {/* Main */}
        <main className="hp__main">
          {/* Search */}
          <div className="hp__search">
            <FiSearch className="search__icon" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Buscar usuarios..."
              aria-label="Buscar usuarios"
            />
            {/* botón opcional para crear/seguir */}
            <button className="btn btn--add hp__btn-add">
              <FiUserPlus /> Invitar
            </button>
          </div>

          {/* Grid de usuarios */}
          <section className="user-grid">
            {filtered.map(u => (
              <article className="user-card" key={u.id}>
                <div className="user-card__avatar">
                  <img src={u.avatar} alt={`Avatar de ${u.name}`} />
                </div>
                <div className="user-card__body">
                  <h3 className="user-card__name">{u.name}</h3>
                  <span className={`user-badge user-badge--${u.tag.toLowerCase()}`}>{u.tag}</span>
                </div>
                <div className="user-card__actions">
                  <button className="user-btn">Ver perfil</button>
                  <button className="user-btn user-btn--primary">Seguir</button>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
