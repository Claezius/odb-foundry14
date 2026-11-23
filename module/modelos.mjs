/** Modelos de dados explícitos para Foundry VTT 14.
 * template.json não inicializa os dados de sistema nas versões modernas.
 */
const F = foundry.data.fields;
const base = {
  identidade: {jogador:'',sexo:'',idade:'',nivel:1,raca:'',profissao:'',classeSocial:'',altura:'',peso:''},
  atributos: Object.fromEntries(['forca','destreza','resistencia','inteligencia','sabedoria','carisma'].map(k=>[k,{racial:0,profissao:0,gastos:0,final:0}])),
  recursos: {pv:{value:0,max:0},pm:{value:0,max:0},pd:{value:0,max:0},bd:0,rm:0,vb:0,dinheiro:0,experiencia:0},
  combate: {defesa:0,resistencia:0,absorcaoCortante:0,absorcaoImpactante:0,condicoes:'',escudoNome:'',coleteNome:'',coleteResistencia:0,coleteCortante:0,coleteImpactante:0,extraNome:'',extraResistencia:0,extraCortante:0,extraImpactante:0}
};
base.atributos.sorte={gastos:0,final:0};
function campo(v) {
  if (typeof v === 'string') return new F.StringField({required:false,nullable:false,initial:v});
  if (typeof v === 'number') return new F.NumberField({required:false,nullable:true,initial:v});
  if (typeof v === 'boolean') return new F.BooleanField({required:false,nullable:false,initial:v});
  return new F.SchemaField(Object.fromEntries(Object.entries(v).map(([k,x])=>[k,campo(x)])));
}
export class ODBPersonagemData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...Object.fromEntries(Object.entries(base).map(([k,v])=>[k,campo(v)])),
      // Estruturas de extensão utilizadas pelos módulos complementares.
      magia:new F.ObjectField({required:false,initial:()=>({})}),
      criacao:new F.ObjectField({required:false,initial:()=>({})}),
      inventario:new F.ObjectField({required:false,initial:()=>({})}),
      aprendizado:new F.ObjectField({required:false,initial:()=>({})})
    };
  }
}

const itemDefaults = {
  habilidade: {descricao:'',categoria:'geral',atributoBase:'',pontosGastos:0,nivel:0,porcentagem:0},
  arma: {descricao:'',dano:'',alcance:'',municao:0,descarregada:false},
  equipamento: {descricao:'',peso:0,quantidade:1},
  feitico: {descricao:'',custo:0,duracao:'',porcentagem:0},
  encanto: {descricao:'',custo:0,duracao:'',porcentagem:0},
  item: {descricao:''}
};
export function registrarModelos() {
  CONFIG.Actor.dataModels.personagem = ODBPersonagemData;
  CONFIG.Actor.dataModels.npc = ODBPersonagemData;
  for (const [tipo, defaults] of Object.entries(itemDefaults)) {
    CONFIG.Item.dataModels[tipo] = class ODBItemData extends foundry.abstract.TypeDataModel {
      static defineSchema() {
        return Object.fromEntries(Object.entries(defaults).map(([k,v])=>[k,campo(v)]));
      }
    };
  }
}
