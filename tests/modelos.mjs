import assert from 'node:assert/strict';
class Field { constructor(options={}) {this.options=options;} }
class SchemaField extends Field {constructor(schema){super();this.schema=schema;}}
globalThis.foundry={data:{fields:{StringField:Field,NumberField:Field,BooleanField:Field,ObjectField:Field,SchemaField}},abstract:{TypeDataModel:class{}}};
globalThis.CONFIG={Actor:{dataModels:{}},Item:{dataModels:{}}};
const {registrarModelos}=await import('../module/modelos.mjs');
registrarModelos();
for (const tipo of ['personagem','npc']) {
 const schema=CONFIG.Actor.dataModels[tipo].defineSchema();
 for (const chave of ['identidade','atributos','recursos','combate']) assert.ok(schema[chave]);
 assert.ok(schema.identidade.schema.jogador);
 assert.ok(schema.recursos.schema.pv.schema.value);
}
for (const tipo of ['habilidade','arma','equipamento','feitico','encanto','item']) assert.ok(CONFIG.Item.dataModels[tipo].defineSchema());
console.log('Modelos Foundry 14: estrutura e tipos aprovados em simulação.');
