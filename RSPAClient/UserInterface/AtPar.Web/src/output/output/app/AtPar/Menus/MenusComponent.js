"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MenusService_1 = require("../Menus/MenusService");
var MenuMapping_1 = require("../Menus/MenuMapping");
//import { SpinnerService } from '../../components/spinner/spinner-service';
var MenuComponent = (function () {
    function MenuComponent(menulistService) {
        this.menulistService = menulistService;
        this.data = "0";
        this.MenusList1 = [];
        this.menucode = "";
        this.menuname = "";
        this.prevappid = -1;
        this.istrue = true;
        this.mainMenus = new Array();
        this.subMenus = new Array();
        this.menulistnames = new MenuMapping_1.Map("", "");
        this.submenulistnames = new MenuMapping_1.Map("", "");
    }
    MenuComponent.prototype.getmenulist = function () {
        try {
            //this.spinnerService.start();
            //this.menulistService.getmenulist().forEach(z => {
            //    this.menus = z.DataList
            //    for (let u = 0; u < this.menus.length; u++) {
            //        //this.profileId = this.menus[u].PROFILE_ID;
            //        //this.appId = this.menus[u].APP_ID;
            //        //this.serverUser = this.menus[u].SERVER_USER;
            //        //this.clientUser = this.menus[u].CLIENT_USER;
            //        //this.LdapUser = this.menus[u].LAST_UPDATE_USER;
            //        //if (this.serverUser.toUpperCase() == "Y") {
            //        if (this.prevappid != this.menus[u].APP_ID) {
            //            this.prevappid = this.menus[u].APP_ID;
            //            this.menulistnames.add(this.menus[u].APP_ID.toString(), this.menus[u].APP_NAME.toString());
            //        }
            //        else {
            //            this.prevappid = this.menus[u].APP_ID;
            //            if (this.menus.length < u + 1) {
            //                this.menulistnames.add(this.menus[u].APP_ID.toString(), this.menus[u].APP_NAME.toString());
            //            }
            //        }
            //    }
            //    // }
            //    this.mainMenus = this.menulistnames.get();
            //    this.subMenus = this.submenulistnames.get();
            //    this.spinnerService.stop();
            //});
        }
        catch (ex) {
            throw ex;
        }
    };
    MenuComponent.prototype.ngOnInit = function () {
        this.getmenulist();
    };
    MenuComponent.prototype.onSelect = function (appId, profileid) {
        this.submenulistnames.Clear();
        this.data = appId.toString();
        this.appId = appId;
        this.profileId = profileid;
        for (var u = 0; u < this.menus.length; u++) {
            if (appId == this.menus[u].APP_ID) {
                //this.submenulistnames.add(this.menus[u].ROUTE.toString(), this.menus[u].MENU_NAME.toString());
            }
        }
        this.subMenus = this.submenulistnames.get();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MenuComponent.prototype, "data", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu-app',
            templateUrl: './app/AtPar/Menus/Menus.html',
            providers: [MenusService_1.MenuServices]
        }),
        __metadata("design:paramtypes", [MenusService_1.MenuServices])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=MenusComponent.js.map