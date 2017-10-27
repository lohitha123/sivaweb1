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
var Atpardiv = (function () {
    function Atpardiv() {
        this.uploadFlag = true;
        // @Input() name: string;
        //option: any;
        this.selectedValue = "";
        this.bindModelDataChange = new core_1.EventEmitter();
        this.fileUploadEvent = new core_1.EventEmitter();
    }
    Atpardiv.prototype.getData = function (option, event) {
        option.PARAMETER_VALUE = event.label;
        this.bindModelDataChange.emit(option);
    };
    Atpardiv.prototype.onChange = function (option, event) {
        if (event != null && event != undefined) {
            option.PARAMETER_VALUE = event.value;
        }
        this.bindModelDataChange.emit(option);
    };
    Atpardiv.prototype.ontxtchange = function (option, event) {
        if (event != null && event != undefined) {
            option.PARAMETER_VALUE = event.trim();
        }
        this.bindModelDataChange.emit(option);
    };
    Atpardiv.prototype.ontxtpwdchange = function (option) {
        this.bindModelDataChange.emit(option);
    };
    Atpardiv.prototype.onClick = function (option, event) {
        if (event != null && event != undefined) {
            option.PARAMETER_VALUE = event;
        }
        this.bindModelDataChange.emit(option);
    };
    Atpardiv.prototype.change = function (option, event) {
        if (event != null && event != undefined) {
            option.PARAMETER_VALUE = event;
        }
        this.bindModelDataChange.emit(option);
    };
    Atpardiv.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        this.userSelectedFile = event.target.files[0].name;
        this.fileUploadEvent.emit(event);
        // let fileList: FileList = event.target.files;
        //if (fileList.length > 0) {
        //     let file: File = fileList[0];
        //     let formData: FormData = new FormData();
        //     var listData = [];
        //     var obj = { FileName: file.name, File: file };
        //     listData.push(obj);
        //     formData.append('uploadFile', file, file.name);
        //     //let headers = new Headers();
        //     //headers.append('Authorization', 'bearer');
        //headers.append('enctype', 'multipart/form-data');
        //let options = new RequestOptions({ headers: headers });
        //let apiUrl = "/api/User/UploadCustomerLogo";
        //this.http.post(apiUrl, formData, options)
        //    .catch(error => Observable.throw(error))
        //    .map(res => res.json())
        //    .subscribe(
        //    (res) => {
        //        console.log('success');
        //        if (res.Message == "Image Uploaded Successfully.") {
        //            this.blnFileUpload = false;
        //            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: res.Message });
        //        } else {
        //            this.blnFileUpload = true;
        //            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.Message });
        //        }
        //    },
        //    error => console.log(error)
        //    );
        //}
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Atpardiv.prototype, "configs", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Atpardiv.prototype, "uploadFlag", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Atpardiv.prototype, "bindModelDataChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Atpardiv.prototype, "fileUploadEvent", void 0);
    Atpardiv = __decorate([
        core_1.Component({
            templateUrl: 'atpardiv.html',
            selector: 'atpar-div',
        })
    ], Atpardiv);
    return Atpardiv;
}());
exports.Atpardiv = Atpardiv;
//# sourceMappingURL=atpardiv.js.map