export const ATR=['forca','destreza','resistencia','inteligencia','sabedoria','carisma','sorte'];
export const RACAS={'Brancos':[10,11,11,10,10,10,0],'Índios':[10,11,10,10,11,10,0],'Mestiços':[10,11,11,10,10,10,0],'Negros':[11,10,11,10,10,10,0],'Mulatos':[11,11,10,10,10,10,0]};
const mag=[-2,0,0,2,0,0,0],div=[-2,0,0,0,2,0,0];
export const PROF={'Guerreiro':[1,0,1,-1,-1,0,0],'Rastreador':[-1,1,0,-1,1,0,0],'Ladrão':[-1,1,0,0,0,0,0],'Bruxo':mag,'Feiticeiro de ferro e fogo':mag,'Feiticeiro negro':mag,'Pajé':mag,'Jesuíta':div,'Sacerdote negro':div};
export function personagem(raca,prof,dados){if(!Object.hasOwn(RACAS,raca)||!Object.hasOwn(PROF,prof)||dados.length!==7||dados.some(x=>!Number.isInteger(x)||x<1||x>6))throw Error('Raça, profissão ou dados inválidos.');const atributos=Object.fromEntries(ATR.map((a,i)=>[a,{racial:RACAS[raca][i],profissao:PROF[prof][i],gastos:dados[i],final:RACAS[raca][i]+PROF[prof][i]+dados[i]}]));const [f,d,r,int,s]=ATR.map(a=>atributos[a].final);const pm=PROF[prof]===mag?int+d:0,pd=PROF[prof]===div?s+d:0;return {identidade:{raca,profissao:prof,nivel:1},atributos,recursos:{pv:{value:r,max:r},pm:{value:pm,max:pm},pd:{value:pd,max:pd},rm:r+int,vb:(f+d)/2,bd:f<15?0:f<17?1:f<19?2:f<22?3:f<26?4:5,experiencia:0}};}
export function habilidade(nome,atributo,valor,pontos,categoria){return {name:nome,type:'habilidade',system:{atributoBase:atributo,porcentagem:valor+pontos,nivel:valor+pontos,pontosGastos:pontos,categoria}};}
export function criatura(c,nivel=1){if(!Number.isSafeInteger(nivel)||nivel<1||(c.maximo!=null&&nivel>c.maximo))throw Error("Nível fora dos limites da criatura.");const hle=c.hle+10*(nivel-1);const atributos=Object.fromEntries([['forca',c.f],['destreza',c.d],['resistencia',c.r]].map(([a,v])=>[a,{final:v,racial:v}]));const items=[habilidade('Luta','destreza',hle,0,'geral'),habilidade('Esquiva','destreza',hle,0,'geral'),{name:'Ataque natural',type:'arma',system:{dano:/^\d+d6(?:[+-]\d+)?$|^\d+$/.test(c.dano)?c.dano:'',descricao:c.dano}}];return {name:c.nome,type:'npc',system:{identidade:{nivel,raca:c.rm===null?'Animal':'Criatura'},atributos,recursos:{pv:{value:c.r,max:c.r},vb:c.v,...(c.pm==null?{}:{pm:{value:c.pm,max:c.pm}}),...(c.rm===null?{}:{rm:c.rm})},combate:{condicoes:`${c.fonte}; HLE inicial ${c.hle}; HLE atual ${hle}; nível médio ${c.medio}; máximo ${c.maximo??'sem limite'}. Dano: ${c.dano}. Outros atributos não informados. ${c.especial??""}`}},items};}

// Módulo Básico, pp. 13–15. Apenas profissões com listas completas neste catálogo.
export function habilidadesIniciais(prof, atributos, catalogo, escolhas){
 if(!Object.hasOwn(PROF,prof)) throw Error('Distribuição automatizada ainda indisponível para esta profissão.');
 const lista=new Map(catalogo.map(h=>[h.nome,h]));
 const vistos=new Set(); const totais={carreira:0,geral:0};
 const items=[habilidade('Esquiva','destreza',atributos.destreza.final,20,'geral')];
 for(const {nome,pontos} of escolhas){
  const h=lista.get(nome);
  if(!h||nome==='Esquiva'||vistos.has(nome)||!Number.isInteger(pontos)||pontos<0||pontos>20)throw Error('Distribuição inválida: '+nome);
  vistos.add(nome); if(!pontos)continue;
  const categoria=h.carreiras.includes(prof)?'carreira':'geral';
  const valor=atributos[h.atributo]?.final;
  if(!Number.isFinite(valor))throw Error('Atributo inválido: '+nome);
  totais[categoria]+=pontos;items.push(h.magia?{name:nome,type:'feitico',system:{...h.registro,porcentagem:valor+pontos,custo:prof==='Sacerdote negro'?0:(h.registro.custo??0),descricao:[h.registro.descricao??'Custo e descrição pendentes de conferência no livro.',...(h.vinculos??[])].join(' — ')}}:habilidade(nome,h.atributo,valor,pontos,categoria));
 }
 if(totais.carreira!==100||totais.geral!==50)throw Error(`Distribua exatamente 100 pontos de carreira e 50 gerais. Atual: ${totais.carreira}/${totais.geral}.`);
 return items;
}
