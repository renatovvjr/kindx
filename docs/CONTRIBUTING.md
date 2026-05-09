# 🤝 Contribuindo para o KindX

Obrigado por considerar contribuir com o KindX!  
Este documento explica como o fluxo de contribuição funciona, como manter o padrão do projeto e como enviar melhorias de forma organizada.

---

# 📌 Regras gerais

- Sempre mantenha o código limpo e legível.
- Use **TypeScript** corretamente.
- Nomeie arquivos e variáveis de forma clara.
- Evite duplicação de código.
- Antes de criar algo novo, verifique se já existe algo semelhante.

---

# 📂 Estrutura do projeto

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

- **screens** → telas completas  
- **components** → componentes reutilizáveis  
- **lib** → serviços (ex.: Supabase)  
- **context** → estados globais  
- **hooks** → lógica reutilizável  
- **theme** → cores e estilos  
- **assets** → imagens e ícones  
- **docs** → documentação oficial  

---

# 🧹 Padrões de código

### ✔ Imports organizados
Sempre em ordem:

1. Bibliotecas externas  
2. Lib interna  
3. Componentes  
4. Estilos  
5. Tipos  

### ✔ Estilo visual
- Sem variações improvisadas de cores.
- Usar sempre as cores do tema KindX.
- Componentes devem ser suaves e com boa usabilidade.

---

# 🧪 Testar antes de enviar alterações

Antes de enviar qualquer modificação:

1. Rode o app:
   ```
   npm start
   ```
2. Teste em:
   - Aba **Home**
   - Aba **Feed**
   - Aba **Mapa**
   - Tela de detalhes
   - Telas de Pedir/Oferecer ajuda

---

# 📝 Versionamento

Antes de enviar um PR ou commit:

1. Atualize o `CHANGELOG.md`.  
2. Use o versionamento semântico:
   ```
   npm run version:patch
   npm run version:minor
   npm run version:major
   ```

---

# 🚀 Como sugerir melhorias

Abra um pull request com:

- Descrição clara da mudança  
- Capturas de tela (quando for UI)  
- Justificativa do impacto positivo

---

# 💬 Comunicação

Perguntas, ideias ou dúvidas:  
→ conversar diretamente com **Renato**, o criador do KindX.

---

Obrigado por contribuir com o KindX ❤️
