# 📌 KindX – Versionamento Semântico Automático

O KindX utiliza **Versionamento Semântico (SemVer)** para controlar as versões do aplicativo.

O objetivo é manter um histórico claro de evolução, facilitar entendimento de mudanças e garantir previsibilidade para futuros colaboradores, investidores ou desenvolvedores.

---

# 🎯 Como funciona o SemVer

Uma versão tem o formato:

```
MAJOR.MINOR.PATCH
```

Exemplo:

```
1.4.12
```

Significado:

- **MAJOR** → mudanças grandes, quebra de compatibilidade  
- **MINOR** → novas funcionalidades compatíveis  
- **PATCH** → correções e melhorias pequenas  

---

# 🔧 Scripts automáticos disponíveis

Os scripts abaixo automatizam a atualização da versão no `package.json`.

### ✔ Atualizar PATCH  
Correções pequenas, ajustes de layout, melhorias internas.

```
npm run version:patch
```

Exemplo:  
`1.0.0` → `1.0.1`

---

### ✔ Atualizar MINOR  
Nova funcionalidade que não quebra nada existente.

```
npm run version:minor
```

Exemplo:  
`1.0.0` → `1.1.0`

---

### ✔ Atualizar MAJOR  
Mudanças grandes que quebram compatibilidade ou fluxo.

```
npm run version:major
```

Exemplo:  
`1.0.0` → `2.0.0`

---

# 📄 Fluxo recomendado ao desenvolver

Sempre que terminar uma modificação importante:

1. **Atualize o CHANGELOG.md**
2. **Confirme se o código está funcional**
3. Rode o script adequado:
   - `patch` para ajustes
   - `minor` para uma feature
   - `major` para mudanças estruturais
4. Commit + push

---

# 📝 Exemplo de fluxo real

Você adicionou uma nova funcionalidade no mapa?

→ Atualize MINOR:

```
npm run version:minor
```

Fez ajustes no layout do Feed?

→ Atualize PATCH:

```
npm run version:patch
```

Mudou toda a navegação e reestruturou o app?

→ Atualize MAJOR:

```
npm run version:major
```

---

# 🎉 Conclusão

O sistema de versionamento automático:

- mantém o projeto organizado,  
- facilita entender a evolução,  
- melhora a credibilidade perante investidores,  
- e prepara o KindX para crescer com qualidade.

---
