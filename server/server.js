const express = require('express')
const app = express()

app.get('/',(req, res) => {
    console.log('Here')
    res.status(500).send('luminosity-led Node Server')
})

app.listen(8080)