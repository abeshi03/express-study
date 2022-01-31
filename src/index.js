"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router_1 = require("./interfaces/router");
var app = express_1["default"]();
var port = 3000;
app.use("/", router_1.router);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
