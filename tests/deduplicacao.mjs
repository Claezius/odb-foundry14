import assert from 'node:assert/strict';
import {registrosAusentes, chaveCatalogo} from '../module/deduplicacao.mjs';

assert.equal(chaveCatalogo('  ESPADA  '),'espada');
assert.equal(chaveCatalogo('Feitiço'),chaveCatalogo('Feitiço'));
const existentes=[{name:'Espada'},{name:' Feitiço '}];
const novos=[{name:'espada'},{name:'ESPADA '},{name:'Feitiço'},{name:'Arco'},{name:' arco '},{name:'Machado'}];
assert.deepEqual(registrosAusentes(existentes,novos).map(x=>x.name),['Arco','Machado']);
assert.deepEqual(registrosAusentes([], [{name:'A'},{name:'a'},{name:'  '},{name:'B'}]).map(x=>x.name),['A','B']);
assert.deepEqual(registrosAusentes([{name:'A'}],[{name:'a'}]),[]);
console.log('Compêndios: deduplicação normalizada aprovada.');
