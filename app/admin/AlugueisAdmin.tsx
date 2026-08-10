"use client";

import { useEffect, useState } from "react";

export default function AlugueisAdmin() {
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("lancha");

  const [imagens, setImagens] = useState<File[]>([]);
  const [novasImagensEdicao, setNovasImagensEdicao] = useState<File[]>([]);
  const [alugueis, setAlugueis] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingEditId, setSavingEditId] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  async function fetchAlugueis() {
    try {
      const res = await fetch("/api/alugueis");
      const data = await res.json();
      setAlugueis(data.data || []);
    } catch {
      console.log("Erro ao buscar aluguéis");
    }
  }

  useEffect(() => {
    fetchAlugueis();
  }, []);

  async function uploadImagens(files: File[]) {
    const urls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!data.url) throw new Error("Erro no upload");
      urls.push(data.url);
    }
    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      let urls: string[] = [];
      if (imagens.length > 0) urls = await uploadImagens(imagens);

      const res = await fetch("/api/alugueis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          preco: Number(preco),
          descricao,
          tipo: "aluguel",
          categoria,
          imagens: urls,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");

      alert("Aluguel cadastrado com sucesso! 🌴");
      resetForm();
      fetchAlugueis();
    } catch (err: any) {
      alert(err.message || "Erro no cadastro");
    } finally {
      setLoading(false);
    }
  }

  async function salvarEdicao(p: any) {
    try {
      setSavingEditId(p.id);

      let urlsAtualizadas = p.imagens || [];

      // Se houver novos arquivos selecionados no modo de edição, faz o upload
      if (novasImagensEdicao.length > 0) {
        urlsAtualizadas = await uploadImagens(novasImagensEdicao);
      }

      const payload = {
        ...p,
        preco: Number(p.preco),
        imagens: urlsAtualizadas,
      };

      const res = await fetch(`/api/alugueis/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      setEditandoId(null);
      setNovasImagensEdicao([]);
      fetchAlugueis();
    } catch {
      alert("Erro ao editar aluguel");
    } finally {
      setSavingEditId(null);
    }
  }

  async function deletar(id: string) {
    if (!confirm("Deseja deletar este aluguel?")) return;
    await fetch(`/api/alugueis/${id}`, { method: "DELETE" });
    fetchAlugueis();
  }

  function resetForm() {
    setTitulo("");
    setPreco("");
    setDescricao("");
    setCategoria("lancha");
    setImagens([]);
  }

  function atualizarCampo(id: string, campo: string, valor: any) {
    setAlugueis((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [campo]: valor } : item))
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Gerenciar Aluguéis 🏡</h1>

      {/* FORMULÁRIO DE CADASTRO */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-bold mb-4 italic text-slate-700">Novo Cadastro</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Nome do Barco ou Imóvel"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-3 rounded-xl w-full"
            required
          />

          <input
            placeholder="Preço/Diária (Ex: 1500)"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="border p-3 rounded-xl w-full"
            required
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border p-3 rounded-xl w-full bg-blue-50 font-semibold"
          >
            <option value="lancha">Lancha</option>
            <option value="jetski">Jet Ski</option>
            <option value="casa">Casa</option>
            <option value="chale">Chalé</option>
          </select>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImagens(Array.from(e.target.files || []))}
            className="p-2 text-sm"
          />
        </div>

        <textarea
          placeholder="Descrição detalhada..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-3 rounded-xl w-full mt-4 h-32"
        />

        <button 
          type="submit"
          disabled={loading}
          className="w-full md:w-auto mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold px-10 py-3 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? "Processando..." : "Salvar Aluguel"}
        </button>
      </form>

      {/* LISTAGEM RESPONSIVA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alugueis.map((p) => {
          const isEditing = editandoId === p.id;

          return (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col justify-between">
              <div>
                <img
                  src={p.imagens?.[0] || "https://via.placeholder.com/400?text=Sem+Foto"}
                  alt={p.titulo}
                  className="h-48 w-full object-cover"
                />
                
                <div className="p-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                        <input
                          value={p.titulo || ""}
                          onChange={(e) => atualizarCampo(p.id, "titulo", e.target.value)}
                          className="border p-2 w-full rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Preço (R$)</label>
                        <input
                          type="number"
                          value={p.preco || ""}
                          onChange={(e) => atualizarCampo(p.id, "preco", e.target.value)}
                          className="border p-2 w-full rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Categoria</label>
                        <select
                          value={p.categoria || "lancha"}
                          onChange={(e) => atualizarCampo(p.id, "categoria", e.target.value)}
                          className="border p-2 w-full rounded text-sm bg-gray-50"
                        >
                          <option value="lancha">Lancha</option>
                          <option value="jetski">Jet Ski</option>
                          <option value="casa">Casa</option>
                          <option value="chale">Chalé</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Descrição</label>
                        <textarea
                          rows={3}
                          value={p.descricao || ""}
                          onChange={(e) => atualizarCampo(p.id, "descricao", e.target.value)}
                          className="border p-2 w-full rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Trocar Imagens (Opcional)</label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => setNovasImagensEdicao(Array.from(e.target.files || []))}
                          className="text-xs w-full mt-1"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => salvarEdicao(p)}
                          disabled={savingEditId === p.id}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg w-full text-sm transition"
                        >
                          {savingEditId === p.id ? "Salvando..." : "Confirmar"}
                        </button>
                        <button
                          onClick={() => {
                            setEditandoId(null);
                            setNovasImagensEdicao([]);
                            fetchAlugueis();
                          }}
                          className="bg-gray-200 text-gray-700 font-bold px-3 py-2 rounded-lg text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-800">{p.titulo}</h3>
                        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded uppercase font-bold text-slate-500">
                          {p.categoria}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {p.descricao}
                      </p>
                      <p className="text-teal-600 font-black text-xl mt-2">
                        R$ {Number(p.preco || 0).toLocaleString("pt-BR")} /dia
                      </p>
                    </>
                  )}
                </div>
              </div>

              {!isEditing && (
                <div className="p-4 pt-0">
                  <div className="flex gap-2 border-t pt-4">
                    <button
                      onClick={() => deletar(p.id)}
                      className="flex-1 bg-red-50 text-red-600 font-bold py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() => {
                        setEditandoId(p.id);
                        setNovasImagensEdicao([]);
                      }}
                      className="flex-1 bg-slate-100 text-slate-600 font-bold py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all text-sm"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}