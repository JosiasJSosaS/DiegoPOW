import React, { useMemo, useState } from "react";
import "./styles/ListDetail.css";
import { FiSearch, FiUser, FiList, FiFilm, FiArrowLeft } from "react-icons/fi";

/** Mock de películas dentro de la lista */
const mockItems = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: `Título ${i + 1}`,
  rating: (Math.random() * 2 + 8).toFixed(1),
  poster: `https://picsum.photos/seed/listitem${i}/480/320`,
}));

/**
 * Props:
 * - listTitle: string (título de la lista)
 * - creator: string (nombre del creador)
 * - onGoPeliculas(): void
 * - onGoListas(): void
 * - onGoLogin(): void
 * - onBack?(): void   // opcional (volver a ListsView)
 */
export default function ListDetail({
  listTitle = "Lista",
  creator = "Nombre",
  onGoPeliculas,
  onGoListas,
  onGoLogin,
  onBack,
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return !t
      ? mockItems
      : mockItems.filter((m) => m.title.toLowerCase().includes(t));
  }, [q]);

  return (
    <div className="hp">
      {/* Topbar */}
      <header className="hp__topbar">
        <div className="hp__topbar__inner">
          <div className="ld__title">
            {onBack && (
              <button className="ld__back" onClick={onBack} title="Volver">
                <FiArrowLeft size={18} />
              </button>
            )}
            <h1>{listTitle}</h1>
          </div>
          <button className="hp__signin" onClick={onGoLogin}>
            <FiUser size={18} /> Iniciar sesión
          </button>
        </div>
      </header>

      <div className="hp__layout">
        {/* Sidebar */}
        <aside className="hp__sidebar">
          <nav>
            <button type="button" className="nav__item" onClick={onGoPeliculas}>
              <FiFilm /> Películas
            </button>
            <button type="button" className="nav__item nav__item--active" onClick={onGoListas}>
              <FiList /> Listas
            </button>
            <button type="button" className="nav__item">
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
          <div className="ld__header">
            <p className="ld__creator">
              <span className="muted">Creado por:</span> <strong>{creator}</strong>
            </p>

            <div className="ld__search hp__search">
              <FiSearch className="search__icon" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar dentro de la lista…"
                aria-label="Buscar películas de la lista"
              />
            </div>
          </div>

          {/* Grid de películas (tarjetas blancas) */}
          <section className="grid">
            {filtered.map((m) => (
              <article key={m.id} className="hp-card">
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
