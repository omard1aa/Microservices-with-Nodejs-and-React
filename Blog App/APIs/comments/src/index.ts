import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import Comment from './Comment';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 4001;
app.use(bodyParser.json());
app.use(cors())
const comments: Comment[] = [];

app.get('/posts/:id/comments', (req, res) => {
    try {
        const postId = req.params.id;
        res.status(201).send(comments.filter(x => x.postId == postId))
    }
    catch (ex) {
        console.error(ex)
    }
})

app.get('/posts/comments', (req, res) => {
    try {
        res.status(201).send(comments)
    }
    catch (ex) {
        console.error(ex)
    }
})

app.post('/posts/:id/comments', (req, res) => {
    try {
        const id = randomBytes(4).toString('hex');
        const postId = req.params.id;
        const content = req.body.content;
        const status = "pending";
        const commentObj = new Comment(id, postId, content, status);
        comments.push(commentObj);

        axios.post("http://localhost:4005/events", {
            type: "CommentCreated",
            data: { comment: commentObj },
            status: "pending"
        })

        res.status(201).send(commentObj);
    }
    catch (ex) {
        console.error(ex)
    }
})

app.post('/events', async (req, res) => {
    console.log(`Event received, ${req.body.type}`);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, postId, status, content } = data;

        const commentsObj = comments.filter(x => x.postId == postId)
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        if (comment) comment.status = status;

        await axios.post('http://localhost:4005', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({});
})

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`)
})