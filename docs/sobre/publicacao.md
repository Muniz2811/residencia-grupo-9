# Publicar o MkDocs

Este site usa somente MkDocs e seus complementos. A publicação é independente do aplicativo Render/Supabase e não precisa instalar Torch ou baixar o E5.

## 1. Rodar localmente

No PowerShell, entre na pasta `residencia-grupo-9`:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-docs.txt
.\.venv\Scripts\python.exe -m mkdocs serve
```

Abra **http://127.0.0.1:8001**. Se o ambiente já estiver criado, execute apenas o último comando. Para verificar a geração completa:

```powershell
.\.venv\Scripts\python.exe -m mkdocs build --strict
```

O resultado vai para `site/`, que não precisa ser commitado.

## 2. Criar o repositório no GitHub

No GitHub, use **New repository**, com nome sugerido `residencia-grupo-9`. Crie-o vazio, sem README, licença ou `.gitignore` gerados pelo GitHub, pois os arquivos locais já existem.

Para usar Pages com GitHub Free, o repositório precisa ser público. Repositórios privados dependem de um plano que suporte Pages nessa modalidade. [Disponibilidade do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

O repositório Git local já foi inicializado nesta pasta. Antes de criar outro commit, confira o estado:

```powershell
git status
git log -1 --oneline
```

Se ainda não houver commit, faça:

```powershell
git add .
git commit -m "docs: adicionar documentação do Grupo 09"
```

Configure o remoto com a URL que o GitHub mostrar. Substitua `SEU_USUARIO` pelo seu usuário ou organização:

```powershell
git remote add origin https://github.com/SEU_USUARIO/residencia-grupo-9.git
git push -u origin main
```

Se `origin` já existir, confira com `git remote -v`; para corrigir a URL, use `git remote set-url origin URL_CORRETA`. Não publique dentro do remoto do aplicativo de coleta ou do Grupo 04.

## 3. Ativar Pages

No novo repositório:

1. Abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Abra **Actions → Publicar documentação**.
4. Aguarde a execução ou use **Run workflow**, escolhendo `main`.

Se a primeira execução aconteceu antes de habilitar Pages, pode falhar nessa configuração inicial. Depois de ativar a opção, execute novamente.

O workflow instala as dependências, roda `mkdocs build --strict`, envia o site e publica o ambiente `github-pages`. A URL aparecerá na execução e em Settings → Pages, normalmente:

```text
https://SEU_USUARIO.github.io/residencia-grupo-9/
```

A URL canônica e o link do repositório são preenchidos pelo workflow a partir do próprio GitHub. Não é necessário deixar o endereço do Grupo 04 no `mkdocs.yml`. [Workflow de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 4. Atualizar o site

Depois de editar os Markdown ou estilos:

```powershell
.\.venv\Scripts\python.exe -m mkdocs build --strict
git add .
git commit -m "docs: atualizar documentação"
git push
```

Cada push em `main` dispara uma nova publicação. O site resultante é estático; ele não passa a executar o backend de fotos ou o RAG.

## Atualizar as evidências

Se o piloto mudar, com os arquivos originais acessíveis:

```powershell
python scripts/sync_evidence.py --rag-root ../unb-gama-rag
```

O script apenas lê os artefatos existentes e atualiza os arquivos públicos selecionados. Revise os textos, gere o site e faça commit. O GitHub Actions não depende da pasta vizinha.

## Problemas comuns

| Sintoma | Como verificar |
|---|---|
| Página 404 | Conferir Pages habilitado, workflow de deploy concluído e URL do repositório |
| Deploy falha por permissões | Verificar Actions habilitado e permissões/environment do workflow |
| `ModuleNotFoundError` | Usar o Python da `.venv` e instalar `requirements-docs.txt` |
| Porta em uso | Rodar `mkdocs serve -a 127.0.0.1:8002` e abrir essa porta |
| CSS/JS em caminho errado | Usar o workflow fornecido, que define a URL incluindo o subdiretório do repositório |
| Números antigos | Sincronizar evidências e atualizar os textos; build não executa o RAG |

Fontes adicionais: [MkDocs](https://www.mkdocs.org/user-guide/configuration/) e [publicação com Material](https://squidfunk.github.io/mkdocs-material/publishing-your-site/).
