import React, { useState, useEffect } from "react";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favs);
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>
      <div className="favoritos-lista">
        {favoritos.length === 0 && <p>Você não tem favoritos ainda.</p>}
        {favoritos.map((item) => (
          <div key={item.id}>
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                  : "https://via.placeholder.com/200x300?text=Sem+Imagem"
              }
              alt={item.title || item.name}
              style={{ width: "100px" }}
            />
            <p>{item.title || item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
