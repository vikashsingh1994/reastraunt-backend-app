const mongoose = require('mongoose')
const Schema = mongoose.Schema

const time = require('./../libs/timeLib')

const Auth = new Schema({
    userId: {
        type: String
    },
    authToken: {
        type: String
    },
    tokenSecret: {
        type: String
    },
    tokenGenerationTime: {
        type: Date,
        default: Date.now()
    }
})

var auth = mongoose.model('Auth', Auth);

module.exports = {
    auth : auth
}