const mongo = require('mongoose')

mongo.connect("mongodb+srv://admin:admin@ecf-crud.pjwr7.mongodb.net/mean?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log('mongo connecté')
        },
        err => console.error('mongo non connecté : ' + err))

module.exports = mongo