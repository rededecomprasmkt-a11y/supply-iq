# Rede de Compras · Supply IQ v7
### Deploy no GitHub Pages — Passo a Passo

---

## 1. Criar repositório no GitHub

1. Acesse **github.com** → clique em **"New repository"**
2. Nome: `supply-iq`
3. Visibilidade: **Public** (obrigatório para GitHub Pages gratuito)
4. Clique **"Create repository"**

---

## 2. Subir os arquivos

Na página do repositório vazio, clique em **"uploading an existing file"**

Arraste os 2 arquivos:
- `index.html`
- `app.html`

Clique **"Commit changes"**

---

## 3. Ativar GitHub Pages

1. No repositório → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → pasta **/ (root)**
4. Clique **Save**

Aguarde ~1 minuto. Seu link será:
```
https://rededecomprasmkt-a11y.github.io/supply-iq/
```

---

## 4. Adicionar usuários de teste (IMPORTANTE)

Como o app OAuth ainda está em modo de teste, apenas emails autorizados conseguem fazer login.

1. Acesse: **console.cloud.google.com**
2. Seu projeto → **APIs e Serviços** → **Tela de consentimento OAuth**
3. Clique **"Público-alvo"** no menu lateral
4. Em **"Usuários de teste"** → **+ Add users**
5. Adicione todos os emails que vão usar o sistema

---

## Como funciona

- **Login**: Conta Google (OAuth 2.0)
- **Dados**: Salvos no **appDataFolder** do Google Drive (pasta oculta, só o app acessa)
- **Sync**: Automático — qualquer alteração é salva no Drive em ~1 segundo
- **Multi-dispositivo**: Dados sincronizados entre todos os computadores logados

