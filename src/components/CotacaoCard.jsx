import { TrendingUp, RefreshCw, ExternalLink, ArrowDown } from 'lucide-react';
import { formatarData } from '../utils/usePrecos';
import { formatBRL } from '../utils/format';
import { getCulturaById } from '../utils/cultures';

/**
 * Card que exibe a cotação atual da cultura selecionada,
 * com botões para aplicar o valor no campo "Preço da saca"
 * e recarregar.
 */
export default function CotacaoCard({
  culturaId,
  precos,
  loading,
  error,
  onAplicar,
  onRecarregar,
}) {
  const cultura = getCulturaById(culturaId);
  const preco = precos?.precos?.[cultura.apiId] ?? null;

  return (
    <div className="rounded-xl bg-surface-input ring-1 ring-edge p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-accent" />
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-accent uppercase">
            Cotação de mercado
          </span>
        </div>

        <button
          type="button"
          onClick={onRecarregar}
          disabled={loading}
          className="text-ink-muted hover:text-ink transition-colors disabled:opacity-40"
          title="Recarregar cotação"
        >
          <RefreshCw
            size={14}
            className={loading ? 'animate-spin' : ''}
          />
        </button>
      </div>

      {/* Preço */}
      <div className="flex items-baseline gap-2">
        {loading && !preco ? (
          <span className="font-mono text-2xl font-bold text-ink-muted/50">
            carregando…
          </span>
        ) : error ? (
          <span className="font-body text-sm text-danger">
            Não foi possível carregar a cotação
          </span>
        ) : preco !== null ? (
          <>
            <span className="font-mono text-xs font-bold text-gold">R$</span>
            <span className="font-mono text-2xl font-bold text-accent-glow tabular-nums leading-none">
              {formatBRL(preco)}
            </span>
            <span className="font-body text-xs text-ink-muted">
              / saca · {cultura.label}
            </span>
          </>
        ) : (
          <span className="font-body text-sm text-ink-muted">
            Cotação indisponível
          </span>
        )}
      </div>

      {/* Metadata + ações */}
      {precos && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 text-ink-muted font-body">
            <span>Atualizado em {formatarData(precos.atualizadoEm)}</span>
            {precos.fonteUrl && (
              <a
                href={precos.fonteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink-dim hover:text-accent transition-colors"
              >
                {precos.fonte}
                <ExternalLink size={10} />
              </a>
            )}
          </div>

          {preco !== null && (
            <button
              type="button"
              onClick={() => onAplicar(preco)}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 ring-1 ring-accent/30 px-2.5 py-1 font-body text-[11px] font-semibold text-accent hover:bg-accent/20 transition-colors"
            >
              <ArrowDown size={11} />
              Aplicar no campo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
