/** Extrai apenas campos editáveis de Actor, aceitando FormData plano ou expandido. */
export function entradasFicha(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) return {};
  const resultado = {};
  function visitar(obj, prefixo = '') {
    for (const [chave, valor] of Object.entries(obj)) {
      if (['__proto__', 'constructor', 'prototype'].includes(chave)) continue;
      const caminho = prefixo ? prefixo + '.' + chave : chave;
      if (caminho !== 'name' && caminho !== 'system' && !caminho.startsWith('system.')) continue;
      if (valor && typeof valor === 'object' && !Array.isArray(valor)) visitar(valor, caminho);
      else if (caminho === 'name' || caminho.startsWith('system.')) resultado[caminho] = valor;
    }
  }
  visitar(dados);
  return resultado;
}
