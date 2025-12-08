import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-between px-12 py-6 box-border bg-black/75 text-foreground border border-black">
      <Link href={`/`} className="text-lg font-bold text-primary">
        <img src="logo-cs2.png" alt="logo" className="w-24 object-contain" />
      </Link>

      <div className="flex items-center gap-8">
        <Link href={`/campeonatos`} className="text-lg font-bold font-poppins text-blue-500 hover:text-blue-800 transition-colors duration-200">
          Campeonatos
        </Link>
        <Link href={`/palpites`} className="text-lg font-bold font-poppins text-blue-500 hover:text-blue-800 transition-colors duration-200">
          Palpites
        </Link>
        <Link href={`/login`} className="text-lg font-bold font-poppins text-blue-500 hover:text-blue-800 transition-colors duration-200">
          Login
        </Link>
        <Link href={`/cadastro`}>
          <button className="bg-blue-500 py-2 px-4 text-lg rounded-md font-bold  hover:bg-blue-800 transition-colors duration-200 cursor-pointer">
            Cadastrar
          </button>
        </Link>
      </div>
    </header>
  );
}