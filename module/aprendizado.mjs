export const XP_THRESHOLDS = Object.freeze([0, 11, 21, 31, 46, 61, 76, 91, 111, 131, 151, 171, 201, 231, 261]);
export function xpStatus(level, xp) {
  if (!Number.isSafeInteger(level) || level < 1 || !Number.isSafeInteger(xp) || xp < 0) return 'Nível ou experiência inválidos.';
  if (level >= XP_THRESHOLDS.length) return 'Próximo limiar não explicitado na tabela impressa (p. 48).';
  const threshold = XP_THRESHOLDS[level];
  return `Experiência acumulada: ${xp} PE. Nível ${level+1}: ${threshold} PE. ${xp >= threshold ? 'Limiar atingido; confirme a progressão com o Mestre.' : `Faltam ${threshold-xp} PE.`}`;
}

// Módulo Básico, p. 48. Custo marginal por ponto (interpretação de transição de faixa).
export function custoAprendizado(atual, aumento) {
  if (!Number.isSafeInteger(atual) || atual < 0 || !Number.isSafeInteger(aumento) || aumento < 0 || aumento > 10 || !Number.isSafeInteger(atual+aumento)) throw new RangeError('Valor ou aumento inválido.');
  let custo=0;
  for(let i=0;i<aumento;i++) custo+=Math.max(1,Math.floor((atual+i)/10)-4);
  return {custo, teste:aumento>0 && atual+aumento>50};
}
export function planoAprendizado(level,xp,rows) {
  if (!Number.isSafeInteger(level) || level < 1 || level >= XP_THRESHOLDS.length || !Number.isSafeInteger(xp) || xp < XP_THRESHOLDS[level]) return {ok:false,mensagem:'Mudança de nível não disponível pela tabela impressa.'};
  if (!Array.isArray(rows) || new Set(rows.map(r=>r.id)).size !== rows.length || rows.some(r=>!r.id || !Number.isSafeInteger(r.aumento) || r.aumento<0 || r.aumento>10)) return {ok:false,mensagem:'Informe aumentos inteiros de 0 a 10 por habilidade, sem duplicatas.'};
  let total=0, testes=0;
  try {for(const r of rows) {if(!r.aumento) continue; const c=custoAprendizado(r.atual,r.aumento);total+=c.custo;testes+=Number(c.teste);}} catch {return {ok:false,mensagem:'Valor atual de habilidade inválido.'};}
  return {ok:total<=50,total,saldo:50-total,testes,mensagem:`Nível ${level} → ${level+1}: custo ${total}/50; saldo ${50-total}. ${testes} habilidade(s) exigem teste. ${total>50?'Orçamento excedido.':'Somente simulação.'}`};
}

// Teste de aprendizado: interpretação conservadora na passagem pelo limite 50.
export function testeAprendizado(atual, aumento, dado) {
  const {teste}=custoAprendizado(atual,aumento);
  if (!teste) return {estado:'livre',alvo:null};
  const alvo=Math.max(50,atual);
  if (alvo>=100) return {estado:'revisao',alvo};
  if (dado===undefined) return {estado:'pendente',alvo};
  if (!Number.isInteger(dado)||dado<1||dado>100) throw new RangeError('d100 inválido');
  return {estado:dado>alvo?'sucesso':'falha',alvo};
}

export function tipoPoder(profissao) {
  const p=String(profissao??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/\s+/g,' ');
  if(['bruxo','bruxa','paje','feiticeiro negro','feiticeira negra','feiticeiro de ferro e fogo','feiticeira de ferro e fogo'].includes(p)) return 'pm';
  if(['jesuita','sacerdote negro','sacerdotisa negra'].includes(p)) return 'pd';
  if(['guerreiro','guerreira','rastreador','rastreadora','ladrao','ladra'].includes(p)) return null;
  throw new Error('Profissão não reconhecida; confira a ficha.');
}
export function ganhosPoder(tipo,dadoRM,dadoPoder) {
  const valid=d=>Number.isInteger(d)&&d>=1&&d<=6;
  if(!valid(dadoRM)||![null,'pm','pd'].includes(tipo)||(tipo&&!valid(dadoPoder))) throw new RangeError('Dados inválidos');
  return {rm:Math.max(0,dadoRM-3),pm:tipo==='pm'?dadoPoder+3:0,pd:tipo==='pd'?dadoPoder+3:0};
}

// Consolidação de uma passagem de nível, sem consumir PE.
export function prepararPassagem(level,xp,rows,testes,poder,profissao,recursos) {
  const plano=planoAprendizado(level,xp,rows);
  if(!plano.ok) throw new Error(plano.mensagem);
  const tipo=tipoPoder(profissao);
  if(!poder||poder.tipo!==tipo) throw new Error('Registre os ganhos de poderes para esta profissão e nível.');
  const g=ganhosPoder(tipo,poder.dadoRM,poder.dadoPoder);
  const itens=[];
  for(const r of rows.filter(r=>r.aumento)){
    const t=testeAprendizado(r.atual,r.aumento);
    const old=testes?.[r.id];
    if(old && !old.sucesso) throw new Error('Retire os aumentos de habilidades reprovadas.');
    if(t.estado!=='livre' && (t.estado==='revisao'||!old||old.alvo!==t.alvo||testeAprendizado(r.atual,r.aumento,old.dado).estado!=='sucesso')) throw new Error('Há testes pendentes ou que exigem revisão.');
    itens.push({id:r.id,antes:r.atual,depois:r.atual+r.aumento,...(r.nome?{novo:true,nome:r.nome,categoria:r.categoria}:{})});
  }
  const antes={rm:recursos.rm,pm:recursos.pm?.max,pd:recursos.pd?.max};
  if(Object.values(antes).some(v=>!Number.isSafeInteger(v)||v<0)) throw new Error('Confira os valores de PM, PD e RM.');
  const depois=Object.fromEntries(Object.keys(antes).map(k=>[k,antes[k]+g[k]]));
  if(Object.values(depois).some(v=>!Number.isSafeInteger(v))) throw new Error('Valor fora do limite.');
  return {level,xp,destino:level+1,custo:plano.total,saldo:plano.saldo,itens,antes,depois};
}

// Novas habilidades: cadastro manual, valor inicial zero e orçamento compartilhado.
export function novasHabilidades(rows, existentes) {
  const chave=s=>String(s).normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('pt-BR');
  const nomes=new Set(existentes.map(chave));
  return rows.map(r=>{
    const nome=String(r.nome??'').trim().replace(/\s+/g,' ');
    if(!nome||nome.length>120||nomes.has(chave(nome))||!['geral','carreira','feitico'].includes(r.categoria)||!Number.isInteger(r.aumento)||r.aumento<1||r.aumento>10) throw new Error('Nova habilidade inválida ou duplicada: '+nome);
    nomes.add(chave(nome));
    return {id:r.id,atual:0,aumento:r.aumento,nome,categoria:r.categoria};
  });
}
