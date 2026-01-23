<h1 align="center">✈️ ThynkTravel - Agência de Viagens</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído%20e%20Hospedado-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
</p>

<p align="center">
  <b>Sistema completo de busca e reserva de pacotes de viagens</b><br>
  Design moderno • Boas práticas de performance • Integração em tempo real com API Amadeus
</p>

---

## 🌟 Demonstração

<p align="center">
  <a href="https://thynktravel-jeff.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Acessar_Demo_Online-0078D4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Acessar Site">
  </a>
</p>

> **⚠️ Projeto de Portfólio:** Este projeto representa uma etapa anterior do meu desenvolvimento. Atualmente possuo uma compreensão mais ampla sobre arquitetura e boas práticas, e ele é mantido como registro de evolução profissional.

---

## 📖 Sobre o Projeto

Portal completo de agência de viagens desenvolvido com **React + TypeScript**, simulando um sistema real de busca e reserva de pacotes. Integra-se com a **API Amadeus** para dados reais de voos e companhias aéreas.

### 🎯 Objetivo

Demonstrar habilidades em:
- ✅ Consumo de APIs RESTful complexas
- ✅ Gerenciamento de estado global eficiente
- ✅ Tipagem rigorosa com TypeScript
- ✅ Design responsivo e acessível
- ✅ Autenticação OAuth
- ✅ Performance e otimização

---

## ⚡ Funcionalidades

### 🔐 Autenticação
- Login via formulário tradicional
- Autenticação com Google OAuth
- Gestão de sessão do usuário

### 📦 Pacotes de Viagens
- Busca inteligente de voos em tempo real
- Formulário personalizado para montagem de pacotes
- Filtros avançados (data, destino, preço)
- Cards dinâmicos com informações detalhadas

### 👤 Perfil do Usuário
- Modal com dados do usuário
- Histórico completo de compras
- Persistência local com LocalStorage

### 🎨 UX/UI
- Carrossel de avaliações (Swiper.js)
- Animações Lottie
- Design responsivo (Mobile/Tablet/Desktop)
- Tema moderno com Material UI

### ⚙️ Performance
- Code splitting com React Router
- Lazy loading de componentes
- Otimização de bundle com Vite

---

## 🛠️ Tecnologias

### Core
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white)

### Estado & Rotas
![Zustand](https://img.shields.io/badge/Zustand-State_Management-000000?style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-DOM-CA4245?style=flat-square&logo=react-router&logoColor=white)

### Estilização
![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=flat-square&logo=mui&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white)

### APIs & Integrações
![Amadeus](https://img.shields.io/badge/Amadeus_API-0055A4?style=flat-square)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=flat-square&logo=google&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

### Bibliotecas UI/UX
- **Swiper.js** - Carrossel responsivo
- **Lottie** - Animações interativas
- **Day.js** - Manipulação de datas

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Chaves de API (Amadeus + Google OAuth)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/JeffersonAlvesB/AgenciaViagens.git
cd AgenciaViagens
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
# Copie do .env.example
VITE_AMADEUS_API_KEY=your_api_key_here
VITE_AMADEUS_API_SECRET=your_api_secret_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

> 📌 **Obtenha suas credenciais:**
> - [Amadeus API](https://developers.amadeus.com/) - Criar conta gratuita
> - [Google Cloud Console](https://console.cloud.google.com/) - Configurar OAuth 2.0

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

---

## 📂 Arquitetura do Projeto

### Estrutura Atual
```
src/
├── components/         # Componentes React reutilizáveis
├── hooks/              # Hooks customizados
├── pages/              # Páginas da aplicação
├── routes/             # Configuração de rotas
├── store/              # Estado global (Zustand)
└── types/              # Tipagens e interfaces (TypeScript)
```
---

### 🔄 Como Refatoraria Hoje

Desde o desenvolvimento inicial, minha compreensão sobre arquitetura de software evoluiu significativamente. **Se fosse reconstruir hoje:**

```
src/
├── components/         # Componentes reutilizáveis (UI)
├── features/           # Funcionalidades isoladas por domínio
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/   # Login / OAuth
│   │   └── types.ts
│   │
│   ├── packages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/   # Busca de voos e pacotes
│   │   └── types.ts
│   │
│   └── profile/
│       ├── components/
│       ├── hooks/
│       └── types.ts
│
├── hooks/              # Hooks genéricos
├── pages/              # Páginas (ligadas às rotas)
├── routes/             # Configuração das rotas
├── services/           # Configuração de APIs (Axios)
├── store/              # Estado global (Zustand)
├── styles/             # Estilos globais e tema
├── utils/              # Funções utilitárias
└── types/              # Tipagens compartilhadas

```
---

## 🔒 Considerações de Segurança

> ⚠️ **IMPORTANTE:** A versão **publicamente deployada no Netlify não expõe API keys sensíveis**.

Durante o desenvolvimento e estudos locais, houve uma versão utilizada **exclusivamente em ambiente local** que consumia a API diretamente no frontend para fins **educacionais e de teste**.

Essa abordagem **não é utilizada em produção** e **não é recomendada para aplicações reais**.

### Arquitetura Segura Recomendada:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│  Amadeus    │
│   (React)   │◀─────│  (Node.js)  │◀─────│     API     │
└─────────────┘      └─────────────┘      └─────────────┘
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Jefferson Alves**

- GitHub: [@JeffersonAlvesB](https://github.com/JeffersonAlvesB)
- LinkedIn: [Seu LinkedIn](https://www.linkedin.com/in/jeffersonalvesb) <!-- Adicione seu link -->
- Portfolio: [Seu Portfolio](https://jeffweb.netlify.app) <!-- Adicione seu link -->
