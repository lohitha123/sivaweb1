"use strict";
var AtParConstants = (function () {
    function AtParConstants() {
    }
    AtParConstants.prototype.catchClientError = function (statusMsgs, spnrService, errorMsg) {
        spnrService.stop();
        statusMsgs.push({ severity: 'error', summary: 'error', detail: AtParConstants.ClientErrorMessage + ":" + errorMsg.toString() });
    };
    return AtParConstants;
}());
AtParConstants.PRODUCT_NAME = 'AtPar';
AtParConstants.ClientErrorMessage = 'Internal Client Error';
exports.AtParConstants = AtParConstants;
//# sourceMappingURL=AtParConstants.js.map