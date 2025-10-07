import React, { useMemo, useState } from 'react';
import './styles/HomePublic.css';
import { FiSearch, FiPlus, FiUser, FiList, FiFilm, FiMenu } from 'react-icons/fi';

const mockMovies = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Título ${i + 1}`,
  rating: (Math.random() * 2 + 8).toFixed(1),
  poster: `https://picsum.photos/seed/poster${i}/480/320`,
}));

export default function HomePublic({
  onRequireAuth,
  onGoLogin,
  onGoLists,
  onGoUsers = () => {},   
}) {
  const [q, setQ] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return !t ? mockMovies : mockMovies.filter(m => m.title.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className={`hp ${menuOpen ? 'hp--menu-open' : ''}`}>
      {/* Overlay móvil para cerrar sidebar */}
      <div className="hp__overlay" onClick={() => setMenuOpen(false)} />

      {/* Topbar */}
      <header className="hp__topbar">
        <div className="hp__topbar__inner">
          <div className="hp__brand">
            <button className="hp__burger" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menú">
              <FiMenu size={20} />
            </button>
            <h1>Películas</h1>
          </div>
          <div className="hp__actions">
            <button className="hp__signin" onClick={onGoLogin}>
              <FiUser size={18} /> Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="hp__layout" onClick={() => menuOpen && setMenuOpen(false)}>
        {/* Sidebar (off-canvas en móvil) */}
        <aside className="hp__sidebar">
          <nav>
            <button type="button" className="nav__item nav__item--active">
              <FiFilm /> Películas
            </button>
            <button type="button" className="nav__item" onClick={onGoLists}>
              <FiList /> Listas
            </button>
            <button type="button" className="nav__item" onClick={onGoUsers}>
              <FiUser /> Usuarios
            </button>
          </nav>

          <div className="hp__profile">
            <div className="pfp" aria-hidden />
            <div className="pfp__text">Perfil</div>
          </div>
        </aside>

        {/* Main (scrolleable) */}
        <main className="hp__main">
          {/* Search */}
          <div className="hp__search">
            <FiSearch className="search__icon" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Buscar..."
              aria-label="Buscar películas"
            />
            <button
              className="btn btn--add hp__btn-add"
              onClick={onRequireAuth}
              title="Debes iniciar sesión"
            >
              <FiPlus /> Añadir
            </button>
          </div>

          {/* Grid */}
          <section className="grid">
            {filtered.map(m => (
              <article className="hp-card" key={m.id}>
                <img src={m.poster} alt={`Póster de ${m.title}`} />
                <div className="hp-card__body">
                  <h3 className="hp-card__title">{m.title}</h3>
                  <div className="hp-card__meta">
                    <span className="muted">Rating:</span>
                    <strong>{m.rating}</strong>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
