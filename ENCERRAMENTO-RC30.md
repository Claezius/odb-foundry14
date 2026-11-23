# Encerramento da fase RC30 — O Desafio dos Bandeirantes

Data: 23/11/2026. Sistema: Foundry VTT 14. Ramificação de desenvolvimento: `release/rc30`.

## Decisão
**Apto para continuar em uso local no mundo de testes, com ressalvas. Não homologado como lançamento público estável.**

## Evidências
- Bateria manual principal confirmada pelo usuário: ficha clássica e persistência de Jogador/Idade, atributos e habilidades, combate, armadura, munição, iniciativa, magia, PE, evolução e importação de criatura.
- Cinco catálogos com 312 registros no total (71 habilidades, 18 armas, 66 equipamentos, 76 feitiços, 81 criaturas); verificação automatizada de integridade estrutural e nomes únicos.
- Regressão automatizada aprovada para commit `56bfba0`, execução nº 68: https://github.com/Claezius/odb-foundry14/actions/runs/45289592668 .
- Verificações estáticas de permissões de edição e de deduplicação aprovadas. A importação repetida e as permissões reais não foram integralmente homologadas em interface.

## Ressalvas aceitas para encerramento da fase
1. Conta de Jogador alterou dados de ficha e as alterações persistiram; nível efetivo de permissão não foi confirmado. Resultado inconclusivo. O usuário decidiu não investigar neste momento.
2. Falta conferir integralmente os registros e as regras contra o livro original.
3. Falta testar restauração de backup, migração de mundos antigos e todas as nove profissões.
4. Direitos para redistribuição pública de arte e dados derivados não confirmados.

## Regras para seguir
- **Não alterar o mundo principal** ou sobrescrever dados sem backup.
- **Não publicar ZIP completo como versão estável** enquanto os direitos de redistribuição não forem resolvidos.
- Evitar alterações de código sem defeito concreto; manter a RC30 como referência de homologação e documentar qualquer nova candidata.
- Não exigir repetição dos testes já aprovados. Reabrir apenas os pontos que afetem uso real ou distribuição.

## Próxima ação
Encerrar a fase de testes extensivos; preparar uma candidata instalável apenas quando o usuário solicitar instalação/atualização, com backup e teste breve de inicialização. Publicação pública fica separada da conclusão técnica local.

## Confirmação posterior de instalação
O usuário instalou o arquivo `odb-foundry14-release-rc30.zip` e informou: **“Com este zip, tudo funcionou.”** Registra-se aprovação de funcionamento da instalação local reportada pelo usuário, sem inferir que todas as ressalvas anteriores tenham sido testadas ou resolvidas. A publicação pública permanece condicionada aos direitos de redistribuição.
