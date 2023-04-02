import express from "express";
import bodyParser from 'body-parser';
import axios from 'axios'
import Comment from './Comment';

const app = express();
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    const comment = new Comment(data.id, data.postId, data.cntent, data.status)
    if (type === 'CommentCreated') {
        comment.status = data.content.includes('shame on you') ? 'rejected' : 'approved';
    }

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: comment
    })
})

app.listen(4003, () => {
    console.log('Listening on 4003')
})