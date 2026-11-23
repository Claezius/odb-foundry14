import assert from 'node:assert/strict';
import fs from 'node:fs';
import {entradasFicha} from '../module/formulario.mjs';
assert.deepEqual(entradasFicha({'name':'Ana','system.identidade.jogador':'Maria','flags.x':1}),{name:'Ana','system.identidade.jogador':'Maria'});
assert.deepEqual(entradasFicha({name:'Ana',system:{identidade:{jogador:'Maria',idade:'24'},recursos:{pv:{value:7}}},flags:{x:1}}),{name:'Ana','system.identidade.jogador':'Maria','system.identidade.idade':'24','system.recursos.pv.value':7});
assert.deepEqual(entradasFicha({system:{identidade:{jogador:''}}}),{'system.identidade.jogador':''});
assert.deepEqual(entradasFicha({flags:{x:1},system:{}}),{});
assert.deepEqual(entradasFicha(null),{});
console.log('Submissão da ficha: formatos plano e expandido aprovados.');

// A ficha não possui botão submit; sem estes gatilhos as edições não são persistidas.
const sheet = fs.readFileSync(new URL('../module/actor-sheet.mjs', import.meta.url), 'utf8');
const template = fs.readFileSync(new URL('../templates/actor-sheet.hbs', import.meta.url), 'utf8');
assert.match(sheet, /submitOnChange:\s*true/, 'Salvar alterações ao editar campos');
assert.match(sheet, /submitOnClose:\s*true/, 'Salvar alterações ao fechar a ficha');
assert.match(template, /<form\b/, 'A ficha deve conter formulário');

// Protege o salvamento individual legado, necessário para campos sobrepostos à ficha clássica.
assert.match(sheet, /input\\[data-odb-path\\]/, 'Os campos posicionados devem receber listeners');
assert.match(sheet, /addEventListener\\('change'/, 'A edição individual deve disparar salvamento');
assert.match(sheet, /await this\\.actor\\.update\\(\\{ \\[path\\]: value \\}\\)/, 'O salvamento individual deve atualizar o Actor');
