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
var TKIT_ITEM_MASTER_1 = require("../../app/Entities/TKIT_ITEM_MASTER");
var tkit_inactivate_items_service_1 = require("../../app/TrackIT/tkit-inactivate-items.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var InactivateItemsComponent = (function () {
    function InactivateItemsComponent(trackITInactiveItemsService, spinnerService, atParCommonService, httpService, atParConstant) {
        this.trackITInactiveItemsService = trackITInactiveItemsService;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.deviceTokenEntry = [];
        this.selectedIndicator = "";
        this.dataCheckedSorting = [];
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.itemMasterData = [];
    }
    InactivateItemsComponent.prototype.ngOnInit = function () {
        this.spinnerService.start();
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedItem = new Array();
        this.dataCheckedSorting = new Array();
        this.dataUncheckedSorting = new Array();
        this.lstFilteredLocation = new Array();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.indicatorType = [];
        this.indicatorType.push({ label: 'Select Indicator', value: '' });
        this.indicatorType.push({ label: 'BOX', value: 'B' });
        this.indicatorType.push({ label: 'EQUIPMENT', value: 'E' });
        this.indicatorType.push({ label: 'FURNITURE', value: 'F' });
        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.destructionDate = this.formatDate(new Date().toString());
        console.log(this.destructionDate);
        this.spinnerService.stop();
    };
    InactivateItemsComponent.prototype.formatDate = function (date) {
        var today = new Date(date);
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return mm + '/' + dd + '/' + yyyy;
    };
    InactivateItemsComponent.prototype.selectedRow = function (values, event) {
        if (event == true) {
            values.CHK_VALUE = 1;
            values.checkvalue == true;
        }
        else {
            values.CHK_VALUE = 0;
            values.checkvalue == false;
        }
        for (var i = 0; i < this.lstCheckedItem.length; i++) {
            if (this.lstCheckedItem[i].ITEM_ID === values.ITEM_ID) {
                var index = this.lstCheckedItem.indexOf(this.lstCheckedItem[i], 0);
                this.lstCheckedItem.splice(index, 1);
            }
        }
        this.lstCheckedItem.push(values);
    };
    InactivateItemsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    InactivateItemsComponent.prototype.checkAll = function () {
        this.lstCheckedItem = [];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstgridfilterData[i].checkvalue = true;
                this.lstgridfilterData[i].ITEM_INACTIVATED = true;
                this.lstgridfilterData[i].CHK_VALUE = 1;
                this.lstCheckedItem.push(this.lstgridfilterData[i]);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].ITEM_INACTIVATED = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedItem.push(this.lstDBData[i]);
            }
        }
    };
    InactivateItemsComponent.prototype.unCheckAll = function () {
        this.lstCheckedItem = [];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstgridfilterData[i].checkvalue = false;
                this.lstgridfilterData[i].ITEM_INACTIVATED = false;
                this.lstgridfilterData[i].CHK_VALUE = 0;
                this.lstCheckedItem.push(this.lstgridfilterData[i]);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].ITEM_INACTIVATED = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedItem.push(this.lstDBData[i]);
            }
        }
    };
    InactivateItemsComponent.prototype.customSort = function (event, field) {
        this.preField = "";
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
            // element.order = !element.order;
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        var result = null;
        var order;
        try {
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    InactivateItemsComponent.prototype.getItemsToInActivate = function () {
        var _this = this;
        this.isVisible = false;
        var destructionDate = new Date(this.destructionDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        this.destructionDate = destructionDate.replace(',', '');
        if (this.selectedIndicator === "Select Indicator" || this.selectedIndicator === undefined || this.selectedIndicator == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select the Indicator' });
            return false;
        }
        if (this.destructionDate === null || this.destructionDate === undefined || this.destructionDate == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select the Destruction Date' });
            return false;
        }
        try {
            this.spinnerService.start();
            this.trackITInactiveItemsService.getItemsToInActivate(this.selectedIndicator, this.destructionDate, this.deviceTokenEntry)
                .subscribe(function (response) {
                _this.growlMessage = [];
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.lstDBData = response.DataList;
                        _this.isVisible = true;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                        _this.isVisible = false;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                        _this.isVisible = false;
                        _this.spinnerService.stop();
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "inactivate items");
        }
    };
    InactivateItemsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    InactivateItemsComponent.prototype.validateDestructionDate = function () {
        this.spinnerService.start();
        var reGoodDate = /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/;
        var res = reGoodDate.test(this.destructionDate);
        if (!res) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Date format should be : mm/dd/yyyy." });
            this.spinnerService.stop();
        }
    };
    InactivateItemsComponent.prototype.ngOnDestroy = function () {
        this.lstDBData = [];
        this.lstgridfilterData = [];
        this.deviceTokenEntry = [];
        this.selectedIndicator = "";
        this.indicatorType = null;
        this.lstCheckedItem = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.startIndex = -1;
        this.EndIndex = -1;
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.lstFilteredLocation = [];
        this.blnsortbycolumn = false;
        this.custom = "";
        this.pazeSize = 0;
        this.destructionDate = "";
        this.preField = "";
        this.itemMasterData = [];
    };
    InactivateItemsComponent.prototype.inactivateItems = function () {
        var _this = this;
        this.growlMessage = [];
        this.spinnerService.start();
        this.itemMasterData = [];
        var checkedItems = this.lstCheckedItem.filter(function (x) { return x.CHK_VALUE == 1; });
        var itemDetail;
        for (var item = 0; item < checkedItems.length; item++) {
            itemDetail = new TKIT_ITEM_MASTER_1.TKIT_ITEM_MASTER();
            itemDetail.ITEM_ID = checkedItems[item].ITEM_ID;
            itemDetail.ITEM_DESCR = checkedItems[item].ITEM_DESCR;
            itemDetail.ITEM_TYPE = checkedItems[item].ITEM_TYPE;
            itemDetail.CHK_VALUE = checkedItems[item].CHK_VALUE;
            itemDetail.ITEM_INACTIVATED = checkedItems[item].ITEM_INACTIVATED;
            itemDetail.DESTRUCTION_DATE = checkedItems[item].DESTRUCTION_DATE;
            itemDetail.COMMENTS = checkedItems[item].COMMENTS;
            this.itemMasterData.push(itemDetail);
        }
        if (this.itemMasterData == undefined || this.itemMasterData == null || this.itemMasterData.length == 0) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Item has been selected" });
            this.spinnerService.stop();
            return;
        }
        try {
            this.spinnerService.start();
            this.trackITInactiveItemsService.inactivateItems(this.itemMasterData, this.deviceTokenEntry)
                .subscribe(function (response) {
                _this.growlMessage = [];
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.itemMasterData = [];
                        _this.lstCheckedItem = [];
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Items Status Updated" });
                        _this.isVisible = false;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Warn: {
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_1.StatusType.Error: {
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.isVisible = false;
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "inactivate items");
        }
    };
    InactivateItemsComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-inactivate-items.component.html',
            providers: [tkit_inactivate_items_service_1.TrackITInactiveItemsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [tkit_inactivate_items_service_1.TrackITInactiveItemsService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants])
    ], InactivateItemsComponent);
    return InactivateItemsComponent;
}());
exports.InactivateItemsComponent = InactivateItemsComponent;
//# sourceMappingURL=tkit-inactivate-items.component.js.map