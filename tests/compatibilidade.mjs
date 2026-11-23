import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const template=read('template.json'),manifest=read('system.json');
class Field {constructor(options={}){this.options=options;}}
class SchemaField extends Field {constructor(schema){super();this.schema=schema;}}
globalThis.foundry={data:{fields:{StringField:Field,NumberField:Field,BooleanField:Field,ObjectField:Field,SchemaField}},abstract:{TypeDataModel:class{}}};
globalThis.CONFIG={Actor:{dataModels:{}},Item:{dataModels:{}}};
const {registrarModelos}=await import('../module/modelos.mjs');
registrarModelos();
function verify(data,schema,prefix){
 for(const [key,value] of Object.entries(data)){
  const field=schema[key];
  assert.ok(field,'Campo não declarado: '+prefix+'.'+key);
  if(value!==null&&typeof value==='object'&&!Array.isArray(value)){
   assert.ok(field instanceof SchemaField,'Objeto sem SchemaField: '+prefix+'.'+key);
   verify(value,field.schema,prefix+'.'+key);
  }
 }
}
function verifyDefaults(data,schema,prefix){
 for(const [key,value] of Object.entries(data)){
  const field=schema[key];
  assert.ok(field,'Campo ausente: '+prefix+'.'+key);
  if(value!==null&&typeof value==='object'&&!Array.isArray(value)){
   assert.ok(field instanceof SchemaField,'Objeto não estruturado: '+prefix+'.'+key);
   verifyDefaults(value,field.schema,prefix+'.'+key);
  }else{
   assert.deepEqual(field.options.initial,value,'Valor inicial divergente: '+prefix+'.'+key);
  }
 }
}
for(const type of template.Actor.types){
 const schema=CONFIG.Actor.dataModels[type].defineSchema();
 verify(template.Actor.templates.base,schema,'Actor.'+type);
 verifyDefaults(template.Actor.templates.base,schema,'Actor.'+type);
 const pv=schema.recursos.schema.pv.schema;
 assert.equal(pv.value.options.initial,template.Actor.templates.base.recursos.pv.value,'PV inicial divergente');
 assert.equal(pv.max.options.initial,template.Actor.templates.base.recursos.pv.max,'PV máximo inicial divergente');
}
for(const type of template.Item.types){
 const fields=Object.fromEntries(Object.entries(template.Item[type]).filter(([key])=>key!=='templates'));
 verify({...template.Item.templates.base,...fields},CONFIG.Item.dataModels[type].defineSchema(),'Item.'+type);
 verifyDefaults({...template.Item.templates.base,...fields},CONFIG.Item.dataModels[type].defineSchema(),'Item.'+type);
}
for(const [kind,types] of Object.entries(manifest.documentTypes)){
 const models=CONFIG[kind].dataModels;
 for(const type of Object.keys(types))assert.ok(models[type],kind+'.'+type+' não registrado');
}
for(const file of ['equipamentos','feiticos']){
 for(const [i,doc] of read('data/'+file+'.json').entries()){
  const schema=CONFIG.Item.dataModels[doc.type]?.defineSchema();
  assert.ok(schema,'Tipo não registrado: '+file+'['+i+']');
  verify(doc.system??{},schema,file+'['+i+'].system');
 }
}
// Garante que todos os caminhos literais da ficha clássica tenham suporte no esquema.
const sheet=fs.readFileSync(new URL('module/actor-sheet.mjs',root),'utf8');
const actorSchema=CONFIG.Actor.dataModels.personagem.defineSchema();
const itemSchemas=Object.fromEntries(Object.entries(CONFIG.Item.dataModels).map(([type,Model])=>[type,Model.defineSchema()]));
function hasPath(schema,path){
 let field;
 for(const segment of path.split('.')){
  field=schema?.[segment];
  if(!field)return false;
  schema=field instanceof SchemaField?field.schema:null;
 }
 return true;
}
const actorPaths=[...new Set([...sheet.matchAll(/system\\.(identidade|atributos|recursos|combate)\\.[a-zA-Z][\\w.]*/g)].map(m=>m[0].slice(7).replace(/\\.$/,'')))];
for(const path of actorPaths){
 // Referências a objetos inteiros também são válidas.
 assert.ok(hasPath(actorSchema,path),'Caminho da ficha ausente no modelo Actor: system.'+path);
}
const itemFields=[...new Set([...sheet.matchAll(/item\\.system\\.([a-zA-Z]\\w*)/g)].map(m=>m[1]))];
for(const field of itemFields){
 assert.ok(Object.values(itemSchemas).some(schema=>schema[field]),'Campo Item não declarado: '+field);
}
console.log('Compatibilidade RC30: template, manifesto e catálogos cobertos por esquemas (verificação estática).');
