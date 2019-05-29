const fastcsv = require('fast-csv')
const fs = require('fs')
const mongoose = require('mongoose')
const shortid = require('shortid')
const body = require('body-parser')
const sortJsonArray = require('sort-json-array')
const response = require('../libs/responseLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')
const detailModel = require('../models/RestrauntDetails')
const detail = mongoose.model('Detail');

var csvFilePath = '/Users/vikashsingh/Desktop/Restraunts-Backend/assets/details.csv';

let readFile = (req, res) => {

    var dataArr = [];
    fastcsv.fromPath(csvFilePath, {
            headers: true
        })
        .on("data", data => {
            dataArr.push(data);
        })
        .on("end", () => {
            console.log(dataArr.length);
            for (var item of dataArr) {

                new detail({
                        restrauntId: shortid.generate(),
                        name: item.Name,
                        city: item.City,
                        style: item.CuisineStyle,
                        ranking: (check.isEmpty(item.Ranking)) ? dataArr.length : item.Ranking,
                        rating: (check.isEmpty(item.Rating)) ? 0 : item.Rating,
                        numberOfReviews: (check.isEmpty(item.NumberofReviews)) ? 0 : item.NumberofReviews
                    })

                    .save()
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
            let apiResponse = response.generate(false, 'Stored in database successfully', 200, null);
            res.send(apiResponse)

        });
} // end of readfile function

let getAllRestraunts = (req, res) => {

    detail.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {

                console.log(err)
                logger.error(err.message, 'restrauntController: getAllRestraunts', 10)
                let apiResponse = response.generate(true, 'Failed To Find Restraunts Details', 500, null)
                res.send(apiResponse)

            } else if (check.isEmpty(result)) {

                logger.info('No User Found', 'estrauntController: getAllRestraunts')
                let apiResponse = response.generate(true, 'No Restraunt Found', 404, null)
                res.send(apiResponse)

            } else {

                let apiResponse = response.generate(false, 'All Restraunts Details Found', 200, result)
                res.send(apiResponse)

            }
        })


} // end of getAllRestraunts functions

let searchByName = (req, res) => {

    detail.find({
            name: {
                $regex: new RegExp(req.query.name),
                $options: 'i'
            }
        })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {

                console.log(err)
                logger.error(err.message, 'restrauntController: searchByName()', 10)
                let apiResponse = response.generate(true, 'Failed To search Restraunts Details', 500, null)
                res.send(apiResponse)

            } else if (check.isEmpty(result)) {

                logger.info('No User Found', 'estrauntController: getAllRestraunts')
                let apiResponse = response.generate(true, 'No Restraunt Found', 404, null)
                res.send(apiResponse)

            } else {

                let apiResponse = response.generate(false, 'All Restraunts Details Found', 200, result)
                res.send(apiResponse)

            }

        })
}


let searchByCity = (req, res) => {


    detail.find({
            city: {
                $regex: new RegExp(req.query.city),
                $options: 'i'
            }
        })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {

                console.log(err)
                logger.error(err.message, 'restrauntController: searchByCity()', 10)
                let apiResponse = response.generate(true, 'Failed To search Restraunts Details', 500, null)
                res.send(apiResponse)

            } else if (check.isEmpty(result)) {

                logger.info('No User Found', 'estrauntController: getAllRestraunts')
                let apiResponse = response.generate(true, 'No Restraunt Found', 404, null)
                res.send(apiResponse)

            } else {

                let apiResponse = response.generate(false, 'All Restraunts Details Found', 200, result)
                res.send(apiResponse)

            }

        })


} // end of searchByCity function

let sortByRating = (req, res) => {

    detail.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {

                console.log(err)
                logger.error(err.message, 'restrauntController: sortByRating', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)

            } else if (check.isEmpty(result)) {

                logger.info('No Restraunt Found', 'restrauntController: sortByRating')
                let apiResponse = response.generate(true, 'No Restraunt Found', 404, null)
                res.send(apiResponse)

            } else {

                let apiResponse = sortJsonArray(result, 'rating', 'des');
                apiResponse = response.generate(false, 'Restraunt sorted by rating', 200, apiResponse)
                res.send(apiResponse)

            }


        })

} // end of sortByRating function

let sortByRanking = (req, res) => {

    detail.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {

            if (err) {

                console.log(err)
                logger.error(err.message, 'restrauntController: sortByRating', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)

            } else if (check.isEmpty(result)) {

                logger.info('No Restraunt Found', 'restrauntController: sortByRating')
                let apiResponse = response.generate(true, 'No Restraunt Found', 404, null)
                res.send(apiResponse)

            } else {

                let apiResponse = sortJsonArray(result, 'ranking', 'asc');
                apiResponse = response.generate(false, 'Restraunt sorted by ranking', 200, apiResponse)
                res.send(apiResponse)

            }


        })

} // end of sortByRanking


let filterBasedOnCuisineStyle = (req, res) => {

    let style = (!check.isEmpty(req.body.style)) ? req.body.style.split(',') : [];

    console.log(style[0])

    detail.find({
            "style": {
                $in: style
            }
        })
        .exec((err, result) => {

            if (err) {

                console.log(err)
                logger.error(err.message, 'restrauntController: filterBasedOnCuisineStyle()', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)

            } else if (check.isEmpty(result)) {

                logger.info('No Restraunt Found', 'restrauntController: filterBasedOnCuisineStyle()')
                let apiResponse = response.generate(true, 'No Restraunt Found', 404, null)
                res.send(apiResponse)

            } else {

                res.send(result);

            }


        })

} // end of filterBasedOnCuisineStyle function


module.exports = {

    readFile: readFile,
    searchByName: searchByName,
    sortByRanking: sortByRanking,
    sortByRating: sortByRating,
    filterBasedOnCuisineStyle: filterBasedOnCuisineStyle,
    getAllRestraunts: getAllRestraunts,
    searchByCity: searchByCity

}