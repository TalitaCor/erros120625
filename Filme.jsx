import React, { useEffect, useState } from "react";
import Filme from "../components/Filme";

import "../styles/style.scss";
import "../styles/filmes.scss";

const API_KEY = "582207357eac2041dcd9e4109471bd7d";
const BASE_URL = "https://api.themoviedb.org/3";

// Regiões com países dentro
const REGIOES = {
  America: [
    { codigo: "BR", nome: "Brasil" },
    { codigo: "US", nome: "Estados Unidos" },
    { codigo: "MX", nome: "México" },
  ],
  Europa: [
    { codigo: "FR", nome: "França" },
    { codigo: "DE", nome: "Alemanha" },
    { codigo: "IT", nome: "Itália" },
  ],
  Asia: [
    { codigo: "JP", nome: "Japão" },
    { codigo: "KR", nome: "Coreia do Sul" },
    { codigo: "TH", nome: "Tailândia" },
    { codigo: "CN", nome: "China" },
  ],
};

function Filmes() {
  const [filmesPorPais, setFilmesPorPais] = useState({});
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("America");

  useEffect(() => {
    const fetchFilmesPorPais = async (pais) => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&region=${pais}`
        );
        const data = await res.json();
        return data.results || [];
      } catch (error) {
        console.error(`Erro ao carregar filmes do país ${pais}:`, error);
        return [];
      }
    };

    const carregarFilmesDaRegiao = async () => {
      const filmesPorPaisTemp = {};
      const paises = REGIOES[regiaoSelecionada];

      for (const p of paises) {
        filmesPorPaisTemp[p.codigo] = await fetchFilmesPorPais(p.codigo);
      }
      setFilmesPorPais(filmesPorPaisTemp);
    };

    carregarFilmesDaRegiao();
  }, [regiaoSelecionada]);

  return (
    <div className="pagina">
      <h1 className="titulo">Filmes Populares por Região e País</h1>

      <div className="abas-paises">
        {Object.keys(REGIOES).map((regiao) => (
          <button
            key={regiao}
            className={`aba ${regiaoSelecionada === regiao ? "ativa" : ""}`}
            onClick={() => setRegiaoSelecionada(regiao)}
          >
            {regiao}
          </button>
        ))}
      </div>

      <div className="carrossel-regiao">
        {REGIOES[regiaoSelecionada].map(({ codigo, nome }) => (
          <section key={codigo} className="carrossel-pais">
            <h2 className="titulo-pais">{nome}</h2>
            {filmesPorPais[codigo] && filmesPorPais[codigo].length > 0 ? (
              <div className="grade-filmes">
                {filmesPorPais[codigo].map((filme) => (
                  <Filme key={filme.id} filme={filme} />
                ))}
              </div>
            ) : (
              <p>Carregando filmes ou nenhum filme encontrado.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export default Filmes;
