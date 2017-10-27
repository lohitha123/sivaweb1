webpackJsonp([15],{

/***/ 1397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//export * from './atparx-routing.module';
//export * from './atparx.module';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1694));
__export(__webpack_require__(1680));
__export(__webpack_require__(1681));
__export(__webpack_require__(1682));
__export(__webpack_require__(1685));
__export(__webpack_require__(1686));
__export(__webpack_require__(1687));
__export(__webpack_require__(1689));
__export(__webpack_require__(1690));
__export(__webpack_require__(1691));
__export(__webpack_require__(1692));
__export(__webpack_require__(1693));
__export(__webpack_require__(1684));
__export(__webpack_require__(1683));


/***/ }),

/***/ 1680:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var CreateOrdersComponent = (function () {
    function CreateOrdersComponent() {
        this.appID = AtParEnums_1.EnumApps.Pharmacy.toString();
    }
    CreateOrdersComponent.prototype.OnDestroy = function () {
        this.appID = null;
    };
    return CreateOrdersComponent;
}());
CreateOrdersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1913)
    }),
    __metadata("design:paramtypes", [])
], CreateOrdersComponent);
exports.CreateOrdersComponent = CreateOrdersComponent;


/***/ }),

/***/ 1681:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var DepartmentDeviceAllocationComponent = (function () {
    function DepartmentDeviceAllocationComponent() {
        this.atParXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return DepartmentDeviceAllocationComponent;
}());
DepartmentDeviceAllocationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1914)
    })
], DepartmentDeviceAllocationComponent);
exports.DepartmentDeviceAllocationComponent = DepartmentDeviceAllocationComponent;


/***/ }),

/***/ 1682:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var DepartmentLocationAllocationComponent = (function () {
    function DepartmentLocationAllocationComponent() {
        this.atParXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return DepartmentLocationAllocationComponent;
}());
DepartmentLocationAllocationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1915)
    })
], DepartmentLocationAllocationComponent);
exports.DepartmentLocationAllocationComponent = DepartmentLocationAllocationComponent;


/***/ }),

/***/ 1683:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var DepartmentUserAllocationAssignComponent = (function () {
    function DepartmentUserAllocationAssignComponent() {
        this.atParXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return DepartmentUserAllocationAssignComponent;
}());
DepartmentUserAllocationAssignComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1916)
    })
], DepartmentUserAllocationAssignComponent);
exports.DepartmentUserAllocationAssignComponent = DepartmentUserAllocationAssignComponent;


/***/ }),

/***/ 1684:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var DepartmentUserAllocationHomeComponent = (function () {
    function DepartmentUserAllocationHomeComponent() {
        this.atParXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return DepartmentUserAllocationHomeComponent;
}());
DepartmentUserAllocationHomeComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1917)
    })
], DepartmentUserAllocationHomeComponent);
exports.DepartmentUserAllocationHomeComponent = DepartmentUserAllocationHomeComponent;


/***/ }),

/***/ 1685:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DepartmentUserAllocationComponent = (function () {
    function DepartmentUserAllocationComponent() {
    }
    return DepartmentUserAllocationComponent;
}());
DepartmentUserAllocationComponent = __decorate([
    core_1.Component({
        template: '<router-outlet></router-outlet>',
    })
], DepartmentUserAllocationComponent);
exports.DepartmentUserAllocationComponent = DepartmentUserAllocationComponent;
//import { Component } from '@angular/core';
//import { EnumApps } from '../Shared/AtParEnums';
//@Component({
//  
//    templateUrl: 'atparx-dept-user-alloc.component.html'
//})
//export class DepartmentUserAllocationComponent {
//    atParXAppId: number = EnumApps.Pharmacy;
//} 


/***/ }),

/***/ 1686:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ManageParLocationComponent = (function () {
    function ManageParLocationComponent() {
    }
    return ManageParLocationComponent;
}());
ManageParLocationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1918)
    })
], ManageParLocationComponent);
exports.ManageParLocationComponent = ManageParLocationComponent;


/***/ }),

/***/ 1687:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var ProcessesComponent = (function () {
    function ProcessesComponent() {
        this.atparXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return ProcessesComponent;
}());
ProcessesComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1919)
    })
], ProcessesComponent);
exports.ProcessesComponent = ProcessesComponent;


/***/ }),

/***/ 1688:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
var index_1 = __webpack_require__(1397);
exports.routes = [
    {
        path: '',
        component: index_1.AtParXComponent,
        children: [
            { path: 'createorders', component: index_1.CreateOrdersComponent },
            { path: 'departmentdeviceallocation', component: index_1.DepartmentDeviceAllocationComponent },
            { path: 'departmentlocationallocation', component: index_1.DepartmentLocationAllocationComponent },
            {
                path: 'departmentuserallocation', component: index_1.DepartmentUserAllocationComponent,
                children: [
                    { path: '', component: index_1.DepartmentUserAllocationHomeComponent },
                    { path: 'assign', component: index_1.DepartmentUserAllocationAssignComponent }
                ]
            },
            { path: 'setupdepartments', component: index_1.SetupDepartmentsComponent },
            { path: 'manageparlocation', component: index_1.ManageParLocationComponent },
            { path: 'processes', component: index_1.ProcessesComponent },
            { path: 'setupparlocations', component: index_1.SetupParLocationsComponent },
            { path: 'setupdropofflocations', component: index_1.SetupDropOffLocationComponent },
            { path: 'setupreasons', component: index_1.SetupReasonsComponent },
            { path: 'userparameters', component: index_1.UserParametersComponent },
        ]
    }
];
var AtParXRoutingModule = (function () {
    function AtParXRoutingModule() {
    }
    return AtParXRoutingModule;
}());
AtParXRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], AtParXRoutingModule);
exports.AtParXRoutingModule = AtParXRoutingModule;


/***/ }),

/***/ 1689:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SetupDepartmentsComponent = (function () {
    function SetupDepartmentsComponent() {
    }
    return SetupDepartmentsComponent;
}());
SetupDepartmentsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1920)
    })
], SetupDepartmentsComponent);
exports.SetupDepartmentsComponent = SetupDepartmentsComponent;


/***/ }),

/***/ 1690:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SetupDropOffLocationComponent = (function () {
    function SetupDropOffLocationComponent() {
    }
    return SetupDropOffLocationComponent;
}());
SetupDropOffLocationComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1921)
    })
], SetupDropOffLocationComponent);
exports.SetupDropOffLocationComponent = SetupDropOffLocationComponent;


/***/ }),

/***/ 1691:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var SetupParLocationsComponent = (function () {
    function SetupParLocationsComponent() {
        this.atparXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return SetupParLocationsComponent;
}());
SetupParLocationsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1922)
    })
], SetupParLocationsComponent);
exports.SetupParLocationsComponent = SetupParLocationsComponent;


/***/ }),

/***/ 1692:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var SetupReasonsComponent = (function () {
    function SetupReasonsComponent() {
        this.atParXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return SetupReasonsComponent;
}());
SetupReasonsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1923)
    })
], SetupReasonsComponent);
exports.SetupReasonsComponent = SetupReasonsComponent;


/***/ }),

/***/ 1693:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var UserParametersComponent = (function () {
    function UserParametersComponent() {
        this.atparXAppId = AtParEnums_1.EnumApps.Pharmacy;
    }
    return UserParametersComponent;
}());
UserParametersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1924)
    })
], UserParametersComponent);
exports.UserParametersComponent = UserParametersComponent;


/***/ }),

/***/ 1694:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParXComponent = (function () {
    function AtParXComponent() {
    }
    return AtParXComponent;
}());
AtParXComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1925)
    })
], AtParXComponent);
exports.AtParXComponent = AtParXComponent;


/***/ }),

/***/ 1695:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var index_1 = __webpack_require__(1397);
var atparx_routing_module_1 = __webpack_require__(1688);
var shared_module_1 = __webpack_require__(632);
var AtParXModule = (function () {
    function AtParXModule() {
    }
    return AtParXModule;
}());
AtParXModule = __decorate([
    core_1.NgModule({
        imports: [
            atparx_routing_module_1.AtParXRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            index_1.AtParXComponent,
            index_1.CreateOrdersComponent,
            index_1.DepartmentDeviceAllocationComponent,
            index_1.DepartmentLocationAllocationComponent,
            index_1.DepartmentUserAllocationComponent,
            index_1.SetupDepartmentsComponent,
            index_1.SetupDropOffLocationComponent,
            index_1.SetupParLocationsComponent,
            index_1.SetupReasonsComponent,
            index_1.UserParametersComponent,
            index_1.ProcessesComponent,
            index_1.ManageParLocationComponent,
            index_1.DepartmentUserAllocationHomeComponent,
            index_1.DepartmentUserAllocationAssignComponent
        ]
    })
], AtParXModule);
exports.AtParXModule = AtParXModule;


/***/ }),

/***/ 1913:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-create-orders [appID]=\"appID\"></atpar-create-orders>\r\n</div>";

/***/ }),

/***/ 1914:
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <atpar-pou-department-device-allocation [appId]=\"atParXAppId\"></atpar-pou-department-device-allocation>\r\n</div>\r\n";

/***/ }),

/***/ 1915:
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <pou-department-location-allocation [appId]=\"atParXAppId\"></pou-department-location-allocation>\r\n</div>\r\n";

/***/ }),

/***/ 1916:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-dept-user-alloc-assign></atpar-dept-user-alloc-assign>\r\n</div>\r\n";

/***/ }),

/***/ 1917:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-pou-departmentuserallocation [appId]=\"atParXAppId\"></atpar-pou-departmentuserallocation>\r\n</div>\r\n";

/***/ }),

/***/ 1918:
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:200px\">\r\n    <h1>\r\n        AtParX - Manage Par Location\r\n    </h1>\r\n\r\n</div>";

/***/ }),

/***/ 1919:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <pou-process-parameters [appId]=\"atparXAppId\"></pou-process-parameters>   \r\n</div>\r\n    \r\n\r\n";

/***/ }),

/***/ 1920:
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:200px\">\r\n    <h1>\r\n        AtParX - Setup departments\r\n    </h1>\r\n</div>";

/***/ }),

/***/ 1921:
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:200px\">\r\n    <h1>\r\n        AtParX - Setup Drop Off Locations\r\n    </h1>\r\n</div>";

/***/ }),

/***/ 1922:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-setup-par-locations [appId]=\"atparXAppId\"></atpar-setup-par-locations>\r\n</div>";

/***/ }),

/***/ 1923:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-setup-reasons [appId]=\"atParXAppId\"></atpar-setup-reasons>\r\n</div>";

/***/ }),

/***/ 1924:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-user-parameters [appId]=\"atparXAppId\"></atpar-user-parameters>\r\n</div>";

/***/ }),

/***/ 1925:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>";

/***/ })

});
//# sourceMappingURL=15.601fce7cdc00a672fc7a.chunk.js.map