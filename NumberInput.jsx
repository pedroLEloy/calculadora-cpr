import { useId, useState, useEffect } from 'react';
import { maskDecimalBR, unmaskDecimalBR } from '../utils/format';

/**
 * Input numérico com máscara BR em tempo real.
 * Aceita inteiros e decimais (com vírgula).
 */
export default function NumberInput({
  label,
  hint,
  suffix = '',
  value,
  onChange,
  placeholder = '0',
}) {
  const id = useId();

  // estado local de exibição (string mascarada)
  const [display, setDisplay] = useState(() =>
    value ? maskDecimalBR(String(value).replace('.', ',')) : ''
  );

  // sincroniza quando o valor é resetado externamente (botão limpar)
  useEffect(() => {
    if (!value && display) setDisplay('');
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const masked = maskDecimalBR(e.target.value);
    setDisplay(masked);
    onChange(unmaskDecimalBR(masked));
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
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={placeholder}
          value={display}
          onChange={handleChange}
          className="flex-1 bg-transparent px-4 py-3.5 font-mono text-lg text-ink placeholder:text-ink-muted focus:outline-none"
        />
        {suffix && (
          <span className="flex items-center justify-center px-4 font-body text-sm font-medium text-ink-muted border-l border-edge">
            {suffix}
          </span>
        )}
      </div>

      {hint && (
        <p className="text-xs text-ink-muted italic font-body">{hint}</p>
      )}
    </div>
  );
}
