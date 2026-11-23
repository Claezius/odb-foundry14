import {ORIXAS} from './escolas.mjs';
export const sacerdote = p => String(p).trim().toLowerCase()==='sacerdote negro';
export function transicao(estado,acao,nome,pd,dado){
 const s=estado??{fase:'livre',rodadas:0};
 if(acao==='avancar'){
  if(s.fase==='preparando')return {...s,fase:'ativo'};
  if(s.fase==='ativo')return {...s,rodadas:s.rodadas-1,fase:s.rodadas===1?'decisao':'ativo'};
  throw Error('Não há rodada de incorporação a avançar');
 }
 if(acao==='encerrar'){if(s.fase!=='decisao')throw Error('Aguarde o fim da duração');return {fase:'livre',rodadas:0};}
 if(!['iniciar','manter'].includes(acao)||!['livre','decisao'].includes(s.fase))throw Error('Incorporação ainda em curso');
 if(acao==='manter'){if(s.fase!=='decisao')throw Error('Não há incorporação a renovar');nome=s.nome;}
 if(!Object.hasOwn(ORIXAS,nome)||!Number.isInteger(dado)||dado<1||dado>6)throw Error('Orixá ou dado inválido');
 const custo=ORIXAS[nome][0];if(!Number.isInteger(pd)||pd<custo)throw Error('PD insuficiente');
 return {fase:acao==='manter'||(s.fase==='decisao'&&s.nome===nome)?'ativo':'preparando',nome,rodadas:dado+2,custo};
}
export function encantoPermitido(s,nome,valor){return s?.fase==='ativo'&&s.rodadas>0&&valor>0&&!!ORIXAS[s.nome]?.[1].split('|').some(n=>n.toLowerCase()===String(nome).toLowerCase());}
