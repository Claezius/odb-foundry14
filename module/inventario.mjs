import {tipoMunicao} from './municao.mjs';
const normal=n=>String(n).normalize('NFD').replace(/\p{Diacritic}/gu,'').trim().toLowerCase();
export function unidadesMunicao(nome){const n=normal(nome);return n==='flechas (unidade)'?{tipo:'flecha',unidades:1}:n==='polvora, balas e chumbo (10 disparos)'?{tipo:'fogo',unidades:10}:null;}
export function transferirMunicao(arma,fonte){const m=unidadesMunicao(fonte.name),q=Number(fonte.system.quantidade),r=Number(arma.system.municao);if(!m||m.tipo!==tipoMunicao(arma.name))throw Error('Munição incompatível.');if(!Number.isSafeInteger(q)||q<1||!Number.isSafeInteger(r)||r<0||!Number.isSafeInteger(r+m.unidades))throw Error('Quantidade ou reserva inválida.');return {quantidade:q-1,municao:r+m.unidades};}
export function pesoTotal(itens){return itens.reduce((total,i)=>{const p=Number(i.system.peso),q=Number(i.system.quantidade);return total+(Number.isFinite(p)&&p>=0&&Number.isSafeInteger(q)&&q>=0?p*q:0);},0);}
