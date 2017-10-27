"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = (function () {
    function Map(menuCode, menuName) {
        this.menucode = menuCode;
        this.menuname = menuName;
        this.lstMenus = new Array();
    }
    Map.prototype.Clear = function () {
        this.lstMenus = null;
        this.lstMenus = new Array(); //clearing
    };
    Map.prototype.get = function () {
        return this.lstMenus;
    };
    Map.prototype.add = function (mcode, mname) {
        this.menucode = mcode;
        this.menuname = mname;
        this.map = new Map(mcode, mname);
        if (this.lstMenus.length != 0) {
            this.lstMenus[this.lstMenus.length] = this.map;
        }
        else {
            this.lstMenus[0] = this.map;
        }
    };
    Object.defineProperty(Map.prototype, "MENUCODE", {
        get: function () {
            return this.menucode;
        },
        set: function (value) {
            this.menucode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "MENUNAME", {
        get: function () {
            return this.menuname;
        },
        set: function (value) {
            this.menuname = value;
        },
        enumerable: true,
        configurable: true
    });
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=MenuMapping.js.map