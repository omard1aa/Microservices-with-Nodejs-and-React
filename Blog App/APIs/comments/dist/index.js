"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = require("crypto");
const Comment_1 = __importDefault(require("./Comment"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 4001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const comments = [];
app.get('/posts/:id/comments', (req, res) => {
    try {
        const postId = req.params.id;
        res.status(201).send(comments.filter(x => x.postId == postId));
    }
    catch (ex) {
        console.error(ex);
    }
});
app.get('/posts/comments', (req, res) => {
    try {
        res.status(201).send(comments);
    }
    catch (ex) {
        console.error(ex);
    }
});
app.post('/posts/:id/comments', (req, res) => {
    try {
        const id = (0, crypto_1.randomBytes)(4).toString('hex');
        const postId = req.params.id;
        const content = req.body.content;
        const commentObj = new Comment_1.default(id, postId, content);
        comments.push(commentObj);
        axios_1.default.post("http://localhost:4005/events", {
            type: "CommentCreated",
            data: { comment: commentObj }
        });
        res.status(201).send(commentObj);
    }
    catch (ex) {
        console.error(ex);
    }
});
app.post('/events', (req, res) => {
    console.log(`Event received, ${req.body.type}`);
    res.send({});
});
app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});
