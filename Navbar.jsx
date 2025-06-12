import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar-azul">
      <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
        <li><Link to="/filmes">Filmes</Link></li>
        <li><Link to="/series">Séries</Link></li>
        <li><Link to="/pessoas">Pessoas</Link></li>
        <li><Link to="/favoritos">Favoritos</Link></li>
        <li><Link to="/sessao">Iniciar sessão</Link></li>
        <li><Link to="/cadastro">Cadastros</Link></li>
      </ul>
    </nav>
  );
}
