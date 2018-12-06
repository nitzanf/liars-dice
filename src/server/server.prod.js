import path from 'path';
import express from 'express';

const http = require('http').Server(app);
const io = require('socket.io')(http);

const server = require('./game/index.js');
const Game = require('./game/Game.js');

const port = process.env.PORT || 8080;

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

app.listen(port, () => {
    console.log(`App listening to ${port}`);
});

const game = new Game();
server.run(io, game);