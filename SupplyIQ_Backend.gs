// ═══════════════════════════════════════════════════════════════
//  SUPPLY IQ — Backend Google Apps Script
//  Cole este código em script.google.com e faça o deploy como
//  "Web App" (acesso: Qualquer pessoa)
// ═══════════════════════════════════════════════════════════════

const SHEET_NAME_USUARIOS    = 'usuarios';
const SHEET_NAME_FORNECEDORES = 'fornecedores';
const SHEET_NAME_REQUISICOES  = 'requisicoes';
const SHEET_NAME_NFE          = 'nfe';
const SECRET_KEY              = 'supplyiq2026'; // Troque por uma chave secreta sua

// ── Entrada de todas as requisições ────────────────────────────
function doPost(e) {
  return handleRequest(e);
}
function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  try {
    const params = e.parameter || {};
    const body   = e.postData ? JSON.parse(e.postData.contents || '{}') : {};
    const action = params.action || body.action;
    const key    = params.key    || body.key;

    if (key !== SECRET_KEY) {
      return jsonResponse({ ok: false, error: 'Chave inválida' }, cors);
    }

    switch (action) {
      // ── Autenticação ──────────────────────────────────────────
      case 'login':
        return jsonResponse(login(body.email, body.senhaHash), cors);

      // ── Usuários ──────────────────────────────────────────────
      case 'getUsuarios':
        return jsonResponse({ ok: true, data: getSheet(SHEET_NAME_USUARIOS) }, cors);
      case 'saveUsuarios':
        saveSheet(SHEET_NAME_USUARIOS, body.data);
        return jsonResponse({ ok: true }, cors);

      // ── Fornecedores ──────────────────────────────────────────
      case 'getFornecedores':
        return jsonResponse({ ok: true, data: getSheet(SHEET_NAME_FORNECEDORES) }, cors);
      case 'saveFornecedores':
        saveSheet(SHEET_NAME_FORNECEDORES, body.data);
        return jsonResponse({ ok: true }, cors);

      // ── Requisições ───────────────────────────────────────────
      case 'getRequisicoes':
        return jsonResponse({ ok: true, data: getSheet(SHEET_NAME_REQUISICOES) }, cors);
      case 'saveRequisicoes':
        saveSheet(SHEET_NAME_REQUISICOES, body.data);
        return jsonResponse({ ok: true }, cors);

      // ── NF-e ──────────────────────────────────────────────────
      case 'getNfe':
        return jsonResponse({ ok: true, data: getSheet(SHEET_NAME_NFE) }, cors);
      case 'saveNfe':
        saveSheet(SHEET_NAME_NFE, body.data);
        return jsonResponse({ ok: true }, cors);

      // ── Carga inicial completa ────────────────────────────────
      case 'getAllData':
        return jsonResponse({
          ok: true,
          fornecedores: getSheet(SHEET_NAME_FORNECEDORES),
          requisicoes:  getSheet(SHEET_NAME_REQUISICOES),
          nfe:          getSheet(SHEET_NAME_NFE)
        }, cors);

      default:
        return jsonResponse({ ok: false, error: 'Ação desconhecida: ' + action }, cors);
    }
  } catch(err) {
    return jsonResponse({ ok: false, error: err.message }, cors);
  }
}

// ── Login ───────────────────────────────────────────────────────
function login(email, senhaHash) {
  const usuarios = getSheet(SHEET_NAME_USUARIOS);
  const user = usuarios.find(u => u.email === email && u.senha === senhaHash && u.ativo !== false);
  if (!user) return { ok: false, error: 'Email ou senha incorretos' };
  return { ok: true, user: { nome: user.nome, email: user.email, role: user.role || 'user' } };
}

// ── Lê aba do Sheets como array de objetos JSON ─────────────────
function getSheet(sheetName) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const raw = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getValue();
  if (!raw) return [];

  try { return JSON.parse(raw); }
  catch(e) { return []; }
}

// ── Grava array de objetos JSON na aba (célula A1) ──────────────
function saveSheet(sheetName, data) {
  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  sheet.getRange(1, 1).setValue(JSON.stringify(data));
}

// ── Resposta JSON com CORS ──────────────────────────────────────
function jsonResponse(obj, corsHeaders) {
  const output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ── Setup inicial: cria as abas se não existirem ────────────────
function setupSheets() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const abas  = [SHEET_NAME_USUARIOS, SHEET_NAME_FORNECEDORES, SHEET_NAME_REQUISICOES, SHEET_NAME_NFE];
  abas.forEach(nome => {
    if (!ss.getSheetByName(nome)) {
      const sheet = ss.insertSheet(nome);
      sheet.getRange(1, 1).setValue('[]');
      Logger.log('Aba criada: ' + nome);
    }
  });
  Logger.log('Setup completo!');
}
