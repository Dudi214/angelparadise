# ⚓ Angel Paradise - Boat Charters & Admin Panel

> Landing page moderna e painel administrativo completo para gestão de passeios privativos, aluguéis de embarcações e vendas em Angra dos Reis, RJ.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon.tech-4169E1?style=for-the-badge&logo=postgresql)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Management-3448C5?style=for-the-badge&logo=cloudinary)

---

## 📌 Sobre o Projeto

O **Angel Paradise** é uma plataforma web desenvolvida para a apresentação e gerenciamento de serviços marítimos em Angra dos Reis. O projeto é dividido em duas partes principais:

1. **Website Público:** Apresentação responsiva de passeios privativos de barco, aluguel de lanchas/jetskis e oportunidades de compra, com foco em alta conversão e experiência de usuário intuitiva.
2. **Painel Administrativo (`/admin`):** Dashboard privado para gerenciamento dinâmico do catálogo (passeios, embarcações para aluguel e vendas), upload direto de imagens e controle das métricas da empresa.

---

## 🚀 Tecnologias e Ferramentas Utilizadas

### **Frontend & Frameworks**
* **[Next.js](https://nextjs.org/)** — Framework React com suporte a *App Router*, *Server Components* e otimização de rotas/APIs.
* **[React](https://react.dev/)** — Biblioteca principal para a criação de componentes reutilizáveis.
* **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para maior segurança e prevenção de erros no desenvolvimento.
* **[Tailwind CSS](https://tailwindcss.com/)** — Estilização utilitária e design responsivo (Mobile-First).
* **[Lucide React](https://lucide.dev/)** — Pacote de ícones modernos e leves.

### **Backend & Banco de Dados**
* **[Node.js](https://nodejs.org/)** — Ambiente de execução para criação das rotas de API serverless.
* **[Prisma ORM](https://www.prisma.io/)** — Mapeamento objeto-relacional para modelagem do banco e consultas fortemente tipadas.
* **[Neon PostgreSQL](https://neon.tech/)** — Banco de dados relacional Serverless em nuvem hospedado na AWS (`sa-east-1`).

### **Serviços de Mídia & Autenticação**
* **[Cloudinary API](https://cloudinary.com/)** — Upload, armazenagem e otimização automatizada das imagens dos passeios e lanchas na nuvem.
* **Custom Authentication (Cookies/JWT):** Middleware de segurança para controle de rotas protegidas no painel administrativo via tokens HTTP-Only.

### **Hospedagem & Deploy**
* **[Vercel](https://vercel.com/)** — Plataforma de hospedagem com integração contínua (CI/CD) via GitHub e suporte a variáveis de ambiente em produção.
* **[Git & GitHub](https://github.com/)** — Controle de versão e gerenciamento de código fonte.

---

## ⚙️ Funcionalidades

- [x] **Design Responsivo & Mobile-First:** Navegação perfeita em dispositivos móveis, tablets e desktops.
- [x] **Gerenciamento de Mídia:** Upload direto de fotos de barcos e passeios integrado ao Cloudinary.
- [x] **Painel de Controle Protegido (`/admin`):** Acesso exclusivo para administradores com controle de sessão.
- [x] **Rotas de API Severless (`/api/*`):** CRUD completo para listagem e cadastro de dados em tempo real.
- [x] **Gerenciamento do Catálogo:**
  - 🛥️ **Passeios:** Catálogo de roteiros e passeios de barco.
  - ⚓ **Aluguéis:** Listagem de lanchas e embarcações para locação.
  - 🏷️ **Vendas:** Anúncios de barcos e imóveis/cotas à venda.
- [x] **Logout Seguro:** Encerramento automático de sessão com limpeza de cookies do navegador.

---

## 🛠️ Como Rodar o Projeto Localmente

### Pré-requisitos
* Node.js instalações versão `18.x` ou superior.
* Gerenciador de pacotes `npm` ou `yarn`.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Dudi214/angelparadise.git](https://github.com/Dudi214/angelparadise.git)
   cd angelparadise
