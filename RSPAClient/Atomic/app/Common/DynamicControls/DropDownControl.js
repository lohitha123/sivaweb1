"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ControlBase_1 = require("./ControlBase");
var DropDownControl = (function (_super) {
    __extends(DropDownControl, _super);
    function DropDownControl() {
        var _this = _super.call(this) || this;
        _this.options = [];
        _this.controlType = 'dropdown';
        return _this;
    }
    return DropDownControl;
}(ControlBase_1.ControlBase));
exports.DropDownControl = DropDownControl;
//# sourceMappingURL=DropDownControl.js.map