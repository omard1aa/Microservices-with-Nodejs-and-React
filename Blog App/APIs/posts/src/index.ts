import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import Post from './Post';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json())
app.use(cors());

const posts: Post[] = []

app.get('/posts', (req, res) => {
    try {
        res.status(201).send(posts);
    }
    catch (ex) {
        console.error(ex);
    }
})

app.post('/posts', (req, res) => {
    try {
        const id = randomBytes(4).toString('hex');
        const title: string = req.body.title;
        const postObj = new Post(id, title);
        posts.push(postObj);

        axios.post("http://localhost:4005/events", {
            type: "PostCreated",
            data: postObj
        })
            .then(() => {
                res.status(201).send(postObj)
            })
            .catch(err => console.error("Error in posts service" + err))
    }
    catch (ex) {
        console.error(`Error in posts service:\n${ex}`)
    }
})

app.post('/events', (req, res) => {
    console.log(`Event received, ${req.body.type}`);
    res.send('OK');
})

app.listen(4000, () => {
    console.log("Posts Server started listening on http://localhost:4000")
})