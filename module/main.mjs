import {registrarRodadas} from "./rodadas.mjs";

import { ODBActorSheet } from "./actor-sheet.mjs";

const SYSTEM_ID = "odb-foundry14";

Hooks.once("init", () => {
  if (game.system.id !== SYSTEM_ID) return;

  CONFIG.Combat.initiative.formula = "1d10";
  registrarRodadas();
  game.settings.register(SYSTEM_ID, "catalogoEvolucao", {name: "Catálogo de evolução", scope: "world", config: false, type: Object, default: {}});

  const DocumentSheetConfig =
    foundry.applications.apps.DocumentSheetConfig;

  DocumentSheetConfig.registerSheet(
    foundry.documents.Actor,
    SYSTEM_ID,
    ODBActorSheet,
    {
      types: ["personagem", "npc"],
      makeDefault: true,
      label: "Ficha O Desafio dos Bandeirantes"
    }
  );

  console.log(
    "ODB | Ficha de personagem registrada"
  );
});

Hooks.once("ready", () => {
  console.log("ODB | Mundo carregado");
});
