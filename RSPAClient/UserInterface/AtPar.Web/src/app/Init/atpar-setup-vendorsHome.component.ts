import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SetupVendorServices } from "../../app/Init/atpar-setup-vendors.services";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Shared/HttpService';
import { SelectItem } from './../components/common/api';
import { NavigationExtras } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { ModeEnum } from '../Shared/AtParEnums'
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from './../components/common/api';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { StatusType } from './../Shared/AtParEnums';
import { DataTable } from '../components/datatable/datatable';
import { AtParConstants } from '../Shared/AtParConstants';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-setup-vendorsHome.component.html',
    providers: [SetupVendorServices],
})

export class SetupVendorsHomeComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    msgs: Message[] = [];
    lstVendordata: PAR_MNGT_VENDOR[];
    mainlstGridData: PAR_MNGT_VENDOR[];
    statusCode: number;
    statusList: any;
    statusMesssage: string;
    _deviceTokenEntry: string[] = [];
    statusType: string = "";
    display: boolean = false;
    mode: string;
    vendorSearch: string;
    isVisible: boolean = false;
    pazeSize: number;
    isUpdate: boolean = false;
    tooltipmsg: any;
    breadCrumbMenu: Menus;
    constructor(
        private setupVendorServices: SetupVendorServices,
        public router: Router,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService,
        private spinnerService: SpinnerService) {
        this.breadCrumbMenu = new Menus();
    }

    ngOnInit(): void {
        this.spinnerService.start();
        this.statusList = [];
        this.statusList.push({ label: 'All', value: "" });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
        this.mainlstGridData = new Array<PAR_MNGT_VENDOR>()
        this.route.queryParams.subscribe(params => {
            let statusMessage = params["statusMessage"];
            this.mode = params["mode"];
            let statusType = params["statusType"];

            if (statusType !== null && statusType != undefined) {
                if (statusType == "success") {
                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                }
            }
            if (statusType == "warn") {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
            }
        });
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        if (this.mode != undefined && this.mode == (ModeEnum.List).toString()) {

            this.BindGrid();
        }
        this.pazeSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.spinnerService.stop();
    }

    async  BindGrid() {
        this.mainlstGridData = [];
        this.lstVendordata = [];
        this.statusType = "";
        this.isVisible = false;
        this.msgs = [];
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }

            await this.setupVendorServices.getVendorDetails(this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], '', this.vendorSearch.trim())
                .forEach(resp => {
                    this.spinnerService.stop();
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                if (this.isUpdate == false) {
                                    this.msgs = [];
                                }
                                this.mainlstGridData = [];
                                this.lstVendordata = [];
                                this.lstVendordata = resp.DataList;

                                for (var item = 0; item < this.lstVendordata.length; item++) {
                                    if (this.lstVendordata[item].STATUS == false) {
                                        this.lstVendordata[item].STATUS = true;
                                    } else {
                                        this.lstVendordata[item].STATUS = false;
                                    }
                                    this.mainlstGridData.push(this.lstVendordata[item]);
                                }

                                this.isVisible = true;
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.isVisible = false;
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.isVisible = false;
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                break;
                            }
                    }
                });
            this.isUpdate = false;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.msgs = [];

        this.lstVendordata.length = 0;

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let lstVendorDetails = new PAR_MNGT_VENDOR();
                lstVendorDetails.VENDOR_ID = filterData[x].VENDOR_ID;
                lstVendorDetails.VENDOR_NAME = filterData[x].VENDOR_NAME;
                lstVendorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                lstVendorDetails.STATUS = filterData[x].STATUS;
                lstVendorDetails.VEND_USER_ID = filterData[x].VEND_USER_ID;
                lstVendorDetails.ADDRESS1 = filterData[x].ADDRESS1;
                lstVendorDetails.ADDRESS2 = filterData[x].ADDRESS2;
                lstVendorDetails.ADD_ITEMS_LFLAG = filterData[x].ADD_ITEMS_LFLAG;

                lstVendorDetails.BILL_ONLY_EMAIL = filterData[x].BILL_ONLY_EMAIL;
                lstVendorDetails.CITY = filterData[x].CITY;
                lstVendorDetails.CONTACT_E_MAIL = filterData[x].CONTACT_E_MAIL;
                lstVendorDetails.CONTACT_NAME = filterData[x].CONTACT_NAME;
                lstVendorDetails.COUNTRY = filterData[x].COUNTRY;

                lstVendorDetails.FAX = filterData[x].FAX;
                lstVendorDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                lstVendorDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                lstVendorDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;

                lstVendorDetails.MODE = filterData[x].MODE;
                lstVendorDetails.ORDER_DESPATCH_TYPE = filterData[x].ORDER_DESPATCH_TYPE;
                lstVendorDetails.PHONE = filterData[x].PHONE;
                lstVendorDetails.REMINDER_FREQ = filterData[x].REMINDER_FREQ;

                lstVendorDetails.STATE = filterData[x].STATE;
                lstVendorDetails.ZIP = filterData[x].ZIP;

                this.lstVendordata.push(lstVendorDetails);
            }

        }
    }

    //Create New Vendor Record
    createNewVendor() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Vendor';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // Navigating to Cost Center child route
        //this.atParSharedDataService.storage = { "mode": ModeEnum.Add };
        this.atParSharedDataService.setStorage({ "mode": ModeEnum.Add });
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Add,
            },
            relativeTo: this.route
        };

       
        this.router.navigate(['setupmodifyitems'], navigationExtras);
        this.router.navigate(['setupmodifyvendors'], navigationExtras);
    }
    //Edit Vendor Data.
    editVendor(SetupModifyVendorsEditData: PAR_MNGT_VENDOR) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Vendor';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // Navigating to Cost Center child route
        //this.atParSharedDataService.storage = { "SetupModifyVendorsEditData": SetupModifyVendorsEditData, "mode": ModeEnum.Edit };
        this.atParSharedDataService.setStorage({ "SetupModifyVendorsEditData": SetupModifyVendorsEditData, "mode": ModeEnum.Edit });
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Edit,
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupmodifyvendors'], navigationExtras);
    }

    async  changeStatus(vendor) {
        this.isUpdate = true;
        this.msgs = [];
        this.spinnerService.start();
        try {
            await this.setupVendorServices.UpdateVendorStatus(vendor.STATUS, vendor.VENDOR_ID)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Vendor").replace("2%", vendor.VENDOR_ID);
                            this.spinnerService.stop();
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });

                            let filterData: any = [];
                            this.lstVendordata = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.VENDOR_ID == vendor.VENDOR_ID)
                            matchedrecord[0].STATUS = vendor.STATUS;

                            if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                            } else if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let lstVendorDetails = new PAR_MNGT_VENDOR();
                                    lstVendorDetails.VENDOR_ID = filterData[x].VENDOR_ID;
                                    lstVendorDetails.VENDOR_NAME = filterData[x].VENDOR_NAME;
                                    lstVendorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                    lstVendorDetails.STATUS = filterData[x].STATUS;
                                    lstVendorDetails.VEND_USER_ID = filterData[x].VEND_USER_ID;
                                    lstVendorDetails.ADDRESS1 = filterData[x].ADDRESS1;
                                    lstVendorDetails.ADDRESS2 = filterData[x].ADDRESS2;
                                    lstVendorDetails.ADD_ITEMS_LFLAG = filterData[x].ADD_ITEMS_LFLAG;

                                    lstVendorDetails.BILL_ONLY_EMAIL = filterData[x].BILL_ONLY_EMAIL;
                                    lstVendorDetails.CITY = filterData[x].CITY;
                                    lstVendorDetails.CONTACT_E_MAIL = filterData[x].CONTACT_E_MAIL;
                                    lstVendorDetails.CONTACT_NAME = filterData[x].CONTACT_NAME;
                                    lstVendorDetails.COUNTRY = filterData[x].COUNTRY;

                                    lstVendorDetails.FAX = filterData[x].FAX;
                                    lstVendorDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                                    lstVendorDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                                    lstVendorDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;

                                    lstVendorDetails.MODE = filterData[x].MODE;
                                    lstVendorDetails.ORDER_DESPATCH_TYPE = filterData[x].ORDER_DESPATCH_TYPE;
                                    lstVendorDetails.PHONE = filterData[x].PHONE;
                                    lstVendorDetails.REMINDER_FREQ = filterData[x].REMINDER_FREQ;

                                    lstVendorDetails.STATE = filterData[x].STATE;
                                    lstVendorDetails.ZIP = filterData[x].ZIP;

                                    this.lstVendordata.push(lstVendorDetails);
                                }

                            }
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    ngOnDestroy() {
        this.lstVendordata = null;
        this.statusCode = 0;
        this.statusMesssage = '';
        this.vendorSearch = '';
        this.mode = undefined;
    }
    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
}