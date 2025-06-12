import React, { useState, useEffect } from "react";
import "../styles/style.scss";
import "../styles/Carrossel.scss";

// COMPONENTES FILHOS DENTRO DE HOME
function BarraPesquisa() {
  return (
    <div className="barra-pesquisa" id="barraPesquisa">
      <input type="text" placeholder="Pesquisar por um filme, série, pessoa..." />
    </div>
  );
}

function BemVindo() {
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

function SessaoCarrossel({ titulo, botoes }) {
  const [ativo, setAtivo] = useState(botoes[0].endpoint);

  return (
    <section>
      <h2 className={titulo.toLowerCase()}>{titulo}</h2>
      <div className="abas">
        {botoes.map(({ label, endpoint }) => (
          <button
            key={endpoint}
            className={ativo === endpoint ? "ativa" : ""}
            onClick={() => setAtivo(endpoint)}
          >
            {label}
          </button>
        ))}
      </div>
      <Carrossel endpoint={ativo} titulo={titulo} />
    </section>
  );
}

function Carrossel({ titulo, endpoint }) {
  const [itens, setItens] = useState([]);

  const API_KEY = "582207357eac2041dcd9e4109471bd7d";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const separador = endpoint.includes("?") ? "&" : "?";
    const url = `${BASE_URL}${endpoint}${separador}api_key=${API_KEY}&language=pt-BR`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setItens(data.results || []))
      .catch((err) => console.error("Erro ao carregar carrossel:", err));
  }, [endpoint]);

  return (
    <section className="carrossel">
      <h2>{titulo}</h2>
      <div className="slides">
        {itens.map((item) => (
          <CardFilme key={item.id} filme={item} />
        ))}
      </div>
    </section>
  );
}

function CardFilme({ filme }) {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavorito(favoritos.some((f) => f.id === filme.id));
  }, [filme]);

  const toggleFavorito = () => {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (favorito) {
      favoritos = favoritos.filter((f) => f.id !== filme.id);
    } else {
      favoritos.push(filme);
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    setFavorito(!favorito);
  };

  return (
    <div className="slide-item">
      <img
        src={
          filme.poster_path
            ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
            : "https://via.placeholder.com/200x300?text=Sem+Imagem"
        }
        alt={filme.title || filme.name}
      />
      <p>{filme.title || filme.name}</p>
      <button className="favoritar" onClick={toggleFavorito}>
        {favorito ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <BarraPesquisa />
      <BemVindo />

      <SessaoCarrossel
        titulo="Tendências"
        botoes={[
          { label: "Hoje", endpoint: "/trending/movie/day" },
          { label: "Esta semana", endpoint: "/trending/movie/week" },
        ]}
      />

      <SessaoCarrossel
        titulo="Últimos Trailers"
        botoes={[
          { label: "Hoje", endpoint: "/movie/now_playing" },
          { label: "Popular", endpoint: "/movie/popular" },
          { label: "Streaming", endpoint: "/discover/movie?with_watch_providers=8&watch_region=BR" },
          { label: "Na TV", endpoint: "/tv/airing_today" },
          { label: "Para Alugar", endpoint: "/discover/movie?with_watch_monetization_types=rent" },
        ]}
      />

      <SessaoCarrossel
        titulo="Os mais populares"
        botoes={[
          { label: "Hoje", endpoint: "/movie/popular" },
          { label: "Popular", endpoint: "/tv/popular" },
          { label: "Streaming", endpoint: "/discover/movie?with_watch_providers=8&watch_region=BR" },
          { label: "Na TV", endpoint: "/tv/airing_today" },
          { label: "Para Alugar", endpoint: "/discover/movie?with_watch_monetization_types=rent" },
        ]}
      />

      <SessaoCarrossel
        titulo="Ver gratuitos"
        botoes={[
          { label: "Filmes", endpoint: "/discover/movie?with_watch_monetization_types=free" },
          { label: "TV", endpoint: "/discover/tv?with_watch_monetization_types=free" },
        ]}
      />
    </main>
  );
}
