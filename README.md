# Calculadora CPR

Calculadora de **Cédula de Produto Rural** para cálculo de cobertura física em
hectares com base no valor da CPR, preço da saca e produtividade média.

Suporta as culturas: **SOJA**, **MILHO-VERÃO**, **MILHO-SAFRINHA** e **SORGO**.

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) (ícones)

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy no Vercel

### Opção 1 — via CLI

```bash
npm install -g vercel
vercel
```

### Opção 2 — via dashboard

1. Faça push do repositório para o GitHub.
2. Em [vercel.com](https://vercel.com), clique em **New Project** e importe o repo.
3. O Vercel detecta automaticamente o framework Vite. Não precisa configurar nada.
4. Clique em **Deploy**.

## Estrutura

```
src/
├── App.jsx                      # composição principal
├── main.jsx                     # entry point
├── index.css                    # tailwind + estilos globais
├── components/
│   ├── CulturaSelect.jsx        # dropdown de cultura
│   ├── CurrencyInput.jsx        # input com máscara R$ em tempo real
│   ├── NumberInput.jsx          # input numérico com máscara BR
│   └── ResultPanel.jsx          # painel de resultado
└── utils/
    ├── cultures.js              # configuração das culturas
    ├── format.js                # helpers de formatação BR
    └── calculateCPR.js          # lógica do cálculo
```

## Lógica do cálculo

```
sacas    = valor_cpr / preco_saca
hectares = sacas / produtividade
```
