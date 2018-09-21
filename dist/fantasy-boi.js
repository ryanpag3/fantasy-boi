"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var config_private_json_1 = __importDefault(require("./config.private.json"));
var bot = new discord_js_1.default.Client();
bot.on('ready', function () {
    console.log('ready');
});
bot.login(config_private_json_1.default.token);
//# sourceMappingURL=fantasy-boi.js.map