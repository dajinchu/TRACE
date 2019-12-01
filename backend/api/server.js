const express = require('express');
const cors = require('cors');
const search = require('./search/index');
const app = express();
const port = 3001;
require('dotenv').config();

app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/backend/api/search', search);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));