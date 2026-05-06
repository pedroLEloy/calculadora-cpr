/**
 * Lógica de cálculo da CPR (Cédula de Produto Rural).
 *
 *     sacas    = valor_cpr / preco_saca
 *     hectares = sacas / produtividade
 */
export const calculateCPR = ({ valorCpr, precoSaca, produtividade }) => {
  if (!Number.isFinite(valorCpr) || valorCpr <= 0) return null;
  if (!Number.isFinite(precoSaca) || precoSaca <= 0) return null;
  if (!Number.isFinite(produtividade) || produtividade <= 0) return null;

  const sacas = valorCpr / precoSaca;
  const hectares = sacas / produtividade;

  return { sacas, hectares };
};
