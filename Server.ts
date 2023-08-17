// Simple server to serve the game files

import express from 'express';
import * as path from 'path';

const app = express();

app.use(express.static('public'));
app.use(express.static('dist', { index: false, extensions: [ "js" ] }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
