const express = require('express');
const cors = require('cors');
const search = require('./search/index');
const course = require('./course/index');
const app = express();
const port = 3001;
require('dotenv').config({ path: '../../.env' });

app.use(cors());
app.use('/backend/api/search', search);
app.use('/backend/api/course', course);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));