"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const Post_1 = __importDefault(require("./Post"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = [];
app.get('/posts', (req, res) => {
    try {
        res.status(201).send(posts);
    }
    catch (ex) {
        console.error(ex);
    }
});
app.post('/posts', (req, res) => {
    try {
        const id = (0, crypto_1.randomBytes)(4).toString('hex');
        const title = req.body.title;
        const postObj = new Post_1.default(id, title);
        posts.push(postObj);
        axios_1.default.post("http://localhost:4005/events", {
            type: "PostCreated",
            data: postObj
        })
            .then(() => {
            res.status(201).send(postObj);
        })
            .catch(err => console.error("Error in posts service" + err));
    }
    catch (ex) {
        console.error(`Error in posts service:\n${ex}`);
    }
});
app.post('/events', (req, res) => {
    console.log(`Event received, ${req.body.type}`);
    res.send('OK');
});
app.listen(4000, () => {
    console.log("Posts Server started listening on http://localhost:4000");
});
