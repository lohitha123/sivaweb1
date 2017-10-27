import {
    NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,
    Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style,
    transition, animate
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { datatableservice } from './../components/datatable/datatableservice';
import { ManageRequestorServices } from "../../app/TrackIT/tkit-manage-requestor.services";
import { AtParConstants } from "../Shared/AtParConstants";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, ModeEnum, StatusType } from '../Shared/AtParEnums';
import { SelectItem, Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { TKIT_REQUESTOR } from "../../app/Entities/TKIT_REQUESTOR";
import { TKIT_DEPT } from "../../app/Entities/TKIT_DEPT";
import { TKIT_REQUESTOR_DEPT } from "../../app/Entities/TKIT_REQUESTOR_DEPT";
import { RM_SHIP_TO_LOCACTION } from "../../app/Entities/RM_SHIP_TO_LOCACTION";

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'tkit-manage-requestor.component.html',
    providers: [ManageRequestorServices, AtParConstants]
})

export class ManageRequestorHomeComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    public newItem = new TKIT_REQUESTOR();
    requestorData: TKIT_REQUESTOR[];
    mainlstGridData: Array<TKIT_REQUESTOR>;
    statusType: string = "";
    sortedData: TKIT_REQUESTOR[];
    statusList: any;
    _deviceTokenEntry: string[] = [];
    requestorSearch: string;
    mode: string;
    msgs: Message[] = [];
    isVisible: boolean = false;
    pazeSize: number;
    isUpdate: boolean = false;
    breadCrumbMenu: Menus;
    statusMesssage: string = "";
    
    constructor(private manageRequestorServices: ManageRequestorServices,
        private router: Router,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService) {
        this.breadCrumbMenu = new Menus();
    }

    

    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.requestorData.length = 0;

        if (this.statusType.toString() == "A") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == 'A')
        } else if (this.statusType.toString() == "I") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == 'I')
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let lstRequestorDetails = new TKIT_REQUESTOR();
                lstRequestorDetails.REQUESTOR_ID = filterData[x].REQUESTOR_ID;
                lstRequestorDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                lstRequestorDetails.LAST_NAME = filterData[x].LAST_NAME;
                lstRequestorDetails.MIDDLE_INIT = filterData[x].MIDDLE_INIT;
                lstRequestorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                lstRequestorDetails.STATUS = filterData[x].STATUS;
                if(lstRequestorDetails.STATUS== 'A') {
                    lstRequestorDetails.checkStatus = true;
                } else {
                    lstRequestorDetails.checkStatus = false;
                }
                this.requestorData.push(lstRequestorDetails);
            }

        }
    }

    async ngOnInit() {
        this.statusList = [];
        this.statusList.push({ label: 'All', value: "" });
        this.statusList.push({ label: 'Active', value: 'A' });
        this.statusList.push({ label: 'InActive', value: 'I' });
        try {
            if (this.atParSharedDataService.storage)
                this.mode = this.atParSharedDataService.storage.mode;
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.msgs = [];
            this.mainlstGridData = new Array<TKIT_REQUESTOR>();
            
            if (this.mode != undefined && this.mode == (ModeEnum.List).toString()) {
                await this.BindGrid();
            }
            this.pazeSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

            if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.summary != undefined) {
                this.msgs.push(this.atParSharedDataService.storage);
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    BindGrid()
    {
        try {
            this.msgs = [];
            this.statusType = "";
            this.mainlstGridData = [];
            this.requestorData = [];
            this.isVisible = false;

            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }

            this.spinnerService.start();
            if (this.requestorSearch == undefined || this.requestorSearch == null ||
                this.requestorSearch.trim().length == 0) {
                    this.requestorSearch = '';
            } 
                 
            this.manageRequestorServices.getAllRequestors(this.requestorSearch, this._deviceTokenEntry)
                .forEach(resp => {
                     switch (resp.StatType) {
                        case StatusType.Success:
                            if (this.isUpdate == false) {
                                this.msgs = [];
                            }
                            this.msgs = [];
                            for (let x = 0; x < resp.DataList.length; x++) {
                                if(resp.DataList[x].STATUS == 'A') {
                                    resp.DataList[x].checkStatus = true;
                                } else {
                                    resp.DataList[x].checkStatus = false;
                                }
                            }
                            this.requestorData = resp.DataList;
                            for (let x = 0; x < this.requestorData.length; x++) {
                                let requestorDataDetails = new TKIT_REQUESTOR();
                                requestorDataDetails.REQUESTOR_ID = this.requestorData[x].REQUESTOR_ID;
                                requestorDataDetails.FIRST_NAME = this.requestorData[x].FIRST_NAME;
                                requestorDataDetails.LAST_NAME = this.requestorData[x].LAST_NAME;
                                requestorDataDetails.MIDDLE_INIT = this.requestorData[x].MIDDLE_INIT;
                                requestorDataDetails.ORG_GROUP_ID = this.requestorData[x].ORG_GROUP_ID;
                                requestorDataDetails.STATUS = this.requestorData[x].STATUS;
                                requestorDataDetails.checkStatus = this.requestorData[x].checkStatus;
                                this.mainlstGridData.push(requestorDataDetails);
                            }

                            this.spinnerService.stop();
                            if (this.requestorData != null && this.requestorData.length > 0) {
                                this.isVisible = true;
                            }
                            
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
            this.isUpdate = false;
        } catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    }

    addRequestor() {
       try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Requestor';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.atParSharedDataService.setStorage({ "mode": ModeEnum.Add });
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "mode": ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        } catch (ex) {
           this.clientErrorMsg(ex, "editRequestor");
        }
    }
   
    editRequestor(requstorData) {
        
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Requestor';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.atParSharedDataService.setStorage({ "requestorID": requstorData.REQUESTOR_ID, "mode": ModeEnum.Edit });
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "mode": ModeEnum.Add,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        } catch (ex) {
            this.clientErrorMsg(ex, "editRequestor");
        }
        
    }
    
    updateRequestorStatus (requstorData) {

        this.spinnerService.start();
        this.manageRequestorServices.updateRequestorStatus(requstorData.REQUESTOR_ID, requstorData.STATUS, this._deviceTokenEntry).forEach(resp => {
            this.msgs = [];
            switch (resp.StatType) {
                case StatusType.Success:
                let filterData: any = [];
                this.requestorData = [];
                let matchedrecord = this.mainlstGridData.filter(x => x.REQUESTOR_ID == requstorData.REQUESTOR_ID);
                matchedrecord[0].STATUS = (requstorData.STATUS == 'A' ? "I" : "A");
                console.log(this.mainlstGridData);
                if (this.statusType.toString() == "A") {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == 'A');
                } else if (this.statusType.toString() == "I") {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == 'I');
                } else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (let x = 0; x < filterData.length; x++) {
                        let lstRequestorDetails = new TKIT_REQUESTOR();
                        lstRequestorDetails.REQUESTOR_ID = filterData[x].REQUESTOR_ID;
                        lstRequestorDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                        lstRequestorDetails.LAST_NAME = filterData[x].LAST_NAME;
                        lstRequestorDetails.MIDDLE_INIT = filterData[x].MIDDLE_INIT;
                        lstRequestorDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                        lstRequestorDetails.STATUS = filterData[x].STATUS;
                        if(filterData[x].STATUS== 'A') {
                            lstRequestorDetails.checkStatus = true;
                        } else {
                            lstRequestorDetails.checkStatus = false;
                        }
                        this.requestorData.push(lstRequestorDetails);
                    }
        
                }
                    this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Requestor").replace("2%", requstorData.REQUESTOR_ID);
                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
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

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    /**
  * delete all the values from variables
  */
    ngOnDestroy() {
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.requestorData = [];
        this.isVisible = false;
    }
} 