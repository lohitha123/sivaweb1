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
var RadioGroupComponent = (function () {
    function RadioGroupComponent() {
        this.bindModelDataChange = new core_1.EventEmitter();
    }
    RadioGroupComponent.prototype.getSelectedItem = function (option) {
        this.bindModelDataChange.emit(option);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], RadioGroupComponent.prototype, "radioButtonData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RadioGroupComponent.prototype, "name", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RadioGroupComponent.prototype, "bindModelDataChange", void 0);
    RadioGroupComponent = __decorate([
        core_1.Component({
            selector: 'atpar-radio-group',
            template: "            \n       <ul>\n             <li *ngFor=\"let option of radioButtonData\" style=\"list-style:none;\">\n                   <input type=\"radio\"  (click)=\"getSelectedItem(option)\" [name]=\"name\" value={{option.id}}>{{option.name}}</li>                    \n       </ul>\n           \n              "
        })
    ], RadioGroupComponent);
    return RadioGroupComponent;
}());
exports.RadioGroupComponent = RadioGroupComponent;
//How to use RadioGroup:
//this is an Reuasbale RadioGroup Component for all Components in AtPar Webproject.
//Usage:
//see the above component,i can use the Input and Output decorators.
// Here pass the array of empty data to any component and pass the list of data  to parent component(output).
//Note:name ia mandatory for the radiogroup.without name all radiobuttons are checked.
//Example:
//import { Component} from '@angular/core';
//import { RadioGroupComponent } from './app.RadioGroupComponent';
//@Component({
// selector: 'my-app',
// template: `  
// <atpar-radio-group [radioButtonData]="radioButtonData" [name]="name"  (bindModelDataChange)="bindModelDataChange($event)">
// </atpar-radio-group>
//<span style="color:blue;"> {{name1}}</span>
//  `,
//})
//export class AppComponent {
// radioButtonData: any[] = [
// { id: 1, name: 'T-shirts' },
//{ id: 2, name: 'pants' },
// { id: 3, name: 'shorts' },
// ];
//name: string = "RadioButton1";
//name1: any;
//bindModelDataChange(option: any) {
//  this.name1 = option.name;
//}
//}
//# sourceMappingURL=app.RadioGroupComponent.js.map