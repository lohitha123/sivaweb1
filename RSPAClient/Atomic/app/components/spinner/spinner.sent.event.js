"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pub_sub_event_1 = require("./pub.sub.event");
var SpinnerSentEvent = (function (_super) {
    __extends(SpinnerSentEvent, _super);
    function SpinnerSentEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SpinnerSentEvent;
}(pub_sub_event_1.PubSubEvent));
exports.SpinnerSentEvent = SpinnerSentEvent;
//# sourceMappingURL=spinner.sent.event.js.map