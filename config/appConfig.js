let appConfig = {}

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "http://localhost:4200";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://localhost:27017/restrauntAppDB'
};
appConfig.apiVersion = "/api/v1";

module.exports = {
    port : appConfig.port,
    allowedCorsOrigin : appConfig.allowedCorsOrigin,
    environment : appConfig.env,
    db : appConfig.db,
    apiVersion : appConfig.apiVersion
}
