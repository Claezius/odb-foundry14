import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {CATALOGO_ARMAS} from '../module/combate.mjs';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(readFileSync(new URL(p,root),'utf8'));
const manifest=read('system.json'),pkg=read('package.json'),template=read('template.json');
assert.equal(manifest.id,'odb-foundry14');assert.equal(manifest.version,pkg.version);assert.equal(manifest.compatibility.minimum,'14');
for(const p of [...manifest.esmodules,...manifest.styles,...manifest.languages.map(x=>x.path),...manifest.packs.map(x=>x.path)])assert.ok(existsSync(new URL(p,root)),p);
assert.deepEqual(manifest.packs.map(p=>p.name).sort(),['armas','bestiario','equipamentos','feiticos','habilidades']);
assert.deepEqual(template.Actor.types.sort(),['npc','personagem']);
for(const [file,count,key] of [['habilidades',71,'nome'],['equipamentos',66,'name'],['feiticos',76,'name'],['bestiario',81,'nome']]){const records=read(`data/${file}.json`);assert.equal(records.length,count);assert.ok(records.every(x=>typeof x[key]==='string'&&x[key].trim()));assert.equal(new Set(records.map(x=>x[key].trim().toLocaleLowerCase('pt-BR'))).size,count);console.log(`${file}: ${count} nomes únicos.`);}
assert.equal(CATALOGO_ARMAS.length,18);
for(const dir of ['module','tests'])for(const f of readdirSync(new URL(dir+'/',root)))if(f.endsWith('.mjs'))execFileSync(process.execPath,['--check',new URL(`${dir}/${f}`,root).pathname]);
console.log('Manifesto, caminhos, catálogos e sintaxe: aprovados.');

assert.ok(template.Item.types.includes("encanto"));
assert.deepEqual(template.Item.encanto,template.Item.feitico);
assert.equal(read("lang/pt-BR.json").TYPES.Item.encanto,"Encanto");
for(const file of ["equipamentos","feiticos"]) for(const doc of read(`data/${file}.json`)) assert.ok(template.Item.types.includes(doc.type),doc.name);
console.log("Tipos de itens e compatibilidade encanto: aprovados.");
