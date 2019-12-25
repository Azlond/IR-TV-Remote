
const express = require('express');
const childProcess = require('child_process');
const path = require('path');
const { Keys, KeyBinaryMapping } = require('./src/data/RemoteKeys');
const config = require('./config');

const app = express();

app.use(express.static(__dirname));

// Express route for incoming requests for a customer name
app.get('/api/tv/*', (req, res) => {
    const { url } = req;
    if (url.includes('KEY_')) {
        const key = url.substring(8);
        if (Keys.includes(key)) {
            const command = `sudo ${config.pathToExecutable} ${KeyBinaryMapping[key]}`;
            childProcess.exec(command);
            res.status(200).send(key);
        } else {
            res.status(404).send(`Unrecognised API call - unknown key: ${key}`);
        }
    } else {
        res.status(404).send('Unrecognised API call');
    }
});

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'remote.html'));
});

app.get('/js/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist', req.originalUrl));
});

app.get('/css/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist', req.originalUrl));
});

app.get('/images/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist', req.originalUrl));
});

app.get('/data/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist', req.originalUrl));
});

// Express route for any other unrecognised incoming requests
app.get('/api/*', (req, res) => {
    res.status(404).send('Unrecognised API call');
});

app.get('*', (req, res) => {
    res.status(404).send('Unrecognised path');
});

// Express route to handle errors
app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
    } else {
        next(err);
    }
});

app.listen(config.port);
console.log(`Server running at port ${config.port}`);
