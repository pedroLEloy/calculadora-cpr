/**
 * Culturas agrícolas suportadas pela calculadora CPR.
 *
 * `produtividadeRef` é uma faixa típica de referência no Brasil
 * (sacas de 60kg por hectare). É apenas informativa — o usuário
 * pode entrar com qualquer valor.
 */
export const CULTURAS = [
  {
    id: 'SOJA',
    label: 'Soja',
    produtividadeRef: '50 a 65 sacas/ha',
    sugestao: 60,
  },
  {
    id: 'MILHO-VERAO',
    label: 'Milho-Verão',
    produtividadeRef: '130 a 180 sacas/ha',
    sugestao: 150,
  },
  {
    id: 'MILHO-SAFRINHA',
    label: 'Milho-Safrinha',
    produtividadeRef: '100 a 140 sacas/ha',
    sugestao: 110,
  },
  {
    id: 'SORGO',
    label: 'Sorgo',
    produtividadeRef: '50 a 80 sacas/ha',
    sugestao: 65,
  },
];

export const getCulturaById = (id) =>
  CULTURAS.find((c) => c.id === id) ?? CULTURAS[0];
