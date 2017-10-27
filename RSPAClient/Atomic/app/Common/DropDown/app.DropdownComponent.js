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
//(childComponent)
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var DropDownComponent = (function () {
    function DropDownComponent() {
        this.selectedItem = this.values;
        this.bindModelDataChange = new core_1.EventEmitter();
    }
    DropDownComponent.prototype.onChangeItem = function (data) {
        this.selectedItem = data;
        this.bindModelDataChange.emit(this.selectedItem);
    };
    return DropDownComponent;
}());
__decorate([
    core_2.Input(),
    __metadata("design:type", Object)
], DropDownComponent.prototype, "bindModelData", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Array)
], DropDownComponent.prototype, "values", void 0);
__decorate([
    core_2.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DropDownComponent.prototype, "bindModelDataChange", void 0);
DropDownComponent = __decorate([
    core_1.Component({
        selector: 'atpar-Dropdown',
        template: "<select name=\"ddlist\" [(ngModel)]=\"selectedItem\" (ngModelChange)=\"onChangeItem($event)\"> \n\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 <option\u00A0*ngFor=\"let\u00A0data\u00A0of\u00A0values\"  [ngValue]=\"data\">{{data.name}}</option>\n\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0</select>",
        styles: [" select {\n                  font-size: 15px;\n               }"
        ]
    }),
    __metadata("design:paramtypes", [])
], DropDownComponent);
exports.DropDownComponent = DropDownComponent;
//How to use Dropdown:
//this is an Reuasbale Dropdown Component for all Components in AtPar Webproject.
//Usage:
//see the above component,i can use the Input and Output decorators.
// Here pass the array of empty data to any component and pass the list of data  to parent component(output).
///Note:name ia mandatory for the dropdown.
//Example:(parentComponent)
//import { Component } from '@angular/core';
//import { DropDownComponent } from './app.DropdownComponent';
//@Component({
//    selector: 'my-app',
//    template: `  
//                   this is an parent component
//                <atpar-Dropdown [values]="values" (bindModelDataChange)="bindModelDataChange($event)"></atpar-Dropdown>
//                 <span>{{name1}}</span>
//           `,
//})
//export class AppComponent {
//    values: any[] = [
//        { id: 1, name: 'MVC' },
//        { id: 2, name: 'ANGULAR JS' },
//        { id: 3, name: 'JAVA' },
//        { id: 4, name: 'PHP' },
//        { id: 5, name: 'XAMARIN' },
//        { id: 6, name: 'ANDROID' },
//        { id: 7, name: 'CSHARP' },
//        { id: 8, name: 'VB.NET' },
//    ];
//    name1: any;
//    bindModelDataChange(data: any) {
//        this.name1 = "Index is " + data.id + "and" + "Name is" + data.name;
//    }
//}
//# sourceMappingURL=app.Dropdowncomponent.js.map