# Quintal do Morumbi — Site Institucional

## ✅ Checklist antes de publicar

- [x] Rodar o script PowerShell do PASSO 0 para copiar as imagens do OneDrive automaticamente
- [x] Conferir se hero.jpg ficou boa (senão substituir manualmente pela melhor foto)
- [x] Conferir se logo.png foi copiado corretamente de: `C:\Users\gabri\OneDrive\Cliente\Site\Quintal\quintal\logo\`
- [ ] Atualizar número de WhatsApp em `assets/js/main.js` → variável WHATSAPP
- [ ] Atualizar links iFood e Yooga em `assets/js/main.js` → objeto LINKS
- [ ] Inserir iframe do Google Maps no index.html (seção #localizacao)
- [ ] Inserir iframe do Tour 3D no index.html (seção #tour)
- [ ] Atualizar endereço e horários reais (seção #localizacao)
- [ ] Atualizar nome da agência no footer

## 🚀 Deploy no Netlify

**Opção 1 — Arrastar e soltar:**
1. Acesse https://app.netlify.com
2. Arraste a pasta `quintal-morumbi/` para a área de deploy
3. Pronto! Site no ar em segundos.

**Opção 2 — Via GitHub (recomendado):**
1. Crie repositório no GitHub: `quintal-morumbi`
2. `git remote add origin https://github.com/SEU_USUARIO/quintal-morumbi.git`
3. `git push -u origin main`
4. No Netlify: "New site from Git" → conecte o repositório
5. Build command: (deixar vazio) | Publish directory: `.`
6. Deploy! Atualizações automáticas a cada `git push`.
