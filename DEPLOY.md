# 🚀 Guia de Deploy - GitHub Pages

Este documento descreve como fazer o deploy da aplicação TesourarIA para o GitHub Pages.

## 📋 Pré-requisitos

1. Repositório configurado no GitHub
2. Git configurado localmente
3. Node.js e npm instalados
4. Permissões de escrita no repositório

## 🔧 Configuração

A aplicação já está configurada para deploy automático. As seguintes configurações foram aplicadas:

- **Base Href**: `/TesourarIA/`
- **Output Path**: `dist/cashlog-dashboard`
- **Branch de Deploy**: `gh-pages` (criada automaticamente)

## 📦 Deploy Manual

Para fazer o deploy manualmente, execute:

```bash
npm run deploy
```

Este comando irá:
1. Compilar o projeto em modo produção
2. Copiar o arquivo `404.html` para o diretório de build (necessário para SPA routing)
3. Publicar no GitHub Pages usando `angular-cli-ghpages`

### Primeira Execução

Na primeira execução, você pode ser solicitado a:
- Autenticar com o GitHub
- Permitir permissões de escrita no repositório

## 🤖 Deploy Automático (GitHub Actions)

O deploy automático é acionado quando há push na branch `main`.

### Configuração do GitHub Pages

1. Acesse as configurações do repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Configure:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `/ (root)`
   - **Save**

### Workflow

O workflow `.github/workflows/deploy.yml` executa automaticamente:
- Checkout do código
- Instalação de dependências (`npm ci`)
- Build da aplicação (`npm run build`)
- Cópia do `404.html` para SPA routing
- Deploy para GitHub Pages

## 🌐 URL da Aplicação

Após o deploy, a aplicação estará disponível em:

**https://jlfilho.github.io/TesourarIA/**

## 🔍 Verificação

Para verificar se o deploy foi bem-sucedido:

1. Acesse a URL acima
2. Verifique os logs do GitHub Actions em: **Actions** → **Deploy Angular App to GitHub Pages**

## 🧹 Limpeza

Para limpar a branch `gh-pages` local (se necessário):

```bash
npm run clean
```

## ⚠️ Troubleshooting

### Erro: "Repository not found"
- Verifique se o repositório existe e você tem permissões de escrita

### Erro: "Permission denied"
- Configure o token do GitHub corretamente
- Para GitHub Actions, o `GITHUB_TOKEN` é fornecido automaticamente

### 404 ao acessar rotas
- Verifique se o arquivo `404.html` foi copiado corretamente
- O arquivo `404.html` é necessário para SPA routing no GitHub Pages

### Build falha
- Verifique se todas as dependências estão instaladas
- Execute `npm ci` para instalar dependências limpas

## 📝 Notas

- O `base-href` é configurado automaticamente como `/TesourarIA/`
- O arquivo `404.html` é necessário para que as rotas do Angular funcionem corretamente
- O deploy não afeta a branch `main`, apenas cria/atualiza a branch `gh-pages`

