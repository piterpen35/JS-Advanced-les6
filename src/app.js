const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3000;

const getResult = require(path.resolve(__dirname, 'components', 'get-result.js'));

const app = express();

app.use(express.json());
app.use(bodyParser.json());


app.get('/convert/:uah', async (req, res) => {
    const result = await getResult(req.params.uah);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(result);
});

app.use(express.static(path.resolve(__dirname, 'UI')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'UI', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
