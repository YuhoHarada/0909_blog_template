const express = require('express')
const app = express()
const fs = require("fs")
const bodyParser = require('body-parser')
const PORT = process.env.PORT||3002

const navData = require('./navData.json')
const blogData = require('./blogData.json')
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log('server listening at 3002')
})

navData.forEach(elt => {
    app.get(elt.url, (req, res) => {
        elt.data.title = `Nordic Rose`
        elt.data.blogdata = blogData
        if (elt.name == "article") elt.data.id = req.params.id
        res.status(200).render(elt.name, elt.data)
    })
})

app.post('/newPost', (req, res) => {
    const fileName = 'blogData.json'
    let today = new Date()
    let newData = {
        url: req.body.url,
        title: req.body.title,
        body: req.body.body,
        published_at: `${month[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`,
        duration: Math.ceil(req.body.body.length / 400),
        author: req.body.author,
        author_bild: req.body.author_bild
    }
    console.log(newData)
    if (!fs.existsSync(fileName)) {
        newData.id = 0
        let data = []
        data.push(newData)
        data = JSON.stringify(data)
        fs.writeFile(fileName, data, (err) => {
            if (err) throw err
            console.log("Data written")
        })
    } else {
        let myData = fs.readFileSync(fileName, 'utf-8')
        myData = JSON.parse(myData)
        newData.id = myData.length
        myData.push(newData)
        fs.writeFile(fileName, JSON.stringify(myData), (err) => {
            if (err) throw err
            console.log("Data written")
        })
    }
    res.status(201).redirect('/new')
})

app.use((req, res) => {
    res.render('404', { title: '404', active: "404" })
})
