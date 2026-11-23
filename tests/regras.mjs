import assert from 'node:assert/strict';
import {custoAprendizado,testeAprendizado,ganhosPoder,prepararPassagem,planoAprendizado} from '../module/aprendizado.mjs';
import {personagem} from '../module/criacao.mjs';
import {gastoMagia,recuperarPoder} from '../module/magia.mjs';
import {dadosConfronto,protecao} from '../module/combate.mjs';
assert.equal(custoAprendizado(59,2).custo,3);
assert.equal(testeAprendizado(50,1,50).estado,'falha');
assert.equal(testeAprendizado(50,1,51).estado,'sucesso');
assert.equal(planoAprendizado(1,10,[]).ok,false);
assert.deepEqual(ganhosPoder('pm',2,6),{rm:0,pm:9,pd:0});
const p=prepararPassagem(1,11,[{id:'a',atual:30,aumento:10}],{}, {tipo:null,dadoRM:6},'Guerreiro',{rm:20,pm:{max:0},pd:{max:0}});
assert.equal(p.destino,2);assert.equal(p.xp,11);assert.equal(p.depois.rm,23);
const a=personagem('Índios','Rastreador',[4,6,5,4,4,3,3]);assert.equal(a.atributos.destreza.final,18);assert.equal(a.atributos.forca.final,13);
assert.equal(gastoMagia(5,10,3,12).recurso,2);assert.equal(recuperarPoder(8,10),10);
assert.equal(dadosConfronto(51,51),2);assert.equal(protecao(5,'impactante','corpo',0,0).corpo,5);
console.log('Testes de regressão aprovados.');
import {habilidadesIniciais} from '../module/criacao.mjs';
import {readFileSync} from 'node:fs';
const hs=JSON.parse(readFileSync(new URL('../data/habilidades.json',import.meta.url)));
for(const prof of ['Guerreiro','Rastreador','Ladrão']){
 const x=personagem('Índios',prof,[4,6,5,4,4,3,3]);
 const c=hs.filter(h=>h.nome!=='Esquiva'&&h.carreiras.includes(prof)).slice(0,5).map(h=>({nome:h.nome,pontos:20}));
 const g=hs.filter(h=>!h.carreiras.includes(prof)&&h.nome!=='Esquiva').slice(0,3).map((h,i)=>({nome:h.nome,pontos:i===2?10:20}));
 const result=habilidadesIniciais(prof,x.atributos,hs,[...c,...g]);
 assert.equal(result.reduce((s,i)=>s+i.system.pontosGastos,0),170);
 assert.throws(()=>habilidadesIniciais(prof,x.atributos,hs,c));
 assert.throws(()=>habilidadesIniciais(prof,x.atributos,hs,[...c,...g,c[0]]));
 assert.throws(()=>habilidadesIniciais(prof,x.atributos,hs,[...c,...g,{nome:'Esquiva',pontos:1}]));
 assert.throws(()=>habilidadesIniciais(prof,x.atributos,hs,[{...c[0],pontos:21},...c.slice(1),...g]));
}
console.log('Distribuição inicial: testes aprovados.');
import {ESCOLAS,catalogoInicial} from '../module/escolas.mjs';
const fs=JSON.parse(readFileSync(new URL('../data/feiticos.json',import.meta.url)));
for(const prof of Object.keys(ESCOLAS)){
 const x=personagem('Índios',prof,[4,6,5,4,4,3,3]);const cat=catalogoInicial(prof,hs,fs);
 const c=cat.filter(h=>h.magia).slice(0,5).map(h=>({nome:h.nome,pontos:20}));
 const g=cat.filter(h=>!h.carreiras.includes(prof)&&h.nome!=='Esquiva').slice(0,3).map((h,i)=>({nome:h.nome,pontos:i===2?10:20}));
 const result=habilidadesIniciais(prof,x.atributos,cat,[...c,...g]);assert.equal(result.filter(i=>i.type==='feitico').length,5);assert.equal(result.find(i=>i.type==='feitico').system.porcentagem,20+x.atributos[prof==='Jesuíta'||prof==='Sacerdote negro'?'sabedoria':'inteligencia'].final);assert.throws(()=>habilidadesIniciais(prof,x.atributos,cat,[...c,...g,{nome:'não permitido',pontos:1}]));
}
console.log('Seis escolas: testes aprovados.');
for(const nomes of Object.values(ESCOLAS))for(const nome of nomes)assert.ok(fs.some(f=>f.name.toLowerCase()===nome.toLowerCase()),nome);
assert.equal(new Set(fs.map(f=>f.name.toLowerCase())).size,fs.length);
console.log('Cobertura e unicidade do catálogo aprovadas: '+fs.length);
import {transicao,encantoPermitido} from '../module/incorporacao.mjs';
import {ORIXAS} from '../module/escolas.mjs';
for(const [nome,[custo,encantos]] of Object.entries(ORIXAS)){
 let s=transicao(null,'iniciar',nome,custo,5);assert.equal(s.rodadas,7);assert.equal(s.custo,custo);assert.equal(s.fase,'preparando');assert.throws(()=>transicao(null,'iniciar',nome,custo-1,5));assert.throws(()=>transicao(s,'encerrar'));assert.equal(encantoPermitido(s,encantos.split('|')[0],20),false);s=transicao(s,'avancar');assert.ok(encantoPermitido(s,encantos.split('|')[0],20));assert.ok(!encantoPermitido(s,'inexistente',20));assert.ok(!encantoPermitido(s,encantos.split('|')[0],0));for(let i=0;i<7;i++)s=transicao(s,'avancar');assert.equal(s.fase,'decisao');assert.equal(transicao(s,'manter',nome,custo,1).fase,'ativo');assert.equal(transicao(s,'encerrar').fase,'livre');
}
console.log('15 orixás: testes aprovados.');
import {planoDano,PROTECOES} from '../module/combate.mjs';
assert.deepEqual(planoDano(16,5,'cortante','colete',10,2),{corpo:0,desgaste:3,pvAntes:16,pvDepois:16,resDepois:7});
assert.equal(planoDano(16,5,'impactante','colete',10,4).pvDepois,15);
assert.equal(planoDano(16,5,'magico','colete',10,4).pvDepois,11);
assert.equal(planoDano(2,8,'cortante','corpo',0,0).pvDepois,-6);
assert.equal(PROTECOES.escudo.res,12);
console.log('Aplicação de dano: testes aprovados.');

import {prepararDisparo,prepararRecarga} from '../module/municao.mjs';
assert.deepEqual(prepararDisparo('Pistola',2,false),{municao:1,descarregada:true});
assert.deepEqual(prepararDisparo('Arco',1,false),{municao:0,descarregada:false});
assert.deepEqual(prepararRecarga('Mosquete',1,true),{descarregada:false});
assert.throws(()=>prepararDisparo('Pistola',1,true));
assert.throws(()=>prepararDisparo('Arco',0,false));
assert.throws(()=>prepararRecarga('Arco',1,true));
import {transferirMunicao,pesoTotal} from '../module/inventario.mjs';
const arma={name:'Mosquete',system:{municao:2}},fonte={name:'Pólvora, balas e chumbo (10 disparos)',system:{quantidade:2,peso:0.5}};
assert.deepEqual(transferirMunicao(arma,fonte),{quantidade:1,municao:12});
assert.throws(()=>transferirMunicao({name:'Arco',system:{municao:0}},fonte));
assert.throws(()=>transferirMunicao(arma,{...fonte,system:{quantidade:0}}));
assert.equal(pesoTotal([fonte]),1);
console.log('Inventário: testes aprovados.');

import {criatura as gerarCriatura} from '../module/criacao.mjs';
import {readFileSync as lerBestiario} from 'node:fs';
const criaturasRC14=JSON.parse(lerBestiario(new URL('../data/bestiario.json',import.meta.url),'utf8'));
for(const c of criaturasRC14){const a=gerarCriatura(c,c.medio);assert.equal(a.system.identidade.nivel,c.medio);assert.equal(a.items[0].system.porcentagem,c.hle+10*(c.medio-1));assert.equal(a.items[1].system.porcentagem,c.hle+10*(c.medio-1));assert.throws(()=>gerarCriatura(c,0));assert.throws(()=>gerarCriatura(c,1.5));if(c.maximo!==null)assert.throws(()=>gerarCriatura(c,c.maximo+1));}
console.log(`Progressão de ${criaturasRC14.length} registros: testes aprovados.`);
assert.equal(criaturasRC14.length,81);
assert.equal(new Set(criaturasRC14.map(c=>c.nome)).size,81);
assert.equal(gerarCriatura(criaturasRC14.find(c=>c.nome==='Curupira')).system.recursos.pm.max,50);
assert.match(gerarCriatura(criaturasRC14.find(c=>c.nome==='Boitatá')).system.combate.condicoes,/três rodadas/);
import {avancarIncorporacao,recargaPendente} from '../module/rodadas.mjs';
assert.equal(avancarIncorporacao({fase:'preparando',rodadas:3},1,2).fase,'ativo');
assert.equal(avancarIncorporacao({fase:'ativo',rodadas:3},2,5).fase,'decisao');
assert.equal(avancarIncorporacao({fase:'ativo',rodadas:3},3,2),null);
assert.equal(recargaPendente({id:'a',rodada:2},{id:'a',round:2}),true);
assert.equal(recargaPendente({id:'a',rodada:2},{id:'a',round:3}),false);
console.log('Rodadas: testes aprovados.');

import {estadoPV,repouso,formulaVeneno} from "../module/condicoes.mjs";
assert.equal(estadoPV(-8),"Morto");assert.equal(estadoPV(-3),"Inconsciente");assert.equal(repouso(14,16),16);assert.throws(()=>repouso(-8,16));assert.equal(formulaVeneno("Curare",2),"(1d6+2)*2");assert.equal(formulaVeneno("Sapo comum",2),"0");
import {quadro,DOENCAS} from '../module/doencas.mjs';
assert.equal(Object.keys(DOENCAS).length,5);assert.equal(quadro('Chagas',5).dano,'1d6+1');assert.equal(quadro('Doença do Sono',15).sintomas,'Morte');assert.equal(quadro('Febre do Sertão',22).sintomas,'Morte');assert.equal(quadro('Loucura do Sertão',6).dano,'2d6');assert.equal(quadro('Raiva',10).dano,'1d6+3');assert.throws(()=>quadro('Raiva',0));console.log('Doenças RC18: testes aprovados.');

import {danoLocalizado,dificuldadeLocalizada,CATALOGO_ARMAS,classeGolpe} from '../module/combate.mjs';
assert.equal(CATALOGO_ARMAS.length,18);assert.equal(new Set(CATALOGO_ARMAS.map(a=>a[0])).size,18);assert.equal(danoLocalizado(5,'garganta'),20);assert.equal(danoLocalizado(5,'cabeca'),10);assert.equal(danoLocalizado(5,'tronco'),5);assert.equal(dificuldadeLocalizada('garganta'),.25);assert.throws(()=>danoLocalizado(5,'olho'));for(const [n,f,m] of [[1,1,20],[2,4,38],[3,9,54],[4,16,68]]){assert.equal(classeGolpe(n,f),'falha');assert.equal(classeGolpe(n,m),'mestre');}console.log('RC19: catálogo e ataques localizados aprovados.');

// RC24: piso zero no resultado de dano, sem alterar incubação.
const {formulaDanoDoenca} = await import('../module/doencas.mjs');
for (const [entrada,esperada] of [['1d6-2','{1d6-2,0}kh1'],['1d6-1','{1d6-1,0}kh1'],['0','0'],['2d6','2d6'],['1d6+3','1d6+3']]) {
 if(formulaDanoDoenca(entrada)!==esperada) throw Error('RC24: fórmula incorreta');
}
assert.deepEqual(CATALOGO_ARMAS.find(a=>a[0]==='Arcabuz'),['Arcabuz','3d6',200,20000]);
assert.ok(!CATALOGO_ARMAS.some(a=>a[0]==='Mosquete'));
assert.deepEqual(prepararDisparo('Arcabuz',2,false),{municao:1,descarregada:true});
assert.deepEqual(prepararRecarga('Arcabuz',1,true),{descarregada:false});
