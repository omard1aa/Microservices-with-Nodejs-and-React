import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Comment from './Comment';
import PostComments from './PostComment';
import Post from './Post';
import PostComment from './PostComment';

const app = express();

app.use(bodyParser.json());

app.use(cors());

const postComments: PostComments[] = [];

app.get("/posts", (req, res) => {
    res.send(postComments);
});

app.post("/events", (req, res) => {
    try {
        const { type, data } = req.body;

        if (type === "CommentCreated") {
            const { id, postId, content, status } = data.comment;
            const postComment = postComments.find(e => e.Post.id == postId);
            if (postComment) {
                const comment = new Comment(id, postId, content, status);
                postComment.Comments.push(comment)
            }
        }

        else if (type === "PostCreated") {
            const { id, title } = data;
            const post = new Post(id, title);
            const postComment = new PostComment(post, []);
            postComments.push(postComment)
        }
        res.status(201).send("PostComment created");
    }
    catch (err) {
        console.error(`Error in query service: ${err}`)
    }
});

app.listen(4002, () => {
    console.log("Query Service started listening on port 4002")
})