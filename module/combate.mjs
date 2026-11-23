// Módulo básico, Parte II, cap. 1, pp. 60–66.
const integer=(v,min=0,max=9999)=>{if(!Number.isInteger(v)||v<min||v>max)throw Error('Valor fora dos limites.');return v;};
export function dadosConfronto(a,b){return Math.min(3,1+(Math.min(integer(a),integer(b))>50?1:0)+(Math.min(a,b)>100?1:0));}
export function classeGolpe(n,s){integer(n,1,4);integer(s,n,20*n);return s<=n*n?'falha':s>=20*n-n*(n-1)?'mestre':'normal';}
export function confronto(a,b,ra,rb,escudo=false,ma=0,mb=0){const n=dadosConfronto(a,b),d=n+Number(escudo);integer(ma,-100,100);integer(mb,-100,100);const ca=classeGolpe(n,ra),cb=classeGolpe(d,rb),ataque=a+ra+ma*n,defesa=b+rb+mb*n;return {ataque,defesa,ca,cb,acerto:ca!=='falha'&&cb!=='mestre'&&(ca==='mestre'||cb==='falha'||ataque>defesa)};}
export function disparo(h,r,f=1){integer(h);integer(r,1,100);if(![.25,.5,1,2].includes(f))throw Error('Dificuldade inválida');return r>=96?'falha':r<=5?'mestre':r<=Math.round(h*f)?'acerto':'erro';}
export function protecao(dano,tipo,local,res,abs){integer(dano);integer(res);integer(abs);if(!['cortante','impactante','magico'].includes(tipo)||!['corpo','colete','escudo','extra'].includes(local))throw Error('Tipo inválido');if(local==='corpo'||res===0||tipo==='magico')return {corpo:dano,desgaste:0};const liquido=Math.max(0,dano-abs);if(['colete','extra'].includes(local)&&tipo==='impactante')return {corpo:liquido,desgaste:0};return {corpo:Math.max(0,liquido-res),desgaste:Math.min(res,liquido)};}
export const ARMAS=[['Adaga','1d6',8,1500],['Arco','1d6',150,1500],['Azagaia','1d6+1',20,1500],['Canhonete','6d6+6',500,50000],['Chicote','1d6-1',null,1000],['Escopeta','3d6-2',150,15000],['Espada','1d6+2',null,2500],['Faca','1d6-1',10,1000],['Facão','1d6+1',null,2000],['Garrucha','1d6+1',60,5000],['Lança','1d6+3',10,2000],['Machado','1d6+3',null,2500],['Arcabuz','3d6',200,20000],['Pistola','2d6+1',90,10000],['Porrete','1d6',null,500],['Tacape','1d6+1',null,1000]];

// Aplicação explícita na ficha do defensor; proteção informada separadamente.
export function planoDano(pv,dano,tipo,local,res,abs){integer(pv,-999999,9999);const r=protecao(dano,tipo,local,res,abs);return {...r,pvAntes:pv,pvDepois:pv-r.corpo,resDepois:res-r.desgaste};}
export const PROTECOES={escudo:{local:'escudo',res:12,cortante:2,impactante:3},leve:{local:'colete',res:6,cortante:1,impactante:3},rigido:{local:'colete',res:10,cortante:2,impactante:4}};

// Ataques localizados, p. 62. Pontos específicos exigem decisão do Mestre.
export function danoLocalizado(dano,alvo){integer(dano);const mult={tronco:1,cabeca:2,garganta:4}[alvo];if(!mult)throw Error('Alvo não contemplado.');return dano*mult;}
export function dificuldadeLocalizada(alvo){const f={tronco:1,cabeca:.5,garganta:.25}[alvo];if(!f)throw Error('Alvo não contemplado.');return f;}
export const ARMAS_ESPECIAIS=[['Rede','',6,1000,'Não causa dano; reduz Destreza e Luta em 10 pontos.'],['Zarabatana','',50,500,'Dano do dardo desprezível; resolver veneno separadamente.']];
export const CATALOGO_ARMAS=[...ARMAS,...ARMAS_ESPECIAIS];
