import { useState, useEffect, useCallback } from 'react';

/**
 * Hook que carrega o arquivo público /precos.json e devolve as
 * cotações + metadados (data de atualização, fonte).
 *
 * Como o JSON está em /public, ele é servido como arquivo estático
 * pela Vercel — extremamente rápido e 100% confiável.
 *
 * Pra atualizar os preços, edite public/precos.json no GitHub.
 * O Vercel redeploya automaticamente em ~30s.
 */
export function usePrecos() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // cache-busting com timestamp pra pegar versão fresca após redeploy
      const r = await fetch(`/precos.json?t=${Date.now()}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const json = await r.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { data, loading, error, recarregar: carregar };
}

/**
 * Helper: extrai o preço de uma cultura específica do objeto retornado.
 * Retorna null se a cultura não existir ou o JSON ainda estiver carregando.
 */
export function getPrecoCultura(precos, culturaApiId) {
  if (!precos?.precos) return null;
  return precos.precos[culturaApiId] ?? null;
}

/**
 * Helper: formata data ISO (YYYY-MM-DD) para padrão BR (DD/MM/AAAA).
 */
export function formatarData(isoDate) {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-');
  if (!y || !m || !d) return isoDate;
  return `${d}/${m}/${y}`;
}
