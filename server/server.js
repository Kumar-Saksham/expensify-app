const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const PORT = 3000;

app.get('*', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, '../public/index.html')));
});

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
