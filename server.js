'use strict';
const path = require('path');
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

const staticPath = path.join(__dirname, '/build');
app.use(express.static(staticPath));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
