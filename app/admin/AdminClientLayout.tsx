"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import PasseiosAdmin from "./PasseiosAdmin";
import AlugueisAdmin from "./AlugueisAdmin";
import VendasAdmin from "./VendasAdmin";

export default function AdminClientLayout() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar setPage={setPage} />

      <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8">
        {page === "dashboard" && <Dashboard />}
        {page === "passeios" && <PasseiosAdmin />}
        {page === "alugueis" && <AlugueisAdmin />}
        {page === "vendas" && <VendasAdmin />}
      </main>
    </div>
  );
}