# 🧠 KindX – Decisions Register  
Registro formal das decisões importantes de arquitetura, UX, regras de negócio e design.

Este documento segue o formato ADR (Architecture Decision Record), porém simplificado para manter velocidade e clareza.

---

## DD-001 – Navegação base com Stack + Tabs  
**Data:** 2025-12  
**Decisão:**  
Usar React Navigation com uma combinação de **StackNavigator** (fluxo principal) e **BottomTabs** (Home / Feed / Mapa).  

**Motivação:**  
Abordagem mais usada em apps modernos e que facilita expansão futura.

**Impacto:**  
Telinhas podem crescer sem quebrar navegação. Ideal para apps sociais.

---

## DD-002 – Integração com Supabase  
**Data:** 2025-12  
**Decisão:**  
Usar Supabase para autenticação, banco de dados Postgres, policies RLS e armazenamento.  

**Motivação:**  
Menos complexidade, muito mais velocidade na fase inicial do KindX.

**Impacto:**  
RLS exige configuração manual para permitir insert de usuários autenticados.

---

## DD-003 – Telas em português inicialmente  
**Data:** 2025-12  
**Decisão:**  
Construir primeiro em linguagem portuguesa e adicionar internacionalização depois.

**Motivação:**  
Velocidade no desenvolvimento + clareza para o criador do projeto.

**Impacto:**  
Criação futura de sistema i18n (provavelmente com i18next).

---

## DD-004 – Sistema de pedidos e ofertas  
**Data:** 2025-12  
**Decisão:**  
Manter duas tabelas: **requests** (pedidos) e **offers** (ofertas).  

**Motivação:**  
Facilita filtros, UI clara e controle de categorias.

---

## DD-005 – Primeira versão do Feed  
**Data:** 2025-12  
**Decisão:**  
Mostrar cards simples, com botão “Ler mais”, ordenar por data e permitir navegação para detalhes.

---

## DD-006 – Card centralizado na tela de detalhes  
**Data:** 2025-12  
**Decisão:**  
Adotar layout estilo premium (card centralizado).

**Motivação:**  
Transmite profissionalismo e vira uma identidade visual do KindX.

---

## DD-007 – Botão flutuante (FAB) no Feed  
**Data:** 2025-12  
**Decisão:**  
Adicionar FAB para criar novos pedidos/ofertas.

---

## DD-008 – Telas de Pedir Ajuda e Oferecer Ajuda com visual padronizado  
**Data:** 2025-12  
**Decisão:**  
Títulos maiores, centralizados, abaixo da câmera frontal.

---

## DD-009 – Mapa geral mostrando todos os pins  
**Data:** 2025-12  
**Decisão:**  
Ao abrir a aba Mapa, sempre mostrar **todos os pontos** (modo explorar).

---

## DD-010 – Modo "Mapa Focado"  
**Data:** 2025-12  
**Decisão:**  
Quando vier de um card do Feed, mostrar **somente aquele pin** e permitir navegação futura por rotas.

---

## DD-011 – Animação para o pin clicado  
**Data:** 2025-12  
**Decisão:**  
Clicar no pin faz a câmera animar suavemente para aquele ponto.

---

## DD-012 – Card flutuante no mapa ao clicar no pin  
**Data:** 2025-12  
**Decisão:**  
Substituir Callout por **card moderno flutuante**, inspirado em Booking, Google Maps e Airbnb.

**Motivação:**  
Melhor UX, mais profissional, permite colocar botões e informações claras.

**Impacto:**  
Mapa ficou muito mais fácil de usar e entender.

---

## DD-013 – Preparação para rotas (Google/Apple Maps)  
**Data:** 2025-12  
**Decisão:**  
Adicionar botão “Traçar rota (em breve)” enquanto API oficial não é integrada.

---
