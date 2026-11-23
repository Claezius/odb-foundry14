import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CATALOGO_ARMAS} from '../module/combate.mjs';
import {registrosAusentes,chaveCatalogo} from '../module/deduplicacao.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const conjuntos=[
  ['habilidades',71,'nome'],
  ['equipamentos',66,'name'],
  ['feiticos',76,'name'],
  ['bestiario',81,'nome']
];
for(const [arquivo,total,campo] of conjuntos){
  const docs=read('data/'+arquivo+'.json');
  assert.equal(docs.length,total,arquivo+': quantidade');
  assert.ok(docs.every(d=>typeof d[campo]==='string'&&chaveCatalogo(d[campo])),arquivo+': nomes válidos');
  assert.equal(new Set(docs.map(d=>chaveCatalogo(d[campo]))).size,total,arquivo+': nomes normalizados únicos');
  assert.deepEqual(registrosAusentes(docs.map(d=>({name:d[campo]})),docs.map(d=>({name:d[campo]}))),[],arquivo+': importação repetida');
}
const habilidades=read('data/habilidades.json');
assert.ok(habilidades.every(h=>typeof h.atributo==='string'&&h.atributo.trim()&&Array.isArray(h.carreiras)), 'Habilidades: atributo e carreiras');
const equipamentos=read('data/equipamentos.json');
assert.ok(equipamentos.every(e=>e.type==='equipamento'&&e.system&&typeof e.system==='object'),'Equipamentos: tipo e system');
const feiticos=read('data/feiticos.json');
assert.ok(feiticos.every(f=>['feitico','encanto'].includes(f.type)&&f.system&&Number.isFinite(f.system.custo)&&f.system.custo>=0),'Feitiços: tipo e custo');
const bestiario=read('data/bestiario.json');
assert.ok(bestiario.every(c=>Number.isSafeInteger(c.medio)&&c.medio>=1&&(c.maximo===null||Number.isSafeInteger(c.maximo)&&c.maximo>=c.medio)),'Bestiário: faixa de nível');
assert.equal(CATALOGO_ARMAS.length,18);
assert.equal(new Set(CATALOGO_ARMAS.map(a=>chaveCatalogo(a[0]))).size,18,'Armas: nomes únicos');
assert.equal(conjuntos.reduce((s,[,n])=>s+n,0)+CATALOGO_ARMAS.length,312);
console.log('Auditoria estrutural: 312 registros, nomes normalizados e campos essenciais aprovados.');
