"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderLogado() {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST' 
      });

      window.location.href = '/login'; 
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <header className="w-full flex justify-between px-12 py-6 box-border bg-black/75 text-foreground border border-black">
      <Link href={`/`} className="text-lg font-bold text-primary">
        <img src="logo-cs2.png" alt="logo" className="w-24 object-contain" />
      </Link>

      <div className="flex items-center gap-8">
        <Link href={`/campeonatos`} className="text-lg font-bold font-poppins text-blue-500 hover:text-blue-800 transition-colors duration-200">
          Campeonatos
        </Link>

          <button className="bg-red-500 py-2 px-4 text-lg rounded-md font-bold text-white hover:bg-red-800 transition-colors duration-200 cursor-pointer" onClick={handleLogout}>
            Sair
          </button>
      </div>
    </header>
  );
}