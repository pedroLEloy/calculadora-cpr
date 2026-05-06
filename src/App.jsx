import { useMemo, useState, useEffect } from 'react';
import { RotateCcw, FileText } from 'lucide-react';
import CulturaSelect from './components/CulturaSelect';
import CurrencyInput from './components/CurrencyInput';
import NumberInput from './components/NumberInput';
import ResultPanel from './components/ResultPanel';
import CotacaoCard from './components/CotacaoCard';
import { calculateCPR } from './utils/calculateCPR';
import { getCulturaById } from './utils/cultures';
import { usePrecos } from './utils/usePrecos';

export default function App() {
  const [cultura, setCultura] = useState('SOJA');
  const [valorCpr, setValorCpr] = useState(0);
  const [precoSaca, setPrecoSaca] = useState(0);
  const [produtividade, setProdutividade] = useState(0);

  // Carrega cotações de /precos.json
  const { data: precos, loading: precosLoading, error, recarregar } = usePrecos();

  // Auto-preenche o preço da saca quando a cultura muda OU quando
  // os preços terminam de carregar pela primeira vez.
  useEffect(() => {
    if (!precos?.precos) return;
    const culturaInfo = getCulturaById(cultura);
    const precoCotacao = precos.precos[culturaInfo.apiId];
    if (precoCotacao != null) {
      setPrecoSaca(precoCotacao);
    }
  }, [cultura, precos]);

  // Cálculo em tempo real (re-roda a cada digitação)
  const result = useMemo(
    () => calculateCPR({ valorCpr, precoSaca, produtividade }),
    [valorCpr, precoSaca, produtividade]
  );

  const culturaInfo = getCulturaById(cultura);

  const handleLimpar = () => {
    setValorCpr(0);
    setPrecoSaca(0);
    setProdutividade(0);
  };

  return (
    <div className="min-h-screen grid-pattern">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        {/* HEADER */}
        <header className="mb-10 sm:mb-14 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/30">
              <FileText size={20} className="text-accent" />
            </div>
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-accent uppercase">
              CPR · v1.1
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-[1.05] tracking-tight text-balance">
            Calculadora de Cédula
            <br />
            de <span className="text-accent">Produto Rural</span>
          </h1>
          <p className="mt-3 max-w-xl font-body text-base text-ink-dim leading-relaxed">
            Simule a área mínima de cobertura física para contratos de CPR
            com base no preço da saca e na produtividade média da cultura.
          </p>
        </header>

        {/* GRID PRINCIPAL */}
        <main className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8 items-start">
          {/* COLUNA ESQUERDA — FORMULÁRIO */}
          <section className="rounded-2xl bg-surface ring-1 ring-edge p-6 sm:p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
              <h2 className="font-body text-xs font-bold tracking-[0.18em] text-ink-dim uppercase">
                Dados do contrato
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              <CulturaSelect value={cultura} onChange={setCultura} />

              {/* CARD DE COTAÇÃO ATUAL */}
              <CotacaoCard
                culturaId={cultura}
                precos={precos}
                loading={precosLoading}
                error={error}
                onAplicar={(p) => setPrecoSaca(p)}
                onRecarregar={recarregar}
              />

              <CurrencyInput
                label="Valor total da CPR"
                value={valorCpr}
                onChange={setValorCpr}
                placeholder="0,00"
              />

              <CurrencyInput
                label="Preço da saca"
                value={precoSaca}
                onChange={setPrecoSaca}
                placeholder="0,00"
              />

              <NumberInput
                label="Produtividade média"
                hint={`Referência ${culturaInfo.label}: ${culturaInfo.produtividadeRef}`}
                suffix="sc/ha"
                value={produtividade}
                onChange={setProdutividade}
                placeholder={String(culturaInfo.sugestao)}
              />

              <button
                type="button"
                onClick={handleLimpar}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-surface-input ring-1 ring-edge px-5 py-3 font-body text-sm font-semibold text-ink-dim transition-all hover:bg-bg-deep hover:text-ink hover:ring-edge-strong active:scale-[0.99]"
              >
                <RotateCcw size={16} />
                Limpar campos
              </button>
            </div>
          </section>

          {/* COLUNA DIREITA — RESULTADO */}
          <div className="lg:sticky lg:top-8 animate-fade-in">
            <ResultPanel result={result} culturaId={cultura} />
          </div>
        </main>

        {/* FOOTER */}
        <footer className="mt-12 sm:mt-16 pt-6 border-t border-edge">
          <p className="text-center font-body text-xs text-ink-muted">
            Calculadora CPR · Cálculo:{' '}
            <code className="font-mono text-ink-dim">
              sacas = valor_cpr / preço_saca
            </code>{' '}
            ·{' '}
            <code className="font-mono text-ink-dim">
              hectares = sacas / produtividade
            </code>
          </p>
        </footer>
      </div>
    </div>
  );
}
