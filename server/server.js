const express = require('express')
const app = express()
const port = 5000
const {db} = require('./firebase.js')


app.get('/index', (req, res) => {
    res.json({"festival" : ["NewYear","Tomb Sweeping"]})
});
app.get('/cart', (req, res) => {
    res.json({data:[{'productname':["apple"], 'image': "C:\Users\piyawan\Desktop\proj_V4\webapp\src\image\apple.png"},{'productname':["orange"], 'image': "C:\Users\piyawan\Desktop\proj_V4\webapp\src\image\orange.png"}]});
});
app.listen(port, () => console.log(`Server listening on port ${port}!`))

app.get('/signup', (req, res) => {
    
})

// app.get("/cart", (req, res) => {
//     res.json({productname:'apple',img:'1234'},{productname:'banana', 'img':'12345'});
//   });
// app.get('/index', (req, res) => {
//     res.json({"festival" : ["NewYear","Tomb Sweeping"]})
// });