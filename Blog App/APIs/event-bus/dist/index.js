"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.post('/events', (req, res) => {
    const event = req.body;
    axios_1.default.post("http://localhost:4000/events", event);
    axios_1.default.post("http://localhost:4001/events", event);
    axios_1.default.post("http://localhost:4002/events", event);
    res.send({ status: 'OK' });
});
app.listen(4005, () => {
    console.log("Event-Bus Server started listening on port 4005");
});
