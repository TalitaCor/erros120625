import React, { useState, useEffect } from "react";

export default function CardFilme({ filme }) {
  const [favorito, setFavorito] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [mostrarTrailer, setMostrarTrailer] = useState(false);

  const API_KEY = "582207357eac2041dcd9e4109471bd7d";

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

  const abrirTrailer = () => {
    if (mostrarTrailer) {
      setMostrarTrailer(false);
      setTrailerKey(null);
      return;
    }
    fetch(`https://api.themoviedb.org/3/movie/${filme.id}/videos?api_key=${API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => {
        const trailer = data.results.find(
          video => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
          setMostrarTrailer(true);
        } else {
          alert("Trailer não disponível.");
        }
      })
      .catch(err => {
        console.error("Erro ao buscar trailer:", err);
        alert("Erro ao carregar trailer.");
      });
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
        style={{ cursor: "pointer" }}
        onClick={abrirTrailer}
      />
      <p>{filme.title || filme.name}</p>
      <button className="favoritar" onClick={toggleFavorito}>
        {favorito ? "❤️" : "🤍"}
      </button>
      {mostrarTrailer && trailerKey && (
        <div className="trailer" style={{ marginTop: "10px" }}>
          <iframe
            width="320"
            height="180"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={() => setMostrarTrailer(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
