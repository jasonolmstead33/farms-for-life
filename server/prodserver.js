const serverSetup = require('./index.js');
const express = require('express');

const app = serverSetup.appSettings();

// setup client routes
const angularDist = './dist/farms-for-life-ordering';

// assume everthing not covered by the server is angular
app.use(express.static(angularDist))
app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: angularDist });
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port :${port}`));