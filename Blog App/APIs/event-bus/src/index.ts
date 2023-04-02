import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post("http://localhost:4000/events", event).catch((err) => {
        res.status(500).send("Error happened");
        console.log("Error in posts service, 4000: " + err)
    });
    axios.post("http://localhost:4001/events", event).catch((err) => {
        res.status(500).send("Error happened");
        console.log("Error in comments service, 4001: " + err)
    });
    axios.post("http://localhost:4002/events", event).catch((err) => {
        res.status(500).send("Error happened")
        console.log("Error in query service, 4002: " + err)
    });
    axios.post("http://localhost:4003/events", event).catch((err) => {
        res.status(500).send("Error happened")
        console.log("Error in query service, 4002: " + err)
    });

    res.send({ status: 'OK' })
})

app.listen(4005, () => {
    console.log("Event-Bus Server started listening on port 4005")
})