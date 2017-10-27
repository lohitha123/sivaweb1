"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var event_base_1 = require("./event.base");
var PubSubEvent = (function (_super) {
    __extends(PubSubEvent, _super);
    function PubSubEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.source = new Subject_1.Subject();
        // Observable string streams
        _this.observable = _this.source.asObservable();
        // Cache array of tuples
        _this.subscriptions = [];
        return _this;
    }
    PubSubEvent.prototype.subscribe = function (observer) {
        if (this.subscriptions.find(function (item) { return item[0] === observer; }) !== undefined)
            return;
        var subscription = this.observable.subscribe(observer);
        this.subscriptions.push([observer, subscription]);
    };
    PubSubEvent.prototype.publish = function (payload) {
        this.source.next(payload);
    };
    PubSubEvent.prototype.unsubscribe = function (observer) {
        var foundIndex = this.subscriptions.findIndex(function (item) { return item[0] === observer; });
        if (foundIndex > -1) {
            var subscription = this.subscriptions[foundIndex][1];
            //if (subscription.isUnsubscribed === false) {
            subscription.unsubscribe();
            console.log('unsubscribe successful');
            // }
            this.subscriptions.splice(foundIndex, 1); //removes item
        }
    };
    PubSubEvent = __decorate([
        core_1.Injectable()
    ], PubSubEvent);
    return PubSubEvent;
}(event_base_1.EventBase));
exports.PubSubEvent = PubSubEvent;
//# sourceMappingURL=pub.sub.event.js.map