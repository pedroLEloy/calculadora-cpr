import { useId } from 'react';
import { maskCurrency, unmaskCurrency } from '../utils/format';

/**
 * Input de moeda com máscara em tempo real.
 *
 * Estado interno: o componente recebe `value` (número) e devolve
 * número via `onChange`. A máscara é aplicada visualmente.
 */
export default function CurrencyInput({
  label,
  hint,
  value,
  onChange,
  placeholder = '0,00',
  autoFocus = false,
}) {
  const id = useId();
  const display = value ? maskCurrency(String(Math.round(value * 100))) : '';

  const handleChange = (e) => {
    const next = unmaskCurrency(e.target.value);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-ink-dim tracking-wide"
      >
        {label}
      </label>

      <div className="group relative flex items-stretch rounded-xl bg-surface-input ring-1 ring-edge transition-all focus-within:ring-2 focus-within:ring-accent">
        <span className="flex items-center justify-center px-4 font-mono text-base font-bold text-gold border-r border-edge">
          R$
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={display}
          onChange={handleChange}
          className="flex-1 bg-transparent px-4 py-3.5 font-mono text-lg text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </div>

      {hint && (
        <p className="text-xs text-ink-muted italic font-body">{hint}</p>
      )}
    </div>
  );
}
