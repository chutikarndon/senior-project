const express = require('express')
const app = express()
const port = 5000
const {db} = require('./firebase.js')


app.get('/index', (req, res) => {
    res.json({"festival" : ["NewYear","Tomb Sweeping"]})
})
app.listen(port, () => console.log(`Server listening on port ${port}!`))

app.get('/signup', (req, res) => {
    
})