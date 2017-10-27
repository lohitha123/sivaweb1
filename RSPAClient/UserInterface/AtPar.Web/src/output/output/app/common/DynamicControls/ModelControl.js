"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ModelControl = (function () {
    function ModelControl() {
        this.controlsList = [];
    }
    ModelControl.prototype.toGroup = function () {
        var group = {};
        this.controlsList.forEach(function (question) {
            if (question.required) {
                group[question.key] = new forms_1.FormControl('', forms_1.Validators.required);
            }
            else {
                group[question.key] = new forms_1.FormControl('');
            }
        });
        return new forms_1.FormGroup(group);
    };
    return ModelControl;
}());
exports.ModelControl = ModelControl;
//# sourceMappingURL=ModelControl.js.map