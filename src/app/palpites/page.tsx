"use client";

import HeaderLogado from "@/src/components/HeaderLogado";
import Jogo from "@/src/components/Jogo";
import { useState, useEffect, FormEvent } from "react";

interface Palpite {
  id: string;
  nomeCamp: string;
  nomeTimeA: string;
  nomeTimeB: string;
  qtdGolsA: number;
  qtdGolsB: number;
}

export default function Palpites() {
  const [mostraForm, setMostraForm] = useState(false);
  const [listaPalpites, setListaPalpites] = useState<Palpite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
 
  const [editingId, setEditingId] = useState<string | null>(null);
  const initialFormState = { nomeCamp: '', nomeTimeA: '', nomeTimeB: '', qtdGolsA: 0, qtdGolsB: 0 };
  const [formInfo, setFormInfo] = useState(initialFormState);

  useEffect(() => {
    fetchPalpites();
  }, []);

  const fetchPalpites = async () => {
    try {
      const res = await fetch('/api/palpites');
      if (res.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setListaPalpites(data);
      }
    } catch (error) {
      console.error("Erro ao buscar palpites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInserir = () => {
    if (mostraForm) {
      setMostraForm(false);
      setEditingId(null);
      setFormInfo(initialFormState);
    } else {
      setMostraForm(true);
      setEditingId(null); 
      setFormInfo(initialFormState);
    }
  };

  const handleEditar = (palpite: Palpite) => {
    setEditingId(palpite.id);
    setFormInfo({
      nomeCamp: palpite.nomeCamp,
      nomeTimeA: palpite.nomeTimeA,
      nomeTimeB: palpite.nomeTimeB,
      qtdGolsA: palpite.qtdGolsA,
      qtdGolsB: palpite.qtdGolsB
    });
    setMostraForm(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const dadosForm = {
      nomeCamp: formData.get("nomeCamp") as string,
      nomeTimeA: formData.get("nomeTimeA") as string,
      nomeTimeB: formData.get("nomeTimeB") as string,
      qtdGolsA: Number(formData.get("qtdGolsA")),
      qtdGolsB: Number(formData.get("qtdGolsB")),
    };

    if (!dadosForm.nomeCamp || !dadosForm.nomeTimeA || !dadosForm.nomeTimeB) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      let response;
      
      if (editingId) {
        response = await fetch('/api/palpites', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...dadosForm }),
        });
      } else {
        response = await fetch('/api/palpites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosForm),
        });
      }

      if (response.ok) {
        const resultado = await response.json();
        
        if (editingId) {
          setListaPalpites(prev => prev.map(p => p.id === editingId ? resultado : p));
          alert("Palpite atualizado!");
        } else {
          setListaPalpites(prev => [...prev, resultado]);
          alert("Palpite criado!");
        }

        setMostraForm(false);
        setEditingId(null);
        setFormInfo(initialFormState);
      } else {
        const err = await response.json();
        alert(err.error || "Erro ao salvar.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este palpite?")) return;

    try {
      const response = await fetch(`/api/palpites?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setListaPalpites(listaPalpites.filter((p) => p.id !== id));
      } else {
        alert("Erro ao excluir.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <main className="grow container mx-auto p-4 flex flex-col items-center">
        <div className="py-4 w-full flex justify-center">
          <button
            onClick={handleInserir}
            className={`cursor-pointer rounded-lg py-2 px-6 text-white transition-colors font-bold ${mostraForm ? 'bg-red-600 hover:bg-red-500' : 'bg-green-700 hover:bg-green-500'}`}
          >
            {mostraForm ? 'Cancelar' : 'Adicionar Palpite'}
          </button>
        </div>

        {/* Formulário */}
        {mostraForm && (
          <div className="w-full max-w-lg mb-8 animate-fade-in-down">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700">
              <h2 className="text-xl font-bold font-poppins mb-4 text-center">
                {editingId ? "Editando Palpite" : "Novo Palpite"}
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Campeonato</label>
                  <input
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                    name="nomeCamp"
                    defaultValue={formInfo.nomeCamp}
                    placeholder="Ex: Champions"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Time A</label>
                    <input className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" name="nomeTimeA" defaultValue={formInfo.nomeTimeA} />
                  </div>
                  <input className="w-16 bg-gray-700 border border-gray-600 rounded p-2 text-center text-white font-bold" type="number" name="qtdGolsA" defaultValue={formInfo.qtdGolsA} />
                  
                  <span className="mb-2 font-bold text-gray-500">X</span>
                  
                  <input className="w-16 bg-gray-700 border border-gray-600 rounded p-2 text-center text-white font-bold" type="number" name="qtdGolsB" defaultValue={formInfo.qtdGolsB} />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-1">Time B</label>
                    <input className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" name="nomeTimeB" defaultValue={formInfo.nomeTimeB} />
                  </div>
                </div>

                <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors w-full">
                  {editingId ? "Salvar Alterações" : "Criar Palpite"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Lista de Palpites */}
        <div className="flex flex-col gap-4 w-full items-center">
          {isLoading ? (
            <p className="text-gray-400">Carregando...</p>
          ) : listaPalpites.length === 0 ? (
            <p className="text-gray-400">Nenhum palpite encontrado. Crie um!</p>
          ) : (
            listaPalpites.map((palpite) => (
              <div key={palpite.id} className="relative group w-full max-w-2xl bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-700 hover:border-gray-500 transition-all">
                
                <div className="flex justify-center pointer-events-none"> 
                  <Jogo
                    nomeCampeonato={palpite.nomeCamp}
                    timeA={palpite.nomeTimeA}
                    timeB={palpite.nomeTimeB}
                    golsA={palpite.qtdGolsA}
                    golsB={palpite.qtdGolsB}
                  />
                </div>

                {/* Botões de Ação */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditar(palpite)}
                    className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 text-white shadow-md cursor-pointer"
                    title="Editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(palpite.id)}
                    className="bg-red-600 p-2 rounded-full hover:bg-red-500 text-white shadow-md cursor-pointer"
                    title="Excluir"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
