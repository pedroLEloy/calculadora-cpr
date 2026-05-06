import { Wheat, Package, MapPin } from 'lucide-react';
import { formatBRL } from '../utils/format';
import { getCulturaById } from '../utils/cultures';

/**
 * Painel de resultado.
 * Exibe os números grandes e formatados quando há resultado válido,
 * ou um estado vazio elegante quando ainda não há cálculo.
 */
export default function ResultPanel({ result, culturaId }) {
  const cultura = getCulturaById(culturaId);
  const hasResult = result !== null;

  return (
    <aside className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-edge">
      {/* glow accent no canto */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative p-6 sm:p-8">
        {/* header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
          <h2 className="font-body text-xs font-bold tracking-[0.18em] text-ink-dim uppercase">
            Simulação de cobertura
          </h2>
        </div>

        {/* cultura badge */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/30">
            <Wheat size={18} className="text-gold" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-ink-muted font-body font-semibold">
              Cultura
            </div>
            <div className="font-display text-lg font-semibold text-gold">
              {cultura.label}
            </div>
          </div>
        </div>

        {/* resultados */}
        <div className="space-y-6">
          <ResultRow
            icon={<Package size={16} />}
            label="Sacas necessárias"
            value={hasResult ? formatBRL(result.sacas) : null}
            unit="sacas"
            highlight={hasResult}
          />

          <div className="h-px bg-edge" />

          <ResultRow
            icon={<MapPin size={16} />}
            label="Área mínima"
            value={hasResult ? formatBRL(result.hectares) : null}
            unit="hectares"
            highlight={hasResult}
          />
        </div>

        {/* footer */}
        <p className="mt-8 text-xs text-ink-muted leading-relaxed font-body">
          {hasResult
            ? `Para cobrir o valor desta CPR de ${cultura.label}, é necessário entregar a quantidade de sacas indicada acima, equivalente à área mínima estimada.`
            : 'Preencha os campos ao lado para visualizar a simulação em tempo real.'}
        </p>
      </div>
    </aside>
  );
}

function ResultRow({ icon, label, value, unit, highlight }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <span className="text-ink-muted">{icon}</span>
        <span className="font-body text-sm font-medium text-ink-dim">
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        {value !== null ? (
          <>
            <span
              key={value} /* re-render para animar quando mudar */
              className="font-mono text-3xl sm:text-4xl font-bold text-accent-glow tabular-nums leading-none animate-pulse-once"
            >
              {value}
            </span>
            <span className="font-body text-xs text-ink-muted">{unit}</span>
          </>
        ) : (
          <span className="font-mono text-3xl sm:text-4xl font-bold text-ink-muted/40 tabular-nums leading-none">
            —
          </span>
        )}
      </div>
    </div>
  );
}
