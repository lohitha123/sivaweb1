import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked,Inject, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';

import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { SetupInventoryServices } from "../../app/Init/atpar-setup-inventory.services";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenEntry_Enum, StatusType, ModeEnum, Repleshment_Type } from '../Shared/AtParEnums'
import { Message, SelectItem } from './../components/common/api';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { PAR_MNGT_INVENTORY_ITEM_DETAILS } from '../../app/Entities/PAR_MNGT_INVENTORY_ITEM_DETAILS';
import { PAR_MNGT_ITEM } from '../../app/Entities/PAR_MNGT_ITEM';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtParConstants } from "../Shared/AtParConstants";
import { DOCUMENT } from '@angular/platform-browser';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'atpar-setup-inventory-add-modify.component.html',
    providers: [SetupInventoryServices, AtParConstants]
})

export class SetupInventoryAddModify {
    public newItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS();
    public oldItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS();
    public item = new PAR_MNGT_ITEM();
    inventoryData: PAR_MNGT_INVENTORY_ITEM_DETAILS[];
    replenishmentList: SelectItem[] = [];
    _deviceTokenEntry: string[] = [];
    mode: string;
    msgs: Message[] = [];
    filteredItems: any;
    selectedItemId: string = "";
    pazeSize: number;
    screenTitle: string = "";
    isEditMode: boolean = false;
    orgGroupId: string;
    orgId: string;
    goClick: boolean = false;
    submitButtonTitle: string = "";
    statusMesssage: string = "";
    loading: boolean = true;
    uomStatus: number;
    defaultLocationStatus: number;
    altLoc1Status: number;
    altLoc2Status: number;
    qohStatus: number;
    changeCodeStatus: number;
    itemIdStatus: number;
    blnItemIdNotSelected: boolean = false;
    replenishmentType: string;
    itemDesc: string = "";
    breadCrumbMenu: Menus;
    constructor(
        private setupInventoryServices: SetupInventoryServices,
        private router: Router,
        private route: ActivatedRoute,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        @Inject(DOCUMENT) private document,
        private atParSharedDataService: AtParSharedDataService

    ) {
        this.breadCrumbMenu = new Menus();
    }

    ngOnInit(): void {
        this.spinnerService.start();
        try {
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.mode = this.atParSharedDataService.storage.mode;
            this.orgGroupId = this.atParSharedDataService.storage.orgGroupId;
            this.orgId = this.atParSharedDataService.storage.orgId;

            this.replenishmentList = [];
            this.replenishmentList.push({ label: 'Select One', value: '' });
            this.replenishmentList.push({ label: 'Stock', value: 'Stock' });
            this.replenishmentList.push({ label: 'Nonstock', value: 'Nonstock' });
            this.replenishmentList.push({ label: 'Stockless', value: 'Stockless' });
            this.replenishmentList.push({ label: 'Consignment', value: 'Consignment' });


            if (this.mode == (ModeEnum.Add).toString()) {
                this.screenTitle = "Setup Inventory";
                this.isEditMode = false;
                this.submitButtonTitle = "Save";
                this.newItem.ORG_ID = this.orgId;
            } else if (this.mode == (ModeEnum.Edit).toString()) {
                this.screenTitle = "Setup Inventory";
                this.submitButtonTitle = "Update";
                this.isEditMode = true;
                this.newItem = this.atParSharedDataService.storage.inventoryItem;
                this.newItem.STATUS_VALUE = !this.newItem.STATUS_VALUE;
                let uom = this.newItem.UOM;
                let defaultStroageLoc = this.newItem.STOR_LOC;
                let altStorageLoc1 = this.newItem.ALT_STOR_LOC1;
                let altStorageLoc2 = this.newItem.ALT_STOR_LOC2;
                let replenishmentType = this.newItem.REPLENISHMENT_TYPE;
                this.replenishmentType = replenishmentType
                this.oldItem.UOM = uom;
                this.oldItem.STOR_LOC = defaultStroageLoc;
                this.oldItem.ALT_STOR_LOC1 = altStorageLoc1;
                this.oldItem.ALT_STOR_LOC2 = altStorageLoc2;
                this.newItem.ORG_ID = this.orgId;
                this.loading = false;

            }

            this.spinnerService.stop();
        } catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });

        }
    }
    clientErrorMsg(strExMsg) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString());
    }
    navigateToSetupInventoryHome() {

        let navigationExtras: NavigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    }

    goBack() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.storage = { 'mode': ModeEnum.List, 'orgGroupId': this.orgGroupId, 'orgId': this.orgId };
        this.navigateToSetupInventoryHome();

    }

    async filterItems(event) {
        try {
            let query = event.query;
            this.filteredItems = [];
            if (this.orgGroupId != undefined && this.orgId != undefined && event.query != undefined) {
                await this.setupInventoryServices.getItemDetailsForAutoComplete(this.orgId, this.orgGroupId, event.query)
                    .forEach(resp => {
                        this.msgs = [];
                        switch (resp.StatType) {
                            case StatusType.Success:
                                this.inventoryData = resp.DataList;
                                this.filteredItems = this.filterByItem(query, resp.DataList);
                                break;
                            case StatusType.Error:
                                this.msgs = [];
                                this.filteredItems = this.filterByItem(query, []);
                                //  this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            case StatusType.Warn:
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                        }

                    });
            }
        } catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });

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
    setRepleshmentType(repleshmentType) {
        if (repleshmentType == Repleshment_Type.Stock) {
            this.newItem.REPLENISHMENT_TYPE = "Stock";
        } else if (repleshmentType == Repleshment_Type.Nonstock) {
            this.newItem.REPLENISHMENT_TYPE = "Nonstock";
        } else if (repleshmentType == Repleshment_Type.Stockless) {
            this.newItem.REPLENISHMENT_TYPE = "Stockless";
        } else if (repleshmentType == Repleshment_Type.Consignment) {
            this.newItem.REPLENISHMENT_TYPE = "Consignment";
        }

    }
    async getItemDetails(repleshmentType) {
        try {
            this.spinnerService.start();
            this.newItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS();
            this.goClick = true;
            this.blnItemIdNotSelected = false;
            if (this.selectedItemId == "") {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Item ID" });
                this.blnItemIdNotSelected = true;
                this.isEditMode = false;
                this.goClick = false;
                this.spinnerService.stop();

            }
            if (this.blnItemIdNotSelected == false) {

                await this.setupInventoryServices.getItemDetails(this.orgId, this.orgGroupId, this.selectedItemId.split('-')[0])
                    .forEach(resp => {
                        this.msgs = [];
                        switch (resp.StatType) {
                            case StatusType.Success:
                                this.item = resp.DataList[0];
                                this.newItem.INV_ITEM_ID = this.item.ITEM_ID;
                                this.newItem.UOM = this.item.UNIT_OF_PROCUREMENT;
                                this.newItem.SHORT_DESCR = this.item.SHORT_DESCR;
                                this.newItem.STATUS_VALUE = true;
                                this.setRepleshmentType(this.item.REPLENISHMENT_TYPE);
                                this.spinnerService.stop();
                                break;
                            case StatusType.Error:
                                this.msgs = [];
                                this.goClick = false;
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            case StatusType.Warn:
                                this.msgs = [];
                                this.goClick = false;
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                        }

                    });
            }
        } catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });

        }
    }
    validateFormData() {
        this.msgs = [];
        try {
            if (this.newItem.STOR_LOC.trim().length != 0
                && this.newItem.ALT_STOR_LOC1 != undefined && this.newItem.ALT_STOR_LOC1.trim().length != 0
                && this.newItem.STOR_LOC == this.newItem.ALT_STOR_LOC1) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Storage Location and Alternate Storage Location1 cannot be same." });
                this.spinnerService.stop();
                return;
            } else if (this.newItem.STOR_LOC.trim().length != 0
                && this.newItem.ALT_STOR_LOC2 != undefined
                && this.newItem.ALT_STOR_LOC2.trim().length != 0
                && this.newItem.STOR_LOC == this.newItem.ALT_STOR_LOC2) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Storage Location and Alternate Storage Location2 cannot be same." });
                this.spinnerService.stop();
                return;
            } else if (this.newItem.ALT_STOR_LOC1 != undefined
                && this.newItem.ALT_STOR_LOC2 != undefined
                && this.newItem.ALT_STOR_LOC1.trim().length != 0
                && this.newItem.ALT_STOR_LOC2.trim().length != 0
                && this.newItem.ALT_STOR_LOC1 == this.newItem.ALT_STOR_LOC2) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Alternate Storage Location1 and Alternate Storage Location2  cannot be same." });
                this.spinnerService.stop();
                return;
            } else {
                return true;
            }
        } catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });

        }
    }
    async submitInventoryData() {
        this.spinnerService.start();
        //console.log("New Item: " + JSON.stringify(this.newItem));
        // console.log("Old Item: " + JSON.stringify(this.oldItem));
        this.newItem.ORG_ID = this.orgId;
        try {
            if (this.mode == (ModeEnum.Add).toString()) {
                //create
                if (this.selectedItemId === "" || this.selectedItemId == undefined) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Item ID" });
                    this.spinnerService.stop();
                    return;
                }
                if (this.newItem.QUANTITY_ON_HAND == undefined) {
                    this.newItem.QUANTITY_ON_HAND = 0;
                }
                if (this.newItem.STOR_LOC == undefined || this.newItem.STOR_LOC == null) {
                    this.newItem.STOR_LOC = "";
                }
                if (this.newItem.ALT_STOR_LOC1 == undefined || this.newItem.ALT_STOR_LOC1 == null) {
                    this.newItem.ALT_STOR_LOC1 = "";
                }
                if (this.newItem.ALT_STOR_LOC2 == undefined || this.newItem.ALT_STOR_LOC2 == null) {
                    this.newItem.ALT_STOR_LOC2 = "";
                }
                if (this.newItem.CHARGE_CODE == undefined || this.newItem.CHARGE_CODE == null) {
                    this.newItem.CHARGE_CODE = "";
                }
                if (this.newItem.STATUS_VALUE == false) {
                    this.newItem.STATUS = 1;
                }
                else {
                    this.newItem.STATUS = 0;
                }
                if (this.validateFormData()) {
                    await this.setupInventoryServices.insertInventoryItems(this.newItem, this.newItem.ALT_STOR_LOC1, this.newItem.ALT_STOR_LOC2, this.orgGroupId).forEach(resp => {
                        this.msgs = [];
                        switch (resp.StatType) {
                            case StatusType.Success:
                                this.statusMesssage = AtParConstants.Created_Msg.replace("1%", "Inventory").replace("2%", this.newItem.INV_ITEM_ID);
                                this.atParSharedDataService.storage = { "orgGroupId": this.orgGroupId, "orgId": this.newItem.ORG_ID, "mode": (ModeEnum.List).toString(), severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage };
                                //this.navigateToSetupInventoryHome();
                                this.msgs = [];
                                this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Item " + this.newItem.INV_ITEM_ID + " Created Successfully" });
                                this.isEditMode = false;
                                this.goClick = false;
                                this.selectedItemId = "";
                                document.getElementById("itemid").focus();
                                this.spinnerService.stop();
                                break;
                            case StatusType.Error:
                                this.statusMesssage = resp.StatusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            case StatusType.Warn:
                                this.statusMesssage = resp.StatusMessage;
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                        }
                    });
                }

            } else if (this.mode == (ModeEnum.Edit).toString()) {
                //update          
                if (this.newItem.REPLENISHMENT_TYPE.trim().length == 0) {
                    this.newItem.REPLENISHMENT_TYPE = this.replenishmentType;
                }
                if (this.newItem.ALT_STOR_LOC1 == undefined || this.newItem.ALT_STOR_LOC1 == null) {
                    this.newItem.ALT_STOR_LOC1 = "";
                }
                if (this.newItem.ALT_STOR_LOC2 == undefined || this.newItem.ALT_STOR_LOC2 == null) {
                    this.newItem.ALT_STOR_LOC2 = "";
                }
                if (this.oldItem.ALT_STOR_LOC1 == undefined || this.oldItem.ALT_STOR_LOC1 == null) {
                    this.oldItem.ALT_STOR_LOC1 = "";
                }
                if (this.oldItem.ALT_STOR_LOC2 == undefined || this.oldItem.ALT_STOR_LOC2 == null) {
                    this.oldItem.ALT_STOR_LOC2 = "";
                }
                if (this.newItem.CHARGE_CODE == undefined || this.newItem.CHARGE_CODE == null) {
                    this.newItem.CHARGE_CODE = "";
                }
                if (this.newItem.STATUS_VALUE == false) {
                    this.newItem.STATUS = 1;
                }
                else {
                    this.newItem.STATUS = 0;
                }

                if (this.validateFormData()) {
                    await this.setupInventoryServices.updateInventoryItems(this.newItem, this.oldItem.UOM,
                        this.oldItem.STOR_LOC, this.newItem.ALT_STOR_LOC1, this.oldItem.ALT_STOR_LOC1, this.newItem.ALT_STOR_LOC2, this.oldItem.ALT_STOR_LOC2, this.orgGroupId).forEach(resp => {
                            this.msgs = [];
                            switch (resp.StatType) {
                                case StatusType.Success:
                                    this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Inventory").replace("2%", this.newItem.INV_ITEM_ID);

                                    this.statusMesssage = "Item " + this.newItem.INV_ITEM_ID + " updated successfully";
                                    //this.atParSharedDataService.storage = {
                                    //    "orgGroupId": this.orgGroupId, "orgId": this.newItem.ORG_ID, "mode": (ModeEnum.List).toString(), severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage
                                    //};

                                    //this.navigateToSetupInventoryHome();
                                    //this.oldItem = new PAR_MNGT_INVENTORY_ITEM_DETAILS();
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                                    document.getElementById('uom').focus();
                                    this.spinnerService.stop();
                                    break;
                                case StatusType.Error:
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                case StatusType.Warn:
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                            }
                            this.atParConstant.scrollToTop();
                        });
                }
            }
        } catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });

        }
    }
    bindModelDataChange(event: any) {
        try {
            if (this.newItem.UOM !== "" && this.uomStatus != 1) {
                this.uomStatus = 0;
            }
            else {
                this.uomStatus = 1;
            }
            if (this.newItem.INV_ITEM_ID === "") {
                this.itemIdStatus = 1;
            } else {
                this.itemIdStatus = 0;
            }

            if ("uom" == event.TextBoxID.toString()) {
                this.uomStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("defalultloc" == event.TextBoxID.toString()) {
                this.defaultLocationStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("altLoc1" == event.TextBoxID.toString()) {
                this.altLoc1Status = event.validationrules.filter(x => x.status == false).length;
            }
            if ("altLoc2" == event.TextBoxID.toString()) {
                this.altLoc2Status = event.validationrules.filter(x => x.status == false).length;
            }
            if ("qoh" == event.TextBoxID.toString()) {
                this.qohStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("chargecode" == event.TextBoxID.toString()) {
                this.changeCodeStatus = event.validationrules.filter(x => x.status == false).length;
            }

            if (this.submitButtonTitle == "Update") {
                this.itemIdStatus = 0;
                if (this.uomStatus >= 1) {
                    this.uomStatus = 1;
                }
                else {
                    this.uomStatus = 0;
                }
                if (this.defaultLocationStatus >= 1) {
                    this.defaultLocationStatus = 1;
                }
                else {
                    this.defaultLocationStatus = 0;
                }
            } else if (this.submitButtonTitle == "Save") {
                if (this.uomStatus >= 1) {
                    this.uomStatus = 1;
                }
                else {
                    this.uomStatus = 0;
                }
            }


            if (this.itemIdStatus == 0 && this.uomStatus == 0 && this.defaultLocationStatus == 0) {

                if ((this.altLoc1Status == undefined || this.altLoc1Status == 0) &&
                    (this.altLoc2Status == undefined || this.altLoc2Status == 0) &&
                    (this.qohStatus == undefined || this.qohStatus == 0) &&
                    (this.changeCodeStatus == undefined || this.changeCodeStatus == 0)) {

                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            else {
                this.loading = true;
            }
        } catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });

        }
    }

    ngOnDestroy() {
        this.newItem = null;
        this.oldItem = null;
        this.item = null;
        this.inventoryData = null;
        this.replenishmentList = null;
        this._deviceTokenEntry = null;
        this.mode = null;
        this.msgs = null;
        this.filteredItems = null;
        this.selectedItemId = null;
        this.pazeSize = null;
        this.screenTitle = null;
        this.isEditMode = null;
        this.orgGroupId = null;
        this.orgId = null;
        this.goClick = null;
        this.submitButtonTitle = null;
        this.statusMesssage = null;
        this.spinnerService = null;
        this.loading = null;
        this.uomStatus = null;
        this.defaultLocationStatus = null;
        this.altLoc1Status = null;
        this.altLoc2Status = null;
        this.qohStatus = null;
        this.changeCodeStatus = null;
        this.itemIdStatus = null;
        this.replenishmentType = null;
    }

}