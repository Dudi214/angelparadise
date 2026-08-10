"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Anchor,
  Ship,
  Tag,
  LayoutDashboard,
  BarChart3,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  page?: string;
  setPage: (page: string) => void;
}

export default function Sidebar({ page, setPage }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={20} /> },
    { id: "passeios", label: "Passeios", icon: <Anchor size={20} /> },
    { id: "alugueis", label: "Aluguéis", icon: <Ship size={20} /> },
    { id: "vendas", label: "Vendas", icon: <Tag size={20} /> },
  ];

  const handleNav = (id: string) => {
    setPage(id);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* BOTÃO MOBILE (Fixo no topo em telas < lg) */}
      <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-slate-900 p-4 text-white shadow-lg lg:hidden">
        <h2 className="flex items-center gap-2 font-bold">
          <LayoutDashboard className="text-teal-400" size={22} />
          <span>Angel Paradise</span>
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR PRINCIPAL */}
      <aside
        className={`
        fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-slate-900 p-6 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* CABEÇALHO DA SIDEBAR */}
        <div className="mb-8 flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="rounded-xl bg-teal-500/10 p-2.5 text-teal-400">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">AdminPanel</h2>
            <p className="text-xs text-slate-400">Angel Paradise</p>
          </div>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className="flex-1">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = page === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`
                      flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200
                      ${
                        isActive
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={isActive ? "text-white" : "text-slate-400"}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* BOTÃO DE LOGOUT / SAIR */}
        <div className="border-t border-slate-800 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut size={20} />
            <span>Sair para o site</span>
          </button>
        </div>

        {/* RODAPÉ DA SIDEBAR */}
        <div className="mt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Angel Paradise
        </div>
      </aside>

      {/* ESPAÇAMENTO MOBILE PARA NÃO COBRIR O CONTEÚDO */}
      <div className="h-16 shrink-0 lg:hidden" />
    </>
  );
}