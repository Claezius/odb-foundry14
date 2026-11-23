import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../module/actor-sheet.mjs',import.meta.url),'utf8');
for(const [seletor, aviso] of [
  ['.odb-aplicar-calculos','Sem permissão para alterar personagem.'],
  ['.odb-pv-aplicar','Sem permissão para alterar PV.'],
  ['.odb-energia-aplicar','Sem permissão para alterar PM/PD.']
]){
  const pos=source.indexOf(seletor);
  assert.ok(pos>=0,'Controle ausente: '+seletor);
  const trecho=source.slice(pos,pos+350);
  assert.match(trecho,/!this\.actor\.isOwner/,'Verificação de propriedade ausente: '+seletor);
  assert.ok(trecho.includes(aviso),'Aviso ausente: '+seletor);
}
assert.match(source,/if \(!item \|\| !item\.isOwner \|\| !field\) return;/,'Edição de Item sem guarda de propriedade');
console.log('Permissões: guardas de proprietário nos controles auditados.');
