interface PartAntigasProps{
  
  timeA: string,
  timeB: string,

}

export default function PartAntigas({timeA, timeB}: PartAntigasProps) {
  return (
    <div className="bg-gray-600 flex flex-col gap-5 rounded-lg py-2 m-5 justify-center items-center">
      {/* nome do campeonato */}
      <div className="w-1/1 border-b border-gray-900 py-2">
        <h2 className="text-xl text-white font-bold text-center">
          🏆 Champions
        </h2>
      </div>

      {/* parte do placar */}
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 justify-center py-5 items-center">
          {/* time A */}
          <div className="flex gap-4 justify-center items-center">
            <p className="text-2xl">{timeA}</p>
          </div>
          <p className="text-2xl"> X </p>
          {/* time B */}
          <div className="flex gap-4 justify-center items-center">
            <p className="text-2xl">{timeB}</p>
          </div>
        </div>
      </div>
    </div>
  );
}