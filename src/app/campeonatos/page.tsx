"use client";

import Header from "@/src/components/Header/Header";
import PartAntigas from "@/src/components/PartAntigas";
import { useState } from "react";

const API_TOKEN = "live_1464f8a638cb9f7b0b2b4d3fdd2e9e";

export default function Campeonatos() {
  const [artilharia, setArtilharia] = useState(""); //armazenar os dados dos artilheiros
  const [loading, setLoading] = useState(false); //saber se requisicao esta em andamento
  const [error, setError] = useState(""); //saber se requisicao falhou
  const [secaoAtiva, setSecaoAtiva] = useState(""); //determinar qual esta ativo
  const [partidas, setPartidas] = useState([]); //armazenar os dados das partidas/ rodadas

  const handleFetchArtilharia = async () => {
    setLoading(true);

    const urlArt =
      "https://api.api-futebol.com.br/v1/campeonatos/20/artilharia";
    try {
      const res = await fetch(urlArt, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const dados = await res.json();
      setArtilharia(dados);
      setSecaoAtiva("artilharia");
    } catch (err) {
      setError("Falha ao carregar a artilharia");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchPartidas = async () => {
    setLoading(true);
    const urlPart = "https://api.api-futebol.com.br/v1/campeonatos/20/partidas";

    try {
      const res = await fetch(urlPart, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const dados = await res.json();
      setPartidas(dados.partidas["primeira-fase"]["6a-rodada"]);
      setSecaoAtiva("partidas");
    } catch (err) {
      setError("Falha ao carregar as partidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="flex flex-col items-center py-2 flex-grow gap-4">
        <h1 className="text-5xl text-white font-bold">
          Informações - Champions League
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleFetchArtilharia}
            className="text-xl text-white cursor-pointer bg-blue-500 rounded-lg py-1 px-2"
          >
            🦶 Artilharia
          </button>

          <button
            onClick={handleFetchPartidas}
            className="text-xl text-white cursor-pointer bg-blue-500 rounded-lg py-1 px-2"
          >
            ⚽ Partidas
          </button>
        </div>
        {/* exibir os resultados */}
        {/* carregando */}
        {loading && <p className="text-white">Carregando...</p>}
        {/* TODO: erro */}
        {/* resultado */}

        {/* artilharia */}
        {secaoAtiva === "artilharia" &&
          artilharia !== "" &&
          Array.isArray(artilharia) && (
            <div>
              <div className="grid grid-cols-3 text-xl text-blue-500">
                <p>Nome</p>
                <p>Gols</p>
                <p>Time</p>
              </div>
              {artilharia.map((jogador) => (
                <div className="grid grid-cols-3 bg-gray-700 text-white border border-gray-900">
                  <p>{jogador.atleta.nome_popular}</p>
                  <p>{jogador.gols}</p>
                  <p>{jogador.time.nome_popular}</p>
                </div>
              ))}
            </div>
          )}

        {/* rodadas */}
        {secaoAtiva === "partidas" && partidas.length !== 0 && (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-white text-2xl font-bold">
              Partidas de ontem (09/12/2025)
            </h2>
            <div className="grid grid-cols-3">
              <PartAntigas
                timeA={partidas[3].time_mandante.nome_popular}
                timeB={partidas[3].time_visitante.nome_popular}
              />
              <PartAntigas
                timeA={partidas[4].time_mandante.nome_popular}
                timeB={partidas[4].time_visitante.nome_popular}
              />
              <PartAntigas
                timeA={partidas[5].time_mandante.nome_popular}
                timeB={partidas[5].time_visitante.nome_popular}
              />
              <PartAntigas
                timeA={partidas[6].time_mandante.nome_popular}
                timeB={partidas[6].time_visitante.nome_popular}
              />
              <PartAntigas
                timeA={partidas[7].time_mandante.nome_popular}
                timeB={partidas[7].time_visitante.nome_popular}
              />
              <PartAntigas
                timeA={partidas[8].time_mandante.nome_popular}
                timeB={partidas[8].time_visitante.nome_popular}
              />
            </div>
          </div>
        )}

        {/* tabela */}
      </main>
    </div>
  );
}
