"use client";

import { useEffect, useState } from "react";

export default function AdminPasseios() {
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("jetski");

  const [imagens, setImagens] = useState<File[]>([]);
  const [passeios, setPasseios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [novasImagensEdit, setNovasImagensEdit] = useState<File[]>([]);
  const [loadingEdit, setLoadingEdit] = useState(false);

  // BUSCAR PASSEIOS
  async function fetchPasseios() {
    try {
      const res = await fetch("/api/passeios");
      const json = await res.json();

      const lista = Array.isArray(json?.data) ? json.data : [];

      setPasseios(
        lista.filter((item: any) => item.tipo === "passeio")
      );
    } catch (err) {
      console.error("Erro ao buscar passeios:", err);
    }
  }

  useEffect(() => {
    fetchPasseios();
  }, []);

  // UPLOAD PARA CLOUDINARY
  async function uploadImagens(files: File[]) {
    const urls: string[] = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.url) throw new Error("Erro no upload de uma das imagens");
      urls.push(data.url);
    }

    return urls;
  }

  // CRIAR NOVO PASSEIO
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      let urls: string[] = [];
      if (imagens.length > 0) {
        urls = await uploadImagens(imagens);
      }

      const res = await fetch("/api/passeios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          preco: Number(preco),
          descricao,
          tipo: "passeio",
          categoria,
          imagens: urls,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Erro ao criar");

      alert("Passeio criado com sucesso! 🚀");
      resetForm();
      fetchPasseios();

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // SALVAR EDIÇÃO
  async function salvarEdicao(p: any) {
    try {
      setLoadingEdit(true);
      let urlsAdicionais: string[] = [];

      // Se o usuário selecionou novas fotos no modo de edição, faz o upload delas
      if (novasImagensEdit.length > 0) {
        urlsAdicionais = await uploadImagens(novasImagensEdit);
      }

      const payload = {
        ...p,
        preco: Number(p.preco),
        imagens: [...(p.imagens || []), ...urlsAdicionais],
      };

      const res = await fetch(`/api/passeios/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Falha ao atualizar passeio");

      setEditandoId(null);
      setNovasImagensEdit([]);
      alert("Atualizado com sucesso!");
      fetchPasseios();
    } catch (err: any) {
      alert(err.message || "Erro ao salvar alterações");
    } finally {
      setLoadingEdit(false);
    }
  }

  // DELETAR
  async function deletar(id: string) {
    if (!confirm("Tem certeza que deseja excluir este passeio?")) return;

    await fetch(`/api/passeios/${id}`, {
      method: "DELETE",
    });

    fetchPasseios();
  }

  function resetForm() {
    setTitulo("");
    setPreco("");
    setDescricao("");
    setCategoria("jetski");
    setImagens([]);
  }

  function atualizarCampo(id: string, campo: string, valor: any) {
    setPasseios((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    );
  }

  function removerImagemEdicao(passeioId: string, urlParaRemover: string) {
    setPasseios((prev) =>
      prev.map((item) => {
        if (item.id === passeioId) {
          return {
            ...item,
            imagens: item.imagens.filter((url: string) => url !== urlParaRemover),
          };
        }
        return item;
      })
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-2">
          Admin de Passeios <span className="text-teal-500">Angel Paradise</span>
        </h1>

        {/* FORMULÁRIO DE CADASTRO */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-12">
          <h2 className="text-xl font-bold mb-6 text-slate-700">Cadastrar Novo Passeio</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Título do Passeio (ex: Lancha Intermarine)"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />

            <input
              placeholder="Preço (apenas números)"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-slate-200 p-3 rounded-xl w-full bg-white"
            >
              <option value="jetski">Categoria: Jet Ski</option>
              <option value="lancha">Categoria: Lancha</option>
            </select>

            <label className="cursor-pointer border-2 border-dashed border-slate-200 p-3 rounded-xl text-center hover:bg-slate-50 transition-colors text-sm text-slate-500 flex items-center justify-center">
              📸 {imagens.length > 0 ? `${imagens.length} fotos selecionadas` : "Selecionar Fotos"}
              <input
                type="file"
                multiple
                onChange={(e) => setImagens(Array.from(e.target.files || []))}
                className="hidden"
              />
            </label>
          </div>

          {/* PREVIEW DAS IMAGENS SELECIONADAS */}
          {imagens.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {imagens.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="h-16 w-16 object-cover rounded-lg border shadow-sm"
                />
              ))}
            </div>
          )}

          <textarea
            placeholder="Descrição detalhada do passeio..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border border-slate-200 p-3 rounded-xl w-full mt-4 h-32 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <button 
            disabled={loading}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all ${
              loading ? "bg-slate-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-100"
            }`}
          >
            {loading ? "Processando e subindo imagens..." : "Publicar Passeio 🚤"}
          </button>
        </form>

        {/* LISTAGEM DE PASSEIOS EXISTENTES */}
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Passeios Ativos</h2>
        
        {passeios.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center border border-dashed border-slate-300 text-slate-400">
            Nenhum passeio cadastrado no banco de dados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passeios.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="h-40 relative">
                  <img
                    src={p.imagens?.[0] || "/placeholder.jpg"}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">
                    {p.categoria}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  {editandoId === p.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-500">Título</label>
                        <input
                          value={p.titulo || ""}
                          onChange={(e) => atualizarCampo(p.id, "titulo", e.target.value)}
                          className="border p-2 w-full rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-500">Preço (R$)</label>
                        <input
                          type="number"
                          value={p.preco || ""}
                          onChange={(e) => atualizarCampo(p.id, "preco", e.target.value)}
                          className="border p-2 w-full rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-500">Categoria</label>
                        <select
                          value={p.categoria || "jetski"}
                          onChange={(e) => atualizarCampo(p.id, "categoria", e.target.value)}
                          className="border p-2 w-full rounded-lg text-sm bg-white"
                        >
                          <option value="jetski">Jet Ski</option>
                          <option value="lancha">Lancha</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-500">Descrição</label>
                        <textarea
                          rows={3}
                          value={p.descricao || ""}
                          onChange={(e) => atualizarCampo(p.id, "descricao", e.target.value)}
                          className="border p-2 w-full rounded-lg text-sm outline-none"
                        />
                      </div>

                      {/* GESTÃO DE IMAGENS NA EDIÇÃO */}
                      <div>
                        <label className="text-xs font-bold text-slate-500 block mb-1">Fotos atuais</label>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {p.imagens?.map((url: string, index: number) => (
                            <div key={index} className="relative group flex-shrink-0">
                              <img src={url} className="h-12 w-12 object-cover rounded-lg border" />
                              <button
                                type="button"
                                onClick={() => removerImagemEdicao(p.id, url)}
                                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
                                title="Remover imagem"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>

                        <label className="cursor-pointer border border-dashed border-slate-300 p-2 rounded-lg text-center text-xs text-slate-600 block mt-2 hover:bg-slate-50">
                          ➕ {novasImagensEdit.length > 0 ? `${novasImagensEdit.length} foto(s) para adicionar` : "Adicionar novas fotos"}
                          <input
                            type="file"
                            multiple
                            onChange={(e) => setNovasImagensEdit(Array.from(e.target.files || []))}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <button
                        disabled={loadingEdit}
                        onClick={() => salvarEdicao(p)}
                        className={`w-full text-white py-2 rounded-lg font-bold text-sm ${
                          loadingEdit ? "bg-slate-400" : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {loadingEdit ? "Salvando..." : "Confirmar Alterações"}
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-slate-800">{p.titulo}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3">{p.descricao}</p>
                      <p className="text-teal-600 font-black text-lg mt-auto">R$ {p.preco}</p>
                    </>
                  )}

                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
                    <button
                      onClick={() => deletar(p.id)}
                      className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() => {
                        if (editandoId === p.id) {
                          setEditandoId(null);
                          setNovasImagensEdit([]);
                        } else {
                          setEditandoId(p.id);
                          setNovasImagensEdit([]);
                        }
                      }}
                      className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      {editandoId === p.id ? "Cancelar" : "Editar"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}