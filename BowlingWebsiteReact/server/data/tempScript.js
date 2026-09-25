"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateTeamData_ts_1 = require("./TeamData/generateTeamData.ts");
var generatePlayerData_ts_1 = require("./PlayerData/generatePlayerData.ts");
(0, generateTeamData_ts_1.generateTeamData)(true);
(0, generateTeamData_ts_1.generateTeamData)(false);
(0, generatePlayerData_ts_1.generateTourneyData)(true);
(0, generatePlayerData_ts_1.generateTourneyData)(false);
