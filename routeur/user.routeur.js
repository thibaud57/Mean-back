let express = require('express')
let model = require('../model/user.model')

//let bodyP = require('body-parser')

let routeur = express.Router()

routeur.use(express.urlencoded())
routeur.use(express.json())

//GET ALL
routeur.get('/', (req, res) => {
    model.find().then(datas => {
        res.json(datas)
    })
})

//GET ONE
routeur.get('/:id', (req, res) => {
    model.findById(req.params.id).then(data => {
        res.json(data)
    })
})

//ADD
routeur.post('/', (req, res) => {
    let newUser = model({
        name: req.body.name,
        pass: req.body.pass,
        mail: req.body.mail,
    })
    newUser.save().then(() => {
        res.json({ mess: "utilisateur ajouté" })
    })
})

//MODIFY
routeur.put('/:id', (req, res) => {
    model.findById(req.params.id).then(data => {
        console.log(data)
        console.log(req.body)
        data.name = req.body.name
        data.pass = req.body.pass
        data.mail = req.body.mail
        data.save().then(() => {
            res.json({ mess: "utilisateur modifié" })
        })
    })
})

//DELETE
routeur.delete('/:id', (req, res) => {
    model.findById(req.params.id).then(data => {
        data.delete().then(() => {
            res.json({ mess: "utilisateur supprimé" })
        })
    })
})

//ADD TASK
routeur.post('/:id/tache', (req, res) => {
    console.log("jdjsdkdjskd")
    console.log(req)
    let newTask = {
        title: req.body.title,
        content: req.body.content,
        state: req.body.state
    }
    model.findById(req.params.id).then(data => {
        data.tasks.push(newTask)
        data.save().then(() => {
            res.json({ mess: "tache ajoutée" })
        })
    })})

//UPDATE TASK
routeur.put('/:id/tache/:num', (req, res) => {
    console.log(req.params.num)
    model.findById(req.params.id).then(data => {
        for(let i=0; i < data.tasks.length; i++){
            if(data.tasks[i]._id == req.params.num){
                data.tasks[i].title = req.body.title,
                data.tasks[i].content = req.body.content,
                data.tasks[i].state = req.body.state
            }
        }
        data.save().then(() => {
            res.json({ mess: "tache modifiée" })
        })
    })
})

//DELETE TASK
routeur.delete('/:id/tache/:num', (req, res) => {
    model.findById(req.params.id).then(data => {
        for(let i=0; i < data.tasks.length; i++){
            if(data.tasks[i]._id == req.params.num){
                console.log("this delete")
                data.tasks.splice(i, 1)
            }
        }
        data.save().then(() => {
            res.json({ mess: "tache supprimée" })
        })
    })
})

//CONNECT
routeur.post('/connect', (req, res) => {
    let userAuth = model({
        pass: req.body.pass,
        mail: req.body.mail,
    })
    model.find().then((data) => {
        booltest = true;
        for(let i=0; i < data.length; i++){
            if(userAuth.mail === data[i].mail && userAuth.pass === data[i].pass){
                res.json(data[i].id)
                booltest = false;
            }
        }
        if(booltest){
            res.json("notfind")  
        }
    })
})

module.exports = routeur