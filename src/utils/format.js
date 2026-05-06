/**
 * Helpers de formatação no padrão brasileiro.
 * Os inputs são "controlados" por estes helpers para garantir
 * formatação em TEMPO REAL conforme o usuário digita.
 */

/**
 * Formata um número como moeda brasileira sem o prefixo R$.
 * Ex: 1700000 -> "1.700.000,00"
 */
export const formatBRL = (value, decimals = 2) =>
  Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * MÁSCARA DE MOEDA (estilo "centavos por dígito").
 *
 * O usuário digita apenas dígitos. O último par sempre representa centavos.
 * É a abordagem padrão de fintechs brasileiras (Nubank, PicPay, etc.).
 *
 * Ex:
 *   "" -> ""
 *   "1" -> "0,01"
 *   "12" -> "0,12"
 *   "12345" -> "123,45"
 *   "170000000" -> "1.700.000,00"
 */
export const maskCurrency = (raw) => {
  const digits = String(raw ?? '').replace(/\D/g, '');
  if (!digits) return '';
  // remove zeros à esquerda mas mantém pelo menos 3 dígitos (0,0X)
  const padded = digits.padStart(3, '0');
  const cents = padded.slice(-2);
  const integer = padded.slice(0, -2).replace(/^0+(?=\d)/, '') || '0';
  const intWithDots = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${intWithDots},${cents}`;
};

/**
 * Converte o valor formatado de uma máscara de moeda em número.
 * Ex: "1.700.000,00" -> 1700000
 *     "0,50" -> 0.5
 */
export const unmaskCurrency = (masked) => {
  if (!masked) return 0;
  const digits = String(masked).replace(/\D/g, '');
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
};

/**
 * MÁSCARA DE NÚMERO INTEIRO/DECIMAL com separador BR de milhar.
 *
 * Permite dígitos e UMA vírgula como separador decimal (no máx. 2 casas).
 * Adiciona pontos de milhar em tempo real na parte inteira.
 *
 * Ex:
 *   "60" -> "60"
 *   "1500" -> "1.500"
 *   "60,5" -> "60,5"
 *   "1500,75" -> "1.500,75"
 */
export const maskDecimalBR = (raw) => {
  if (raw === '' || raw == null) return '';
  // mantém só dígitos e a primeira vírgula
  let cleaned = String(raw).replace(/[^\d,]/g, '');
  const firstComma = cleaned.indexOf(',');
  if (firstComma !== -1) {
    cleaned =
      cleaned.slice(0, firstComma + 1) +
      cleaned.slice(firstComma + 1).replace(/,/g, '');
  }
  const [intPart, decPart] = cleaned.split(',');
  const intClean = (intPart || '').replace(/^0+(?=\d)/, '') || (intPart === '' ? '' : '0');
  const intWithDots = intClean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (decPart === undefined) return intWithDots;
  return `${intWithDots},${decPart.slice(0, 2)}`;
};

/**
 * Converte o valor formatado em número.
 * Ex: "1.500,75" -> 1500.75
 *     "60" -> 60
 */
export const unmaskDecimalBR = (masked) => {
  if (!masked) return 0;
  const cleaned = String(masked).replace(/\./g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};
