import {
    NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,
    Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style,
    transition, animate
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { PAR_MNGT_ITEM } from '../../app/Entities/PAR_MNGT_ITEM';
import { PAR_MNGT_INVENTORY_ITEM_DETAILS } from '../../app/Entities/PAR_MNGT_INVENTORY_ITEM_DETAILS';
import { SetupInventoryServices } from "../../app/Init/atpar-setup-inventory.services";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from "../Shared/AtParConstants";
import { TokenEntry_Enum, ClientType, ModeEnum, StatusType, BusinessType } from '../Shared/AtParEnums';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';


declare var module: {
    id: string;
}
@Component({


    templateUrl: 'atpar-setup-inventory-home.component.html',
    providers: [SetupInventoryServices, AtParConstants]
})

export class SetupInventoryHome {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    public newItem = new PAR_MNGT_ITEM();
    inventoryData: PAR_MNGT_INVENTORY_ITEM_DETAILS[];
    inventoryDataGrid: PAR_MNGT_INVENTORY_ITEM_DETAILS[];
    statusList: any;
    _deviceTokenEntry: string[] = [];
    mode: string;
    msgs: Message[] = [];
    isVisible: boolean = false;
    pazeSize: number;
    orgGroupList: any[] = [];
    orgGroupData: SelectItem[] = [];
    orgList: any[] = [];
    orgData: SelectItem[] = [];
    replenishmentList: SelectItem[] = [];
    filteredItems: any;
    selectedItemId: string = "";
    orgGroupName: string;
    hasMulipleOrgGoups: boolean = false;
    breadCrumbMenu: Menus;
    statusType: string;
    replType: string;

    constructor(
        private setupInventoryServices: SetupInventoryServices,
        private router: Router,
        private route: ActivatedRoute,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService,
        private httpService: HttpService

    ) {
        this.breadCrumbMenu = new Menus();
    }

    addItem(): void {
        // console.log(this.newItem);
        if (this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == 'Select One' || this.newItem.ORG_GROUP_ID == "-1") {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
        }
        else if (this.newItem.BUSINESS_UNIT == undefined || this.newItem.BUSINESS_UNIT == 'Select One' || this.newItem.BUSINESS_UNIT == "-1") {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
        } else {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Inventory';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

            //this.atParSharedDataService.storage = { "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": ModeEnum.Add };
            this.atParSharedDataService.setStorage({ "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": ModeEnum.Add });
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "mode": ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodifyinventory'], navigationExtras);
        }
    }

    handleDropdown(event) {
        //event.query = current value in input field
    }
    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnInit(): void {
        this.spinnerService.start();
        this.replenishmentList = [];
        this.replenishmentList.push({ label: 'Select One', value: '' });
        this.replenishmentList.push({ label: 'Stock', value: 'Stock' });
        this.replenishmentList.push({ label: 'Nonstock', value: 'Nonstock' });
        this.replenishmentList.push({ label: 'Stockless', value: 'Stockless' });
        this.replenishmentList.push({ label: 'Consignment', value: 'Consignment' });
        try {
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

            //console.log(JSON.stringify(this.atParSharedDataService.storage));
            if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.mode != undefined)
                this.mode = this.atParSharedDataService.storage.mode;
            this.setupInventoryServices.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).forEach(resp => {

                switch (resp.StatType) {
                    case StatusType.Success:
                        this.orgGroupList = resp.DataList;
                        this.orgGroupData = [];
                        if (this.orgGroupList.length > 0) {

                            if (this.orgGroupList.length > 1) {

                                this.hasMulipleOrgGoups = true;
                                this.orgGroupData.push({ label: 'Select One', value: -1 })
                                for (let i = 0; i < this.orgGroupList.length; i++) {
                                    if (this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                        this.orgGroupData.push({ label: this.orgGroupList[i].ORG_GROUP_ID + ' - ' + this.orgGroupList[i].ORG_GROUP_NAME, value: this.orgGroupList[i].ORG_GROUP_ID });
                                    }
                                }
                                this.orgData.push({ label: 'Select One', value: -1 });
                            } else {
                                this.hasMulipleOrgGoups = false;
                                this.newItem.ORG_GROUP_ID = this.orgGroupList[0].ORG_GROUP_ID;
                                this.orgGroupName = this.orgGroupList[0].ORG_GROUP_ID + ' - ' + this.orgGroupList[0].ORG_GROUP_NAME;
                                this.onOrgroupChange();

                            }

                        }
                        else {

                            this.orgGroupData.push({ label: 'Select One', value: -1 });
                        }
                        this.spinnerService.stop();
                        break;
                    case StatusType.Error:
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    case StatusType.Warn:
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                }
            });

            this.pazeSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.summary != undefined) {
                this.msgs.push(this.atParSharedDataService.storage);

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async onOrgroupChange() {
        this.spinnerService.start();
        this.orgData = [];
        try {
            await this.setupInventoryServices.getOrgBusinessUnits(this.newItem.ORG_GROUP_ID, BusinessType.Inventory).forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success:
                        this.msgs = [];
                        this.orgList = resp.DataList;
                        this.orgData = [];
                        if (this.orgList.length > 0) {
                            this.orgData.push({ label: 'Select One', value: -1 });
                            for (let i = 0; i < this.orgList.length; i++) {
                                this.orgData.push({ label: this.orgList[i], value: this.orgList[i] });
                            }
                        } else {

                            this.orgData.push({ label: 'Select One', value: -1 });
                        }
                        this.spinnerService.stop();
                        break;
                    case StatusType.Error:
                        this.spinnerService.stop();
                        this.orgData.push({ label: 'Select One', value: -1 });
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    case StatusType.Warn:
                        this.spinnerService.stop();
                        this.orgData.push({ label: 'Select One', value: -1 });
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                }
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "onOrgroupChange");
        }
    }

    async btnGO(){
        //console.log(this.newItem);
        this.msgs = [];
        if (this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == 'Select One' || this.newItem.ORG_GROUP_ID == "-1") {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
        }
        else if (this.newItem.BUSINESS_UNIT == undefined || this.newItem.BUSINESS_UNIT == 'Select One' || this.newItem.BUSINESS_UNIT == "-1") {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
        } else {
            if (this.isVisible) {
                this.statusType = null;
                this.replType = '';
                this.dataTableComponent.reset();
            }
            await this.BindInventoryGrid();
        }

    }

    async BindInventoryGrid() {
        this.msgs = [];
        this.statusList = [];
        this.inventoryDataGrid = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'Active', value: false });
        this.statusList.push({ label: 'InActive', value: true });

       
        this.spinnerService.start();
        try {
            await this.setupInventoryServices.getExistingItemDetails(this.newItem.BUSINESS_UNIT, this.newItem.ORG_GROUP_ID, this.selectedItemId.split('-')[0])
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            //this.msgs = [];
                            this.inventoryDataGrid = resp.DataList;
                            for (let i = 0; i <= this.inventoryDataGrid.length - 1; i++) {
                                if (this.inventoryDataGrid[i].STATUS == 1) {
                                    this.inventoryDataGrid[i].STATUS_VALUE = true;
                                }
                                else {
                                    this.inventoryDataGrid[i].STATUS_VALUE = false;
                                }
                            }
                            this.spinnerService.stop();
                            this.isVisible = true;
                            //           console.log(JSON.stringify(resp.DataList));
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            this.isVisible = false;
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            this.isVisible = false;
                            break;
                    }

                });
        } catch (ex) {
            this.clientErrorMsg(ex, "BindInventoryGrid");
        }
    }

    async UpdateOrgItemStatus(orgItem) {
        this.msgs = [];
        this.spinnerService.start();
        try {
            await this.setupInventoryServices
                .updateOrgItemStatus(orgItem.ORG_ID, orgItem.INV_ITEM_ID, orgItem.UOM, orgItem.STOR_LOC, orgItem.ALT_STOR_LOC1, orgItem.ALT_STOR_LOC2, orgItem.STATUS)
                .forEach(async resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];                         
                            await this.BindInventoryGrid();
                            let StatusMessage = AtParConstants.Updated_Status_Msg.replace("1%", "Item").replace("2%", orgItem.INV_ITEM_ID);
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            await this.BindInventoryGrid();
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            await this.BindInventoryGrid();
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                    
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "UpdateOrgItemStatus");
        }
    }

    editinventoryItem(inventoryItem) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Inventory';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        //this.atParSharedDataService.storage = { "inventoryItem": inventoryItem, "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": ModeEnum.Edit };
        this.atParSharedDataService.setStorage({ "inventoryItem": inventoryItem, "orgGroupId": this.newItem.ORG_GROUP_ID, "orgId": this.newItem.BUSINESS_UNIT, "mode": ModeEnum.Edit });
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Edit,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addormodifyinventory'], navigationExtras);

    }

    async filterItems(event) {
        try {
            let query = event.query;
            if (this.newItem.ORG_GROUP_ID != undefined && this.newItem.BUSINESS_UNIT != undefined && event.query != undefined) {
                await this.setupInventoryServices.getItemDetailsForAutoComplete(this.newItem.BUSINESS_UNIT, this.newItem.ORG_GROUP_ID, event.query)
                    .forEach(resp => {
                        this.msgs = [];
                        switch (resp.StatType) {
                            case StatusType.Success:
                                this.inventoryData = resp.DataList;
                                //  console.log(JSON.stringify(resp.DataList));
                                this.filteredItems = this.filterByItem(query, resp.DataList);
                                break;
                            case StatusType.Error:
                                this.msgs = [];
                                this.filteredItems = this.filterByItem(query, []);
                                // this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            case StatusType.Warn:
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                        }

                    });
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "filterItems");
        }
    }

    filterByItem(query, itemsList: any[]): any[] {

        let filtered: any[] = [];
        if (query == "%") {
            for (let i = 0; i < itemsList.length; i++) {
                let item = itemsList[i];
                filtered.push(item.ITEM_ID + '-' + item.SHORT_DESCR);
            }
        } else {
            for (let i = 0; i < itemsList.length; i++) {
                let item = itemsList[i];
                if (item.ITEM_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || item.SHORT_DESCR.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(item.ITEM_ID + '-' + item.SHORT_DESCR);
                }
            }
        }

        return filtered;
    }

    ngOnDestroy() {
        this.newItem = null;
        this.inventoryData = null;
        this.inventoryDataGrid = null;
        this.statusList = null;
        this._deviceTokenEntry = null;
        this.mode = null;
        this.msgs = null;
        this.isVisible = null;
        this.pazeSize = null;
        this.orgGroupList = null;
        this.orgGroupData = null;
        this.orgList = null;
        this.orgData = null;
        this.filteredItems = null;
        this.selectedItemId = null;
        this.orgGroupName = null;
        this.hasMulipleOrgGoups = null;
        this.spinnerService = null;
    }

}