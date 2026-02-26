══════════════════════════════════════════════════════════════
  SUPPLY IQ — Configuração do Backend (Google Apps Script)
  Faça isso UMA VEZ. Depois nunca mais precisa mexer.
══════════════════════════════════════════════════════════════

PASSO 1 — Criar a Planilha
──────────────────────────
1. Acesse: https://sheets.google.com
2. Clique em "+" para criar uma nova planilha
3. Dê o nome: "Supply IQ — Dados"
4. Deixe aberta (você vai precisar do URL)

PASSO 2 — Criar o Script
─────────────────────────
1. Na planilha, clique no menu: Extensões → Apps Script
2. Apague todo o código que já existe
3. Cole o conteúdo COMPLETO do arquivo "SupplyIQ_Backend.gs"
4. Clique em Salvar (ícone de disquete) ou Ctrl+S
5. Dê o nome "Supply IQ Backend" quando pedir

PASSO 3 — Configurar o Script (apenas na primeira vez)
───────────────────────────────────────────────────────
1. Com o script aberto, clique na função "setupSheets"
   no menu suspenso (onde está escrito "Code.gs")
2. Clique em "▶ Executar"
3. Se pedir permissão: Analisar → Ir para Supply IQ (não seguro) → Permitir
4. Verifique no Log que aparece "Setup completo!"

PASSO 4 — Publicar como Web App
────────────────────────────────
1. Clique em "Implantar" → "Nova implantação"
2. Clique no ícone de engrenagem ⚙ → "App da Web"
3. Configure assim:
   - Descrição: "Supply IQ API v1"
   - Executar como: "Eu (seu email)"
   - Quem tem acesso: "Qualquer pessoa"  ← IMPORTANTE
4. Clique em "Implantar"
5. Autorize quando pedir permissão
6. COPIE a URL que aparecer (parece com:
   https://script.google.com/macros/s/ABC123.../exec)

PASSO 5 — Configurar no App
────────────────────────────
1. Abra o Supply IQ (app.html)
2. Um modal de configuração vai aparecer automaticamente
   (ou clique no ícone 🔴 no canto superior direito)
3. Cole a URL copiada no Passo 4
4. Clique em "Salvar e Conectar"
5. O ícone deve virar 🟢 (sincronizado)

PASSO 6 — Criar o primeiro usuário
────────────────────────────────────
1. Clique em "👥 Usuários" (só aparece para admin)
2. Clique em "+ Novo Usuário"
3. Preencha nome, email e senha
4. Clique em "Criar"
5. O usuário já pode logar pelo index.html com email/senha

══════════════════════════════════════════════════════════════
  IMPORTANTE: Segurança
══════════════════════════════════════════════════════════════

- O SECRET_KEY no arquivo .gs deve ser igual ao API_KEY no app.html
- Ambos estão configurados como "supplyiq2026" por padrão
- Para mais segurança, troque por uma chave única em ambos os lugares

  No .gs:  const SECRET_KEY = 'sua-chave-aqui';
  No app.html: const API_KEY = 'sua-chave-aqui';

══════════════════════════════════════════════════════════════
  ATUALIZAR o App Script (se precisar)
══════════════════════════════════════════════════════════════

Se precisar atualizar o código:
1. Apps Script → cole o novo código → Salve
2. Implantar → Gerenciar implantações
3. Clique no lápis ✏ → "Nova versão" → Implantar
   (A URL permanece a mesma — não precisa reconfigurar no app)

══════════════════════════════════════════════════════════════
