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
for(const type of template.Actor.types)verify(template.Actor.templates.base,CONFIG.Actor.dataModels[type].defineSchema(),'Actor.'+type);
for(const type of template.Item.types){
 const fields=Object.fromEntries(Object.entries(template.Item[type]).filter(([key])=>key!=='templates'));
 verify({...template.Item.templates.base,...fields},CONFIG.Item.dataModels[type].defineSchema(),'Item.'+type);
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
console.log('Compatibilidade RC30: template, manifesto e catálogos cobertos por esquemas (verificação estática).');
