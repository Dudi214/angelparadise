"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      // REDIRECIONAMENTO NATIVO (Garante o envio do Cookie para o Middleware)
      window.location.href = "/admin";
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao fazer login");
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* VOLTAR PARA O SITE */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar para o site
          </Link>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          {/* LOGO */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Angel Paradise"
                className="h-16 w-auto mx-auto object-contain"
              />
            </Link>

            <h1 className="text-2xl font-bold text-slate-900 mt-5">
              ANGEL PARADISE
            </h1>

            <p className="text-lg font-semibold text-slate-700 mt-1">
              Painel Admin
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Entre com suas credenciais de acesso
            </p>
          </div>

          {/* ERRO */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-3 text-center text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* FORMULÁRIO */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-slate-600">
                E-mail
              </label>

              <div className="relative">
                <Mail
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                />
              </div>
            </div>

            {/* SENHA */}
            <div>
              <label className="mb-1 block text-xs font-bold uppercase text-slate-600">
                Senha
              </label>

              <div className="relative">
                <Lock
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                />
              </div>
            </div>

            {/* BOTÃO LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar no Painel"
              )}
            </button>
          </form>

          {/* VOLTAR */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-teal-600 transition-colors"
            >
              ← Voltar para Angel Paradise
            </Link>
          </div>
        </div>

        {/* RODAPÉ */}
        <p className="text-center text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} Angel Paradise
        </p>
      </div>
    </div>
  );
}