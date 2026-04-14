<div align="center">

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
<img src="https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />

# 📺 Animeflow

**Seu tracker pessoal de animes — organize, acompanhe e avalie sua maratona.**

</div>

---

## ✨ Funcionalidades

- 🔍 **Busca de animes** via API Jikan (MyAnimeList)
- ➕ **Adicionar animes** à sua lista pessoal
- 📊 **Controle de progresso** de episódios com botões + e −
- 🏷️ **Status personalizados** — Watching, Plan to Watch, Completed, Dropped
- ⭐ **Avaliação** com nota de 0 a 10
- 💬 **Comentários** por anime
- 🗂️ **Filtros** por status na tela principal
- 🗑️ **Remoção** de animes da lista
- 💾 **Banco de dados local** com SQLite — funciona offline

---

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| **Home** | Lista todos os animes com filtros por status |
| **Buscar** | Pesquisa animes na API do MyAnimeList |
| **Editar** | Atualiza episódio, nota, comentário e status |

---

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go no celular ou emulador Android/iOS

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/meu-anime-pessoal.git
cd meu-anime-pessoal

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```

Escaneie o QR Code com o **Expo Go** (Android) ou a câmera (iOS).

---

## 🗂️ Estrutura do projeto

```
meu-anime-pessoal/
├── app/
│   ├── _layout.tsx       # Layout raiz com navegação e SQLite
│   ├── index.tsx         # Tela principal — lista de animes
│   ├── search.tsx        # Tela de busca via API
│   └── edit.tsx          # Tela de edição do anime
├── src/
│   ├── components/
│   │   ├── AnimeItem.tsx  # Card de exibição do anime
│   │   ├── EmptyState.tsx # Estado vazio por filtro
│   │   └── FilterBar.tsx  # Barra de filtros horizontais
│   ├── database/
│   │   └── database.ts    # Inicialização e migrations do SQLite
│   ├── hooks/
│   │   └── useAnimes.ts   # Hook principal de estado e operações
│   ├── services/
│   │   └── animeService.ts # CRUD SQLite + chamadas à API Jikan
│   └── types/
│       └── anime.ts       # Interfaces e tipos TypeScript
└── global.css             # Estilos globais NativeWind
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| [React Native](https://reactnative.dev/) | Framework mobile |
| [Expo](https://expo.dev/) | Plataforma e ferramentas |
| [Expo Router](https://expo.github.io/router/) | Navegação file-based |
| [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) | Banco de dados local |
| [NativeWind](https://www.nativewind.dev/) | Tailwind CSS para React Native |
| [Jikan API](https://jikan.moe/) | API pública do MyAnimeList |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |

---

## 🗃️ Banco de dados

O app usa **SQLite local** com a seguinte estrutura:

```sql
CREATE TABLE animes (
  id              INTEGER PRIMARY KEY,
  title           TEXT NOT NULL,
  imageUrl        TEXT NOT NULL,
  totalEpisodes   INTEGER NOT NULL,
  releaseYear     INTEGER,
  currentEpisode  INTEGER DEFAULT 0,
  status          TEXT CHECK(status IN ('Watching','Plan to Watch','Completed','Dropped')),
  rating          INTEGER DEFAULT 0,
  comment         TEXT,
  updatedAt       TEXT NOT NULL
);
```

---

## 📡 API

O app consome a [Jikan API v4](https://jikan.moe/) — uma API REST gratuita e pública do **MyAnimeList**, sem necessidade de chave de autenticação.

```
GET https://api.jikan.moe/v4/anime?q={query}&limit=10
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  Feito com ❤️ e muito café ☕
</div>
