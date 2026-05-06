import { useId } from 'react';
import { ChevronDown, Sprout } from 'lucide-react';
import { CULTURAS } from '../utils/cultures';

/**
 * Seletor de cultura agrícola.
 * Usa <select> nativo (totalmente acessível e mobile-friendly)
 * com estilo customizado.
 */
export default function CulturaSelect({ value, onChange }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-ink-dim tracking-wide"
      >
        Cultura agrícola
      </label>

      <div className="group relative flex items-stretch rounded-xl bg-surface-input ring-1 ring-edge transition-all focus-within:ring-2 focus-within:ring-accent">
        <span className="flex items-center justify-center px-4 border-r border-edge text-accent">
          <Sprout size={18} strokeWidth={2.2} />
        </span>

        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 appearance-none bg-transparent px-4 py-3.5 font-body text-base font-semibold text-ink focus:outline-none cursor-pointer pr-12"
        >
          {CULTURAS.map((c) => (
            <option key={c.id} value={c.id} className="bg-surface text-ink">
              {c.label.toUpperCase()}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-dim">
          <ChevronDown size={18} />
        </span>
      </div>
    </div>
  );
}
