import assert from 'node:assert/strict';
import {gastoMagia, alvoMagia, recuperarPoder} from '../module/magia.mjs';
import {transicao, encantoPermitido} from '../module/incorporacao.mjs';
import {custoAprendizado, planoAprendizado, testeAprendizado, prepararPassagem} from '../module/aprendizado.mjs';

// Casos extremos: preservam o comportamento da RC30 sem redefinir regras do livro.
assert.deepEqual(gastoMagia(3,10,3,12),{recurso:0,pv:12});
assert.throws(()=>gastoMagia(2,10,3,12),/Saldo insuficiente/);
assert.throws(()=>gastoMagia(0,10,3,0,true),/Saldo insuficiente/);
assert.deepEqual(gastoMagia(0,10,3,12,true),{recurso:0,pv:6});
assert.throws(()=>gastoMagia(11,10,1,12),/Confira os recursos/);
assert.throws(()=>gastoMagia(1,10,-1,12),/Confira os recursos/);
assert.equal(recuperarPoder(10,10),10);
assert.throws(()=>recuperarPoder(-1,10),/Recurso inválido/);
assert.equal(alvoMagia(40,'dificil'),20);
assert.throws(()=>alvoMagia(40,'inexistente'),/inválidos/);

assert.throws(()=>transicao(null,'iniciar','inexistente',99,4),/Orixá ou dado inválido/);
assert.throws(()=>transicao(null,'iniciar','Oxalá',99,0),/Orixá ou dado inválido/);
assert.equal(encantoPermitido(null,'Qualquer',50),false);

assert.equal(custoAprendizado(50,0).custo,0);
assert.throws(()=>custoAprendizado(50,11),/inválido/);
assert.equal(planoAprendizado(1,10,[]).ok,false);
assert.equal(testeAprendizado(50,1,50).estado,'falha');
assert.equal(testeAprendizado(50,1,51).estado,'sucesso');
assert.throws(()=>testeAprendizado(50,1,101),/d100 inválido/);
assert.throws(()=>prepararPassagem(1,10,[],{},null,'Guerreiro',{}),/Mudança de nível/);

console.log('Auditoria de limites: magia, incorporação e evolução aprovadas.');
