export function alvoMagia(valor, dificuldade='normal') {
 const fatores={rotineira:4,facil:2,normal:1,dificil:0.5,quase:0.25};
 if(!Number.isSafeInteger(valor)||valor<0||!Object.hasOwn(fatores,dificuldade)) throw Error('Valor ou dificuldade inválidos');
 return Math.floor(valor*fatores[dificuldade]);
}
export function gastoMagia(atual,max,custo,pv,usarPV=false){
 if(![atual,max,custo,pv].every(Number.isSafeInteger)||atual<0||atual>max||custo<0) throw Error('Confira os recursos e o custo');
 if(custo<=atual)return {recurso:atual-custo,pv};
 if(atual===0&&usarPV&&pv>0)return {recurso:0,pv:pv-2*custo};
 throw Error('Saldo insuficiente; resistência só pode ser usada com poder esgotado');
}
export function recuperarPoder(atual,max){if(![atual,max].every(Number.isSafeInteger)||atual<0||atual>max)throw Error('Recurso inválido');return Math.min(max,atual+6);}
