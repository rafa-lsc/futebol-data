"use client";

import HeaderLogado from "@/src/components/HeaderLogado";
import Jogo from "@/src/components/Jogo";
import { useState } from "react";

export default function Palpites() {
  const [mostraForm, setMostraForm] = useState(false);
  const [formInfo, setFormInfo] = useState({nomeCamp:'', nomeTimeA: '', nomeTimeB: '', qtdGolsA: 0, qtdGolsB: 0})
  const [adicionaPalpite, setAdicionaPalpite] = useState(false)
  const [erro, setErro] = useState("");

  const handleInserir = () => {
    setMostraForm(!mostraForm);
    setAdicionaPalpite(false)
    const apagaPalpite = {
      nomeCamp: "",
      nomeTimeA: "",
      nomeTimeB: "",
      qtdGolsA: 0,
      qtdGolsB: 0,
    }
    setFormInfo(apagaPalpite)
  };

  const handleAdicionaPalpite = (e) => {
    e.preventDefault();

    const form = e.target;

    if(form.nomeCamp.value === "" || form.nomeTimeA.value === "" || form.nomeTimeB.value === "" || Number(form.qtdGolsA.value) < 0 || Number(form.qtdGolsB.value) < 0){
      setAdicionaPalpite(false)
      alert("Verifique se todos os campos foram preenchidos e se a quantidade de gols é maior que 0");
    }else{
      const novoPalpite = {
        nomeCamp: form.nomeCamp.value,
        nomeTimeA: form.nomeTimeA.value,
        nomeTimeB: form.nomeTimeB.value,
        qtdGolsA: Number(form.qtdGolsA.value),
        qtdGolsB: Number(form.qtdGolsB.value),
      }
      setFormInfo(novoPalpite);
      setAdicionaPalpite(true);
      setMostraForm(!mostraForm)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">

      <main className="flex-grow">
        <div className="flex items-center justify-center py-4">
          <button
            onClick={handleInserir}
            className="bg-green-700 cursor-pointer rounded-lg py-2 px-1 text-white hover:bg-green-500 transition-colors"
          >
            🆕 Adicionar Palpite
          </button>
        </div>

        {/* mostrar ou não formulário para adicionar palpite */}
        {mostraForm && (
          <div className="flex justify-center rounded-lg">
            <form
              onSubmit={handleAdicionaPalpite}
              className="bg-gray-700 text-white flex flex-col gap-3 justify-center items-center px-3 py-2 rounded-lg"
              action=""
            >
              <div className="flex gap-3">
                <label htmlFor="nomeCamp">Nome do Campeonato: </label>
                <input
                  className="bg-white"
                  type="text"
                  id="nomeCamp"
                  name="nomeCamp"
                  placeholder="ex.: Champions"
                />
              </div>
              <div className="flex gap-3">
                <label htmlFor="nomeTimeA">Nome do Primeiro Time: </label>
                <input type="text" id="nomeTimeA" name="nomeTimeA" />
              </div>
              <div className="flex gap-3">
                <label htmlFor="qtdGolsA">
                  Quantidade de gols do Primeiro Time:{" "}
                </label>
                <input type="number" id="qtdGolsA" name="qtdGolsA" />
              </div>
              <div className="flex gap-3">
                <label htmlFor="nomeTimeB">Nome do Segundo Time: </label>
                <input type="text" id="nomeTimeB" name="nomeTimeB" />
              </div>
              <div className="flex gap-3">
                <label htmlFor="qtdGolsB">
                  Quantidade de gols do Segundo Time:{" "}
                </label>
                <input type="number" id="qtdGolsB" name="qtdGolsB" />
              </div>
              <button type="submit" className="bg-blue-500 cursor-pointer p-2 rounded-lg hover:bg-blue-700 transition-colors text-white">
                Adicionar!
              </button>
            </form>
          </div>
        )}

        {adicionaPalpite && (
          <Jogo nomeCampeonato={formInfo.nomeCamp} timeA={formInfo.nomeTimeA} timeB={formInfo.nomeTimeB} golsA={formInfo.qtdGolsA} golsB={formInfo.qtdGolsB}/>
        )}

      </main>
    </div>
  );
}
