import assert from 'node:assert/strict';
import {entradasFicha} from '../module/formulario.mjs';
assert.deepEqual(entradasFicha({'name':'Ana','system.identidade.jogador':'Maria','flags.x':1}),{name:'Ana','system.identidade.jogador':'Maria'});
assert.deepEqual(entradasFicha({name:'Ana',system:{identidade:{jogador:'Maria',idade:'24'},recursos:{pv:{value:7}}},flags:{x:1}}),{name:'Ana','system.identidade.jogador':'Maria','system.identidade.idade':'24','system.recursos.pv.value':7});
assert.deepEqual(entradasFicha({system:{identidade:{jogador:''}}}),{'system.identidade.jogador':''});
assert.deepEqual(entradasFicha({flags:{x:1},system:{}}),{});
assert.deepEqual(entradasFicha(null),{});
console.log('Submissão da ficha: formatos plano e expandido aprovados.');
