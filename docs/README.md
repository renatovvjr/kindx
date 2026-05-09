# 🌍 KindX  
### Conectando pessoas que precisam de ajuda a pessoas que querem ajudar.

KindX é um aplicativo mobile desenvolvido em **React Native + Expo**, com backend em **Supabase**, focado em criar uma rede colaborativa onde qualquer pessoa pode:

- Pedir ajuda  
- Oferecer ajuda  
- Ver pedidos e ofertas próximas  
- Navegar pelo mapa para saber quem precisa de apoio na região  

---

## 🚀 Tecnologias principais

- **React Native (Expo)**
- **TypeScript**
- **React Navigation (Stack + Tabs)**
- **Supabase (Auth + Postgres + RLS)**
- **React Native Maps**

---

## 🧱 Arquitetura

```
src/
  screens/
  components/
  lib/
  context/
  hooks/
  theme/
  assets/
docs/
```

- UI organizada por telas e componentes reutilizáveis  
- `lib/supabase.ts` centraliza conexão  
- `UserContext` controlará autenticação futura  
- Documentação viva em `docs/`

---

## 🔐 Banco de dados (Supabase)

Tabelas principais:

### `requests`
| campo | tipo |
|------|------|
| id | uuid |
| title | text |
| description | text |
| category | text |
| location | text |
| latitude | float |
| longitude | float |
| created_at | timestamp |

### `offers`
| campo | tipo |
|------|------|
| id | uuid |
| type | text |
| description | text |
| location | text |
| latitude | float |
| longitude | float |
| created_at | timestamp |

RLS configurado permitindo inserts para usuários autenticados.

---

## 🗺️ Mapa

- Aba Mapa mostra **todos os pins** (explorar)
- Vindo de um card → mostra **pin único** (modo focado)
- Animação da câmera ao clicar
- Card flutuante com “Ver detalhes”
- Botão de rota (versão futura)

---

## 📄 Documentação

- `CHANGELOG.md` — histórico completo  
- `DECISIONS.md` — decisões importantes  
- `README.md` — visão geral  

---

## 🧭 Roadmap

- Login Google/Apple
- Sistema de mensagens
- Perfil do usuário
- Sistema de reputação e badges
- Gamificação (pontos por ajudar)
- Filtros avançados no mapa
- Rotas integradas com Google/Apple Maps
- Notificações push

---

## 👨‍💻 Criador  
**Renato Valle**, Sydney – AU  
Apaixonado por tecnologia, impacto social e inovação.

---

