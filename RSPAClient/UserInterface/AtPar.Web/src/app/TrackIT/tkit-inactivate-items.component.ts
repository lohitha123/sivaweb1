import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { VM_TKIT_INACTIVE_ITEMS } from '../../app/Entities/VM_TKIT_INACTIVE_ITEMS';
import { TKIT_ITEM_MASTER } from '../../app/Entities/TKIT_ITEM_MASTER';
import { TrackITInactiveItemsService } from '../../app/TrackIT/tkit-inactivate-items.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { TokenEntry_Enum, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
declare var module: {
    id: string;
}
@Component({

    templateUrl: 'tkit-inactivate-items.component.html',
    providers: [TrackITInactiveItemsService, HttpService, AtParCommonService, AtParConstants]
})
export class InactivateItemsComponent {
    lstDBData: VM_TKIT_INACTIVE_ITEMS[];
    lstgridfilterData: VM_TKIT_INACTIVE_ITEMS[];
    deviceTokenEntry: string[] = [];
    selectedIndicator: string = "";
    indicatorType: SelectItem[];
    lstCheckedItem: Array<VM_TKIT_INACTIVE_ITEMS>;
    dataCheckedSorting: VM_TKIT_INACTIVE_ITEMS[] = [];
    dataUncheckedSorting: Array<VM_TKIT_INACTIVE_ITEMS>;
    sortedcheckedrec: VM_TKIT_INACTIVE_ITEMS[];
    sorteduncheckedrec: VM_TKIT_INACTIVE_ITEMS[];
    startIndex: number;
    EndIndex: number;
    isVisible: boolean = false;
    growlMessage: Message[] = [];
    lstLocations: VM_TKIT_INACTIVE_ITEMS[] = [];
    lstFilteredLocation: any;
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    pazeSize: number;
    destructionDate: any;
    preField: string;
    itemMasterData: TKIT_ITEM_MASTER[] = [];
    public constructor(
        private trackITInactiveItemsService: TrackITInactiveItemsService,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants
    ) {

    }

    ngOnInit(): void {
        this.spinnerService.start();
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedItem = new Array<VM_TKIT_INACTIVE_ITEMS>();
        this.dataCheckedSorting = new Array<VM_TKIT_INACTIVE_ITEMS>();
        this.dataUncheckedSorting = new Array<VM_TKIT_INACTIVE_ITEMS>();
        this.lstFilteredLocation = new Array<VM_TKIT_INACTIVE_ITEMS>();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.indicatorType = [];
        this.indicatorType.push({ label: 'Select Indicator', value: '' });
        this.indicatorType.push({ label: 'Box', value: 'B' });
        this.indicatorType.push({ label: 'Equipment', value: 'E' });
        this.indicatorType.push({ label: 'Furniture', value: 'F' });
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.destructionDate = this.formatDate(new Date().toString());
        console.log(this.destructionDate);
                                  
        this.spinnerService.stop();
    }

    formatDate(date: string): string {
        
        var today = new Date(date);
        var dd: any = today.getDate();
        var mm: any = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

       return mm + '/' + dd + '/' + yyyy;

    }

    selectedRow(values: any, event) {

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
                var index = this.lstCheckedItem.indexOf(this.lstCheckedItem[i], 0)
                this.lstCheckedItem.splice(index, 1);
            }
        }

        this.lstCheckedItem.push(values);
    }
    filterdata(event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array<VM_TKIT_INACTIVE_ITEMS>();
        this.lstgridfilterData = event;
    }


    checkAll() {
        this.lstCheckedItem = [];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");


        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {

            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }

            for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
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

            for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].ITEM_INACTIVATED = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedItem.push(this.lstDBData[i]);
            }
        }
    }

    unCheckAll() {
        this.lstCheckedItem = [];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {

            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }

            for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
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

            for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].ITEM_INACTIVATED = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedItem.push(this.lstDBData[i]);
            }
        }


    }

    customSort(event, field) {
        this.preField = "";
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            } else {
                element.order = 1;
            }
            // element.order = !element.order;

        } else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        let result = null;
        let order: boolean;

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
    }

    
    getItemsToInActivate() {
        this.isVisible = false;
        var destructionDate = new Date(this.destructionDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');                            
        this.destructionDate = destructionDate.replace(',','') ;

        if (this.selectedIndicator === "Select Indicator" || this.selectedIndicator === undefined || this.selectedIndicator == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select the Indicator' });
            return false;
        }
        if (this.destructionDate === null || this.destructionDate === undefined || this.destructionDate == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select the Destruction Date' });
            return false;
        }
        try {
            this.spinnerService.start();

            this.trackITInactiveItemsService.getItemsToInActivate(this.selectedIndicator, this.destructionDate, this.deviceTokenEntry)
                .subscribe((response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = response.DataList;
                            this.isVisible = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.isVisible = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            this.isVisible = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.isVisible = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }


                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "inactivate items");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    validateDestructionDate(){
        this.spinnerService.start();
        var reGoodDate = /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/;
        var res = reGoodDate.test(this.destructionDate);
        if(!res) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Date format should be : mm/dd/yyyy."});
            this.spinnerService.stop();
        }

    }


    ngOnDestroy() {
        this.lstDBData = [];
        this.lstgridfilterData = [];
        this.deviceTokenEntry = [];
        this.selectedIndicator = "";
        this.indicatorType = null;
        this.lstCheckedItem = [];
        this.dataCheckedSorting  = [];
        this.dataUncheckedSorting  = [];
        this.sortedcheckedrec  = [];
        this.sorteduncheckedrec = [];
        this.startIndex = -1;
        this.EndIndex =  -1;
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.lstFilteredLocation  = [];
        this.blnsortbycolumn = false;
        this.custom = "";
        this.pazeSize = 0;
        this.destructionDate = "";
        this.preField = "";
        this.itemMasterData = [];
    }
    inactivateItems() {
        this.growlMessage = [];
        this.spinnerService.start();
        this.itemMasterData = [];
        var checkedItems = this.lstCheckedItem.filter(x => x.CHK_VALUE == 1);
        var itemDetail : TKIT_ITEM_MASTER;
        for(var item =0; item< checkedItems.length;item++) {
            itemDetail = new TKIT_ITEM_MASTER();
            itemDetail.ITEM_ID = checkedItems[item].ITEM_ID;
            itemDetail.ITEM_DESCR = checkedItems[item].ITEM_DESCR;
            itemDetail.ITEM_TYPE = checkedItems[item].ITEM_TYPE;
            itemDetail.CHK_VALUE = checkedItems[item].CHK_VALUE;
            itemDetail.ITEM_INACTIVATED = checkedItems[item].ITEM_INACTIVATED;
            itemDetail.DESTRUCTION_DATE = checkedItems[item].DESTRUCTION_DATE;
            itemDetail.COMMENTS = checkedItems[item].COMMENTS;
            this.itemMasterData.push(itemDetail);
        } 
        if(this.itemMasterData == undefined || this.itemMasterData == null || this.itemMasterData.length == 0) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Item has been selected"});
            this.spinnerService.stop();
            return;
        }
            try {
                this.spinnerService.start();
    
                this.trackITInactiveItemsService.inactivateItems(this.itemMasterData, this.deviceTokenEntry)
                    .subscribe((response) => {
                        this.growlMessage = [];
                        switch (response.StatType) {
                            case StatusType.Success: {
                                this.itemMasterData = [];
                                this.lstCheckedItem = [];
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Items Status Updated" });
                                this.isVisible = false;
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                this.isVisible = false;
                                break;
                            }
                            case StatusType.Custom: {
    
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                this.isVisible = false;
                                break;
                            }
                        }
    
    
                    });
    
            }
            catch (ex) {
                this.clientErrorMsg(ex, "inactivate items");
            }
        }

} 