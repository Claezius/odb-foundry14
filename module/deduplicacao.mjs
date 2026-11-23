// Compara nomes de registros sem diferenciar caixa, espaços externos ou composição Unicode.
export const chaveCatalogo = nome => String(nome ?? '').normalize('NFC').trim().toLocaleLowerCase('pt-BR');
export function registrosAusentes(existentes, novos) {
  const nomes = new Set(existentes.map(x => chaveCatalogo(x.name)));
  return novos.filter(x => {
    const chave = chaveCatalogo(x.name);
    if (!chave || nomes.has(chave)) return false;
    nomes.add(chave);
    return true;
  });
}
