import React, { useMemo, useState } from "react";
import "./styles/ListsView.css";
import { FiSearch, FiUser, FiList, FiFilm } from "react-icons/fi";

const mockLists = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Título ${i + 1}`,
  creator: ["Diego", "Ana", "Luis", "Sofía"][i % 4],
  avatars: [
    "https://i.pravatar.cc/80?img=15",
    "https://i.pravatar.cc/80?img=31",
    "https://picsum.photos/seed/m1/80/80",
    "https://picsum.photos/seed/m2/80/80",
  ],
}));

export default function ListsView({
  onGoLogin,
  onGoPeliculas,
  onOpenListDetail,
  onGoUsers = () => {},       
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return !t
      ? mockLists
      : mockLists.filter((l) => l.creator.toLowerCase().includes(t));
  }, [q]);

  const onKeyOpen = (e, list) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenListDetail && onOpenListDetail(list);
    }
  };

  return (
    <div className="hp">
      {/* Topbar */}
      <header className="hp__topbar">
        <div className="hp__topbar__inner">
          <h1>Listas</h1>
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
            <button type="button" className="nav__item nav__item--active">
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

        {/* Main */}
        <main className="hp__main">
          {/* Search */}
          <div className="hp__search">
            <FiSearch className="search__icon" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por creador..."
              aria-label="Buscar listas por creador"
            />
          </div>

          {/* Grid de listas */}
          <section className="lists-grid">
            {filtered.map((l) => (
              <article
                key={l.id}
                className="list-card"
                role="button"
                tabIndex={0}
                onClick={() => onOpenListDetail && onOpenListDetail(l)}
                onKeyDown={(e) => onKeyOpen(e, l)}
                title={`Abrir ${l.title}`}
              >
                <div className="list-card__thumbs">
                  {l.avatars.slice(0, 4).map((src, idx) => (
                    <img key={idx} src={src} alt="" />
                  ))}
                </div>

                <div className="list-card__body">
                  <h3 className="list-card__title">{l.title}</h3>
                  <div className="list-card__meta">
                    <span className="muted">Creado por</span>
                    <strong>{l.creator}</strong>
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
