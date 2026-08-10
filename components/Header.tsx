import Link from "next/link";

export default function Header() {
  return (
    // Adicionado: bg-black/20 (fundo preto 20% opaco), backdrop-blur e shadow-lg
    <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="Logo Angel Paradise"
              className="h-12 w-auto object-contain cursor-pointer drop-shadow-md" 
            />
          </Link>
        </div>

        {/* NAV */}
        <nav className="flex gap-8 text-white text-base font-bold">

          {/* HOME */}
          <Link href="/" className="hover:text-teal-400 transition-colors drop-shadow-sm">
            Início
          </Link>

          {/* PÁGINA DE PASSEIOS */}
          <Link href="/passeios" className="hover:text-teal-400 transition-colors drop-shadow-sm">
            Passeios
          </Link>

          {/* SCROLL PARA ALUGUEIS */}
          <Link href="/alugueis" className="hover:text-teal-400 transition-colors drop-shadow-sm">
            Aluguéis
          </Link>

          <Link href="/vendas" className="hover:text-teal-400 transition-colors drop-shadow-sm">
            Vendas
          </Link>

        </nav>
      </div>
    </header>
  );
}