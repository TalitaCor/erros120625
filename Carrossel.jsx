import React, { useState, useEffect } from "react";
import CardFilme from "./CardFilme";

export default function Carrossel({ titulo, endpoint }) {
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
