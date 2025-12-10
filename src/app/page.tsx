import Image from "next/image";
import Header from "../components/Header/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <section className="relative w-full min-h-screen bg-[url('/arena-bg.png')] bg-cover bg-center bg-no-repeat">

      <div className="flex flex-col items-center justify-center gap-6 pt-60">
        <h1 className="text-5xl font-poppins font-bold text-white">Seu Portal oficial de Futebol</h1>
        <p className="text-xl font-poppins text-white ">Acompanhe resultados, artilharia, estatísticas e registre suas previsões em um só lugar.</p>
        <button className="bg-blue-500 py-6 px-18 text-2xl rounded-md font-bold font-poppins hover:bg-blue-800 transition-colors duration-200 cursor-pointer">
          <Link href="/campeonatos">Comece agora</Link>
        </button>
      </div>
    </section>
    </>
  );
}
