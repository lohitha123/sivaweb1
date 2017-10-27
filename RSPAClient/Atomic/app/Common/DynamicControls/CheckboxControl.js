"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ControlBase_1 = require("./ControlBase");
var CheckboxControl = (function (_super) {
    __extends(CheckboxControl, _super);
    function CheckboxControl() {
        var _this = _super.call(this) || this;
        _this.controlType = 'checkbox';
        return _this;
    }
    return CheckboxControl;
}(ControlBase_1.ControlBase));
exports.CheckboxControl = CheckboxControl;
//# sourceMappingURL=CheckboxControl.js.map