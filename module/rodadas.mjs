import {transicao} from './incorporacao.mjs';
export function avancarIncorporacao(estado, anterior, atual){
 if(!Number.isInteger(anterior)||!Number.isInteger(atual)||atual<=anterior||!['preparando','ativo'].includes(estado?.fase))return null;
 let s=estado; for(let i=anterior;i<atual&&['preparando','ativo'].includes(s.fase);i++)s=transicao(s,'avancar'); return s;
}
export function recargaPendente(marca,combate){return !!marca&&!!combate&&marca.id===combate.id&&combate.round<=marca.rodada;}
export function registrarRodadas(){
 const anteriores=new Map();
 Hooks.on('preUpdateCombat',(c,m)=>{if(Object.hasOwn(m,'round')) anteriores.set(c.id,c.round);});
 Hooks.on('updateCombat',async(c,m,opts,userId)=>{
 if(!Object.hasOwn(m,'round'))return; const anterior=anteriores.get(c.id); anteriores.delete(c.id);
 if(!game.user.isGM||game.user.id!==userId||!c.started)return;
 const vistos=new Set();
 for(const combatente of c.combatants){const a=combatente.actor;if(!a||vistos.has(a.uuid))continue; vistos.add(a.uuid);
 try{const s=a.getFlag('odb-foundry14','incorporacao');const novo=avancarIncorporacao(s,anterior,c.round);if(novo)await a.setFlag('odb-foundry14','incorporacao',novo);}catch(err){console.error('ODB | Rodadas',err);ui.notifications.warn('ODB: confira a incorporação de '+a.name);}}
 });
}
