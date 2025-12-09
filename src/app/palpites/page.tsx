import HeaderLogado from "@/src/components/HeaderLogado";
import Jogo from "@/src/components/Jogo";

export default function Palpites() {
  return (
    <div className="min-h-screen bg-gray-900">
      <HeaderLogado />
      <main className="flex-grow">
        <Jogo />
      </main>
    </div>
  );
}
