"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 5001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('api/user-service', () => {
    return 'bonjour typescript';
});
//lecture sur le port 5001
app.listen(port, () => {
    console.log("le service user est lancé sur le port " + port);
});
