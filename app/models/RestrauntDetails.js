const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let RestrauntDetailSchema = new Schema({
    restrauntId: {
        type: String
    },
    name: {
        type: String
    },
    city: {
        type: String,
        default: ''
    },
    style: {
        type: String
    },
    ranking: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    }
});

var detail = mongoose.model('Detail', RestrauntDetailSchema);

module.exports = {
    detail: detail
}
