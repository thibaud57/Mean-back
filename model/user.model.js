let myMong = require('../myMong')

const userM = new myMong.Schema({
    name: String, // String is shorthand for {type: String}
    pass: String,
    mail: String,
    key: String,
    tasks: [{ title: String, content: String, state: Number }],
})

const userCol = myMong.model('User', userM)

module.exports = userCol;