"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ControlBase_1 = require("./ControlBase");
var TextboxControl = (function (_super) {
    __extends(TextboxControl, _super);
    function TextboxControl() {
        var _this = _super.call(this) || this;
        _this.controlType = 'textbox';
        return _this;
    }
    return TextboxControl;
}(ControlBase_1.ControlBase));
exports.TextboxControl = TextboxControl;
//# sourceMappingURL=TextboxControl.js.map