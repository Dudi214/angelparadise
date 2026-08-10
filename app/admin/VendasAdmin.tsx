"use client";

import { useEffect, useState } from "react";

export default function VendasAdmin() {
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("lancha");

  const [imagens, setImagens] = useState<File[]>([]);
  const [novasImagensEdicao, setNovasImagensEdicao] = useState<File[]>([]);
  const [vendas, setVendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingEditId, setSavingEditId] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  async function fetchVendas() {
    try {
      const res = await fetch("/api/vendas");
      const data = await res.json();
      setVendas(data.data || []);
    } catch {
      console.log("Erro ao buscar vendas");
    }
  }

  useEffect(() => {
    fetchVendas();
  }, []);

  async function uploadImagens(files: File[]) {
    const urls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Erro no upload da imagem");
      }

      urls.push(data.url);
    }

    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      let urls: string[] = [];

      if (imagens.length > 0) {
        urls = await uploadImagens(imagens);
      }

      const res = await fetch("/api/vendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          preco: Number(preco),
          descricao,
          categoria,
          imagens: urls,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao cadastrar");

      alert("Produto cadastrado!");

      resetForm();
      fetchVendas();
    } catch (err: any) {
      alert(err.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  async function salvarEdicao(produto: any) {
    try {
      setSavingEditId(produto.id);

      let urlsAtualizadas = produto.imagens || [];

      // Se o usuário selecionou novas fotos, faz o upload primeiro
      if (novasImagensEdicao.length > 0) {
        urlsAtualizadas = await uploadImagens(novasImagensEdicao);
      }

      const payload = {
        titulo: produto.titulo,
        preco: Number(produto.preco),
        descricao: produto.descricao,
        categoria: produto.categoria,
        imagens: urlsAtualizadas,
      };

      const res = await fetch(`/api/vendas/${produto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "Erro ao atualizar no banco de dados");
      }

      alert("Produto atualizado com sucesso!");
      setEditandoId(null);
      setNovasImagensEdicao([]);
      fetchVendas();
    } catch (err: any) {
      alert(err.message || "Erro ao editar o produto");
    } finally {
      setSavingEditId(null);
    }
  }

  async function deletar(id: string) {
    if (!confirm("Deseja excluir?")) return;

    try {
      const res = await fetch(`/api/vendas/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar");
      fetchVendas();
    } catch {
      alert("Erro ao excluir o produto");
    }
  }

  function resetForm() {
    setTitulo("");
    setPreco("");
    setDescricao("");
    setCategoria("lancha");
    setImagens([]);
  }

  function atualizarCampo(id: string, campo: string, valor: any) {
    setVendas((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [campo]: valor } : item))
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin de Vendas 🛥️</h1>

      {/* FORMULÁRIO DE NOVO PRODUTO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-6 mb-10"
      >
        <h2 className="text-xl font-bold mb-5">Novo Produto</h2>

        <input
          className="border p-3 rounded w-full mb-3"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <input
          className="border p-3 rounded w-full mb-3"
          placeholder="Preço (Ex: 150000)"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <select
          className="border p-3 rounded w-full mb-3"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="lancha">Lancha</option>
          <option value="jetski">Jet Ski</option>
          <option value="casa">Casa</option>
          <option value="chale">Chalé</option>
        </select>

        <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50">
          📷 Escolher até 4 fotos
          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImagens(Array.from(e.target.files || []).slice(0, 4))
            }
          />
        </label>

        <div className="flex gap-2 mt-4 flex-wrap">
          {imagens.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              alt="Preview"
              className="h-20 w-20 rounded-lg object-cover"
            />
          ))}
        </div>

        <textarea
          className="border p-3 rounded w-full mt-4"
          rows={4}
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl mt-5 transition disabled:opacity-50"
        >
          {loading ? "Salvar Produto..." : "Salvar Produto"}
        </button>
      </form>

      {/* LISTA DE PRODUTOS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendas.map((p) => {
          const isEditing = editandoId === p.id;

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow overflow-hidden flex flex-col"
            >
              <div className="bg-gray-100 p-2">
                <img
                  src={
                    p.imagens?.[0] ||
                    "https://via.placeholder.com/600x400?text=Sem+Foto"
                  }
                  alt={p.titulo}
                  className="w-full h-60 object-cover rounded-xl"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                {isEditing ? (
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Título
                    </label>
                    <input
                      className="border p-2 rounded w-full"
                      value={p.titulo || ""}
                      onChange={(e) =>
                        atualizarCampo(p.id, "titulo", e.target.value)
                      }
                    />

                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      value={p.preco || ""}
                      onChange={(e) =>
                        atualizarCampo(p.id, "preco", e.target.value)
                      }
                    />

                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Categoria
                    </label>
                    <select
                      className="border p-2 rounded w-full"
                      value={p.categoria || "lancha"}
                      onChange={(e) =>
                        atualizarCampo(p.id, "categoria", e.target.value)
                      }
                    >
                      <option value="lancha">Lancha</option>
                      <option value="jetski">Jet Ski</option>
                      <option value="casa">Casa</option>
                      <option value="chale">Chalé</option>
                    </select>

                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Descrição
                    </label>
                    <textarea
                      rows={3}
                      className="border p-2 rounded w-full text-sm"
                      value={p.descricao || ""}
                      onChange={(e) =>
                        atualizarCampo(p.id, "descricao", e.target.value)
                      }
                    />

                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Substituir Fotos (Opcional)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="text-xs"
                      onChange={(e) =>
                        setNovasImagensEdicao(
                          Array.from(e.target.files || []).slice(0, 4)
                        )
                      }
                    />

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => salvarEdicao(p)}
                        disabled={savingEditId === p.id}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold flex-1 py-2 rounded transition disabled:opacity-50"
                      >
                        {savingEditId === p.id
                          ? "Salvando..."
                          : "Salvar Alterações"}
                      </button>
                      <button
                        onClick={() => {
                          setEditandoId(null);
                          setNovasImagensEdicao([]);
                          fetchVendas();
                        }}
                        className="bg-gray-300 text-gray-700 font-bold px-3 py-2 rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-xs uppercase font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                        {p.categoria}
                      </span>
                      <h3 className="font-bold text-xl mt-2 text-gray-800">
                        {p.titulo}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {p.descricao}
                      </p>
                      <p className="text-green-600 font-black text-2xl mt-3">
                        R$ {Number(p.preco || 0).toLocaleString("pt-BR")}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-5">
                      <button
                        onClick={() => deletar(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold flex-1 py-2 rounded transition"
                      >
                        Deletar
                      </button>

                      <button
                        onClick={() => {
                          setEditandoId(p.id);
                          setNovasImagensEdicao([]);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold flex-1 py-2 rounded transition"
                      >
                        Editar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}