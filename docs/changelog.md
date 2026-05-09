# 📗 KindX – Change Log
Registro cronológico de alterações do projeto.

## [1.0.1] – 2026-03-17
### Alterado
- Projeto Supabase migrado para novo ambiente `kindx-new1`.
- Variáveis de ambiente atualizadas com nova URL e nova anon key.
- Banco de dados recriado do zero com tabelas `requests` e `offers`.
- Policies RLS recriadas para leitura e inserção pública controlada.

### Adicionado
- Dados iniciais de teste para requests e offers com latitude/longitude.
- Nova base pronta para continuidade do desenvolvimento do KindX.

## [0.1.8] – 2025-12-01
### Adicionado
- Card de preview flutuante na aba **Mapa** ao clicar em um pin, exibindo:
  - Tipo (Pedido de Ajuda / Oferta de Ajuda)
  - Título
  - Localização (quando houver)
  - Botão **“Ver detalhes”** que abre a tela completa.
- Lógica de seleção de item no mapa via estado `selectedItem` no `MapScreen`.

### Alterado
- `MapScreen.tsx`:
  - Removido o uso visual do `Callout` padrão como principal interação.
  - Agora, ao tocar em um pin, o mapa anima a câmera para a região e exibe o card flutuante no rodapé.
  - Filtro (Todos / Pedidos / Ofertas) agora limpa a seleção ao ser trocado.
- `MapFocusedScreen.tsx`:
  - Botão de rota reposicionado com espaçamento extra no rodapé para melhorar conforto visual.

### Corrigido
- Experiência estranha com o símbolo padrão em formato de “T” acima do pin.
- Pequenos ajustes de layout para evitar sobreposição visual entre mapa, filtros e ações.
---

## [0.1.7] – 2025-12
### Adicionado
- Criada tela **MapFocusedScreen** e integrada ao fluxo.
- Atualização do FeedDetailsScreen para enviar coordenadas ao mapa focado.
- Navegação reorganizada com rotas corretas.

### Alterado
- MapScreen passa a exibir *sempre todos os pins*, exceto quando recebe `focusItem`.

---

## [0.1.6] – 2025-12
### Adicionado
- Interação no mapa: clique no pin abre o FeedDetailsScreen.
- Botão “Ver no mapa” adicionado ao card de detalhes.

---

## [0.1.5] – 2025-12
### Alterado
- Cards do Feed reduzidos e adicionada funcionalidade “Ler mais”.
- Design premium na tela de detalhes, centralização do card.

---

## [0.1.4] – 2025-12
### Adicionado
- Botão flutuante no Feed.

---

## [0.1.3] – 2025-12
### Adicionado
- Correções nas telas de Pedir Ajuda e Oferecer Ajuda com posicionamento adequado.
- Estilo visual aprimorado para headers (títulos mais baixos e maiores).

---

## [0.1.2] – 2025-12
### Adicionado
- Integração inicial do Supabase.
- Inserção de RLS policies.
- Teste de POST funcionando para requests e offers.

---

## [0.1.1] – 2025-12
### Adicionado
- Feed básico implementado.
- Detalhes com botão de ação.
- Navegação inicial.

---

## [0.1.0] – 2025-12
### Adicionado
- Estrutura base do app KindX criada.
- Telas iniciais: Login, Home, Pedir Ajuda, Oferecer Ajuda.
- Tabs de navegação.

---


