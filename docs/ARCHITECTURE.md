# 🏛️ Arquitetura do KindX

O KindX segue uma arquitetura modular baseada em separação por responsabilidade, garantindo escalabilidade e clareza do código.

---

# 📌 Visão geral

O app é construído em **React Native + Expo**, usando:

- **React Navigation** para fluxo e abas  
- **Supabase** para backend (Postgres + Auth + RLS)  
- **React Native Maps** para geolocalização  
- **Context API** para estados globais (futuro: usuários autenticados)  

---

# 📂 Estrutura de diretórios

```
src/
  screens/            # Telas completas do app
  components/         # Peças reutilizáveis
  lib/                # Integrações externas
  context/            # Estados globais
  hooks/              # Lógica reaproveitável
  theme/              # Cores e estilos
  assets/             # Ícones e imagens
docs/                 # Documentação oficial
```

---

# 🔧 Backend (Supabase)

O Supabase é usado para:

- Autenticação futura (social login)  
- Banco de dados Postgres  
- Row Level Security (RLS)  
- Queries de insert/select  

Tabelas principais:

### `requests`
- Pedidos de ajuda enviados pelos usuários

### `offers`
- Ofertas de ajuda enviadas pelos usuários

Cada item pode possuir latitude/longitude para exibição no mapa.

---

# 🗺️ Sistema de Mapa

### Modo Explorar (“Mapa geral”)
- Mostra todos os pins (pedidos e ofertas)
- Possui filtro por tipo
- Card flutuante aparece ao clicar no pin

### Modo Focado (“Ver no mapa” vindo de um card)
- Mostra apenas 1 pin
- Prepara integração para rotas
- Ideal para indicar localização exata do usuário que precisa/oferece

---

# 🧭 Navegação

O app usa:

- **StackNavigator** → fluxo principal
- **BottomTabNavigator** → Home, Feed e Mapa

```
Login
  └── Tabs
        ├── Home
        ├── Feed
        └── Mapa
```

Rotas adicionais:

- AskHelp  
- OfferHelp  
- FeedDetails  
- MapFocused (modo focado)

---

# 🎨 Design System

Cores principais:

- **Azul KindX**: `#00B8D9`  
- **Laranja (pedidos)**: `#F97316`  
- **Verde (ofertas)**: `#059669`  
- **Cinzas suaves** para UI minimalista  

Tudo segue a filosofia:

> “Simples, leve, acolhedor e humano.”

---

# 🔮 Futuras expansões previstas

- Modal de login social (Google/Apple)  
- Sistema de chat  
- Perfil do usuário  
- Sistema de badges e reputação  
- Clustering de pins no mapa  
- Rotas integradas com Google Maps API  
- Hospedagem de imagens e avatares  

---

A arquitetura é pensada para crescer de forma sustentável sem perder clareza.
