import React, { useEffect, useState } from "react";
import Filme from "../components/Filme";

import "../styles/style.scss";
import "../styles/filmes.scss";

const API_KEY = "582207357eac2041dcd9e4109471bd7d";
const BASE_URL = "https://api.themoviedb.org/3";

// Lista de países para as abas (códigos ISO 3166-1 alpha-2)
const PAISES = [
  { codigo: "BR", nome: "Brasil" },
  { codigo: "US", nome: "Estados Unidos" },
  { codigo: "FR", nome: "França" },
  { codigo: "JP", nome: "Japão" },
];

function Filmes() {
  const [filmesPorPais, setFilmesPorPais] = useState({});
  const [paisSelecionado, setPaisSelecionado] = useState(PAISES[0].codigo);

  useEffect(() => {
    // Função para buscar filmes populares de um país
    const fetchFilmesPorPais = async (pais) => {
      try {
        // Usando o parâmetro region para filtrar filmes populares daquele país
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

    // Buscar filmes para todos os países definidos
    const carregarTodosFilmes = async () => {
      const resultados = {};
      for (const p of PAISES) {
        resultados[p.codigo] = await fetchFilmesPorPais(p.codigo);
      }
      setFilmesPorPais(resultados);
    };

    carregarTodosFilmes();
  }, []);

  return (
    <div className="pagina">
      <h1 className="titulo">Filmes Populares por Nacionalidade</h1>

      <div className="abas-paises">
        {PAISES.map(({ codigo, nome }) => (
          <button
            key={codigo}
            className={`aba ${paisSelecionado === codigo ? "ativa" : ""}`}
            onClick={() => setPaisSelecionado(codigo)}
          >
            {nome}
          </button>
        ))}
      </div>

      <div className="carrossel-filmes">
        {filmesPorPais[paisSelecionado] && filmesPorPais[paisSelecionado].length > 0 ? (
          <div className="grade-filmes">
            {filmesPorPais[paisSelecionado].map((filme) => (
              <Filme key={filme.id} filme={filme} />
            ))}
          </div>
        ) : (
          <p>Carregando filmes ou nenhum filme encontrado para este país.</p>
        )}
      </div>
    </div>
  );
}

export default Filmes;
