const express = require('express')
const favicon = require('express-favicon');
const path = require('path')

const PORT = process.env.PORT || 8080;
const app = express()
app.use(favicon(__dirname + '/build/favicon.png'));

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)