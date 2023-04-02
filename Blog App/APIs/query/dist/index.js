"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const Comment_1 = __importDefault(require("./Comment"));
const Post_1 = __importDefault(require("./Post"));
const PostComment_1 = __importDefault(require("./PostComment"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const postComments = [];
app.get("/posts", (req, res) => {
    res.send(postComments);
});
app.post("/events", (req, res) => {
    try {
        const type = req.body.type;
        const data = req.body.data;
        if (type === "CommentCreated") {
            const { id, postId, content } = data.comment;
            const postComment = postComments.find(e => e.Post.id == postId);
            if (postComment) {
                const comment = new Comment_1.default(id, postId, content);
                postComment.Comments.push(comment);
            }
        }
        else if (type === "PostCreated") {
            const { id, title } = data;
            const post = new Post_1.default(id, title);
            const postComment = new PostComment_1.default(post, []);
            postComments.push(postComment);
        }
        res.status(201).send("PostComment created");
    }
    catch (err) {
        console.error(`Error in query service: ${err}`);
    }
});
app.listen(4002, () => {
    console.log("Query Service started listening on port 4002");
});
