"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = parseCommand;
exports.generateTourneyData = generateTourneyData;
exports.identifyNewData = identifyNewData;
exports.getPlayerResults = getPlayerResults;
exports.getAverageAndTotal = getAverageAndTotal;
exports.getWeeklyResults = getWeeklyResults;
var node_child_process_1 = require("node:child_process");
var util_1 = require("util");
var execFileAsync = (0, util_1.promisify)(node_child_process_1.execFile);
var node_fs_1 = require("node:fs");
var promises_1 = require("node:fs/promises");
var node_path_1 = require("node:path");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var dirname = node_path_1.default.dirname(__filename);
var pythonScript = node_path_1.default.resolve(dirname, "./resultsParser.py");
var mFolder = node_path_1.default.resolve(dirname, "./Mens_Results_Individual");
var wFolder = node_path_1.default.resolve(dirname, "./Womens_Results_Individual");
var mensCSVs = (await (0, promises_1.readdir)(mFolder)).filter(function (file) { return file.endsWith(".csv"); })
    .map(function (file) { return node_path_1.default.join(mFolder, file); });
var womensCSVs = (await (0, promises_1.readdir)(wFolder)).filter(function (file) { return file.endsWith(".csv"); })
    .map(function (file) { return node_path_1.default.join(wFolder, file); });
/*
Lets break down some stuff
execFile: Executes a file via command
execFileAsync: execFile but promise based. The promise being that the file is executed
readdir: Read directory
path.resolve: Creates a path.

Why use await for the CSVs consts? Because we are searching for files in our system that may not exist.
Note: JSON.parse() is picky asf. Cannot use single quotes
*/
function parseCommand(tournamentPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, stdout, stderr, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // return `python resultsParser.py ${tournamentPath}`
                    if (typeof tournamentPath === 'undefined') {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, execFileAsync("python", [pythonScript, "".concat(tournamentPath)])];
                case 1:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    if (stderr) {
                        // console.error(stderr);
                    }
                    result = JSON.parse(stdout);
                    return [2 /*return*/, result];
            }
        });
    });
}
/*
This function creates the mensResultsObject.ts and womensResultsObject.ts files by
parsing the CSVs located within Mens_Results_Individual and Results_Women_Individual.
*/
function generateTourneyData(male) {
    return __awaiter(this, void 0, void 0, function () {
        var objectName, folder, objectPath, mensDataSorted, allMensData, tournamentNames, _i, folder_1, tournament, results, _a, results_1, row, tourneyName, tourneyDate, arrayFromTournamentSet, objectContents;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (male) {
                        objectName = "mensResultsObject";
                        folder = mensCSVs;
                    }
                    else {
                        objectName = "womensResultsObject";
                        folder = womensCSVs;
                    }
                    objectPath = node_path_1.default.resolve(dirname, "./".concat(objectName, ".ts"));
                    mensDataSorted = {};
                    allMensData = [];
                    tournamentNames = new Map();
                    _i = 0, folder_1 = folder;
                    _d.label = 1;
                case 1:
                    if (!(_i < folder_1.length)) return [3 /*break*/, 4];
                    tournament = folder_1[_i];
                    return [4 /*yield*/, parseCommand(tournament)];
                case 2:
                    results = _d.sent();
                    if (typeof results === 'undefined') {
                        return [3 /*break*/, 3];
                    } // Iterating through the results of a CSV
                    for (_a = 0, results_1 = results; _a < results_1.length; _a++) {
                        row = results_1[_a];
                        tourneyName = tournament.split(/[\\.]/).at(-2);
                        tourneyDate = "".concat(tournament.split(/[\\.]/).at(-3), "T12:00:00");
                        row.tournamentName = tourneyName;
                        tournamentNames.set(tourneyName, tourneyDate);
                        // If the record already contains data for a player, push their corresponding data to their entry.
                        if (mensDataSorted[row.Name]) {
                            (_b = mensDataSorted[row.Name]) === null || _b === void 0 ? void 0 : _b.push(row);
                        }
                        else { // If the record doesn't contain the player, initialize their entry with a blank array and push their data to it
                            mensDataSorted[row.Name] = [];
                            (_c = mensDataSorted[row.Name]) === null || _c === void 0 ? void 0 : _c.push(row);
                        }
                    }
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    arrayFromTournamentSet = Array.from(tournamentNames);
                    objectContents = "import type { resultsInterface } from \"../Interfaces/resultsInterface.ts\";\n    export const ".concat(objectName, ": Record<string, resultsInterface[]> = ").concat(JSON.stringify(mensDataSorted, null, 4), "\n    export const tournamentSet: [string, string][] = ").concat(JSON.stringify(arrayFromTournamentSet));
                    node_fs_1.default.writeFileSync(objectPath, objectContents);
                    return [2 /*return*/, { mensDataSorted: mensDataSorted, arrayFromTournamentSet: arrayFromTournamentSet }];
            }
        });
    });
}
/*
This function is used to recognize when new results have been added to my results folders but
they have not yet been parsed.
*/
function identifyNewData(male, memoryTList) {
    return __awaiter(this, void 0, void 0, function () {
        var folder, playersObject, tList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof memoryTList !== "undefined")) return [3 /*break*/, 5];
                    if (!male) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, promises_1.readdir)(mFolder)];
                case 1:
                    mensCSVs = (_a.sent()).filter(function (file) { return file.endsWith(".csv"); })
                        .map(function (file) { return node_path_1.default.join(mFolder, file); });
                    folder = mensCSVs;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, promises_1.readdir)(wFolder)];
                case 3:
                    womensCSVs = (_a.sent()).filter(function (file) { return file.endsWith(".csv"); })
                        .map(function (file) { return node_path_1.default.join(wFolder, file); });
                    folder = womensCSVs;
                    _a.label = 4;
                case 4:
                    if (memoryTList.length === folder.length && memoryTList.every(function (_a, index) {
                        var first = _a[0];
                        return first === folder[index].split(/[\\.]/).at(-2);
                    })) {
                        // console.log(folder[0]!.split(/[\\.]/).at(-2));
                        return [2 /*return*/, false]; // No new data
                    }
                    else {
                        return [2 /*return*/, true]; // There is new data
                    }
                    return [3 /*break*/, 12];
                case 5:
                    if (!male) return [3 /*break*/, 8];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./mensResultsObject.ts'); })];
                case 6:
                    playersObject = _a.sent();
                    tList = playersObject.tournamentSet.map(function (item) { return item[0]; });
                    return [4 /*yield*/, (0, promises_1.readdir)(mFolder)];
                case 7:
                    mensCSVs = (_a.sent()).filter(function (file) { return file.endsWith(".csv"); })
                        .map(function (file) { return node_path_1.default.join(mFolder, file); });
                    folder = mensCSVs;
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, Promise.resolve().then(function () { return require('./womensResultsObject.ts'); })];
                case 9:
                    playersObject = _a.sent();
                    tList = playersObject.tournamentSet.map(function (item) { return item[0]; });
                    return [4 /*yield*/, (0, promises_1.readdir)(wFolder)];
                case 10:
                    womensCSVs = (_a.sent()).filter(function (file) { return file.endsWith(".csv"); })
                        .map(function (file) { return node_path_1.default.join(wFolder, file); });
                    folder = womensCSVs;
                    _a.label = 11;
                case 11:
                    if (tList.length === folder.length && tList.every(function (val, index) { return val === folder[index].split(/[\\.]/).at(-2); })) {
                        // console.log(folder[0]!.split(/[\\.]/).at(-2));
                        return [2 /*return*/, false]; // No new data
                    }
                    else {
                        return [2 /*return*/, true]; // There is new data
                    }
                    _a.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
}
/*
This function gets a specific player's results from one of my results objects.
*/
function getPlayerResults(male, name, dataFromMemory) {
    return __awaiter(this, void 0, void 0, function () {
        var results, mensResultsObject_1, womensResultsObject_1, toReturn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(dataFromMemory !== undefined)) return [3 /*break*/, 1];
                    results = dataFromMemory;
                    return [3 /*break*/, 5];
                case 1:
                    if (!male) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('./mensResultsObject.ts'); })];
                case 2:
                    mensResultsObject_1 = (_a.sent()).mensResultsObject;
                    results = mensResultsObject_1;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, Promise.resolve().then(function () { return require('./womensResultsObject.ts'); })];
                case 4:
                    womensResultsObject_1 = (_a.sent()).womensResultsObject;
                    results = womensResultsObject_1;
                    _a.label = 5;
                case 5:
                    toReturn = results[name];
                    if (!toReturn) {
                        return [2 /*return*/, []];
                    }
                    ;
                    return [2 /*return*/, toReturn];
            }
        });
    });
}
/*
This function simply calculates the average and total of a given player's records.
*/
function getAverageAndTotal(results) {
    if (results.length == 0) {
        return { avg: 0, gamesBowled: 0 };
    }
    var total = 0;
    var gamesBowled = 0;
    for (var _i = 0, results_2 = results; _i < results_2.length; _i++) {
        var result = results_2[_i];
        total += result.Total;
        gamesBowled += result.Gm;
    }
    var avg = total / gamesBowled;
    return { avg: avg, gamesBowled: gamesBowled };
}
function getWeeklyResults() {
}
