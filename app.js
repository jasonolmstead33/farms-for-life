const express = require('express')

const app = express()

const port = 8081

app.get('/ping', (req, res) => res.json({"Hello": "World"}))

app.listen(port, () => console.log('Example app listening on port '+ port))