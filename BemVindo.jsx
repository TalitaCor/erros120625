import React from "react";

export default function BemVindo() {
  return (
    <div className="bemvindos">
      <h1 id="bemVindo">Bem-vindo ao TMDB.</h1>
      <h2>Esta é uma página de exemplo para o TMDB.</h2>
      <p>Milhares de filmes, séries e pessoas para descobrir. Explore já!</p>
      <div className="buscar">
        <input type="text" id="inputPesquisa" placeholder="Pesquise o nome do filme, série ou pessoa..." />
        <div className="butao">
          <button id="btnPesquisar" type="submit">Pesquisar</button>
        </div>
      </div>
      <div id="resultadoBusca"></div>
    </div>
  );
}
