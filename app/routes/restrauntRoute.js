const express = require('express');
const userController = require('./../../app/controllers/userController');
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const restrauntController = require('./../controllers/restrauntControllers')

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/restraunts`;

    app.get(`${baseUrl}/csv`, restrauntController.readFile);

    app.get(`${baseUrl}/searchByName`, auth.isAuthorized, restrauntController.searchByName);

    app.get(`${baseUrl}/filter/city`, auth.isAuthorized, restrauntController.searchByCity);

    app.get(`${baseUrl}/all`, auth.isAuthorized, restrauntController.getAllRestraunts);

    app.get(`${baseUrl}/sort/rating`, auth.isAuthorized, restrauntController.sortByRating);

    app.get(`${baseUrl}/sort/ranking`, auth.isAuthorized, restrauntController.sortByRanking);

    app.post(`${baseUrl}/filter/style`, auth.isAuthorized, restrauntController.filterBasedOnCuisineStyle);

}

module.exports = {
    setRouter : setRouter
}