import {instalarDoencas} from "./doencas.mjs";
import {instalarCondicoes} from "./condicoes.mjs";
import {recargaPendente} from './rodadas.mjs';
import {unidadesMunicao, transferirMunicao, pesoTotal} from './inventario.mjs';
import {tipoMunicao, prepararDisparo, prepararRecarga} from './municao.mjs';
import {disparo} from './combate.mjs';
import {ORIXAS} from './escolas.mjs';
import {sacerdote,transicao,encantoPermitido} from './incorporacao.mjs';
import { instalarCatalogos, instalarCriaturas } from "./catalogos.mjs";
import { instalarCombate } from "./painel-combate.mjs";
import { alvoMagia, gastoMagia, recuperarPoder } from "./magia.mjs";
import { XP_THRESHOLDS, xpStatus, planoAprendizado, testeAprendizado, tipoPoder, ganhosPoder, prepararPassagem, novasHabilidades } from "./aprendizado.mjs";
function exportarJSON(data, name) {
  const save = foundry.utils?.saveDataToFile ?? globalThis.saveDataToFile;
  if (typeof save !== "function") throw new Error("Exportação nativa indisponível. Abra o mundo pelo navegador.");
  return save(JSON.stringify(data,null,2), "application/json", name);
}
const SYSTEM_ID = "odb-foundry14";
const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;
const POSITIONS = [{"path":"name","x":6.1696,"y":7.15,"w":33.8848,"h":1.3,"kind":"text","label":"Nome do personagem"},{"path":"system.identidade.jogador","x":42.7581,"y":7.15,"w":23.3379,"h":1.3,"kind":"text","label":"jogador"},{"path":"system.identidade.sexo","x":67.1071,"y":7.15,"w":9.666,"h":1.3,"kind":"text","label":"sexo"},{"path":"system.identidade.idade","x":79.3467,"y":7.15,"w":6.6712,"h":1.3,"kind":"text","label":"idade"},{"path":"system.identidade.nivel","x":88.331,"y":7.15,"w":5.3692,"h":1.3,"kind":"number","label":"nivel"},{"path":"system.identidade.raca","x":6.2998,"y":11.17,"w":17.9994,"h":1.3,"kind":"text","label":"raca"},{"path":"system.identidade.profissao","x":26.0915,"y":11.17,"w":19.1712,"h":1.3,"kind":"text","label":"profissao"},{"path":"system.identidade.classeSocial","x":47.1852,"y":11.17,"w":24.7702,"h":1.3,"kind":"text","label":"classeSocial"},{"path":"system.identidade.altura","x":73.8779,"y":11.17,"w":9.5358,"h":1.3,"kind":"text","label":"altura"},{"path":"system.identidade.peso","x":85.3362,"y":11.17,"w":8.4942,"h":1.55,"kind":"text","label":"peso"},{"path":"system.atributos.forca.racial","x":17.5833,"y":17.4323,"w":3.5833,"h":2.5324,"kind":"number","label":"forca racial"},{"path":"system.atributos.forca.profissao","x":26.8333,"y":17.4323,"w":3.5833,"h":2.5324,"kind":"number","label":"forca profissao"},{"path":"system.atributos.forca.gastos","x":36.0,"y":17.4323,"w":3.5833,"h":2.5324,"kind":"number","label":"forca gastos"},{"path":"system.atributos.forca.final","x":44.3333,"y":17.1378,"w":4.4167,"h":3.1213,"kind":"number","label":"forca final"},{"path":"system.atributos.destreza.racial","x":17.5833,"y":21.4959,"w":3.5833,"h":2.5324,"kind":"number","label":"destreza racial"},{"path":"system.atributos.destreza.profissao","x":26.8333,"y":21.4959,"w":3.5833,"h":2.5324,"kind":"number","label":"destreza profissao"},{"path":"system.atributos.destreza.gastos","x":36.0,"y":21.4959,"w":3.5833,"h":2.5324,"kind":"number","label":"destreza gastos"},{"path":"system.atributos.destreza.final","x":44.3333,"y":21.2014,"w":4.4167,"h":3.1213,"kind":"number","label":"destreza final"},{"path":"system.atributos.resistencia.racial","x":17.5833,"y":25.3828,"w":3.5833,"h":2.6502,"kind":"number","label":"resistencia racial"},{"path":"system.atributos.resistencia.profissao","x":26.8333,"y":25.3828,"w":3.5833,"h":2.6502,"kind":"number","label":"resistencia profissao"},{"path":"system.atributos.resistencia.gastos","x":36.0,"y":25.3828,"w":3.5833,"h":2.6502,"kind":"number","label":"resistencia gastos"},{"path":"system.atributos.resistencia.final","x":44.3333,"y":25.2061,"w":4.4167,"h":3.1213,"kind":"number","label":"resistencia final"},{"path":"system.atributos.inteligencia.racial","x":17.5833,"y":29.4464,"w":3.5833,"h":2.5324,"kind":"number","label":"inteligencia racial"},{"path":"system.atributos.inteligencia.profissao","x":26.8333,"y":29.4464,"w":3.5833,"h":2.5324,"kind":"number","label":"inteligencia profissao"},{"path":"system.atributos.inteligencia.gastos","x":36.0,"y":29.4464,"w":3.5833,"h":2.5324,"kind":"number","label":"inteligencia gastos"},{"path":"system.atributos.inteligencia.final","x":44.3333,"y":29.1519,"w":4.4167,"h":3.1213,"kind":"number","label":"inteligencia final"},{"path":"system.atributos.sabedoria.racial","x":17.5833,"y":33.4511,"w":3.5833,"h":2.5324,"kind":"number","label":"sabedoria racial"},{"path":"system.atributos.sabedoria.profissao","x":26.8333,"y":33.4511,"w":3.5833,"h":2.5324,"kind":"number","label":"sabedoria profissao"},{"path":"system.atributos.sabedoria.gastos","x":36.0,"y":33.4511,"w":3.5833,"h":2.5324,"kind":"number","label":"sabedoria gastos"},{"path":"system.atributos.sabedoria.final","x":44.3333,"y":33.1567,"w":4.4167,"h":3.1213,"kind":"number","label":"sabedoria final"},{"path":"system.atributos.carisma.racial","x":17.5833,"y":37.4558,"w":3.5833,"h":2.5913,"kind":"number","label":"carisma racial"},{"path":"system.atributos.carisma.profissao","x":26.8333,"y":37.4558,"w":3.5833,"h":2.5913,"kind":"number","label":"carisma profissao"},{"path":"system.atributos.carisma.gastos","x":36.0,"y":37.4558,"w":3.5833,"h":2.5913,"kind":"number","label":"carisma gastos"},{"path":"system.atributos.carisma.final","x":44.3333,"y":37.2203,"w":4.4167,"h":3.1213,"kind":"number","label":"carisma final"},{"path":"system.atributos.sorte.gastos","x":36.0,"y":41.4605,"w":3.6667,"h":2.5913,"kind":"number","label":"sorte gastos"},{"path":"system.atributos.sorte.final","x":44.3333,"y":41.225,"w":4.4167,"h":3.1213,"kind":"number","label":"sorte final"},{"path":"system.recursos.pv.max","x":64.8333,"y":15.1943,"w":5.4167,"h":3.1802,"kind":"number","label":"recursos.pv.max"},{"path":"system.recursos.pm.max","x":64.8333,"y":19.4346,"w":2.9167,"h":2.2379,"kind":"number","label":"recursos.pm.max"},{"path":"system.recursos.pm.value","x":68.5,"y":19.4346,"w":3.0,"h":2.2379,"kind":"number","label":"recursos.pm.value"},{"path":"system.recursos.pd.max","x":86.5833,"y":19.4346,"w":3.0,"h":2.2379,"kind":"number","label":"recursos.pd.max"},{"path":"system.recursos.pd.value","x":90.3333,"y":19.4346,"w":3.0,"h":2.2379,"kind":"number","label":"recursos.pd.value"},{"path":"system.recursos.bd","x":64.8333,"y":23.616,"w":5.4167,"h":3.1802,"kind":"number","label":"recursos.bd"},{"path":"system.recursos.rm","x":88.5,"y":23.616,"w":5.4167,"h":3.1802,"kind":"number","label":"recursos.rm"},{"path":"system.recursos.vb","x":64.8333,"y":28.12,"w":9.0833,"h":1.05,"kind":"number","label":"Velocidade básica (andando)"},{"path":"system.recursos.dinheiro","x":64.8333,"y":32.0377,"w":5.4167,"h":3.1802,"kind":"number","label":"recursos.dinheiro"},{"path":"system.recursos.experiencia","x":88.5833,"y":32.0377,"w":5.4167,"h":3.1802,"kind":"number","label":"recursos.experiencia"},{"path":"system.combate.resistencia","x":69.0833,"y":38.2214,"w":1.9167,"h":1.4134,"kind":"number","label":"Resistência do escudo"},{"path":"system.combate.absorcaoCortante","x":82.4167,"y":37.927,"w":5.5833,"h":2.0612,"kind":"number","label":"combate.absorcaoCortante"},{"path":"system.combate.absorcaoImpactante","x":88.3333,"y":37.927,"w":5.6667,"h":2.0612,"kind":"number","label":"combate.absorcaoImpactante"},{"path":"system.combate.escudoNome","x":51.5,"y":37.927,"w":16.8,"h":2.0612,"kind":"text","label":"Escudo"},{"path":"system.combate.coleteNome","x":51.5,"y":40.12,"w":16.8,"h":2.0612,"kind":"text","label":"Colete"},{"path":"system.combate.coleteResistencia","x":69.0833,"y":40.5183,"w":1.9167,"h":1.4134,"kind":"number","label":"Resistência do colete"},{"path":"system.combate.coleteCortante","x":82.4167,"y":40.12,"w":5.5833,"h":2.0612,"kind":"number","label":"Absorção cortante do colete"},{"path":"system.combate.coleteImpactante","x":88.3333,"y":40.12,"w":5.6667,"h":2.0612,"kind":"number","label":"Absorção impactante do colete"},{"path":"system.combate.extraNome","x":51.5,"y":42.313,"w":16.8,"h":2.0612,"kind":"text","label":"Proteção adicional"},{"path":"system.combate.extraResistencia","x":69.0833,"y":42.7113,"w":1.9167,"h":1.4134,"kind":"number","label":"Resistência da proteção adicional"},{"path":"system.combate.extraCortante","x":82.4167,"y":42.313,"w":5.5833,"h":2.0612,"kind":"number","label":"Absorção cortante da proteção adicional"},{"path":"system.combate.extraImpactante","x":88.3333,"y":42.313,"w":5.6667,"h":2.0612,"kind":"number","label":"Absorção impactante da proteção adicional"}];
export class ODBActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["odb", "sheet", "actor", "odb-classic"],
    position: { width: 1120, height: 920 },
    window: { resizable: true },
    form: { submitOnChange: false, submitOnClose: false, closeOnSubmit: false,
      handler: ODBActorSheet.prototype.onSubmitForm },
    actions: {
      createCareer: ODBActorSheet.prototype.createCareer,
      createGeneral: ODBActorSheet.prototype.createGeneral,
      createWeapon: ODBActorSheet.prototype.createWeapon,
      editItem: ODBActorSheet.prototype.editItem,
      createEquipment: ODBActorSheet.prototype.createEquipment,
      createSpell: ODBActorSheet.prototype.createSpell
    }
  };
  static PARTS = { form: { template: `systems/${SYSTEM_ID}/templates/actor-sheet.hbs` } };
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.actor;
    context.system = this.actor.system;
    context.campos = POSITIONS.map(c => ({...c,
      value: foundry.utils.getProperty(this.actor, c.path) ?? "" }));
    const carreira = this.actor.items.filter(i => i.type === "habilidade" && i.system.categoria === "carreira");
    const gerais = this.actor.items.filter(i => i.type === "habilidade" && i.system.categoria !== "carreira");
    const armas = this.actor.items.filter(i => i.type === "arma");
    const linhas = (items, start, step, max) => items.slice(0,max).map((item,i)=>({item,y:((start+i*step)/1088*100).toFixed(4)}));
    context.habilidadesCarreiraLinhas = linhas(carreira,536,19.0,22);
    context.habilidadesGeraisLinhas = linhas(gerais,536,19.0,15);
    context.armasLinhas = linhas(armas,879,19.5,5);
    const equipamentos = this.actor.items.filter(i => i.type === 'equipamento');
    const feiticos = this.actor.items.filter(i => ['feitico','encanto'].includes(i.type));
    context.itensFicha = [...carreira,...gerais,...armas,...equipamentos,...feiticos];
    context.pesoInventario = pesoTotal(equipamentos).toFixed(2);
    context.fontesMunicao = equipamentos.filter(i=>unidadesMunicao(i.name)).map(i=>({id:i.id,nome:i.name}));
    context.equipamentosEditor = equipamentos.map(item => ({id:item.id,nome:item.name,peso:item.system.peso ?? 0,quantidade:item.system.quantidade ?? 1,descricao:item.system.descricao ?? ''}));
    context.feiticosEditor = feiticos.map(item => ({id:item.id,nome:item.name,porcentagem:item.system.porcentagem ?? 0,custo:item.system.custo ?? 0,duracao:item.system.duracao ?? '',descricao:item.system.descricao ?? ''}));
    context.habilidadesEditor = [...carreira, ...gerais].map(item => ({
      id: item.id, nome: item.name,
      categoria: item.system.categoria ?? 'geral',
      atributoBase: item.system.atributoBase ?? '',
      pontosGastos: item.system.pontosGastos ?? 0,
      nivel: item.system.nivel ?? 0,
      porcentagem: item.system.porcentagem ?? 0
    }));
    context.rolagensHabilidades = [...carreira, ...gerais].map(item => ({
      id: item.id, nome: item.name, porcentagem: Number(item.system.porcentagem) || 0
    }));
    context.rolagensArmas = armas.map(item => ({
      id: item.id, nome: item.name, dano: String(item.system.dano ?? '').trim()
    }));
    context.armasEditor = armas.map(item => ({
      id: item.id, nome: item.name,
      dano: item.system.dano ?? '',
      alcance: item.system.alcance ?? '',
      municao: item.system.municao ?? 0
    }));
    // Prévia informativa: não altera automaticamente nenhum dado do ator.
    const attr = this.actor.system.atributos ?? {};
    const nomes = ['forca','destreza','resistencia','inteligencia','sabedoria','carisma'];
    const numero = v => Number.isFinite(Number(v)) ? Number(v) : 0;
    const valores = Object.fromEntries(nomes.map(nome => [nome,
      numero(attr[nome]?.racial) + numero(attr[nome]?.profissao) + numero(attr[nome]?.gastos)]));
    const previsoes = [
      ...nomes.map(nome => ({ rotulo: nome.toUpperCase(), valor: valores[nome], caminho: `system.atributos.${nome}.final` })),
      {rotulo:'PV total',valor:valores.resistencia,caminho:'system.recursos.pv.max'},
      {rotulo:'PM total',valor:valores.inteligencia+valores.destreza,caminho:'system.recursos.pm.max'},
      {rotulo:'PD total',valor:valores.sabedoria+valores.destreza,caminho:'system.recursos.pd.max'},
      {rotulo:'RM',valor:valores.resistencia+valores.inteligencia,caminho:'system.recursos.rm'},
      {rotulo:'VB',valor:(valores.destreza+valores.forca)/2,caminho:'system.recursos.vb'}
    ];
    context.previsoesODB = previsoes.map(p => ({...p, atual:foundry.utils.getProperty(this.actor,p.caminho) ?? 0}));
    return context;
  }
  _onRender(context, options) {
    super._onRender(context, options);
    const root = this.element;
    if (!root) return;
    // Tabs are presentation only: keep all controls mounted for existing listeners.
    const tabs = [...root.querySelectorAll('[data-odb-tab]')];
    const panels = [...root.querySelectorAll('[data-odb-panel]')];
    const activate = (key, focus = false) => {
      if (!tabs.some(tab => tab.dataset.odbTab === key)) key = 'ficha';
      this._odbActiveTab = key;
      for (const tab of tabs) {
        const selected = tab.dataset.odbTab === key;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focus) tab.focus();
      }
      for (const panel of panels) panel.hidden = panel.dataset.odbPanel !== key;
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab.dataset.odbTab));
      tab.addEventListener('keydown', event => {
        const offsets = {ArrowLeft: -1, ArrowRight: 1};
        let next = index;
        if (event.key in offsets) next = (index + offsets[event.key] + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[next].dataset.odbTab, true);
      });
    });
    activate(this._odbActiveTab ?? 'ficha');
    root.querySelector('.odb-portrait')?.addEventListener('click', () => {
      if (!this.actor.isOwner) return;
      const Picker = foundry.applications?.apps?.FilePicker?.implementation ?? globalThis.FilePicker;
      if (!Picker) { ui.notifications.error('Seletor de imagens indisponível.'); return; }
      new Picker({type:'image', current:this.actor.img, callback: async path => {
        try { await this.actor.update({img:path}); }
        catch (error) { console.error(error); ui.notifications.error('Não foi possível atualizar o retrato.'); }
      }}).render(true);
    });


    instalarCombate(root,this.actor);
    instalarCondicoes(root,this.actor);
    instalarDoencas(root,this.actor);
    instalarCatalogos(root,this.actor);
    instalarCriaturas(root);
    // Mantém o salvamento campo a campo que foi confirmado na versão 0.1.2.
    root.querySelectorAll('input[data-odb-path], input[name], select[name], textarea[name]').forEach(input => {
      input.addEventListener('change', async () => {
        const path = input.dataset.odbPath || input.name;
        if (!this.actor.isOwner || !path || (path !== 'name' && !path.startsWith('system.'))) return;
        const value = input.type === 'checkbox' ? input.checked :
          input.type === 'number' ? (input.value === '' ? null : Number(input.value)) : input.value;
        try { await this.actor.update({ [path]: value }); }
        catch (error) { console.error('ODB | Falha ao salvar',path,error); ui.notifications.error(`ODB: não foi possível salvar ${path}.`); }
      });
    });
    root.querySelector('.odb-aplicar-calculos')?.addEventListener('click', async event => {
      event.preventDefault();
      if(this.actor.getFlag(SYSTEM_ID,"passagens") && Object.keys(this.actor.getFlag(SYSTEM_ID,"passagens")).length){ui.notifications.warn("Cálculo inicial bloqueado após passagem registrada, para preservar ganhos.");return;}
      const a = this.actor.system.atributos ?? {};
      const nomes = ['forca','destreza','resistencia','inteligencia','sabedoria','carisma'];
      const n = value => Number.isFinite(Number(value)) ? Number(value) : 0;
      const v = Object.fromEntries(nomes.map(k => [k,n(a[k]?.racial)+n(a[k]?.profissao)+n(a[k]?.gastos)]));
      const entradas = Object.fromEntries(nomes.map(k => [`system.atributos.${k}.final`,v[k]]));
      Object.assign(entradas, {
        'system.recursos.pv.max':v.resistencia,
        'system.recursos.pm.max':v.inteligencia+v.destreza,
        'system.recursos.pd.max':v.sabedoria+v.destreza,
        'system.recursos.rm':v.resistencia+v.inteligencia,
        'system.recursos.vb':(v.destreza+v.forca)/2
      });
      const confirmed = await foundry.applications.api.DialogV2.confirm({
        window:{title:'Aplicar cálculos — ODB'},
        content:'<p>Substituir os valores finais dos seis atributos e os totais de PV, PM, PD, RM e VB pelos valores calculados?</p><p><strong>Os valores atuais de PV, PM e PD não serão alterados.</strong> Esta operação não altera BD, Sorte, armas ou habilidades.</p>',
        yes:{label:'Aplicar'},no:{label:'Cancelar'}
      });
      if (!confirmed) return;
      try { await this.actor.update(entradas); ui.notifications.info('ODB: cálculos aplicados.'); }
      catch(error) { console.error('ODB | Erro nos cálculos',error); ui.notifications.error('ODB: não foi possível aplicar os cálculos.'); }
    });
    // Rolagens independentes: não modificam Actor, Item, PV ou munição.
    root.querySelectorAll('.odb-roll-habilidade').forEach(button => {
      button.addEventListener('click', async event => {
        event.preventDefault();
        const item = this.actor.items.get(button.dataset.itemId);
        if (!item || item.type !== 'habilidade') return;
        const alvo = Number(item.system.porcentagem);
        if (!Number.isFinite(alvo) || alvo < 0 || alvo > 100) {
          ui.notifications.warn('ODB: a porcentagem deve estar entre 0 e 100.'); return;
        }
        try {
          const roll = await (new Roll('1d100')).evaluate();
          const sucesso = roll.total <= alvo;
          await roll.toMessage({
            speaker: ChatMessage.getSpeaker({actor:this.actor}),
            flavor: `ODB — ${foundry.utils.escapeHTML(item.name)} | Alvo ${alvo}% | ${sucesso ? 'Sucesso no teste percentual' : 'Falha no teste percentual'}`
          });
        } catch(error) {
          console.error('ODB | Falha na rolagem percentual', error);
          ui.notifications.error('ODB: não foi possível realizar a rolagem.');
        }
      });
    });
    root.querySelectorAll('.odb-roll-arma').forEach(button => {
      button.addEventListener('click', async event => {
        event.preventDefault();
        const item = this.actor.items.get(button.dataset.itemId);
        if (!item || item.type !== 'arma') return;
        const formula = String(item.system.dano ?? '').trim();
        // Aceita somente expressões aritméticas com dados; impede referências e comandos.
        if (!formula || formula.length > 60 || !/^[0-9dD+\-*/()\s]+$/.test(formula) || !/[dD]/.test(formula)) {
          ui.notifications.warn('ODB: informe dano em dados, por exemplo 1d6 ou 2d6+1.'); return;
        }
        try {
          const roll = await (new Roll(formula)).evaluate();
          await roll.toMessage({
            speaker: ChatMessage.getSpeaker({actor:this.actor}),
            flavor: `ODB — Dano de ${foundry.utils.escapeHTML(item.name)} (rolagem manual, sem aplicar ferimentos)`
          });
        } catch(error) {
          console.error('ODB | Expressão de dano inválida', error);
          ui.notifications.warn('ODB: expressão de dano inválida.');
        }
      });
    });
    // Calculadora de proteção independente: não altera nenhum documento.
    const painelDano = root.querySelector('.odb-combate-manual');
    if (painelDano) {
      const campoDano = painelDano.querySelector('.odb-dano-entrada');
      const tipo = painelDano.querySelector('.odb-tipo-protecao');
      const absorcaoTexto = painelDano.querySelector('.odb-absorcao-preview');
      const resultadoTexto = painelDano.querySelector('.odb-dano-preview');
      const calcular = () => {
        const bruto = Number(campoDano.value);
        const path = tipo.value === 'cortante' ? 'system.combate.absorcaoCortante' :
          tipo.value === 'impactante' ? 'system.combate.absorcaoImpactante' : null;
        const absorcao = path ? Number(foundry.utils.getProperty(this.actor, path)) : 0;
        if (!Number.isFinite(bruto) || bruto < 0 || !Number.isFinite(absorcao) || absorcao < 0) {
          absorcaoTexto.textContent = 'Valor inválido';
          resultadoTexto.textContent = '—';
          return null;
        }
        const liquido = Math.max(0, bruto - absorcao);
        absorcaoTexto.textContent = String(absorcao);
        resultadoTexto.textContent = String(liquido);
        return {bruto, absorcao, liquido, tipo:tipo.value};
      };
      campoDano.addEventListener('input', calcular);
      tipo.addEventListener('change', calcular);
      calcular();
      painelDano.querySelector('.odb-publicar-dano')?.addEventListener('click', async event => {
        event.preventDefault();
        const r = calcular();
        if (!r) {ui.notifications.warn('ODB: informe dano e absorção válidos.');return;}
        const nome = foundry.utils.escapeHTML(this.actor.name);
        const tipoLabel = r.tipo === 'cortante' ? 'Cortante' : r.tipo === 'impactante' ? 'Impactante' : 'Sem absorção';
        const content = `<div class="odb-combate-chat"><strong>ODB — Cálculo manual de proteção</strong><p>Personagem: ${nome}</p><p>Dano informado: ${r.bruto}</p><p>Proteção: ${tipoLabel} (${r.absorcao})</p><p><strong>Resultado aritmético: ${r.liquido}</strong></p><small>Não aplicado ao personagem; confirme as regras com o Mestre.</small></div>`;
        try {await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content});}
        catch(error){console.error('ODB | Falha ao publicar cálculo',error);ui.notifications.error('ODB: não foi possível publicar no chat.');}
      });
    }
    // v0.3.0: transfere apenas o valor para a prévia de PV, sem atualizar o ator.
    root.querySelector('.odb-usar-dano-no-pv')?.addEventListener('click', event => {
      event.preventDefault();
      const painel = root.querySelector('.odb-combate-manual');
      const painelPV = root.querySelector('.odb-ajuste-pv');
      if (!painel || !painelPV) return;
      const brutoTexto = painel.querySelector('.odb-dano-entrada')?.value ?? '';
      const bruto = Number(brutoTexto);
      const tipo = painel.querySelector('.odb-tipo-protecao')?.value;
      const protecao = tipo === 'cortante' ? this.actor.system.combate?.absorcaoCortante :
        tipo === 'impactante' ? this.actor.system.combate?.absorcaoImpactante : 0;
      const absorcao = Number(protecao);
      if (brutoTexto.trim() === '' || !Number.isSafeInteger(bruto) || bruto < 0 ||
          !Number.isFinite(absorcao) || absorcao < 0) {
        ui.notifications.warn('ODB: informe dano inteiro não negativo e absorção válida.'); return;
      }
      const liquido = Math.max(0, bruto - absorcao);
      const campo = painelPV.querySelector('.odb-pv-quantidade');
      if (!campo) return;
      if (liquido === 0) {ui.notifications.info('ODB: dano líquido zero; nenhum PV será descontado.'); return;}
      campo.value = String(liquido);
      painelPV.querySelector('.odb-pv-operacao').value = 'dano';
      campo.dispatchEvent(new Event('input', {bubbles:true}));
      ui.notifications.info(`ODB: ${liquido} PV preparados. Revise e confirme no painel de PV.`);
    });
    // Registro manual de condições: o campo é salvo pela rotina de change da ficha.
    root.querySelector('.odb-publicar-condicoes')?.addEventListener('click', async event => {
      event.preventDefault();
      const texto = root.querySelector('#odb-condicoes-texto')?.value.trim() ?? '';
      if (!texto) {ui.notifications.warn('ODB: nenhuma condição registrada.');return;}
      const nome = foundry.utils.escapeHTML(this.actor.name);
      const conteudo = foundry.utils.escapeHTML(texto).replace(/\n/g, '<br>');
      try {
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),
          content:`<div><strong>ODB — Condições de ${nome}</strong><p>${conteudo}</p><small>Registro manual, sem efeitos automáticos.</small></div>`});
      } catch(error) {console.error('ODB | Falha ao publicar condições',error);ui.notifications.error('ODB: falha ao publicar condições.');}
    });
    // v0.2.6: testes independentes; não escrevem no ator nem no combate.
    const painelTestes = root.querySelector('.odb-testes-combate');
    if (painelTestes) {
      // Vínculo manual e seguro: lê apenas itens de habilidade deste ator.
      const preencherDaHabilidade = (seletorDestino) => {
        const id = painelTestes.querySelector('.odb-habilidade-combate')?.value;
        const item = id ? this.actor.items.get(id) : null;
        if (!item || item.type !== 'habilidade') {
          ui.notifications.warn('ODB: selecione uma habilidade cadastrada.'); return;
        }
        const valor = Number(item.system.porcentagem);
        if (!Number.isInteger(valor) || valor < 0 || valor > 100) {
          ui.notifications.warn('ODB: a porcentagem da habilidade deve estar entre 0 e 100.'); return;
        }
        const destino = painelTestes.querySelector(seletorDestino);
        if (destino) destino.value = String(valor);
      };
      painelTestes.querySelector('.odb-usar-habilidade-ataque')?.addEventListener('click', event => {
        event.preventDefault(); preencherDaHabilidade('.odb-ataque-alvo');
      });
      painelTestes.querySelector('.odb-usar-habilidade-defesa')?.addEventListener('click', event => {
        event.preventDefault(); preencherDaHabilidade('.odb-defesa-alvo');
      });
      const rolarPercentual = async (classe, campo, descricao) => {
        const botao = painelTestes.querySelector(classe);
        botao?.addEventListener('click', async event => {
          event.preventDefault();
          const raw = painelTestes.querySelector(campo)?.value ?? '';
          const alvo = Number(raw);
          if (raw.trim() === '' || !Number.isInteger(alvo) || alvo < 0 || alvo > 100) {
            ui.notifications.warn('ODB: informe uma chance inteira entre 0 e 100%.'); return;
          }
          try {
            const roll = await new Roll('1d100').evaluate();
            const sucesso = roll.total <= alvo;
            await roll.toMessage({
              speaker: ChatMessage.getSpeaker({actor:this.actor}),
              flavor: `ODB — ${descricao} (manual) | Alvo ${alvo}% | ${sucesso ? 'Sucesso' : 'Falha'} | Verifique as regras com o Mestre.`
            });
          } catch(error) {
            console.error('ODB | Falha no teste de combate', error);
            ui.notifications.error('ODB: não foi possível rolar os dados.');
          }
        });
      };
      // v0.2.8: seleção de arma existente, consulta de dados e dano manual.
      // Não atribui chance de ataque, não consome munição nem modifica PV.
      const armaSelect = painelTestes.querySelector('.odb-arma-combate');
      const armaDetalhes = painelTestes.querySelector('.odb-arma-detalhes');
      const obterArma = () => {
        const id = armaSelect?.value;
        const item = id ? this.actor.items.get(id) : null;
        return item?.type === 'arma' ? item : null;
      };
      const atualizarArma = () => {
        if (!armaDetalhes) return;
        const arma = obterArma();
        if (!arma) {
          armaDetalhes.textContent = 'Selecione uma arma para ver dano, alcance e munição.';
          return;
        }
        armaDetalhes.textContent = `Dano: ${arma.system.dano ?? '—'} | Alcance: ${arma.system.alcance ?? '—'} | Munição: ${arma.system.municao ?? '—'}${tipoMunicao(arma.name)==='fogo' ? (arma.system.descarregada?' | Descarregada':' | Carregada') : ''}`;
      };
      armaSelect?.addEventListener('change', atualizarArma);
      atualizarArma();
      painelTestes.querySelector('.odb-rolar-arma-selecionada')?.addEventListener('click', async event => {
        event.preventDefault();
        const arma = obterArma();
        if (!arma) { ui.notifications.warn('ODB: selecione uma arma cadastrada.'); return; }
        const formula = String(arma.system.dano ?? '').trim();
        if (!formula || formula.length > 60 || !/^[0-9dD+\-*/()\s]+$/.test(formula) || !/[dD]/.test(formula)) {
          ui.notifications.warn('ODB: informe uma expressão de dano, como 1d6 ou 2d6+1.'); return;
        }
        try {
          const combate=game.combat;
          const combatentes=combate?.combatants.filter(c=>c.actor?.uuid===this.actor.uuid)??[];
          if(combatentes.length===1&&formula.toLowerCase()==='1d10'){await combate.rollInitiative([combatentes[0].id],{formula:'1d10'});return;}
          const roll = await new Roll(formula).evaluate();
          await roll.toMessage({
            speaker: ChatMessage.getSpeaker({actor:this.actor}),
            flavor: `ODB — Dano manual: ${foundry.utils.escapeHTML(arma.name)} (sem aplicar ferimentos ou consumir munição)`
          });
        } catch (error) {
          console.error('ODB | Falha ao rolar dano da arma selecionada', error);
          ui.notifications.warn('ODB: expressão de dano inválida.');
        }
      });
      let municaoOcupada = false;
      for (const [selector, recarga] of [['.odb-disparo-municao',false],['.odb-recarregar-arma',true]]) {
        painelTestes.querySelector(selector)?.addEventListener('click', async event => {
          event.preventDefault(); if(municaoOcupada) return; municaoOcupada=true;
          try {
            const arma=obterArma(); if(!arma?.isOwner) throw Error('Selecione uma arma que possa editar.');
            const m=Number(arma.system.municao), d=Boolean(arma.system.descarregada);
            const combate=game.combat;
            const participante=combate?.started && combate.combatant?.actor?.uuid===this.actor.uuid;
            if(combate?.started && combate.combatants.some(c=>c.actor?.uuid===this.actor.uuid) && !participante)throw Error("Aguarde o turno do personagem.");
            if(!recarga&&recargaPendente(arma.getFlag(SYSTEM_ID,"recargaRodada"),combate))throw Error("Aguarde a próxima rodada após a recarga.");
            const plano=recarga?prepararRecarga(arma.name,m,d):prepararDisparo(arma.name,m,d);
            const raw=painelTestes.querySelector('.odb-ataque-alvo').value.trim(), chance=Number(raw);
            if(!recarga&&(!raw||!Number.isInteger(chance)||chance<0||chance>100)) throw Error('Informe a chance de ataque.');
            if(!await foundry.applications.api.DialogV2.confirm({window:{title:recarga?'Recarga':'Disparo'},content:recarga?'Confirmar uma rodada dedicada à recarga?':'Confirmar disparo e consumo de uma munição?'}))return;
            if(Number(arma.system.municao)!==m||Boolean(arma.system.descarregada)!==d)throw Error('A arma mudou. Repita a operação.');
            const roll=recarga?null:await new Roll('1d100').evaluate();
            const update=Object.fromEntries(Object.entries(plano).map(([k,v])=>['system.'+k,v]));
            if(recarga&&participante)update[`flags.${SYSTEM_ID}.recargaRodada`]={id:combate.id,rodada:combate.round};
            await arma.update(update);
            atualizarArma();
            if(roll)await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:`ODB — Disparo: ${disparo(chance,roll.total)} (munição consumida)`});
            else ui.notifications.info('Recarga concluída; avance uma rodada conforme o Mestre.');
          } catch(err){ui.notifications.warn(err.message);} finally{municaoOcupada=false;}
        });
      }
      rolarPercentual('.odb-rolar-ataque', '.odb-ataque-alvo', 'Ataque');
      rolarPercentual('.odb-rolar-defesa', '.odb-defesa-alvo', 'Defesa');
      painelTestes.querySelector('.odb-rolar-iniciativa')?.addEventListener('click', async event => {
        event.preventDefault();
        const formula = painelTestes.querySelector('.odb-iniciativa-formula')?.value.trim() ?? '';
        if (!formula || formula.length > 60 || !/^[0-9dD+\-*/()\s]+$/.test(formula) || !/[dD]/.test(formula)) {
          ui.notifications.warn('ODB: informe uma expressão de dados válida, por exemplo 1d20.'); return;
        }
        try {
          const roll = await new Roll(formula).evaluate();
          await roll.toMessage({
            speaker: ChatMessage.getSpeaker({actor:this.actor}),
            flavor: 'ODB — Iniciativa manual (expressão informada pelo usuário; não altera o rastreador de combate)'
          });
        } catch(error) {
          console.error('ODB | Fórmula de iniciativa inválida', error);
          ui.notifications.warn('ODB: expressão de iniciativa inválida.');
        }
      });
    }
    // v0.2.9 — ajuste de PV explícito, com prévia e confirmação; sem automatizar regras.
    const painelPV = root.querySelector('.odb-ajuste-pv');
    if (painelPV) {
      const quantidade = painelPV.querySelector('.odb-pv-quantidade');
      const operacao = painelPV.querySelector('.odb-pv-operacao');
      const previa = painelPV.querySelector('.odb-pv-previa');
      const numero = value => Number(value);
      const calcular = () => {
        const atual = numero(this.actor.system.recursos?.pv?.value);
        const maximo = numero(this.actor.system.recursos?.pv?.max);
        const qtd = numero(quantidade.value);
        if (!Number.isFinite(atual) || !Number.isFinite(maximo) || maximo < 0 ||
            atual > maximo || quantidade.value.trim() === '' ||
            !Number.isSafeInteger(qtd) || qtd <= 0) {
          previa.textContent = 'Informe PV válidos e uma quantidade inteira positiva.';
          return null;
        }
        if (operacao.value === 'cura' && atual <= -8) { previa.textContent = 'Personagem morto; ajuste excepcional pelo Mestre.'; return null; }
        const depois = operacao.value === 'cura' ? Math.min(maximo, atual + qtd) : atual - qtd;
        previa.textContent = `PV: ${atual} → ${depois} (máximo ${maximo})`;
        return {atual,maximo,qtd,depois,operacao:operacao.value};
      };
      quantidade.addEventListener('input',calcular);
      operacao.addEventListener('change',calcular);
      calcular();
      painelPV.querySelector('.odb-pv-aplicar')?.addEventListener('click',async event => {
        event.preventDefault();
        const plano = calcular();
        if (!plano) { ui.notifications.warn('ODB: ajuste de PV inválido.'); return; }
        const confirmado = await foundry.applications.api.DialogV2.confirm({
          window:{title:'Confirmar alteração de PV'},
          content:`<p>${plano.operacao === 'cura' ? 'Recuperar' : 'Descontar'} ${plano.qtd} PV de <strong>${foundry.utils.escapeHTML(this.actor.name)}</strong>?</p><p>PV atual: ${plano.atual} → <strong>${plano.depois}</strong> (máximo ${plano.maximo}).</p>`,
          yes:{label:'Confirmar'},no:{label:'Cancelar'}
        });
        if (!confirmado) return;
        // Releitura impede aplicar um cálculo obsoleto se outro usuário mudou os PV.
        const atualizado = calcular();
        if (!atualizado || atualizado.atual !== plano.atual || atualizado.maximo !== plano.maximo) {
          ui.notifications.warn('ODB: os PV mudaram; confira a prévia e tente novamente.'); return;
        }
        try {
          await this.actor.update({'system.recursos.pv.value':plano.depois});
          ui.notifications.info(`ODB: PV atualizados para ${plano.depois}.`);
        } catch(error) {
          console.error('ODB | Erro ao atualizar PV',error);
          ui.notifications.error('ODB: não foi possível alterar os PV.');
        }
      });
    }
    // v0.3.1 — PM/PD: edição manual explícita, com confirmação e limite.
    const painelEnergia = root.querySelector('.odb-ajuste-energia');
    if (painelEnergia) {
      const tipo = painelEnergia.querySelector('.odb-energia-tipo');
      const operacao = painelEnergia.querySelector('.odb-energia-operacao');
      const quantidade = painelEnergia.querySelector('.odb-energia-quantidade');
      const previa = painelEnergia.querySelector('.odb-energia-previa');
      const calcular = () => {
        const recurso = tipo.value;
        if (!['pm', 'pd'].includes(recurso)) return null;
        const dados = this.actor.system.recursos?.[recurso];
        const atual = Number(dados?.value);
        const maximo = Number(dados?.max);
        const qtd = Number(quantidade.value);
        if (!Number.isSafeInteger(atual) || !Number.isSafeInteger(maximo) ||
            maximo < 0 || atual < 0 || atual > maximo ||
            quantidade.value.trim() === '' || !Number.isSafeInteger(qtd) || qtd <= 0) {
          previa.textContent = 'Confira os valores atuais, totais e a quantidade (inteiros não negativos).';
          return null;
        }
        const depois = operacao.value === 'recuperar'
          ? Math.min(maximo, atual + qtd) : Math.max(0, atual - qtd);
        previa.textContent = `${recurso.toUpperCase()}: ${atual} → ${depois} (total ${maximo})`;
        return {recurso, operacao: operacao.value, atual, maximo, qtd, depois};
      };
      [tipo, operacao].forEach(el => el.addEventListener('change', calcular));
      quantidade.addEventListener('input', calcular);
      calcular();
      painelEnergia.querySelector('.odb-energia-aplicar')?.addEventListener('click', async event => {
        event.preventDefault();
        const plano = calcular();
        if (!plano) { ui.notifications.warn('ODB: ajuste de PM/PD inválido.'); return; }
        const confirmado = await foundry.applications.api.DialogV2.confirm({
          window: {title: `Confirmar alteração de ${plano.recurso.toUpperCase()}`},
          content: `<p>${plano.operacao === 'recuperar' ? 'Recuperar' : 'Gastar'} ${plano.qtd} ${plano.recurso.toUpperCase()} de <strong>${foundry.utils.escapeHTML(this.actor.name)}</strong>?</p><p>${plano.atual} → <strong>${plano.depois}</strong> (total ${plano.maximo})</p>`,
          yes: {label: 'Confirmar'}, no: {label: 'Cancelar'}
        });
        if (!confirmado) return;
        const atualizado = calcular();
        if (!atualizado || atualizado.recurso !== plano.recurso ||
            atualizado.atual !== plano.atual || atualizado.maximo !== plano.maximo ||
            atualizado.qtd !== plano.qtd || atualizado.operacao !== plano.operacao) {
          ui.notifications.warn('ODB: os valores mudaram; revise antes de aplicar.'); return;
        }
        try {
          await this.actor.update({[`system.recursos.${plano.recurso}.value`]: plano.depois});
          ui.notifications.info(`ODB: ${plano.recurso.toUpperCase()} atualizados para ${plano.depois}.`);
        } catch (error) {
          console.error('ODB | Erro ao atualizar PM/PD', error);
          ui.notifications.error('ODB: não foi possível atualizar o recurso.');
        }
      });
    }
    // Magia: testes e consumo, com resolução narrativa pelo Mestre.
    const magia = root.querySelector('.odb-conjuracao-manual');
    if (magia) {
      const q = c => magia.querySelector(c);
      const texto=q('.odb-feitico-previa');
      const esc=v=>foundry.utils.escapeHTML(String(v));
      const ator=this.actor;
      const plano=()=>{
        const item=ator.items.get(q('.odb-feitico-selecionado').value);
        if(!item||!['feitico','encanto'].includes(item.type))throw Error('Selecione um feitiço ou encanto');
        const religioso=sacerdote(ator.system.identidade?.profissao ?? "");
        const tipo=religioso?'pd':q('.odb-feitico-recurso').value;
        if(!['pm','pd'].includes(tipo))throw Error('Recurso inválido');
        const r=ator.system.recursos[tipo], pv=Number(ator.system.recursos.pv.value);
        const custo=Number(item.system.custo), valor=Number(item.system.porcentagem);
        const alvo=alvoMagia(valor,q('.odb-magia-dificuldade').value);
        const estado=ator.getFlag(SYSTEM_ID,'incorporacao');
        const incorporado=religioso;
        if(incorporado&&!encantoPermitido(estado,item.name,valor))throw Error('Encanto não aprendido ou indisponível para o Orixá ativo');
        if(!incorporado&&custo<=0)throw Error('Informe custo positivo; casos especiais exigem decisão do Mestre');
        const depois=gastoMagia(Number(r.value),Number(r.max),incorporado?0:custo,pv,q('.odb-magia-pv').checked);
        return {id:item.id,nome:item.name,tipo,custo:incorporado?0:custo,valor,alvo,antes:Number(r.value),pv, depois,estado:incorporado?estado:null,duracao:String(item.system.duracao??'')};
      };
      const previa=()=>{try{const p=plano();texto.textContent=`Alvo ${p.alvo} | ${p.tipo.toUpperCase()} ${p.antes} → ${p.depois.recurso} | PV ${p.pv} → ${p.depois.pv} | Duração: ${p.duracao||'a definir'}`;}catch(e){texto.textContent=e.message;}};
      magia.addEventListener('change',previa);previa();
      let ocupado=false;
      const acao=(classe,fn)=>q(classe)?.addEventListener('click',async e=>{e.preventDefault();if(ocupado)return;ocupado=true;try{await fn();}catch(err){ui.notifications.error(`ODB: ${err.message}`);console.error(err);}finally{ocupado=false;previa();}});
      const painel=q('.odb-incorporacao');
      painel.hidden=!sacerdote(ator.system.identidade?.profissao ?? "");
      const seletor=q('.odb-orixa');
      for(const [nome,[custo]] of Object.entries(ORIXAS)){const opt=document.createElement('option');opt.value=nome;opt.textContent=`${nome} — ${custo} PD`;seletor.append(opt);}
      const estadoAtual=()=>ator.getFlag(SYSTEM_ID,'incorporacao')??{fase:'livre',rodadas:0};
      const mostrar=()=>{const s=estadoAtual();q('.odb-incorporacao-status').textContent=`${s.nome??'Sem Orixá'} | ${s.fase} | ${s.rodadas} rodadas`;};mostrar();
      for(const [classe,acaoNome] of [['iniciar','iniciar'],['manter','manter'],['avancar','avancar'],['encerrar','encerrar']])acao('.odb-orixa-'+classe,async()=>{
        if(!game.user.isGM||!ator.isOwner||!sacerdote(ator.system.identidade?.profissao ?? ""))throw Error('Apenas o Mestre controla a incorporação');
        if(acaoNome==='avancar'&&game.combat?.started&&game.combat.combatants.some(c=>c.actor?.uuid===ator.uuid))throw Error('Avance a rodada no rastreador de combate.');
        const s=estadoAtual(),pd=Number(ator.system.recursos.pd.value),nome=seletor.value;
        const paga=['iniciar','manter'].includes(acaoNome);
        if(paga&&Number(ator.system.recursos.pv.value)<=0)throw Error('Confirme que o sacerdote está vivo e apto a atuar');
        transicao(s,acaoNome,nome,pd,1);
        const roll=paga?await new Roll('1d6').evaluate():null;
        const novo=transicao(s,acaoNome,nome,pd,roll?.total??1);
        if(JSON.stringify(s)!==JSON.stringify(estadoAtual())||pd!==Number(ator.system.recursos.pd.value))throw Error('Dados alterados; tente novamente');
        const update={[`flags.${SYSTEM_ID}.incorporacao`]:{...novo,custo:novo.custo??0,nome:novo.nome??null}};
        if(paga)update['system.recursos.pd.value']=pd-novo.custo;
        await ator.update(update);mostrar();
        if(roll)await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:ator}),flavor:`${novo.nome}: ${novo.rodadas} rodadas, ${novo.custo} PD`});
      });
      acao('.odb-feitico-aplicar',async()=>{
        const p=plano();
        if(!ator.isOwner)throw Error('Sem permissão para alterar personagem');
        if(!await foundry.applications.api.DialogV2.confirm({window:{title:'Conjuração'},content:`<p>${esc(p.nome)}: alvo ${p.alvo}; custo ${p.custo}. O gasto ocorre mesmo em caso de falha. PV: ${p.pv} → ${p.depois.pv}. Confirmar?</p>`}))return;
        const roll=await new Roll('1d100').evaluate();
        if(JSON.stringify(plano())!==JSON.stringify(p))throw Error('Dados alterados; revise');
        const update={[`system.recursos.${p.tipo}.value`]:p.depois.recurso};
        if(p.pv!==p.depois.pv)update['system.recursos.pv.value']=p.depois.pv;
        await ator.update(update);
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:ator}),flavor:`${esc(p.nome)} | alvo ${p.alvo} | ${roll.total<=p.alvo?'Sucesso':'Falha'} | gasto ${p.custo} | duração ${esc(p.duracao||'a definir')} | efeito resolvido pelo Mestre`});
      });
      acao('.odb-magia-rm',async()=>{
        const alvo=alvoMagia(Number(ator.system.recursos.rm),q('.odb-magia-dificuldade').value);
        const roll=await new Roll('1d100').evaluate();
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:ator}),flavor:`Resistência à magia | alvo ${alvo} | ${roll.total<=alvo?'Resistiu':'Não resistiu'}`});
      });
      acao('.odb-magia-recuperar',async()=>{
        if(!game.user.isGM)throw Error('Somente o Mestre registra a recuperação diária');
        const tipo=q('.odb-feitico-recurso').value;
        const r=ator.system.recursos[tipo], atual=Number(r.value), max=Number(r.max), depois=recuperarPoder(atual,max);
        if(!await foundry.applications.api.DialogV2.confirm({window:{title:'Recuperação diária'},content:`<p>${tipo.toUpperCase()}: ${atual} → ${depois}. Confirme que passou um dia e que a recuperação ainda não foi registrada.</p>`}))return;
        if(Number(ator.system.recursos[tipo].value)!==atual||Number(ator.system.recursos[tipo].max)!==max)throw Error('Recurso alterado');
        await ator.update({[`system.recursos.${tipo}.value`]:depois});
      });
    }
    // v0.3.3 — concessão e gasto MANUAL de experiência. Não altera nível ou habilidades.
    const xpPanel = root.querySelector('.odb-xp-panel');
    if (xpPanel) {
      const amountInput = xpPanel.querySelector('.odb-xp-amount');
      const noteInput = xpPanel.querySelector('.odb-xp-note');
      const preview = xpPanel.querySelector('.odb-xp-preview');
      const calculate = (operation) => {
        const amount = Number(amountInput.value);
        const current = Number(this.actor.system.recursos?.experiencia);
        if (!Number.isSafeInteger(amount) || amount <= 0 || !Number.isSafeInteger(current) || current < 0) {
          preview.textContent = 'Informe pontos inteiros positivos e confira a experiência atual.';
          return null;
        }
        if (operation === 'spend' && amount > current) {
          preview.textContent = `Saldo insuficiente: ${current} PE disponíveis.`;
          return null;
        }
        const next = operation === 'award' ? current + amount : current - amount;
        if (!Number.isSafeInteger(next)) {
          preview.textContent = 'Resultado fora do intervalo numérico permitido.';
          return null;
        }
        preview.textContent = `PE: ${current} → ${next} (${operation === 'award' ? 'conceder' : 'gastar'} ${amount}).`;
        return {current, next, amount, operation};
      };
      for (const button of xpPanel.querySelectorAll('[data-xp-operation]')) {
        button.addEventListener('click', async event => {
          event.preventDefault();
          const operation = button.dataset.xpOperation;
          if (operation !== 'award' || !game.user.isGM) return;
          const plan = calculate(operation);
          if (!plan) { ui.notifications.warn('ODB: operação de experiência inválida.'); return; }
          const note = String(noteInput.value ?? '').trim().slice(0,300);
          const action = operation === 'award' ? 'Conceder' : 'Gastar';
          const confirmed = await foundry.applications.api.DialogV2.confirm({
            window:{title:`${action} pontos de experiência`},
            content:`<p>${action} <strong>${plan.amount} PE</strong> para <strong>${foundry.utils.escapeHTML(this.actor.name)}</strong>?</p><p>Saldo: ${plan.current} → ${plan.next}</p><p>Esta operação não muda nível, atributos ou habilidades.</p>`,
            yes:{label:'Confirmar'},no:{label:'Cancelar'}
          });
          if (!confirmed) return;
          const again = calculate(operation);
          if (!again || again.current !== plan.current || again.next !== plan.next) {
            ui.notifications.warn('ODB: a experiência mudou; confira o saldo e tente novamente.'); return;
          }
          try {
            await this.actor.update({'system.recursos.experiencia':plan.next});
            const actorName = foundry.utils.escapeHTML(this.actor.name);
            const safeNote = foundry.utils.escapeHTML(note);
            await ChatMessage.create({
              speaker:ChatMessage.getSpeaker({actor:this.actor}),
              content:`<p><strong>Experiência — ${actorName}</strong>: ${action.toLowerCase()} ${plan.amount} PE (${plan.current} → ${plan.next}).${safeNote ? ` Motivo: ${safeNote}` : ''}</p>`
            });
            ui.notifications.info(`ODB: ${plan.amount} PE ${operation === 'award' ? 'concedidos' : 'gastos'}.`);
          } catch (error) {
            console.error('ODB | Registro de experiência',error);
            ui.notifications.error('ODB: houve falha ao registrar experiência ou publicar no chat; confira o saldo antes de tentar novamente.');
          }
        });
      }
      amountInput.addEventListener('input',()=>{preview.textContent='Escolha Conceder ou Gastar para confirmar a operação.';});
    }
    const learningPanel = root.querySelector('.odb-aprendizado-plano');
    if (learningPanel) {
      const list = learningPanel.querySelector('.odb-aprendizado-lista');
      const output = learningPanel.querySelector('.odb-aprendizado-resultado');
      const learningItems = () => this.actor.items.filter(i=>i.type==='habilidade'||['feitico','encanto'].includes(i.type));
      const rows = learningItems().map(item=>{
        const label=document.createElement('label');
        label.style.display='block';
        label.textContent=item.name+(['feitico','encanto'].includes(item.type)?' (feitiço/encanto)':'')+' — valor atual (porcentagem): '+(item.system.porcentagem??0)+' — aumento pretendido: ';
        const input=document.createElement('input');
        input.type='number'; input.min='0'; input.max='10'; input.step='1'; input.value='0';
        label.append(input); list.append(label);
        return {id:item.id,input};
      });
      const button=learningPanel.querySelector('.odb-aprendizado-testar');
      const apply=learningPanel.querySelector('.odb-aprendizado-aplicar');
      const pending=()=>this.actor.getFlag(SYSTEM_ID,'passagemPendente');
      const prepare=()=>prepararPassagem(level(),Number(this.actor.system.recursos?.experiencia),currentRows(),this.actor.getFlag(SYSTEM_ID,'testesAprendizado')?.[String(level()+1)],this.actor.getFlag(SYSTEM_ID,'ganhosPoder')?.[String(level()+1)],this.actor.system.identidade?.profissao,this.actor.system.recursos);
      let busy=false;
      const drafts=[];
      let seq=0;
      const add=learningPanel.querySelector('.odb-nova-habilidade');
      const currentRows=()=>[...rows.map(r=>({id:r.id,atual:Number(this.actor.items.get(r.id)?.system.porcentagem ?? (['feitico','encanto'].includes(this.actor.items.get(r.id)?.type)?0:NaN)),aumento:r.input.value===''?NaN:Number(r.input.value)})),...novasHabilidades(drafts.map(r=>({id:r.id,nome:r.nome.value,categoria:r.cat.value,aumento:Number(r.input.value)})),learningItems().map(i=>i.name))];
      add.addEventListener('click',()=>{
        if(busy||pending()||!this.actor.isOwner)return;
        const line=document.createElement('div');
        const nome=document.createElement('input'); nome.type='text';nome.placeholder='Nome da habilidade';nome.maxLength=120;
        const cat=document.createElement('select'); for(const c of ['geral','carreira','feitico']){const o=document.createElement('option');o.value=c;o.textContent=c;cat.append(o);}
        const input=document.createElement('input');input.type='number';input.min='1';input.max='10';input.step='1';input.value='1';
        const remove=document.createElement('button');remove.type='button';remove.textContent='Remover';
        const r={id:'nova:'+ ++seq,nome,cat,input};drafts.push(r);line.append(nome,cat,input,remove);list.append(line);
        for(const el of [nome,cat,input])el.addEventListener('input',refresh);
        remove.addEventListener('click',()=>{if(busy)return;drafts.splice(drafts.indexOf(r),1);line.remove();refresh();});refresh();
      });
      const level=()=>Number(this.actor.system.identidade?.nivel);
      const plan=()=>{try{return planoAprendizado(level(),Number(this.actor.system.recursos?.experiencia),currentRows());}catch(e){return {ok:false,mensagem:e.message};}};
      const saved=(id)=>this.actor.getFlag('odb-foundry14','testesAprendizado')?.[String(level()+1)]?.[id];
      const refresh=()=>{
        const result=plan();
        const details=[];
        if(result.ok) for(const r of currentRows()) {
          if(!r.aumento) continue;
          const t=testeAprendizado(r.atual,r.aumento);
          const old=saved(r.id);
          if(t.estado==='livre'&&!old) continue;
          const status=t.estado==='revisao'?'valor >=100: revisão do Mestre':old?(old.alvo===t.alvo?(old.sucesso?'aprovado':'reprovado')+' (dado '+old.dado+')':'valor mudou: revisão do Mestre'):'aguardando teste';
          details.push((this.actor.items.get(r.id)?.name??r.id)+': '+status);
        }
        output.textContent=result.mensagem+(details.length?' | '+details.join('; '):'');
        button.disabled=busy||!result.ok||!this.actor.isOwner||!!pending();
        apply.disabled=busy||!game.user.isGM||!this.actor.isOwner||!!pending()||!result.ok;
        if(pending()) output.textContent="Passagem pendente de conferência: não repita a operação. Consulte o registro do ator.";
      };
      rows.forEach(r=>r.input.addEventListener('input',refresh));
      learningPanel.querySelector('.odb-aprendizado-conferir').addEventListener('click',refresh);
      button.addEventListener('click',async()=>{
        if(busy||!this.actor.isOwner||!plan().ok) return;
        busy=true; refresh();
        const initialLevel=level();
        try {
          for(const r of currentRows()) {
            if(level()!==initialLevel||!plan().ok) break;
            if(!r.aumento||saved(r.id)) continue;
            const t=testeAprendizado(r.atual,r.aumento);
            if(t.estado!=='pendente') continue;
            const roll=await new Roll('1d100').evaluate();
            if(level()!==initialLevel||saved(r.id)||Number(this.actor.items.get(r.id)?.system.porcentagem ?? (['feitico','encanto'].includes(this.actor.items.get(r.id)?.type)?0:NaN))!==r.atual) break;
            const outcome=testeAprendizado(r.atual,r.aumento,roll.total);
            const record={alvo:t.alvo,dado:roll.total,sucesso:outcome.estado==='sucesso'};
            await this.actor.update({[`flags.odb-foundry14.testesAprendizado.${initialLevel+1}.${r.id}`]:record});
            await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:`Aprendizado — ${foundry.utils.escapeHTML(this.actor.items.get(r.id)?.name??r.id)} | superar ${t.alvo} | ${record.sucesso?'Aprovado':'Reprovado'}`});
          }
        } catch(error) {console.error('ODB | Teste de aprendizado',error);ui.notifications.error('Não foi possível concluir os testes. Confira os resultados registrados antes de continuar.');}
        finally {busy=false;refresh();}
      });
      apply.addEventListener('click',async()=>{
        if(busy||!game.user.isGM||!this.actor.isOwner||pending())return;
        busy=true;refresh();
        try {
          const p=prepare();
          if(this.actor.getFlag(SYSTEM_ID,'passagens')?.[String(p.destino)]) throw new Error('Passagem já registrada.');
          const ok=await foundry.applications.api.DialogV2.confirm({window:{title:'Aplicar passagem de nível'},content:`<p>Nível ${p.level} → ${p.destino}. Custo ${p.custo}/50; saldo não utilizado ${p.saldo}. ${p.itens.length} habilidade(s). PM máximo ${p.antes.pm} → ${p.depois.pm}; PD máximo ${p.antes.pd} → ${p.depois.pd}; RM ${p.antes.rm} → ${p.depois.rm}. PE e valores atuais de PM/PD preservados.</p><p>Confirme somente depois de distribuir os pontos desejados.</p>`});
          if(!ok)return;
          if(pending()||JSON.stringify(prepare())!==JSON.stringify(p)||this.actor.getFlag(SYSTEM_ID,'passagens')?.[String(p.destino)])throw new Error('Dados mudaram; confira novamente.');
          await this.actor.setFlag(SYSTEM_ID,'passagemPendente',p);
          const existing=p.itens.filter(i=>!i.novo);
          const fresh=p.itens.filter(i=>i.novo);
          if(existing.length) await this.actor.updateEmbeddedDocuments('Item',existing.map(i=>({_id:i.id,'system.porcentagem':i.depois,...(this.actor.items.get(i.id)?.type==='habilidade'?{'system.nivel':i.depois}:{})})),{render:false});
          if(fresh.length) await this.actor.createEmbeddedDocuments('Item',fresh.map(i=>({name:i.nome,type:i.categoria==='feitico'?'feitico':'habilidade',system:i.categoria==='feitico'?{porcentagem:i.depois}:{categoria:i.categoria,porcentagem:i.depois,nivel:i.depois,pontosGastos:i.depois}})),{render:false});
          await this.actor.update({'system.identidade.nivel':p.destino,'system.recursos.pm.max':p.depois.pm,'system.recursos.pd.max':p.depois.pd,'system.recursos.rm':p.depois.rm,[`flags.${SYSTEM_ID}.passagens.${p.destino}`]: {...p,data:new Date().toISOString()},[`flags.${SYSTEM_ID}.-=passagemPendente`]:null});
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<p>Passagem de nível ${p.level} → ${p.destino}. ${p.custo} pontos de aprendizado utilizados. PE preservados.</p>`});
        }catch(e){console.error('ODB | Passagem',e);ui.notifications.error(e.message+' Confira a ficha e o registro antes de repetir.');}
        finally{busy=false;refresh();}
      });
      refresh();
    }
    // v0.5.7: registro de ganhos para a próxima passagem; aplicação na integração.
    const powerPanel=root.querySelector('.odb-poder-evolucao');
    if(powerPanel){
      const button=powerPanel.querySelector('button');
      const output=powerPanel.querySelector('p[aria-live]');
      let busy=false;
      const target=()=>Number(this.actor.system.identidade?.nivel)+1;
      const stored=()=>this.actor.getFlag(SYSTEM_ID,'ganhosPoder')?.[String(target())];
      const eligible=()=>Number.isInteger(target())&&target()>=2&&target()<=XP_THRESHOLDS.length&&Number(this.actor.system.recursos?.experiencia)>=XP_THRESHOLDS[target()-1];
      const refresh=()=>{
        try {
          const tipo=tipoPoder(this.actor.system.identidade?.profissao);
          const old=stored();
          output.textContent=old?`Nível ${target()}: PM +${old.ganhos.pm}, PD +${old.ganhos.pd}, RM +${old.ganhos.rm}. Registrado, ainda não aplicado.`:eligible()?`Nível ${target()}: rolar RM${tipo?' e '+tipo.toUpperCase():''}.`:'Experiência insuficiente ou nível fora da tabela.';
          button.disabled=busy||!game.user.isGM||!this.actor.isOwner||!eligible()||!!old;
        }catch(e){output.textContent=e.message;button.disabled=true;}
      };
      button.addEventListener('click',async()=>{
        if(busy||!game.user.isGM||!this.actor.isOwner||!eligible()||stored())return;
        busy=true;refresh();
        try {
          const nivel=target(),tipo=tipoPoder(this.actor.system.identidade?.profissao);
          const confirm=await foundry.applications.api.DialogV2.confirm({window:{title:'Registrar evolução de poderes'},content:`<p>Registrar os dados para o nível ${nivel}? Não muda a ficha nem o nível.</p>`});
          if(!confirm||!eligible()||target()!==nivel||stored())return;
          const rm=await new Roll('1d6').evaluate();
          const poder=tipo?await new Roll('1d6').evaluate():null;
          if(!eligible()||target()!==nivel||stored()||tipoPoder(this.actor.system.identidade?.profissao)!==tipo)return;
          const ganhos=ganhosPoder(tipo,rm.total,poder?.total);
          await this.actor.update({[`flags.${SYSTEM_ID}.ganhosPoder.${nivel}`]:{tipo,dadoRM:rm.total,dadoPoder:poder?.total??null,ganhos}});
          await rm.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:`Evolução para nível ${nivel}: RM +${ganhos.rm}`});
          if(poder)await poder.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:`Evolução para nível ${nivel}: ${tipo.toUpperCase()} +${ganhos[tipo]}`});
        }catch(e){console.error('ODB | Evolução de poderes',e);ui.notifications.error('Confira o registro antes de repetir.');}
        finally{busy=false;refresh();}
      });
      refresh();
    }
    // v0.3.4 — nível manual confirmado, sem custo automático de PE.
    const levelPanel = root.querySelector('.odb-level-panel');
    if (levelPanel) {
      const official = levelPanel.querySelector('.odb-xp-oficial');
      const refreshOfficial = () => {
        const status = xpStatus(Number(this.actor.system.identidade?.nivel), Number(this.actor.system.recursos?.experiencia));
        if (official) official.textContent = status;
      };
      refreshOfficial();
      levelPanel.querySelector('.odb-xp-conferir')?.addEventListener('click', refreshOfficial);
      const levelInput = levelPanel.querySelector('.odb-level-target');
      const levelNote = levelPanel.querySelector('.odb-level-note');
      const levelPreview = levelPanel.querySelector('.odb-level-preview');
      const getPlan = () => {
        const current = Number(this.actor.system.identidade?.nivel);
        const next = Number(levelInput.value);
        if (!Number.isSafeInteger(current) || current < 1 || !Number.isSafeInteger(next) || next < 1 || next > 999) {
          levelPreview.textContent = 'Informe um nível inteiro entre 1 e 999.';
          return null;
        }
        if (current === next) {
          levelPreview.textContent = `O personagem já está no nível ${current}.`;
          return null;
        }
        levelPreview.textContent = `Nível: ${current} → ${next}. Os PE e as habilidades não serão alterados.`;
        return {current,next};
      };
      levelInput.addEventListener('input', getPlan);
      levelPanel.querySelector('.odb-level-apply')?.addEventListener('click', async event => {
        event.preventDefault();
        const plan = getPlan();
        if (!game.user.isGM || this.actor.getFlag(SYSTEM_ID,'passagemPendente')) return;
        if (!plan) {ui.notifications.warn('ODB: nível inválido ou inalterado.');return;}
        const confirmed = await foundry.applications.api.DialogV2.confirm({
          window:{title:'Confirmar alteração de nível'},
          content:`<p>Alterar o nível de <strong>${foundry.utils.escapeHTML(this.actor.name)}</strong> de <strong>${plan.current}</strong> para <strong>${plan.next}</strong>?</p><p>Esta ação não gasta PE e não modifica atributos ou habilidades.</p>`,
          yes:{label:'Confirmar'},no:{label:'Cancelar'}
        });
        if (!confirmed) return;
        const currentAgain = Number(this.actor.system.identidade?.nivel);
        if (currentAgain !== plan.current) {ui.notifications.warn('ODB: o nível mudou; tente novamente.');return;}
        const note = foundry.utils.escapeHTML(String(levelNote.value ?? '').trim().slice(0,300));
        try {
          await this.actor.update({'system.identidade.nivel':plan.next});
          try {
            await ChatMessage.create({
              speaker:ChatMessage.getSpeaker({actor:this.actor}),
              content:`<p><strong>Progressão — ${foundry.utils.escapeHTML(this.actor.name)}</strong>: nível ${plan.current} → ${plan.next}.${note ? ` Motivo: ${note}` : ''}</p>`
            });
          } catch (chatError) {
            console.warn('ODB | Nível salvo, mas o chat falhou',chatError);
            ui.notifications.warn('ODB: nível salvo, mas não foi possível registrar no chat.');
          }
          ui.notifications.info(`ODB: nível alterado para ${plan.next}.`);
        } catch (error) {
          console.error('ODB | Falha ao alterar nível',error);
          ui.notifications.error('ODB: não foi possível salvar o nível.');
        }
      });
    }
    // v0.3.5 — progressão manual de habilidades: não altera PE nem porcentagem.
    const skillPanel = root.querySelector('.odb-skill-progression');
    if (skillPanel) {
      const selector = skillPanel.querySelector('.odb-skill-select');
      const target = skillPanel.querySelector('.odb-skill-target');
      const note = skillPanel.querySelector('.odb-skill-note');
      const preview = skillPanel.querySelector('.odb-skill-preview');
      const getPlan = () => {
        const item = this.actor.items.get(selector.value);
        if (!item || item.type !== 'habilidade') {
          preview.textContent = 'Selecione uma habilidade cadastrada.'; return null;
        }
        const current = Number(item.system.nivel ?? 0);
        const next = Number(target.value);
        if (target.value.trim() === '' || !Number.isSafeInteger(current) || current < 0 || !Number.isSafeInteger(next) || next < 0 || next > 999) {
          preview.textContent = 'Informe um nível inteiro entre 0 e 999.'; return null;
        }
        if (current === next) {preview.textContent = 'O nível informado é igual ao atual.'; return null;}
        preview.textContent = `${item.name}: nível ${current} → ${next}. PE e porcentagem permanecem inalterados.`;
        return {id:item.id,name:item.name,current,next};
      };
      selector.addEventListener('change', () => {
        const item = this.actor.items.get(selector.value);
        if (item?.type === 'habilidade') target.value = String(item.system.nivel ?? 0);
        getPlan();
      });
      target.addEventListener('input', getPlan);
      skillPanel.querySelector('.odb-skill-apply')?.addEventListener('click', async event => {
        event.preventDefault();
        const plan = getPlan();
        if (!plan) {ui.notifications.warn('ODB: escolha uma habilidade e um nível diferente.');return;}
        const confirmed = await foundry.applications.api.DialogV2.confirm({
          window:{title:'Confirmar progressão de habilidade'},
          content:`<p>Alterar <strong>${foundry.utils.escapeHTML(plan.name)}</strong> de nível ${plan.current} para ${plan.next}?</p><p>Esta operação não gasta PE e não recalcula a porcentagem.</p>`,
          yes:{label:'Confirmar'},no:{label:'Cancelar'}
        });
        if (!confirmed) return;
        const item = this.actor.items.get(plan.id);
        if (!item || item.type !== 'habilidade' || Number(item.system.nivel ?? 0) !== plan.current) {
          ui.notifications.warn('ODB: a habilidade mudou; revise e tente novamente.');return;
        }
        const reason = foundry.utils.escapeHTML(String(note.value ?? '').trim().slice(0,300));
        try {
          await item.update({'system.nivel':plan.next});
          try {
            await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),
              content:`<p><strong>Progressão de habilidade — ${foundry.utils.escapeHTML(this.actor.name)}</strong>: ${foundry.utils.escapeHTML(plan.name)}, nível ${plan.current} → ${plan.next}.${reason ? ` Motivo: ${reason}` : ''}</p>`});
          } catch (chatError) {
            console.warn('ODB | Habilidade salva, registro no chat falhou',chatError);
            ui.notifications.warn('ODB: habilidade salva, mas o registro no chat falhou.');
          }
          ui.notifications.info(`ODB: ${plan.name} agora está no nível ${plan.next}.`);
        } catch(error) {
          console.error('ODB | Falha na progressão de habilidade',error);
          ui.notifications.error('ODB: não foi possível salvar a habilidade.');
        }
      });
    }
    // v0.3.7 — conferência somente leitura; não impõe regra de progressão.
    const auditPanel = root.querySelector('.odb-attribute-audit');
    if (auditPanel) {
      const labels = {forca:'Força',destreza:'Destreza',resistencia:'Resistência',inteligencia:'Inteligência',sabedoria:'Sabedoria',carisma:'Carisma',sorte:'Sorte'};
      const body = auditPanel.querySelector('.odb-attribute-audit-rows');
      const summary = auditPanel.querySelector('.odb-attribute-audit-summary');
      const renderAudit = () => {
        body.replaceChildren();
        let differences = 0;
        for (const [key,label] of Object.entries(labels)) {
          const data = this.actor.system.atributos?.[key] ?? {};
          const racial = key === 'sorte' ? null : Number(data.racial ?? 0);
          const profession = key === 'sorte' ? null : Number(data.profissao ?? 0);
          const spent = Number(data.gastos ?? 0);
          const finalValue = Number(data.final ?? 0);
          const expected = (racial ?? 0) + (profession ?? 0) + spent;
          const valid = [racial,profession,spent,finalValue].filter(v=>v !== null).every(Number.isFinite);
          const same = valid && expected === finalValue;
          if (!same) differences++;
          const row = document.createElement('tr');
          const values = [label,racial === null ? '—' : racial,profession === null ? '—' : profession,spent,valid ? expected : 'Inválido',finalValue,same ? 'Coincide' : 'Revisar'];
          for (const value of values) {const cell=document.createElement('td');cell.textContent=String(value);row.appendChild(cell);}
          if (!same) row.classList.add('odb-audit-difference');
          body.appendChild(row);
        }
        summary.textContent = differences === 0 ? 'Todos os sete valores finais coincidem com a soma dos campos exibidos.' : `${differences} atributo(s) com divergência aritmética. Revise manualmente; nenhuma alteração foi aplicada.`;
      };
      auditPanel.querySelector('.odb-attribute-audit-refresh')?.addEventListener('click',event=>{event.preventDefault();renderAudit();});
      renderAudit();
    }
    // v0.3.6 — ajuste manual de atributo final, sem custos ou efeitos automáticos.
    const attributePanel = root.querySelector('.odb-attribute-progression');
    if (attributePanel) {
      const selector = attributePanel.querySelector('.odb-attribute-select');
      const target = attributePanel.querySelector('.odb-attribute-target');
      const note = attributePanel.querySelector('.odb-attribute-note');
      const preview = attributePanel.querySelector('.odb-attribute-preview');
      const labels = {forca:'Força',destreza:'Destreza',resistencia:'Resistência',inteligencia:'Inteligência',sabedoria:'Sabedoria',carisma:'Carisma',sorte:'Sorte'};
      const getPlan = () => {
        const key = selector.value;
        if (!Object.hasOwn(labels,key)) {preview.textContent = 'Selecione um atributo.';return null;}
        const current = Number(this.actor.system.atributos?.[key]?.final ?? 0);
        const next = Number(target.value);
        if (target.value.trim() === '' || !Number.isSafeInteger(current) || !Number.isSafeInteger(next) || next < 0 || next > 999) {
          preview.textContent = 'Informe um valor final inteiro entre 0 e 999.';return null;
        }
        if (current === next) {preview.textContent = 'O valor informado é igual ao atual.';return null;}
        preview.textContent = `${labels[key]}: ${current} → ${next}. Nenhum outro campo será alterado.`;
        return {key,label:labels[key],current,next};
      };
      selector.addEventListener('change', () => {
        const key = selector.value;
        target.value = Object.hasOwn(labels,key) ? String(this.actor.system.atributos?.[key]?.final ?? 0) : '0';
        getPlan();
      });
      target.addEventListener('input',getPlan);
      attributePanel.querySelector('.odb-attribute-apply')?.addEventListener('click',async event => {
        event.preventDefault();
        const plan = getPlan();
        if (!plan) {ui.notifications.warn('ODB: escolha um atributo e um valor diferente.');return;}
        const confirmed = await foundry.applications.api.DialogV2.confirm({
          window:{title:'Confirmar ajuste de atributo'},
          content:`<p>Alterar o valor final de <strong>${plan.label}</strong> de ${plan.current} para ${plan.next}?</p><p>PE, pontos gastos, valores raciais/profissionais e recursos derivados não serão alterados.</p>`,
          yes:{label:'Confirmar'},no:{label:'Cancelar'}
        });
        if (!confirmed) return;
        if (Number(this.actor.system.atributos?.[plan.key]?.final ?? 0) !== plan.current) {
          ui.notifications.warn('ODB: o atributo mudou; revise e tente novamente.');return;
        }
        const reason = foundry.utils.escapeHTML(String(note.value ?? '').trim().slice(0,300));
        try {
          await this.actor.update({[`system.atributos.${plan.key}.final`]:plan.next});
          try {
            await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),
              content:`<p><strong>Ajuste de atributo — ${foundry.utils.escapeHTML(this.actor.name)}</strong>: ${plan.label} ${plan.current} → ${plan.next}.${reason ? ` Motivo: ${reason}` : ''}</p>`});
          } catch(chatError) {
            console.warn('ODB | Atributo salvo, registro no chat falhou',chatError);
            ui.notifications.warn('ODB: atributo salvo, mas o registro no chat falhou.');
          }
          ui.notifications.info(`ODB: ${plan.label} ajustado para ${plan.next}.`);
        } catch(error) {
          console.error('ODB | Falha ao ajustar atributo',error);
          ui.notifications.error('ODB: não foi possível salvar o atributo.');
        }
      });
    }
    // v0.3.9 — simulação não grava; aplicação opcional e confirmada com custo manual.
    const planner = root.querySelector('.odb-skill-planner');
    if (planner) {
      const skillSelect = planner.querySelector('.odb-plan-skill');
      const levelInput = planner.querySelector('.odb-plan-level');
      const costInput = planner.querySelector('.odb-plan-cost');
      const result = planner.querySelector('.odb-plan-result');
      const simulate = () => {
        const item = this.actor.items.get(skillSelect.value);
        if (!item || item.type !== 'habilidade') {
          result.textContent = 'Selecione uma habilidade cadastrada.';return;
        }
        const level = Number(levelInput.value);
        const cost = Number(costInput.value);
        if (!Number.isSafeInteger(level) || level < 0 || level > 999 || !Number.isSafeInteger(cost) || cost < 0 || cost > 999999) {
          result.textContent = 'Informe nível (0–999) e custo de PE (0–999999), ambos inteiros.';return;
        }
        const currentLevel = Number(item.system.nivel ?? 0);
        const balance = Number(this.actor.system.recursos?.experiencia ?? 0);
        if (!Number.isFinite(balance)) {result.textContent = 'Saldo de PE inválido na ficha.';return;}
        const remainder = balance - cost;
        result.textContent = `${item.name}: nível ${currentLevel} → ${level}. PE atual: ${balance}; custo informado: ${cost}; saldo hipotético: ${remainder}. ${remainder < 0 ? 'PE insuficientes para este custo.' : 'Saldo suficiente para este custo.'} Simulação sem salvamento.`;
      };
      skillSelect.addEventListener('change', () => {
        const item = this.actor.items.get(skillSelect.value);
        levelInput.value = item?.type === 'habilidade' ? String(item.system.nivel ?? 0) : '0';
        simulate();
      });
      levelInput.addEventListener('input',simulate);
      costInput.addEventListener('input',simulate);
      planner.querySelector('.odb-plan-refresh')?.addEventListener('click',event=>{event.preventDefault();simulate();});

    }
    // v0.4.0 — consulta e limpeza confirmada do histórico de evolução.
    const historyPanel = root.querySelector('.odb-historico-evolucao');
    if (historyPanel) {
      const historyList = historyPanel.querySelector('.odb-historico-lista');
      const summary = historyPanel.querySelector('.odb-historico-resumo');
      const renderHistory = () => {
        const entries = this.actor.getFlag('odb-foundry14','historicoEvolucao');
        historyList.replaceChildren();
        const passages = Object.values(this.actor.getFlag(SYSTEM_ID,'passagens') ?? {}).sort((a,b)=>b.destino-a.destino);
        for (const p of passages) {
          const line=document.createElement('li');
          line.textContent=`Nível ${p.level} → ${p.destino}; PE ${p.xp} preservados; aprendizado ${p.custo}/50; PM ${p.antes?.pm} → ${p.depois?.pm}; PD ${p.antes?.pd} → ${p.depois?.pd}; RM ${p.antes?.rm} → ${p.depois?.rm}.`;
          historyList.append(line);
          for(const i of p.itens ?? []) {const li=document.createElement('li');li.textContent=`${i.nome ?? this.actor.items.get(i.id)?.name ?? i.id}: ${i.antes ?? '—'} → ${i.depois}`;historyList.append(li);}
        }
        if (passages.length && !entries?.length) {summary.textContent=`${passages.length} passagem(ns) oficial(is) registrada(s).`;return;}
        if (!Array.isArray(entries) || !entries.length) {
          const empty = document.createElement('li');empty.textContent = 'Nenhuma evolução registrada nesta versão.';
          historyList.append(empty);
          if (summary) summary.textContent = 'Nenhuma operação registrada para conferência.';
          return;
        }
        // Resumo de auditoria, somente leitura: não modifica PE ou habilidades.
        const valid = entries.filter(e => Number.isFinite(Number(e.custoPE)) &&
          Number.isFinite(Number(e.peAnterior)) && Number.isFinite(Number(e.peNovo)));
        const total = valid.reduce((sum,e) => sum + Number(e.custoPE),0);
        const inconsistent = valid.filter(e => Number(e.peAnterior) - Number(e.custoPE) !== Number(e.peNovo)).length;
        if (summary) summary.textContent = `${entries.length} evolução(ões) registrada(s); ${total} PE gastos no histórico disponível.` +
          (inconsistent ? ` Atenção: ${inconsistent} registro(s) com saldo divergente.` : '') +
          (valid.length !== entries.length ? ` ${entries.length-valid.length} registro(s) sem valores numéricos válidos.` : '') +
          ' O histórico guarda no máximo 30 operações e não representa necessariamente todos os PE gastos.';
        for (const entry of [...entries].reverse()) {
          const line = document.createElement('li');
          const when = entry.data ? new Date(entry.data).toLocaleString('pt-BR') : 'Data desconhecida';
          line.textContent = `${when} — ${entry.habilidade ?? 'Habilidade'}: nível ${entry.nivelAnterior} → ${entry.nivelNovo}; PE ${entry.peAnterior} → ${entry.peNovo} (custo ${entry.custoPE}).`;
          historyList.append(line);
        }
      };
      renderHistory();
      // v0.4.6 — diagnóstico estritamente consultivo, sem regras de custo presumidas.
      // v0.4.7 — leitura e validação estrutural de catálogo; não grava dados.
      const diagnosticOutput = historyPanel.querySelector('.odb-diagnostico-resultado');
      const collectDiagnostic = () => {
        const findings = [];
        const push = (kind,field,description) => findings.push({tipo:kind,campo:field,descricao:description});
        const attr = this.actor.system?.atributos ?? {};
        for (const key of ['forca','destreza','resistencia','inteligencia','sabedoria','carisma','sorte']) {
          const entry = attr[key] ?? {};
          const parts = key === 'sorte' ? ['gastos'] : ['racial','profissao','gastos'];
          const values = parts.map(k=>Number(entry[k]));
          const final = Number(entry.final);
          if (values.some(v=>!Number.isFinite(v)) || !Number.isFinite(final)) {
            push('erro',`atributos.${key}`,'Há valores não numéricos.');
          } else if (values.reduce((a,b)=>a+b,0) !== final) {
            push('aviso',`atributos.${key}`,`Componentes somam ${values.reduce((a,b)=>a+b,0)}; valor final é ${final}.`);
          }
        }
        const pe = Number(this.actor.system?.recursos?.experiencia);
        if (!Number.isSafeInteger(pe) || pe < 0) push('erro','recursos.experiencia','Saldo de PE inválido ou negativo.');
        const level = Number(this.actor.system?.identidade?.nivel);
        if (!Number.isSafeInteger(level) || level < 0) push('erro','identidade.nivel','Nível do personagem inválido.');
        const skills = this.actor.items.filter(item=>item.type==='habilidade');
        for (const item of skills) {
          for (const field of ['nivel','porcentagem','pontosGastos']) {
            const value = Number(item.system?.[field]);
            if (!Number.isFinite(value) || value < 0) push('erro',`habilidade.${item.id}.${field}`,`${item.name}: ${field} inválido.`);
          }
        }
        const entries = this.actor.getFlag('odb-foundry14','historicoEvolucao');
        if (entries != null && !Array.isArray(entries)) push('erro','historicoEvolucao','Histórico não é uma lista.');
        if (Array.isArray(entries)) {
          entries.forEach((entry,index)=>{
            const old = Number(entry?.peAnterior), cost = Number(entry?.custoPE), next = Number(entry?.peNovo);
            if (![old,cost,next].every(Number.isFinite) || old-cost!==next) {
              push('aviso',`historicoEvolucao.${index}`,`Registro ${index+1}: desconto de PE divergente ou inválido.`);
            }
          });
        }
        return {formato:'odb-diagnostico-progressao',versao:1,
          personagem:this.actor.name,personagemId:this.actor.id,
          geradoEm:new Date().toISOString(),
          aviso:'Verificação aritmética e de integridade. Não comprova conformidade com as regras oficiais.',
          habilidadesVerificadas:skills.length,
          registrosHistorico:(Array.isArray(entries)?entries.length:0)+Object.keys(this.actor.getFlag(SYSTEM_ID,"passagens")??{}).length,
          achados:findings};
      };
      const showDiagnostic = report => {
        if (!diagnosticOutput) return;
        diagnosticOutput.replaceChildren();
        const intro = document.createElement('p');
        intro.textContent = `${report.habilidadesVerificadas} habilidade(s), ${report.registrosHistorico} registro(s) no histórico, ${report.achados.length} ocorrência(s).`;
        diagnosticOutput.append(intro);
        if (!report.achados.length) {
          const ok = document.createElement('p');
          ok.textContent = 'Nenhuma divergência encontrada nas verificações disponíveis. Isso não valida as regras oficiais.';
          diagnosticOutput.append(ok);
        } else {
          const list = document.createElement('ol');
          report.achados.forEach(entry=>{
            const li=document.createElement('li');
            li.textContent=`${entry.tipo.toUpperCase()} — ${entry.campo}: ${entry.descricao}`;
            list.append(li);
          });
          diagnosticOutput.append(list);
        }
      };
      historyPanel.querySelector('.odb-diagnostico-executar')?.addEventListener('click',event=>{
        event.preventDefault();
        showDiagnostic(collectDiagnostic());
      });
      historyPanel.querySelector('.odb-diagnostico-exportar')?.addEventListener('click',event=>{
        event.preventDefault();
        try {
          const report=collectDiagnostic();
          showDiagnostic(report);
          exportarJSON(report, `odb-diagnostico-${this.actor.id}.json`);
          ui.notifications.info('ODB: exportação do diagnóstico solicitada.');
        } catch(error) {
          console.error('ODB | Falha ao exportar diagnóstico',error);
          ui.notifications.error('ODB: não foi possível exportar o diagnóstico.');
        }
      });
      historyPanel.querySelector('.odb-historico-atualizar')?.addEventListener('click',e=>{e.preventDefault();renderHistory();});
      // v0.4.2 — exportação local, somente leitura, para backup e auditoria.
      // v0.4.4 — cópia de segurança somente leitura dos dados de progressão.
      historyPanel.querySelector('.odb-progressao-backup')?.addEventListener('click',event=>{
        event.preventDefault();
        try {
          const attrs = this.actor.system?.atributos ?? {};
          const keys = ['forca','destreza','resistencia','inteligencia','sabedoria','carisma','sorte'];
          const atributos = Object.fromEntries(keys.map(key=>{
            const a = attrs[key] ?? {};
            return [key, {racial:a.racial ?? null,profissao:a.profissao ?? null,
              gastos:a.gastos ?? null,final:a.final ?? null}];
          }));
          const habilidades = this.actor.items.filter(item=>item.type==='habilidade').map(item=>({
            id:item.id,nome:item.name,categoria:item.system?.categoria ?? '',
            atributoBase:item.system?.atributoBase ?? '',
            pontosGastos:item.system?.pontosGastos ?? 0,
            nivel:item.system?.nivel ?? 0,porcentagem:item.system?.porcentagem ?? 0
          }));
          const historico = this.actor.getFlag('odb-foundry14','historicoEvolucao');
          const payload = {
            formato:'odb-copia-progressao',versao:1,
            personagem:this.actor.name,personagemId:this.actor.id,
            exportadoEm:new Date().toISOString(),
            aviso:'Cópia de consulta. Não é um arquivo de importação nem substitui o backup do mundo.',
            nivel:this.actor.system?.identidade?.nivel ?? null,
            pontosExperiencia:this.actor.system?.recursos?.experiencia ?? null,
            atributos,habilidades,
            historicoEvolucao:Array.isArray(historico)?historico:[],
            passagens:this.actor.getFlag(SYSTEM_ID,"passagens")??{}, recursos:this.actor.system.recursos, feiticos:this.actor.items.filter(i=>['feitico','encanto'].includes(i.type)).map(i=>({nome:i.name,system:i.system}))
          };
          exportarJSON(payload, `odb-progressao-${this.actor.id}.json`);
          ui.notifications.info('ODB: cópia de progressão solicitada ao navegador.');
        } catch(error) {
          console.error('ODB | Falha ao exportar progressão',error);
          ui.notifications.error('ODB: não foi possível exportar a cópia de progressão.');
        }
      });
      // v0.4.5 — comparação local, sem alterações de documentos ou flags.
      historyPanel.querySelector('.odb-comparar-progressao-arquivo')?.addEventListener('change',async event=>{
        const input=event.currentTarget;
        const output=historyPanel.querySelector('.odb-comparar-progressao-resultado');
        const file=input.files?.[0];
        if(!file || !output)return;
        output.replaceChildren();
        const line=(message,emphasis=false)=>{
          const p=document.createElement('p');p.textContent=message;
          if(emphasis)p.classList.add('odb-comparar-diferenca');
          output.append(p);
        };
        try {
          if(file.size>2_000_000)throw new Error('Arquivo excede 2 MB.');
          const data=JSON.parse(await file.text());
          if(!data || data.formato!=='odb-copia-progressao' || data.versao!==1 ||
             !data.atributos || typeof data.atributos!=='object' || Array.isArray(data.atributos) ||
             !Array.isArray(data.habilidades))throw new Error('Formato de cópia de progressão inválido.');
          if(data.personagemId!==this.actor.id)throw new Error('A cópia pertence a outro personagem (ID diferente).');
          const show=v=>v===null||v===undefined?'(vazio)':String(v);
          const changes=[];
          const compare=(name,oldValue,newValue)=>{
            if(show(oldValue)!==show(newValue))changes.push(`${name}: cópia ${show(oldValue)} | atual ${show(newValue)}`);
          };
          compare('Nível',data.nivel,this.actor.system?.identidade?.nivel);
          compare('PE',data.pontosExperiencia,this.actor.system?.recursos?.experiencia);
          for(const key of ['forca','destreza','resistencia','inteligencia','sabedoria','carisma','sorte']){
            const before=data.atributos[key]??{};
            const now=this.actor.system?.atributos?.[key]??{};
            for(const field of ['racial','profissao','gastos','final'])compare(`${key}.${field}`,before[field],now[field]);
          }
          const beforeItems=new Map();
          for(const item of data.habilidades){
            if(!item || typeof item.id!=='string' || beforeItems.has(item.id))throw new Error('Lista de habilidades inválida ou com IDs duplicados.');
            beforeItems.set(item.id,item);
          }
          const current=this.actor.items.filter(item=>item.type==='habilidade');
          const currentIds=new Set(current.map(item=>item.id));
          for(const item of current){
            const old=beforeItems.get(item.id);
            if(!old){changes.push(`Habilidade adicionada: ${item.name}`);continue;}
            compare(`Habilidade ${item.name} — nome`,old.nome,item.name);
            for(const [field,key] of [['categoria','categoria'],['atributoBase','atributoBase'],['pontosGastos','pontosGastos'],['nivel','nivel'],['porcentagem','porcentagem']])
              compare(`Habilidade ${item.name} — ${field}`,old[field],item.system?.[key]);
          }
          for(const item of data.habilidades)if(!currentIds.has(item.id))changes.push(`Habilidade ausente atualmente: ${show(item.nome)}`);
          const oldHistory=Array.isArray(data.historicoEvolucao)?data.historicoEvolucao:[];
          const newHistory=this.actor.getFlag('odb-foundry14','historicoEvolucao');
          const actualHistory=Array.isArray(newHistory)?newHistory:[];
          if(JSON.stringify(oldHistory)!==JSON.stringify(actualHistory))changes.push(`Histórico diferente: cópia ${oldHistory.length} registro(s) | atual ${actualHistory.length} registro(s)`);
          line(`Comparação de ${show(data.personagem)} — ${changes.length} diferença(s).`);
          if(!changes.length)line('Nenhuma diferença encontrada nos campos comparados.');
          else for(const change of changes.slice(0,150))line(change,true);
          if(changes.length>150)line(`Mais ${changes.length-150} diferença(s) não exibida(s).`);
          line('Somente leitura: nenhum dado foi modificado.');
        }catch(error){
          console.error('ODB | Erro na comparação de progressão',error);
          line(`Não foi possível comparar: ${error.message}`);
        }finally{input.value='';}
      });
      historyPanel.querySelector('.odb-historico-exportar')?.addEventListener('click',e=>{
        e.preventDefault();
        try {
          const entries = this.actor.getFlag('odb-foundry14','historicoEvolucao');
          if (!entries?.length && !Object.keys(this.actor.getFlag(SYSTEM_ID,'passagens')??{}).length) {
            ui.notifications.warn('ODB: não há evoluções registradas para exportar.');
            return;
          }
          const payload = {
            formato: 'odb-historico-evolucao', versao: 1,
            personagem: this.actor.name, personagemId: this.actor.id,
            exportadoEm: new Date().toISOString(),
            observacao: 'Histórico parcial, limitado às últimas 30 operações. Não altera o personagem.',
            evolucoes: Array.isArray(entries)?entries:[], passagens: this.actor.getFlag(SYSTEM_ID,"passagens")??{}
          };
          exportarJSON(payload, `odb-historico-${this.actor.id}.json`);
          ui.notifications.info('ODB: exportação do histórico solicitada ao navegador.');
        } catch(error) {
          console.error('ODB | Falha na exportação do histórico',error);
          ui.notifications.error('ODB: não foi possível exportar o histórico.');
        }
      });
      // v0.4.3 — restauração de backup JSON, sem modificar PE ou habilidades.
      historyPanel.querySelector('.odb-historico-importar')?.addEventListener('change',async e=>{
        const input = e.currentTarget;
        const file = input.files?.[0];
        if (!file) return;
        try {
          if (file.size > 256 * 1024) throw new Error('Arquivo maior que 256 KB.');
          const payload = JSON.parse(await file.text());
          if (!payload || payload.formato !== 'odb-historico-evolucao' || payload.versao !== 1 ||
              !Array.isArray(payload.evolucoes) || payload.evolucoes.length > 30 ||
              typeof payload.personagemId !== 'string' || payload.personagemId !== this.actor.id) {
            throw new Error('Formato inválido, mais de 30 operações ou arquivo de outro personagem.');
          }
          const safe = payload.evolucoes.map((entry,index)=>{
            if (!entry || typeof entry !== 'object' || Array.isArray(entry) ||
                typeof entry.data !== 'string' || !Number.isFinite(Date.parse(entry.data)) ||
                typeof entry.habilidade !== 'string' || entry.habilidade.length > 200 ||
                typeof entry.itemId !== 'string' || entry.itemId.length > 100 ||
                !['nivelAnterior','nivelNovo','custoPE','peAnterior','peNovo'].every(k =>
                  typeof entry[k] === 'number' && Number.isSafeInteger(entry[k]) && entry[k] >= 0)) {
              throw new Error(`Registro ${index+1} inválido.`);
            }
            return {data:entry.data,habilidade:entry.habilidade,itemId:entry.itemId,
              nivelAnterior:entry.nivelAnterior,nivelNovo:entry.nivelNovo,
              custoPE:entry.custoPE,peAnterior:entry.peAnterior,peNovo:entry.peNovo};
          });
          const current = this.actor.getFlag('odb-foundry14','historicoEvolucao');
          const count = Array.isArray(current) ? current.length : 0;
          const confirmed = await foundry.applications.api.DialogV2.confirm({
            window:{title:'Restaurar histórico de evolução'},
            content:`<p>Importar ${safe.length} registro(s) e substituir ${count} registro(s) atuais de <strong>${foundry.utils.escapeHTML(this.actor.name)}</strong>?</p><p>Esta operação não altera PE, níveis ou habilidades. Exporte o histórico atual antes de substituí-lo.</p>`,
            yes:{label:'Restaurar histórico'},no:{label:'Cancelar'}
          });
          if (!confirmed) return;
          await this.actor.setFlag('odb-foundry14','historicoEvolucao',safe);
          renderHistory();
          ui.notifications.info('ODB: histórico restaurado do arquivo JSON.');
        } catch(error) {
          console.error('ODB | Falha ao importar histórico',error);
          ui.notifications.error(`ODB: importação cancelada. ${error.message}`);
        } finally { input.value = ''; }
      });
      historyPanel.querySelector('.odb-historico-limpar')?.addEventListener('click',async e=>{
        e.preventDefault();
        const confirmed = await foundry.applications.api.DialogV2.confirm({
          window:{title:'Limpar histórico de evolução'},
          content:'<p>Apagar o histórico local de evoluções deste personagem? Esta ação não altera níveis nem PE e não pode ser desfeita.</p>',
          yes:{label:'Limpar histórico'},no:{label:'Cancelar'}
        });
        if (!confirmed) return;
        try {await this.actor.unsetFlag('odb-foundry14','historicoEvolucao');renderHistory();
          ui.notifications.info('ODB: histórico de evolução limpo.');}
        catch(error) {console.error('ODB | Falha ao limpar histórico',error);ui.notifications.error('ODB: não foi possível limpar o histórico.');}
      });
    }
    const transferir=root.querySelector('.odb-transferir-municao');
    transferir?.addEventListener('click',async event=>{
      event.preventDefault(); if(transferir.disabled)return; transferir.disabled=true;
      try {
        const arma=this.actor.items.get(root.querySelector('.odb-reserva-arma').value);
        const fonte=this.actor.items.get(root.querySelector('.odb-reserva-fonte').value);
        if(!arma?.isOwner||!fonte?.isOwner||arma.type!=='arma'||fonte.type!=='equipamento')throw Error('Selecione arma e munição editáveis.');
        const plano=transferirMunicao(arma,fonte);
        if(!await foundry.applications.api.DialogV2.confirm({window:{title:'Transferir munição'},content:'Retirar uma unidade ou pacote do inventário e adicionar seus disparos à reserva da arma?'}))return;
        const atual=transferirMunicao(arma,fonte);
        if(atual.quantidade!==plano.quantidade||atual.municao!==plano.municao)throw Error('O inventário mudou; tente novamente.');
        await this.actor.updateEmbeddedDocuments('Item',[{_id:fonte.id,'system.quantidade':plano.quantidade},{_id:arma.id,'system.municao':plano.municao}]);
        ui.notifications.info('Munição transferida para a reserva.');
      }catch(err){ui.notifications.warn(err.message);}finally{transferir.disabled=false;}
    });
    // Edição delegada dos documentos Item, separada do salvamento do Actor.
    // Os campos não usam name= para evitar submissão acidental do formulário.
    root.querySelectorAll('.odb-editor-input').forEach(input => {
      input.addEventListener('change', async () => {
        const row = input.closest('[data-odb-item-id]');
        const item = this.actor.items.get(row?.dataset.odbItemId);
        const field = input.dataset.odbField;
        if (!item || !field) return;
        const value = input.type === 'number'
          ? (input.value === '' ? 0 : Number(input.value)) : input.value;
        if (input.type === 'number' && (!Number.isFinite(value) || (['system.quantidade','system.municao'].includes(field) && (!Number.isSafeInteger(value)||value<0)) || (field==='system.peso'&&value<0))) {
          ui.notifications.warn('ODB: valor numérico inválido.'); return;
        }
        try { await item.update({[field]: value}); }
        catch (error) {
          console.error('ODB | Falha ao atualizar item', error);
          ui.notifications.error('ODB: não foi possível salvar o item.');
        }
      });
    });
    root.querySelectorAll('.odb-delete-item').forEach(button => {
      button.addEventListener('click', async event => {
        event.preventDefault();
        const item = this.actor.items.get(button.closest('[data-odb-item-id]')?.dataset.odbItemId);
        if (!item) return;
        try {
          const confirmed = await foundry.applications.api.DialogV2.confirm({
            window: {title:'Excluir item'},
            content: `<p>Excluir <strong>${foundry.utils.escapeHTML(item.name)}</strong>?</p>`,
            yes: {label:'Excluir'}, no: {label:'Cancelar'}
          });
          if (confirmed) await item.delete();
        } catch (error) {
          console.error('ODB | Falha ao excluir item', error);
          ui.notifications.error('ODB: não foi possível excluir o item.');
        }
      });
    });
  }
  async onSubmitForm(event, form, formData) {
    if (!this.actor.isOwner) return;
    const values = formData?.object ?? {};
    const changes = {};
    for (const [path, value] of Object.entries(values)) {
      if (path === 'name' || path.startsWith('system.')) {
        changes[path] = value;
      }
    }
    if (Object.keys(changes).length) await this.actor.update(changes);
  }
  async _createItem(type, categoria) {
    const data = {name: ({arma:'Nova arma',habilidade:'Nova habilidade',equipamento:'Novo equipamento',feitico:'Novo feitiço'})[type] ?? 'Novo item',type};
    if (categoria) data.system = {categoria};
    const [item] = await this.actor.createEmbeddedDocuments('Item',[data]);
    if (item) await this.render({force: true});
  }
  async createCareer() { await this._createItem('habilidade','carreira'); }
  async createGeneral() { await this._createItem('habilidade','geral'); }
  async createWeapon() { await this._createItem('arma'); }
  async createEquipment() { await this._createItem('equipamento'); }
  async createSpell() { await this._createItem('feitico'); }
  editItem(event, button) {
    const id = button?.dataset?.itemId ?? event?.target?.closest?.('[data-item-id]')?.dataset?.itemId;
    this.actor.items.get(id)?.sheet?.render(true);
  }
}
