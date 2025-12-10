interface JogoProps{
  nomeCampeonato: string,
  timeA: string,
  timeB: string,
  golsA: number,
  golsB: number
}

export default function Jogo({nomeCampeonato, timeA, timeB, golsA, golsB}: JogoProps) {
  return (
    <div className="bg-gray-600 flex flex-col gap-5 rounded-lg w-1/3 py-2 m-5 justify-center items-center">
      {/* nome do campeonato */}
      <div className="w-1/1 border-b border-gray-900 py-2">
        <h2 className="text-xl text-white font-bold text-center">
          🏆 {nomeCampeonato}
        </h2>
      </div>

      {/* parte do placar */}
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 justify-center py-5 items-center">
          {/* time A */}
          <div className="flex gap-4 justify-center items-center">
            <p className="text-2xl">{timeA}</p>
            <p className="text-4xl font-bold"> {golsA} </p>
          </div>
          <p className="text-2xl"> X </p>
          {/* time B */}
          <div className="flex gap-4 justify-center items-center">
            <p className="text-4xl font-bold"> {golsB} </p>
            <p className="text-2xl">{timeB}</p>
          </div>
        </div>

        {/* botões - CRUD */}
        <div className="flex space-between items-center justify-center gap-5 text-white">
          <button className="bg-blue-700 cursor-pointer rounded-lg py-2 px-1 hover:bg-blue-500 transition-colors">
            ✏️ Editar Palpite
          </button>

          <button className="bg-red-700 cursor-pointer rounded-lg py-2 px-1 hover:bg-red-500 transition-colors">
            🗑️ Excluir Palpite
          </button>
        </div>
      </div>
    </div>
  );
}
