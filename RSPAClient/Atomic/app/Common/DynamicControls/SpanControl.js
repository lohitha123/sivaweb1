"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ControlBase_1 = require("./ControlBase");
var SpanControl = (function (_super) {
    __extends(SpanControl, _super);
    function SpanControl() {
        var _this = _super.call(this) || this;
        _this.controlType = 'span';
        return _this;
    }
    return SpanControl;
}(ControlBase_1.ControlBase));
exports.SpanControl = SpanControl;
//# sourceMappingURL=SpanControl.js.map