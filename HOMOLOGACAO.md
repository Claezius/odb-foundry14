# Estado da homologação da RC30 (23/11/2026)

**Automação aprovada:** a revisão `2c71795` passou no GitHub Actions, incluindo `npm test` e verificação de sintaxe JavaScript. [Execução](https://github.com/Claezius/odb-foundry14/actions/runs/45278834783).

**Homologação no Foundry VTT 14: PENDENTE.** O sucesso dos testes automatizados não comprova abertura de fichas, salvamento em mundo real, compatibilidade com dados antigos nem segurança de migração.

## Procedimento prioritário de validação manual (em cópia do mundo)

1. Fechar o Foundry; copiar integralmente o mundo e a pasta do sistema existente. Não testar sobre o mundo original.
2. Instalar a RC30 somente na cópia e registrar o número exato do build do Foundry VTT 14.
3. Criar personagem novo e preencher **Nome, Jogador, Idade, Raça, Profissão** e ao menos um atributo; mudar de campo, fechar a ficha, reabri-la e conferir os valores.
4. Repetir a edição em um personagem antigo da cópia, especialmente Jogador e Idade. Reiniciar o Foundry e confirmar persistência após reinício.
5. Alterar um campo e fechar imediatamente a ficha; conferir se a última alteração foi preservada. Testar também campo apagado e campo numérico.
6. Abrir o console (F12) e registrar erros, se ocorrerem, junto ao nome do campo e passos para reproduzir.
7. Se algum campo não persistir, **não homologar nem atualizar o mundo principal**. Restaurar a cópia do backup e corrigir a causa.

**Critério de aprovação:** todas as verificações de persistência acima devem passar sem perda de dados; em seguida executar os demais cenários abaixo. Não publicar versão estável enquanto houver falhas críticas, lacunas de escopo ou pendências de direitos de redistribuição.

---

# Homologação em cópia do mundo — Foundry VTT 14
Todos os itens abaixo estão pendentes de teste prático. Registre versão/build do Foundry, resultado e erros no console (F12).

- [ ] Instalar, abrir mundo e criar personagem e NPC.
- [ ] Abrir ficha clássica, editar, fechar e reabrir; conferir persistência.
- [ ] Criar personagem com 7d6, raça e profissão; conferir atributos com o livro.
- [ ] Criar, editar, rolar e excluir habilidade; conferir os dados após reabrir.
- [ ] Conceder 11 PE no nível 1; distribuir até 50 pontos, máximo 10 por habilidade; conferir custos nas fronteiras 50/60/70 e falha de aprendizado.
- [ ] Aplicar mudança de nível como Mestre; conferir PE preservados, habilidades, PM/PD/RM, histórico e prevenção de duplicidade.
- [ ] Testar conjuração com sucesso, falha, poder insuficiente e resistência à magia.
- [ ] Testar iniciativa, ataque/defesa, disparos, dano e desgaste de armaduras.
- [ ] Preencher compêndios; reexecutar e conferir ausência de duplicatas.
- [ ] Abrir criaturas e conferir valores com o livro.
- [ ] Testar permissões de jogador/Mestre, dois clientes e interrupções de atualização.
- [ ] Reiniciar o Foundry e conferir persistência; testar restauração do backup.

Limitações conhecidas: distribuição inicial de habilidades manual, bestiário parcial, catálogos de equipamentos e feitiços parciais, recuperação de passagem interrompida manual, revisão de regras de combate e magia pendente. Não declarar estabilidade enquanto houver falhas críticas ou lacunas no escopo acordado.

## Complementos RC20 (todos pendentes de teste prático)
- [ ] Criar personagens das nove profissões e verificar a distribuição inicial de 170 pontos.
- [ ] Importar em mundo novo: 71 habilidades, 18 armas, 66 equipamentos, 76 feitiços, 81 criaturas (312 registros); repetir sem duplicar.
- [ ] Verificar incorporação, custo de PD e avanço de rodadas; recarregar e disparar com munição retirada do inventário.
- [ ] Conferir ataque localizado, PV negativos, repouso, venenos e doenças.
- [ ] Gerar criatura em nível médio e máximo; testar rejeição de nível inválido.
- [ ] Verificar divergências de regras e registros incompletos com o Módulo Básico; poderes especiais manuais e tratamentos continuam sob controle do Mestre.

A RC20 mantém as regras da RC19. A descrição antiga de limitações acima é histórica; a distribuição inicial foi implementada nas RC7–8, mas ainda não homologada. Não há atualização automática de registros existentes nos compêndios. A compatibilidade real com v14 ainda não foi verificada; o campo de versão verificada foi retirado do manifesto até homologação.


---

## Registro complementar — testes manuais informados pelo usuário (23/11/2026)

**Escopo:** verificações efetuadas pelo usuário em mundo de testes no Foundry VTT 14, com respostas afirmativas durante a sessão de homologação. Este registro não substitui auditoria de regras, verificação de logs nem validação de permissões e migrações. Não marca automaticamente todos os itens detalhados das listas anteriores como concluídos.

- [x] Ficha clássica abre; Jogador e Idade persistem após reabertura e reinício.
- [x] Pontos gastos em atributo e habilidade são alterados, restaurados e persistem.
- [x] Ataque, dano, absorção, redução e cura de PV, desgaste de armadura e persistência.
- [x] Iniciativa e avanço de rodada no Combat Tracker.
- [x] Arma de fogo bloqueia segundo disparo sem recarga; recarga e consumo de munição funcionam.
- [x] Conjuração gera resultado no chat; consumo de PM e persistência conferidos.
- [x] Concessão de 11 PE, tentativa de aprendizado e mudança de nível com persistência.
- [x] Cinco compêndios aparecem e contêm registros (habilidades, armas, equipamentos, feitiços, bestiário).
- [x] Criatura do bestiário importada, ficha preenchida e persistente; iniciativa e ataque em combate.

**Ainda não comprovado por esta sessão:** confronto sistemático com todas as regras do livro; testes negativos de magia e incorporação; todos os limites de evolução; contagem, completude e ausência de duplicatas dos catálogos; nove profissões; migração de mundos antigos; permissões Mestre/jogador; múltiplos clientes; backup e restauração; direitos de redistribuição.

**Resultado:** bateria funcional principal aprovada pelo usuário. RC30 permanece candidata, sem liberação pública integral. Qualquer RC31 exige mudanças concretas, testes e atualização explícita de versão.
