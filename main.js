let express = require('express')
let cors = require('cors')

let userRout = require('./routeur/user.routeur')

let app = new express()

app.use(cors())
app.use('/api/users', userRout)

app.get('/', (req, res) => {
    res.send('<h1>hello</h1>')
})

app.listen(3000)