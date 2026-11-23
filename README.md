# O Desafio dos Bandeirantes — Sistema Básico
Implementação comunitária não oficial para Foundry VTT 14. Versão 1.0.0-rc.30; candidata à homologação, não versão estável.

## Instalação local
1. Feche o Foundry e faça backup integral dos mundos e da pasta do sistema anterior no diretório de dados configurado.
2. Extraia a pasta `odb-foundry14` para `Data/systems/`. Use uma cópia do mundo para testes; não sobrescreva os bancos de compêndios existentes sem backup.
3. Abra o Foundry, confira a versão RC30 e siga `HOMOLOGACAO.md`.
4. Como Mestre, crie uma ficha, abra a aba Criação e compêndios e clique em Preencher compêndios. Os diretórios de packs são distribuídos vazios; os catálogos JSON são importados nessa operação. A importação adiciona nomes ausentes, não atualiza registros já existentes.

## Desenvolvimento
Execute `npm test` com Node.js 22 (sem dependências externas). Os testes estáticos e de regras não substituem a execução no Foundry.

## Distribuição
Não oficial. Referência: O Desafio dos Bandeirantes — Aventuras na Terra de Santa Cruz, Módulo Básico (GSA, 1992). Autorização para redistribuir arte da ficha e dados derivados não confirmada. Não publique o pacote integral até resolver essas permissões. Nenhuma licença sobre material de terceiros é concedida aqui. URLs de manifesto e download dependem da definição do repositório e lançamento.

## Alterações RC30 (23/11/2026)
- Registro de modelos explícitos de dados para personagens, NPCs e tipos de itens no Foundry 14.
- Tipos de itens declarados no manifesto para coincidir com os tipos utilizados no código.
- Acesso defensivo à profissão na incorporação, evitando exceção em fichas incompletas.
- Salvamento do formulário limitado aos caminhos do personagem, sem regravar propriedades estranhas.
- Testes de estrutura de modelos adicionados.

**Limitação:** testes automatizados executados com Node.js; não houve teste de interface dentro do Foundry VTT 14. O pacote é candidato a homologação, não uma versão comprovadamente estável.
