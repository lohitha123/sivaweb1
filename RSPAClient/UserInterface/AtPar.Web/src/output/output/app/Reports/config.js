"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    Config.getPath = function (value) {
        var apiEndPoint = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingStarterApi/";
        // let apiEndPoint = "http://localhost/WebApi2StarterKit/";
        // let apiEndPoint = "http://Localhost/AtPar/ReportingStarterApi/"
        switch (value) {
            case "register":
                return apiEndPoint + "api/Account/Register";
            case "login":
                return apiEndPoint + "Token";
            case "logout":
                return apiEndPoint + "api/Account/Logout";
            case "getizendatoken":
                return apiEndPoint + "api/User/GenerateToken";
            default:
                return "";
        }
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map