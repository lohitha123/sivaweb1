import { Component, Input, OnDestroy, ViewChild ,Inject} from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Message, SelectItem } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtParConstants } from "../Shared/AtParConstants";
import { PAR_MNGT_PAR_LOC_HEADER } from "../entities/par_mngt_par_loc_header";
import { TokenEntry_Enum, YesNo_Enum, BusinessType, StatusType, EnumApps, Par_Locn_Type, Repleshment_Type } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from '@angular/http';
import { VM_PAR_MNGT_SETUP_LOCATIONS } from "../../app/Entities/VM_PAR_MNGT_SETUP_LOCATIONS";
import { AtparSetupParLocationServices } from './atpar-setup-par-locations.service';
import { VM_COST_CENTER_CODES } from '../entities/vm_cost_center_codes';
import { RM_SHIPTO_IDS } from '../entities/rm_shipto_ids';
import { PAR_MNGT_ITEM } from '../Entities/par_mngt_item';
import { VM_PAR_SETUP_PAR_LOCATIONS } from '../entities/vm_par_setup_par_locations';
import { VM_ITEM_PAR_LOCATION } from '../entities/vm_item_par_locations';
import { VM_SETUP_PAR_AUDIT } from '../entities/vm_setup_par_audit';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { DataTable } from '../components/datatable/datatable';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Menus } from '../AtPar/Menus/routepath';
import  {  DOCUMENT }  from  '@angular/platform-browser';

declare var module: {
    id: string;
}

@Component({

    selector: 'atpar-setup-par-locations',
    templateUrl: 'atpar-setup-par-locations.component.html',
    providers: [datatableservice, AtParConstants, AtParCommonService, AtparSetupParLocationServices],
})

export class AtparSetupParLocationsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    @Input() appId: string;


    showGrid1: boolean = false;
    showGrid2: boolean = false;
    page: boolean = true;
    page2: boolean = false;
    showsearch: boolean = false;
    form: boolean = false;
    form2: boolean = false;
    editform: boolean = false;
    fdata: boolean = false;

    loading: boolean = true; //for button enable disable
    btnitemloading: boolean = true;
    statusMsgs: Message[] = []; //for growl  messages
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    ddlCart: any;
    ddlLocType: any;
    ddlShipToId: any;
    getOrgIdsLst: string[] = [];
    ddlOrgId: any;
    getLocIdsLst: PAR_MNGT_PAR_LOC_HEADER[] = [];
    ddlLocIds: any;
    dgrdLocs: VM_PAR_MNGT_SETUP_LOCATIONS[];
    mode: string;
    buttonTitle: string;
    bindSymbal: string;
    newItem: PAR_MNGT_PAR_LOC_HEADER;
    getCostCentersLst: VM_COST_CENTER_CODES[];
    getShipToIDsLst: RM_SHIPTO_IDS[];
    ddlCostCenterId: any;
    ShowPOUParLocation: boolean = false;
    chkPOUCart: boolean = false;
    isEditMode: boolean = false;
    isItemEditMode: boolean = false;
    strMaxAllowQty: string;
    searchItem: string;
    ddlOrderingType: any;
    ddlRequisitionType: any;
    ddlReplenishment: any;
    ddlFillKillFlag: any;
    selectedItem: string = "";
    lstFilteredItems: any = [];
    lstItems: PAR_MNGT_ITEM[];
    orgID: string;
    locID: string;
    costCenterID: string;
    lstFilteredItemsList: any = [];
    dgrd2Locs: VM_PAR_SETUP_PAR_LOCATIONS[];
    tempdgrd2Locs: VM_PAR_SETUP_PAR_LOCATIONS[];
    splitsearchItem: string[];
    newParItem: VM_ITEM_PAR_LOCATION;
    itemMode: string;
    btnItemTitle: string;
    ddlSelectedLocID: string;
    compold: string;
    locationdata: any;
    breadCrumbMenu: Menus;
    statusList: any;
    bindSymbol: string;

    //textbox validation variables for Add/update Locations
    txtParLocIdStatus: number;
    txtParLocNameStatus: number;
    txtAssetAccountStatus: number;
    txtDeliveryLocIdStatus: number;
    txtAddress1Status: number;
    txtAddress2Status: number;
    txtCityStatus: number;
    txtStateStatus: number;
    txtZipStatus: number;
    txtCountryStatus: number;
    ddlOrgIDStatus: number;
    ddlCostCenterStatus: number;
    ddlQuanOptStatus: number;
    ddlLocTypeStatus: number;

    //textbox validation variables for Add/update items to locations
    txtCompartmentStatus: number;
    txtOptQtyStatus: number;
    txtUomProcStatus: number;
    txtUomIssueStatus: number;
    txtConvRateStatus: number;
    txtFoqQtyStatus: number;
    txtMaxQtyStatus: number;
    txtUomParStatus: number;
    txtParConvRateStatus: number;
    txtChargeCode: number;
    txtCountOrder: number;
    txtUserField1: number;
    ddlOrderingTypeStatus: number;
    ddlReplTypeStatus: number;
    ddlCCenterStatus: number;
    ddlReqTypeStatus: number;


    //variables as reference
    pUOI: number;
    pConvRate: number;
    pReplType: number;
    pSrCntrl: number;
    pLotCntrl: number;
    pChgCode: number;
    pUOP: number;
    pUOPar: number;
    pConvRTPar: number;

    strUOI: string;
    strUOP: string;
    strChgCode: string;
    strConvRate: string;
    parUom: string;
    convRtPar: string;
    strSrCntrl: string;
    strLotCntrl: string;
    strReplType: string;
    strCCCode: string;

    dsInsertParAudit: VM_SETUP_PAR_AUDIT[] = [];
    public insertParAuditItem = new VM_SETUP_PAR_AUDIT();

    constructor(public dataservice: datatableservice,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService,
        private httpService: HttpService,
        @Inject(DOCUMENT)  private  document,
        private AtparSetupParLocationServices: AtparSetupParLocationServices) {

        this.breadCrumbMenu = new Menus();
    }

    async go() {
        if (this.showGrid1 == true) {
            this.dataTableComponent.reset();
        }
        try {
            this.statusMsgs = [];
            this.spinnerService.start();
            if (this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == "Select one") {
                this.newItem.ORG_ID = "";
            }
            if (this.newItem.PAR_LOC_ID == undefined) {
                this.newItem.PAR_LOC_ID = "";
            }
            if (this.newItem.LOCATION_NAME == undefined) {
                this.newItem.LOCATION_NAME = "";
            }

            if (this.ddlSelectedLocID != "" && this.ddlSelectedLocID != "Select one" && this.ddlSelectedLocID != undefined && this.ddlSelectedLocID != null) {
                let x: any[];
                let temp: string = this.ddlSelectedLocID;
                x = temp.split(" - ");
                this.newItem.PAR_LOC_ID = x[0];
            }

            await this.AtparSetupParLocationServices.getLocations(this.newItem.ORG_ID, this.newItem.PAR_LOC_ID, this.newItem.LOCATION_NAME, this.appId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS>;
                    switch (resp.StatType) {
                        case StatusType.Success:
                            for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].CART_TYPE == "01") {
                                    resp.DataList[i].CART_TYPE = "Count";
                                }
                                else if (resp.DataList[i].CART_TYPE == "02") {
                                    resp.DataList[i].CART_TYPE = "Request";
                                }
                            }
                            for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].PARLOC_TYPE == "1") {
                                    resp.DataList[i].PARLOC_TYPE = Par_Locn_Type[1].toString();
                                }
                                else if (resp.DataList[i].PARLOC_TYPE == "2") {
                                    resp.DataList[i].PARLOC_TYPE = Par_Locn_Type[2].toString();
                                }
                                else if (resp.DataList[i].PARLOC_TYPE == "3") {
                                    resp.DataList[i].PARLOC_TYPE = Par_Locn_Type[3].toString();
                                }
                                else if (resp.DataList[i].PARLOC_TYPE == "4") {
                                    resp.DataList[i].PARLOC_TYPE = Par_Locn_Type[4].toString();
                                }
                                else if (resp.DataList[i].PARLOC_TYPE == "5") {
                                    resp.DataList[i].PARLOC_TYPE = Par_Locn_Type[5].toString();
                                }

                            }
                            for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                if (this.appId == EnumApps.PointOfUse.toString()) {
                                    resp.DataList = resp.DataList.filter(x => x.POU_CART == 'Y')
                                }
                                else if (this.appId == EnumApps.Pharmacy.toString()) {
                                    resp.DataList = resp.DataList.filter(x => x.POU_CART == 'P')
                                }
                                else {
                                    resp.DataList = resp.DataList;
                                }

                            }
                            if (resp.DataList.length > 0) {
                                this.showGrid1 = true;
                                this.dgrdLocs = resp.DataList;
                            }
                            else {
                                this.showGrid1 = false;
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                            }
                            this.spinnerService.stop();

                            break;
                        case StatusType.Error:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid1 = false;
                            break;
                        case StatusType.Warn:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid1 = false;
                            break;
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "go");
        }

    }

    add() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Par Location';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.editform = false;
        this.page = false;
        this.showGrid1 = false;
        this.buttonTitle = "Save";
        this.bindSymbal = "floppy-o";
        this.mode = "Add";
        this.btnItemTitle = "";
        this.isEditMode = false;
        this.chkPOUCart = false;
        this.newItem = new PAR_MNGT_PAR_LOC_HEADER();
        this.getCodes();
        this.getShipToIds();
        this.statusMsgs = [];
        this.txtParLocIdStatus = null;
        this.ddlOrgIDStatus = null;
        this.ddlCostCenterStatus = null;
        this.ddlQuanOptStatus = null;
        this.ddlLocTypeStatus = null;
        this.loading = true;
        this.btnItemTitle = "";
    }

    async editParLocationData(parlocation) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Par Location';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.editform = false;
        this.page = false;
        this.showGrid1 = false;
        this.statusMsgs = [];
        this.loading = false;
        this.buttonTitle = "Update";
        this.bindSymbal = "check";
        this.mode = "Edit";
        this.btnItemTitle = "";
        this.isEditMode = true;
        this.getCodes();
        this.getShipToIds();
        try {
            this.spinnerService.start();
            await this.AtparSetupParLocationServices.getLocationHeader(parlocation.PAR_LOC_ID, parlocation.BUSINESS_UNIT).
                catch(this.httpService.handleError).then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER>;
                    switch (resp.StatType) {
                        case StatusType.Success:
                            //for quantity option value binding
                            if (resp.DataList[0].CART_TYPE == "01") {
                                resp.DataList[0].CART_TYPE = "Count";
                            }
                            else if (resp.DataList[0].CART_TYPE == "02") {
                                resp.DataList[0].CART_TYPE = "Request";
                            }
                            //for setting switch of POU Location
                            if (resp.DataList[0].POU_CART == "Y") {
                                this.chkPOUCart = true;
                            }
                            else {
                                this.chkPOUCart = false;
                            }
                            this.newItem = resp.DataList[0];
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "editParLocationData");

        }
    }

    add2() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form2 = true;

        this.statusMsgs = [];
        this.showsearch = false;
        this.showGrid2 = false;
        this.page2 = false;

        this.isItemEditMode = false;
        this.btnitemloading = true;
        this.fdata = false;
        this.selectedItem = null;
        this.newParItem = new VM_ITEM_PAR_LOCATION();
        this.searchItem = null;
        this.btnItemTitle = "Save";
        this.itemMode = "Add"
        this.ddlOrderingTypeStatus = null;
        this.ddlReplTypeStatus = null;
        this.ddlCCenterStatus = null;
        this.ddlReqTypeStatus = null;
        this.txtCompartmentStatus = null;
        this.txtOptQtyStatus = null;
        this.txtUomIssueStatus = null;
        this.txtUomProcStatus = null;
        this.txtConvRateStatus = null;
    }

    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.showGrid1 = false;
    }

    async med(location) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Item(s)';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.spinnerService.start();
        this.page2 = true;
        this.showsearch = true;
        this.showGrid2 = true;
        this.form = false;
        this.editform = false;
        this.page = false;
        this.showGrid1 = false;
        this.orgID = location.BUSINESS_UNIT;
        this.locID = location.PAR_LOC_ID;
        this.costCenterID = location.COST_CENTER_CODE;
        await this.getstrMaxAllowQty();
        await this.GetOrgIdName(location);
        this.bindFillKillFlag();
        this.bindReplenishment();
        this.bindOrderingType();
        this.bindRequisitionType();
        this.getOrgIds();
        this.getCodes();
        this.searchItem = null;
        this.selectedItem = null;
        this.buttonTitle = "";
        this.statusList = [];
        this.statusList.push({ label: 'All', value: 'All' });
        this.statusList.push({ label: 'Active', value: 'Active' });
        this.statusList.push({ label: 'InActive', value: 'InActive' });
        this.statusList.push({ label: 'Pending', value: 'Pending' });
        //scrollcontainer
        this.spinnerService.stop();
    }

    async search() {

        this.showsearch = false;
        this.showGrid2 = false;
        this.page2 = false;

        this.fdata = false;
        this.mode = "Add"
        this.btnitemloading = true;
        this.btnItemTitle = "Save";
        this.bindSymbol = "floppy-o";
        this.ddlOrderingTypeStatus = null;
        this.ddlReplTypeStatus = null;
        this.ddlCCenterStatus = null;
        this.ddlReqTypeStatus = null;
        this.txtCompartmentStatus = null;
        this.txtOptQtyStatus = null;
        this.txtUomIssueStatus = null;
        this.txtUomProcStatus = null;
        this.txtConvRateStatus = null;
        this.newParItem = new VM_ITEM_PAR_LOCATION();
        this.bindOrderingType();
        this.bindRequisitionType();
        this.bindReplenishment();
        this.bindFillKillFlag();
        if (this.selectedItem == "" || this.selectedItem == null) {
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid ItemID to get the Data" });
        }
        else {
            try {
                this.splitsearchItem = this.selectedItem.split("-");
                this.splitsearchItem[0] = this.splitsearchItem[0].trim();
                let orgid = asEnumerable(this.lstItems).Where(x => x.ITEM_ID == this.splitsearchItem[0]).Select(x => x.ORG_GROUP_ID).ToArray();
                this.spinnerService.start();
                await this.AtparSetupParLocationServices.getItemUOM(this.splitsearchItem[0], orgid[0], this.appId).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let resp = res.json() as AtParWebApiResponse<PAR_MNGT_ITEM>;
                        this.spinnerService.stop();
                        switch (resp.StatType) {
                            case StatusType.Success: {
                                this.fdata = true;
                                if (resp.DataList[0] != null) {
                                    this.newParItem.SHORT_DESCR = resp.DataList[0].SHORT_DESCR;
                                    this.newParItem.CHARGE_CODE = resp.DataList[0].CHARGE_CODE;
                                    this.newParItem.USER_FIELD_1 = resp.DataList[0].USER_FIELD_1;
                                    this.newParItem.SERIAL_CONTROLLED = resp.DataList[0].SERIAL_CONTROLLED;
                                    if (this.newParItem.SERIAL_CONTROLLED == YesNo_Enum[YesNo_Enum.N].toString()) {
                                        this.newParItem.SERIAL_CONTROLLED_STATUS = false;
                                    }
                                    else if (this.newParItem.SERIAL_CONTROLLED == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                        this.newParItem.SERIAL_CONTROLLED_STATUS = true;
                                    }
                                    this.newParItem.LOT_CONTROLLED = resp.DataList[0].LOT_CONTROLLED;
                                    if (this.newParItem.LOT_CONTROLLED == YesNo_Enum[YesNo_Enum.N].toString()) {
                                        this.newParItem.LOT_CONTROLLED_STATUS = false;
                                    }
                                    else if (this.newParItem.LOT_CONTROLLED == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                        this.newParItem.LOT_CONTROLLED_STATUS = true;
                                    }
                                    this.newParItem.UNIT_OF_ISSUE = resp.DataList[0].UNIT_OF_ISSUE;
                                    this.newParItem.UNIT_OF_PROCUREMENT = resp.DataList[0].UNIT_OF_PROCUREMENT;
                                    this.newParItem.CONVERSION_RATE = resp.DataList[0].CONV_FACTOR;
                                    this.newParItem.PAR_UOM = resp.DataList[0].PAR_UOM;
                                    this.newParItem.CONV_RATE_PAR_UOM = resp.DataList[0].CONV_RATE_PAR_UOM;
                                    if (resp.DataList[0].REPLENISHMENT_TYPE == "1") {
                                        resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stock].toString();
                                    }
                                    else if (resp.DataList[0].REPLENISHMENT_TYPE == "2") {
                                        resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Nonstock].toString();
                                    }
                                    else if (resp.DataList[0].REPLENISHMENT_TYPE == "4") {
                                        resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Consignment].toString();
                                    }
                                    else if (resp.DataList[0].REPLENISHMENT_TYPE == "3") {
                                        resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stockless].toString();
                                    }
                                    this.newParItem.REPLENISHMENT_TYPE = resp.DataList[0].REPLENISHMENT_TYPE;
                                    //this.newParItem.ACTIVEFLAG = "true";
                                    this.newParItem.STATUS = "Y";
                                    this.newParItem.COST_CENTER = this.costCenterID;
                                    this.newParItem.INV_BUSINESS_UNIT = this.orgID;

                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                break;
                            }
                        }
                    });
                this.spinnerService.stop();
            }
            catch (ex) {
                this.clientErrorMsg(ex, "search");
            }
        }
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.showGrid1 = false;
        this.editform = false;
        this.newItem = new PAR_MNGT_PAR_LOC_HEADER();
        this.ddlLocIds = [];
        this.ddlLocIds.push({ label: "Select one", value: "Select one" });
        this.statusMsgs = [];
        this.ddlSelectedLocID = "";
    }

    close2() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.statusMsgs = [];
        this.ddlLocIds = [];
        this.ddlLocIds.push({ label: "Select one", value: "Select one" });
        this.ddlSelectedLocID = "";
        this.page = true;
        this.showGrid1 = false;
        this.showGrid2 = false;
        this.form = false;
        this.showsearch = false;
        this.page2 = false;
        this.searchItem = "";
        this.newItem = new PAR_MNGT_PAR_LOC_HEADER();
        this.form2 = false;
        this.selectedItem = "";
        this.newParItem = new VM_ITEM_PAR_LOCATION();

    }

    async close3() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Item(s)';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.statusMsgs = [];
        this.ddlSelectedLocID = "";
        this.page = false;
        this.showGrid1 = false;
        this.form = false;
        this.searchItem = "";
        this.form2 = false;
        this.selectedItem = "";
        this.newParItem = new VM_ITEM_PAR_LOCATION();
        this.showsearch = true;
        this.showGrid2 = true;
        this.page2 = true;
        await this.GetOrgIdName(this.locationdata);
    }

    bindModelDataChange(event: any) {
        if (this.buttonTitle == "Save" || this.buttonTitle == "UPDATE") {
            try {
                if ("ParLocId" == event.TextBoxID.toString()) {
                    this.txtParLocIdStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ParLocName" == event.TextBoxID.toString()) {
                    this.txtParLocNameStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ParAssetAcc" == event.TextBoxID.toString()) {
                    this.txtAssetAccountStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("DeliveryLocId" == event.TextBoxID.toString()) {
                    this.txtDeliveryLocIdStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("Address1" == event.TextBoxID.toString()) {
                    this.txtAddress1Status = event.validationrules.filter(x => x.status == false).length;
                }
                if ("Address2" == event.TextBoxID.toString()) {
                    this.txtAddress2Status = event.validationrules.filter(x => x.status == false).length;
                }
                if ("City" == event.TextBoxID.toString()) {
                    this.txtCityStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("State" == event.TextBoxID.toString()) {
                    this.txtStateStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("Zip" == event.TextBoxID.toString()) {
                    this.txtZipStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("Country" == event.TextBoxID.toString()) {
                    this.txtCountryStatus = event.validationrules.filter(x => x.status == false).length;
                }

                if (this.buttonTitle == "UPDATE") {
                    this.txtParLocIdStatus = 0;
                    this.ddlDropDownChanged();
                }

                //validations satisfies r not 
                if (this.txtParLocIdStatus == 0 && this.ddlLocTypeStatus == 0 && this.ddlQuanOptStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlCostCenterStatus == 0) {
                    if ((this.txtParLocNameStatus == 0 || this.txtParLocNameStatus == undefined) &&
                        (this.txtAssetAccountStatus == 0 || this.txtAssetAccountStatus == undefined) &&
                        (this.txtDeliveryLocIdStatus == 0 || this.txtDeliveryLocIdStatus == undefined) &&
                        (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined) &&
                        (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) &&
                        (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                        (this.txtStateStatus == 0 || this.txtStateStatus == undefined) &&
                        (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                        (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined)) {
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
                this.clientErrorMsg(ex, "bindModelDataChange");
            }
        }
        else if (this.btnItemTitle == "Save" || this.btnItemTitle == "Update") {
            try {
                if ("Compartment" == event.TextBoxID.toString()) {
                    this.txtCompartmentStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("OptimalQuant" == event.TextBoxID.toString()) {
                    this.txtOptQtyStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("FoqQty" == event.TextBoxID.toString()) {
                    this.txtFoqQtyStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("MaxQty" == event.TextBoxID.toString()) {
                    this.txtMaxQtyStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UomProc" == event.TextBoxID.toString()) {
                    this.txtUomProcStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UnitOfIssue" == event.TextBoxID.toString()) {
                    this.txtUomIssueStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ParUom" == event.TextBoxID.toString()) {
                    this.txtUomParStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ConversionRateParUom" == event.TextBoxID.toString()) {
                    this.txtParConvRateStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ConversionRateProcure" == event.TextBoxID.toString()) {
                    this.txtConvRateStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ChargeCode" == event.TextBoxID.toString()) {
                    this.txtChargeCode = event.validationrules.filter(x => x.status == false).length;
                }
                if ("Countorder" == event.TextBoxID.toString()) {
                    this.txtCountOrder = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UserField1" == event.TextBoxID.toString()) {
                    this.txtUserField1 = event.validationrules.filter(x => x.status == false).length;
                }

                if (this.newParItem.BIN_LOC != null) {
                    if (this.txtCompartmentStatus > 0) {
                        this.txtCompartmentStatus = 1;
                    }
                    else {
                        this.txtCompartmentStatus = 0;
                    }
                }
                if (this.newParItem.OPTIMAL_QTY != null) {
                    if (this.txtOptQtyStatus > 0) {
                        this.txtOptQtyStatus = 1;
                    }
                    else {
                        this.txtOptQtyStatus = 0;
                    }
                }
                if (this.newParItem.UNIT_OF_PROCUREMENT != null) {
                    if (this.txtUomProcStatus > 0) {
                        this.txtUomProcStatus = 1;
                    }
                    else {
                        this.txtUomProcStatus = 0;
                    }
                }
                if (this.newParItem.UNIT_OF_ISSUE != null) {
                    if (this.txtUomIssueStatus > 0) {
                        this.txtUomIssueStatus = 1;
                    }
                    else {
                        this.txtUomIssueStatus = 0;
                    }
                }
                if (this.newParItem.CONVERSION_RATE != null) {
                    if (this.txtConvRateStatus > 0) {
                        this.txtConvRateStatus = 1;
                    }
                    else {
                        this.txtConvRateStatus = 0;
                    }
                }
                this.ddlDropDownAddItemChanged();
                //validations satisfies r not 
                if (this.txtCompartmentStatus == 0 && this.txtOptQtyStatus == 0 && this.txtUomProcStatus == 0 && this.txtUomIssueStatus == 0 && this.txtConvRateStatus == 0 &&
                    this.ddlOrderingTypeStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlCCenterStatus == 0 && this.ddlReqTypeStatus == 0) {
                    if ((this.txtFoqQtyStatus == 0 || this.txtFoqQtyStatus == undefined) &&
                        (this.txtMaxQtyStatus == 0 || this.txtMaxQtyStatus == undefined) &&
                        (this.txtChargeCode == 0 || this.txtChargeCode == undefined) &&
                        (this.txtCountOrder == 0 || this.txtCountOrder == undefined) &&
                        (this.txtUserField1 == 0 || this.txtUserField1 == undefined) &&
                        (this.txtParConvRateStatus == 0 || this.txtParConvRateStatus == undefined) &&
                        (this.txtUomParStatus == 0 || this.txtUomParStatus == undefined)) {
                        this.btnitemloading = false;
                    }
                    else {
                        this.btnitemloading = true;
                    }
                }
                else {
                    this.btnitemloading = true;
                }
            } catch (ex) {
                this.clientErrorMsg(ex, "bindModelDataChange");
            }
        }
    }

    ddlDropDownChanged() {
        if (this.newItem.ORG_ID == "Select one" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }

        if (this.newItem.COST_CENTER_CODE == "Select one" || this.newItem.COST_CENTER_CODE == undefined || this.newItem.COST_CENTER_CODE == null || this.newItem.COST_CENTER_CODE == "") {
            this.ddlCostCenterStatus = 1;
        }
        else {
            this.ddlCostCenterStatus = 0;
        }

        if (this.newItem.CART_TYPE == "Select one" || this.newItem.CART_TYPE == undefined || this.newItem.CART_TYPE == null || this.newItem.CART_TYPE == "") {
            this.ddlQuanOptStatus = 1;
        }
        else {
            this.ddlQuanOptStatus = 0;
        }

        if (this.newItem.PARLOC_TYPE == "Select one" || this.newItem.PARLOC_TYPE == undefined || this.newItem.PARLOC_TYPE == null || this.newItem.PARLOC_TYPE == "" || this.newItem.PARLOC_TYPE == "0") {
            this.ddlLocTypeStatus = 1;
        }
        else {
            this.ddlLocTypeStatus = 0;
        }
        if (this.buttonTitle == "UPDATE") {
            this.txtParLocIdStatus = 0;
        }
        if ((this.newItem.PAR_LOC_ID != "" && this.newItem.PAR_LOC_ID != undefined && this.newItem.PAR_LOC_ID != null) && this.txtParLocIdStatus == 0 && this.ddlLocTypeStatus == 0 && this.ddlQuanOptStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlCostCenterStatus == 0) {
            if ((this.txtParLocNameStatus == 0 || this.txtParLocNameStatus == undefined) &&
                (this.txtAssetAccountStatus == 0 || this.txtAssetAccountStatus == undefined) &&
                (this.txtDeliveryLocIdStatus == 0 || this.txtDeliveryLocIdStatus == undefined) &&
                (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined) &&
                (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) &&
                (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                (this.txtStateStatus == 0 || this.txtStateStatus == undefined) &&
                (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }
    }

    ddlLoc_Change() {
        this.showGrid1 = false;
    }

    ddlDropDownAddItemChanged() {
        if (this.newParItem.ORDERING_TYPE == "Select one" || this.newParItem.ORDERING_TYPE == undefined || this.newParItem.ORDERING_TYPE == null || this.newParItem.ORDERING_TYPE == "") {
            this.ddlOrderingTypeStatus = 1;
        }
        else {
            this.ddlOrderingTypeStatus = 0;
        }

        if (this.newParItem.REPLENISHMENT_TYPE == "Select one" || this.newParItem.REPLENISHMENT_TYPE == undefined || this.newParItem.REPLENISHMENT_TYPE == null || this.newParItem.REPLENISHMENT_TYPE == "") {
            this.ddlReplTypeStatus = 1;
        }
        else {
            this.ddlReplTypeStatus = 0;
        }

        if (this.newParItem.COST_CENTER == "Select one" || this.newParItem.COST_CENTER == undefined || this.newParItem.COST_CENTER == null || this.newParItem.COST_CENTER == "") {
            this.ddlCCenterStatus = 1;
        }
        else {
            this.ddlCCenterStatus = 0;
        }

        if (this.newParItem.REQUISITION_TYPE == "Select one" || this.newParItem.REQUISITION_TYPE == undefined || this.newParItem.REQUISITION_TYPE == null || this.newParItem.REQUISITION_TYPE == "") {
            this.ddlReqTypeStatus = 1;
        }
        else {
            this.ddlReqTypeStatus = 0;
        }
        if (this.btnItemTitle == "Update") {
            if (this.txtCompartmentStatus >= 1) {
                this.txtCompartmentStatus = 1;
            }
            else {
                this.txtCompartmentStatus = 0;
            }

            if (this.txtOptQtyStatus >= 1) {
                this.txtOptQtyStatus = 1;
            }
            else {
                this.txtOptQtyStatus = 0;
            }

            if (this.txtUomProcStatus >= 1) {
                this.txtUomProcStatus = 1;
            }
            else {
                this.txtUomProcStatus = 0;
            }

            if (this.txtUomIssueStatus >= 1) {
                this.txtUomIssueStatus = 1;
            }
            else {
                this.txtUomIssueStatus = 0;
            }

            if (this.txtConvRateStatus >= 1) {
                this.txtConvRateStatus = 1;
            }
            else {
                this.txtConvRateStatus = 0;
            }

        }
        if (this.txtCompartmentStatus == 0 && this.txtOptQtyStatus == 0 && this.txtUomProcStatus == 0 && this.txtUomIssueStatus == 0 && this.txtConvRateStatus == 0 &&
            this.ddlOrderingTypeStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlCCenterStatus == 0 && this.ddlReqTypeStatus == 0
            && (this.newParItem.BIN_LOC != "" && this.newParItem.BIN_LOC != undefined && this.newParItem.BIN_LOC != null) &&
            (this.newParItem.OPTIMAL_QTY != undefined && this.newParItem.OPTIMAL_QTY != null) &&
            (this.newParItem.UNIT_OF_PROCUREMENT != "" && this.newParItem.UNIT_OF_PROCUREMENT != undefined && this.newParItem.UNIT_OF_PROCUREMENT != null) &&
            (this.newParItem.UNIT_OF_ISSUE != "" && this.newParItem.UNIT_OF_ISSUE != undefined && this.newParItem.UNIT_OF_ISSUE != null) &&
            (this.newParItem.CONVERSION_RATE != undefined && this.newParItem.CONVERSION_RATE != null)) {
            if ((this.txtFoqQtyStatus == 0 || this.txtFoqQtyStatus == undefined) &&
                (this.txtMaxQtyStatus == 0 || this.txtMaxQtyStatus == undefined) &&
                (this.txtChargeCode == 0 || this.txtChargeCode == undefined) &&
                (this.txtCountOrder == 0 || this.txtCountOrder == undefined) &&
                (this.txtUserField1 == 0 || this.txtUserField1 == undefined) &&
                (this.txtParConvRateStatus == 0 || this.txtParConvRateStatus == undefined) &&
                (this.txtUomParStatus == 0 || this.txtUomParStatus == undefined)) {
                this.btnitemloading = false;
            }
            else {
                this.btnitemloading = true;
            }
        }
        else {
            this.btnitemloading = true;
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async ngOnInit() {
        try {
            this.spinnerService.start();
            this.newItem = new PAR_MNGT_PAR_LOC_HEADER();
            this.newParItem = new VM_ITEM_PAR_LOCATION();
            //this.dataTableComponent.reset();
            //this.chkPOUCart = false;
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            await this.getOrgIds();
            await this.getLocationType();
            await this.bindQuantityOption();
            this.ddlLocIds = [];
            this.ddlLocIds.push({ label: "Select one", value: "Select one" });
            if (this.appId == EnumApps.PointOfUse.toString() || this.appId == EnumApps.Pharmacy.toString()) {
                this.ShowPOUParLocation = false;
            }
            else {
                this.ShowPOUParLocation = true;
            }

            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    bindQuantityOption() {
        this.ddlCart = [];
        this.ddlCart.push({ label: "Select one", value: "Select one" });
        this.ddlCart.push({ label: "Count", value: "Count" });
        this.ddlCart.push({ label: "Request", value: "Request" });
    }

    async getCodes() {
        try {
            this.ddlCostCenterId = [];
            this.ddlCostCenterId.push({ label: "Select one", value: "Select one" });
            this.spinnerService.start();
            await this.AtparSetupParLocationServices.getCodes("", this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], "").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_COST_CENTER_CODES>;
                    this.getCostCentersLst = res.json().DataList,
                        this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.getCostCentersLst = asEnumerable(this.getCostCentersLst).Where(x => x.STATUS === false).Select(x => x).ToArray();
                            if (this.getCostCentersLst.length > 0) {
                                for (var i = 0; i <= this.getCostCentersLst.length - 1; i++) {
                                    this.ddlCostCenterId.push({ label: this.getCostCentersLst[i].COST_CENTER_CODE, value: this.getCostCentersLst[i].COST_CENTER_CODE });

                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getCodes");
        }
    }

    async getOrgIds() {
        try {
            this.ddlOrgId = [];
            this.ddlOrgId.push({ label: "Select one", value: "Select one" });
            this.spinnerService.start();
            await this.commonService.getOrgIds(this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.getOrgIdsLst = res.json().DataList,
                        this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.getOrgIdsLst.length > 0) {
                                for (var i = 0; i <= this.getOrgIdsLst.length - 1; i++) {
                                    this.ddlOrgId.push({ label: this.getOrgIdsLst[i].toString(), value: this.getOrgIdsLst[i].toString() });

                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getOrgIds");
        }
    }

    async getLocByOrgId() {
        this.showGrid1 = false;
        try {
            this.spinnerService.start();
            this.ddlSelectedLocID = "";
            this.getLocIdsLst = [];
            await this.commonService.getLocByOrgId(this.newItem.ORG_ID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.getLocIdsLst = res.json().DataList,
                        this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlLocIds = [];
                            this.ddlLocIds.push({ label: "Select one", value: "Select one" });
                            if (this.getLocIdsLst.length > 0) {
                                if (this.appId == EnumApps.PointOfUse.toString()) {
                                    for (var i = 0; i <= this.getLocIdsLst.length - 1; i++) {
                                        if (this.getLocIdsLst[i].POU_CART == 'Y') {
                                            var ddlValues = this.getLocIdsLst[i].PAR_LOC_ID + " - " + this.getLocIdsLst[i].LOCATION_NAME;
                                            this.ddlLocIds.push({ label: ddlValues, value: ddlValues });
                                        }
                                    }
                                }
                                else if (this.appId == EnumApps.Pharmacy.toString()) {
                                    for (var i = 0; i <= this.getLocIdsLst.length - 1; i++) {
                                        if (this.getLocIdsLst[i].POU_CART == 'P') {
                                            var ddlValues = this.getLocIdsLst[i].PAR_LOC_ID + " - " + this.getLocIdsLst[i].LOCATION_NAME;
                                            this.ddlLocIds.push({ label: ddlValues, value: ddlValues });
                                        }
                                    }
                                }
                                else {
                                    for (var i = 0; i <= this.getLocIdsLst.length - 1; i++) {
                                        if (this.getLocIdsLst[i].POU_CART == 'N') {
                                            var ddlValues = this.getLocIdsLst[i].PAR_LOC_ID + " - " + this.getLocIdsLst[i].LOCATION_NAME;
                                            this.ddlLocIds.push({ label: ddlValues, value: ddlValues });
                                        }
                                    }
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.StatusCode == 1102002) {
                                this.ddlLocIds = [];
                                this.ddlLocIds.push({ label: "Select one", value: "Select one" });
                                this.newItem.PAR_LOC_ID = "";
                                this.ddlSelectedLocID = "Select one";
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getLocByOrgId");
        }
    }

    async getShipToIds() {
        try {
            this.spinnerService.start();
            this.ddlShipToId = [];
            this.ddlShipToId.push({ label: "Select one", value: "0" }); 
            await this.AtparSetupParLocationServices.getShipToIds("").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<RM_SHIPTO_IDS>;
                    this.getShipToIDsLst = res.json().DataList,
                       // this.getShipToIDsLst = asEnumerable(this.getShipToIDsLst).Where(x => x.STATUS = true).ToArray()
                        this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.getShipToIDsLst.length > 0) {
                                for (var i = 0; i <= this.getShipToIDsLst.length - 1; i++) {
                                    this.ddlShipToId.push({ label: this.getShipToIDsLst[i].SHIPTO_ID, value: this.getShipToIDsLst[i].SHIPTO_ID });

                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getShipToIds");
        }

    }

    getLocationType() {
        if (this.appId == EnumApps.Pharmacy.toString()) {
            this.ddlLocType = [];
            this.ddlLocType.push({ label: "Select one", value: "0" });
            this.ddlLocType.push({ label: "ADC", value: "1" });
            this.ddlLocType.push({ label: "CrashCart", value: "2" });
            this.ddlLocType.push({ label: "Inventory", value: "3" });
            this.ddlLocType.push({ label: "ParLocation", value: "4" });

        }
        else {
            this.ddlLocType = [];
            this.ddlLocType.push({ label: "Select one", value: "0" });
            this.ddlLocType.push({ label: "Inventory", value: "1" });
            this.ddlLocType.push({ label: "ParLocation", value: "2" });
        }
    }

    async submitData() {
        this.showGrid1 = false;
        try {
            this.statusMsgs = [];
            if (this.newItem.ORG_ID == "Select one" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Org ID" });
                this.showGrid1 = false;
            }
            else if (this.newItem.COST_CENTER_CODE == "Select one" || this.newItem.COST_CENTER_CODE == undefined || this.newItem.COST_CENTER_CODE == null || this.newItem.COST_CENTER_CODE == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select COST CENTER" });
                this.showGrid1 = false;
            }
            else if (this.newItem.CART_TYPE == "Select one" || this.newItem.CART_TYPE == undefined || this.newItem.CART_TYPE == null || this.newItem.CART_TYPE == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Quantity Option" });
                this.showGrid1 = false;
            }
            else if (this.newItem.PARLOC_TYPE == "Select one" || this.newItem.PARLOC_TYPE == undefined || this.newItem.PARLOC_TYPE == null || this.newItem.PARLOC_TYPE == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Location Type" });
                this.showGrid1 = false;
            }
            else {
                this.spinnerService.start();
                if (this.newItem.CART_TYPE == "Count") {
                    this.newItem.CART_TYPE = "01";
                }
                else if (this.newItem.CART_TYPE == "Request") {
                    this.newItem.CART_TYPE = "02";
                }

                if (this.appId == EnumApps.PointOfUse.toString()) {
                    this.newItem.POU_CART = "Y";
                }
                else {
                    if (this.chkPOUCart == true) {
                        this.newItem.POU_CART = "Y";
                    }
                    else {
                        this.newItem.POU_CART = "N";
                    }
                }
                if (this.appId == EnumApps.Pharmacy.toString()) {
                    this.newItem.POU_CART = "P";
                }
                await this.AtparSetupParLocationServices.updateLoc(this.newItem, this.mode).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let resp = res.json() as AtParWebApiResponse<number>;
                        switch (resp.StatType) {
                            case StatusType.Success:
                                if (this.buttonTitle == "Save") {
                                    this.statusMsgs = [];
                                    let statusmsg = AtParConstants.Created_Msg.replace("1%", "Par Location").replace("2%", this.newItem.PAR_LOC_ID);
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                    this.newItem = new PAR_MNGT_PAR_LOC_HEADER();
                                    (<HTMLInputElement>document.getElementById('txtddlOrgId')).focus();
                                    this.txtParLocIdStatus = null;
                                    this.ddlLocTypeStatus = null;
                                    this.ddlQuanOptStatus = null;
                                    this.ddlOrgIDStatus = null;
                                    this.ddlCostCenterStatus = null;
                                    this.loading = true;
                                }
                                else if (this.buttonTitle == "UPDATE") {
                                    this.statusMsgs = [];
                                    let statusmsg = AtParConstants.Updated_Msg.replace("1%", "Par Location").replace("2%", this.newItem.PAR_LOC_ID);
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                    if (this.newItem.CART_TYPE == "01") {
                                        this.newItem.CART_TYPE = "Count";
                                    }
                                    else if (this.newItem.CART_TYPE == "02") {
                                        this.newItem.CART_TYPE = "Request"
                                    }
                                    if (this.isEditMode) {
                                        document.getElementById("ParLocName").focus();
                                    }
                                    
                                    //let locationid = this.newItem.LOCATION_ID;
                                    //this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
                                    //this.newItem.LOCATION_ID = locationid;
                                }
                                this.spinnerService.stop();
                                break;

                            case StatusType.Error:
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            case StatusType.Warn:
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                if (this.newItem.CART_TYPE == "01") {
                                    this.newItem.CART_TYPE = "Count";
                                }
                                else if (this.newItem.CART_TYPE == "02") {
                                    this.newItem.CART_TYPE = "Request"
                                }
                                this.spinnerService.stop();
                                break;
                        }
                        this.atParConstant.scrollToTop();
                    });


            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "submitData");
        }
    }

    async getstrMaxAllowQty() {
        try {
            this.spinnerService.start();
            await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], this.appId, "MAX_ALLOW_QTY").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList != null) {
                                this.strMaxAllowQty = data.DataList[0];
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getstrMaxAllowQty");
        }
    }

    async GetOrgIdName(location) {
        try {
            this.spinnerService.start();
            this.newItem = new PAR_MNGT_PAR_LOC_HEADER();
            this.locationdata = location;
            await this.AtparSetupParLocationServices.getOrgIdName(location.BUSINESS_UNIT).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataVariable != null) {
                                this.newItem.ORG_ID = data.DataVariable.toString();
                            }
                            this.newItem.PAR_LOC_ID = location.PAR_LOC_ID;
                            this.newItem.LOCATION_NAME = location.LOCATION_NAME;
                            this.newItem.CART_TYPE = location.CART_TYPE;
                            this.newItem.COST_CENTER_CODE = location.COST_CENTER_CODE;

                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            await this.BindDataGrid(location);
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetOrgIdName");
        }


    }

    async BindDataGrid(location) {
        if (this.showGrid2 == true) {
            this.dataTableComponent.reset();
        }
        try {
            this.spinnerService.start();
            this.dgrd2Locs = [];
            await this.AtparSetupParLocationServices.getLocDetails(location.PAR_LOC_ID, location.BUSINESS_UNIT, "", "").
                catch(this.httpService.handleError).then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<VM_PAR_SETUP_PAR_LOCATIONS>;
                    switch (resp.StatType) {
                        case StatusType.Success: {
                            if (resp.DataList.length > 0) {
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].ORDERING_TYPE == "01") {
                                        resp.DataList[i].ORDERING_TYPE = "par";
                                    }
                                    else if (resp.DataList[i].ORDERING_TYPE == "02") {
                                        resp.DataList[i].ORDERING_TYPE = "Foq";
                                    }
                                    else if (resp.DataList[i].ORDERING_TYPE == "03") {
                                        resp.DataList[i].ORDERING_TYPE = "Min/Max";
                                    }
                                    else if (resp.DataList[i].ORDERING_TYPE == "04") {
                                        resp.DataList[i].ORDERING_TYPE = "Issue";
                                    }
                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].STATUS == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                        resp.DataList[i].STATUS = "Active";
                                    }
                                    else if (resp.DataList[i].STATUS == YesNo_Enum[YesNo_Enum.N].toString()) {
                                        resp.DataList[i].STATUS = "InActive";
                                    }
                                    else {
                                        resp.DataList[i].STATUS = "Pending";
                                    }
                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Stock) {
                                        resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stock].toString();
                                    }
                                    else if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Nonstock) {
                                        resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Nonstock].toString();
                                    }
                                    else if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Consignment) {
                                        resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Consignment].toString();
                                    }
                                    else if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Stockless) {
                                        resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stockless].toString();
                                    }
                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].FILL_KILL_FLAG == "F") {
                                        resp.DataList[i].FILL_KILL_FLAG = "Fill";
                                    }
                                    else if (resp.DataList[i].FILL_KILL_FLAG == "K") {
                                        resp.DataList[i].FILL_KILL_FLAG = "Kill"
                                    }
                                    else {
                                        resp.DataList[i].FILL_KILL_FLAG = "";
                                    }

                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].LOCDTLSUOI == "") {
                                        resp.DataList[i].LOCDTLSUOI = resp.DataList[i].ITMUOI;
                                    }
                                    else {
                                        resp.DataList[i].LOCDTLSUOI = resp.DataList[i].LOCDTLSUOI;
                                    }

                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].OPTIMAL_QTY == null) {
                                        resp.DataList[i].OPTIMAL_QTY = 0;
                                    }
                                    else {
                                        resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY;
                                    }
                                    resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].OPTIMAL_QTY).toFixed(2);

                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].FOQ_QTY == null) {
                                        resp.DataList[i].FOQ_QTY = 0;
                                    }
                                    else {
                                        resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY;
                                    }
                                    resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].FOQ_QTY).toFixed(2);
                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].MAX_QTY == null) {
                                        resp.DataList[i].MAX_QTY = 0;
                                    }
                                    else {
                                        resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY;
                                    }
                                    resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].MAX_QTY).toFixed(2);

                                }
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    //resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE).toFixed(2);
                                    resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? '' : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE);
                                }
                                this.dgrd2Locs = resp.DataList;
                                this.tempdgrd2Locs = this.dgrd2Locs;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (resp.StatusCode == 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    async itemSearch() {
        this.itemMode = "Update"
        this.isItemEditMode = true;
        this.btnItemTitle = "Update";
        this.btnitemloading = false;
        if (this.searchItem == "" || this.searchItem == null) {
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Item Value" });
        }
        else {
            if (this.showGrid2 == true) {
                this.dataTableComponent.reset();
            }
            try {
                this.spinnerService.start();
                this.dgrd2Locs = [];
                this.newParItem = new VM_ITEM_PAR_LOCATION();
                this.splitsearchItem = this.searchItem.split("-");
                await this.AtparSetupParLocationServices.getLocDetails(this.locID, this.orgID, this.splitsearchItem[0], "").
                    catch(this.httpService.handleError).then((res: Response) => {
                        let resp = res.json() as AtParWebApiResponse<VM_PAR_SETUP_PAR_LOCATIONS>;
                        switch (resp.StatType) {
                            case StatusType.Success: {
                                this.form2 = true;
                                this.fdata = true;
                                if (resp.DataList.length > 0) {
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].ORDERING_TYPE == "01") {
                                            resp.DataList[i].ORDERING_TYPE = "Par";
                                        }
                                        else if (resp.DataList[i].ORDERING_TYPE == "02") {
                                            resp.DataList[i].ORDERING_TYPE = "Foq";
                                        }
                                        else if (resp.DataList[i].ORDERING_TYPE == "03") {
                                            resp.DataList[i].ORDERING_TYPE = "Min/Max";
                                        }
                                        else if (resp.DataList[i].ORDERING_TYPE == "04") {
                                            resp.DataList[i].ORDERING_TYPE = "Issue";
                                        }
                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].STATUS == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                            resp.DataList[i].STATUS = "Active";
                                        }
                                        else if (resp.DataList[i].STATUS == YesNo_Enum[YesNo_Enum.N].toString()) {
                                            resp.DataList[i].STATUS = "InActive";
                                        }
                                        else {
                                            resp.DataList[i].STATUS = "Pending";
                                        }
                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Stock) {
                                            resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stock].toString();
                                        }
                                        else if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Nonstock) {
                                            resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Nonstock].toString();
                                        }
                                        else if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Consignment) {
                                            resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Consignment].toString();
                                        }
                                        else if (resp.DataList[i].LOCDTLSRPTYPE == Repleshment_Type.Stockless) {
                                            resp.DataList[i].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stockless].toString();
                                        }
                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].FILL_KILL_FLAG == "F") {
                                            resp.DataList[i].FILL_KILL_FLAG = "Fill";
                                        }
                                        else if (resp.DataList[i].FILL_KILL_FLAG == "K") {
                                            resp.DataList[i].FILL_KILL_FLAG = "Kill"
                                        }
                                        else {
                                            resp.DataList[i].FILL_KILL_FLAG = "";
                                        }

                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].OPTIMAL_QTY == null) {
                                            resp.DataList[i].OPTIMAL_QTY = 0;
                                        }
                                        else {
                                            resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY;
                                        }

                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].FOQ_QTY == null) {
                                            resp.DataList[i].FOQ_QTY = 0;
                                        }
                                        else {
                                            resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY;
                                        }

                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].MAX_QTY == null) {
                                            resp.DataList[i].MAX_QTY = 0;
                                        }
                                        else {
                                            resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY;
                                        }

                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].LOCDTLSPARUOM != null) {
                                            resp.DataList[i].LOCDTLSPARUOM = resp.DataList[i].LOCDTLSPARUOM;
                                        }
                                        else {
                                            resp.DataList[i].LOCDTLSPARUOM = resp.DataList[i].ITMPARUOM;
                                        }

                                    }
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        if (resp.DataList[i].LOCDTLSCONVRATE != null) {
                                            if (resp.DataList[i].LOCDTLSCONVRATE > 0) {
                                                resp.DataList[i].LOCDTLSCONVRATE = resp.DataList[i].LOCDTLSCONVRATE;
                                            }
                                        }
                                    }
                                    //For Decimal
                                    for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                        resp.DataList[i].OPTIMAL_QTY = resp.DataList[i].OPTIMAL_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].OPTIMAL_QTY).toFixed(2);
                                        resp.DataList[i].FOQ_QTY = resp.DataList[i].FOQ_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].FOQ_QTY).toFixed(2);
                                        resp.DataList[i].MAX_QTY = resp.DataList[i].MAX_QTY == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].MAX_QTY).toFixed(2);
                                        // resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? parseFloat('0').toFixed(2) : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE).toFixed(2);
                                        resp.DataList[i].LOCDTLSPARCONVRATE = resp.DataList[i].LOCDTLSPARCONVRATE == null ? '' : parseFloat(resp.DataList[i].LOCDTLSPARCONVRATE);
                                    }
                                    //For Grid Binding
                                    this.dgrd2Locs = resp.DataList;
                                    this.form2 = false;
                                    this.fdata = false;

                                    this.showGrid2 = true;
                                    this.spinnerService.stop();
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.showGrid2 = false;
                                this.page2 = false;
                                this.form2 = false;
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.showGrid2 = false;
                                this.page2 = false;
                                this.form2 = false;
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.showGrid2 = false;
                                this.page2 = false;
                                this.form2 = false;
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                break;
                            }
                        }
                    });
                this.spinnerService.stop();
            }
            catch (ex) {
                this.clientErrorMsg(ex, "itemSearch");
            }
        }
    }

    async edititem(item) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.btnItemTitle = "Update";
        this.itemMode = "Update"
        this.bindSymbol = "check";
        this.isItemEditMode = true;
        this.btnitemloading = false;
        this.showsearch = false;
        this.page2 = false;
        this.showGrid2 = false;
        this.statusMsgs = [];
        try {
            this.spinnerService.start();
            await this.AtparSetupParLocationServices.getLocDetails(this.locID, this.orgID, item.ITEM_ID, item.BIN_LOC).
                catch(this.httpService.handleError).then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<VM_PAR_SETUP_PAR_LOCATIONS>;
                    switch (resp.StatType) {
                        case StatusType.Success: {
                            this.form2 = true;
                            this.fdata = true;
                            if (resp.DataList[0] != null) {

                                if (resp.DataList[0].ORDERING_TYPE == "01") {
                                    resp.DataList[0].ORDERING_TYPE = "Par";
                                }
                                else if (resp.DataList[0].ORDERING_TYPE == "02") {
                                    resp.DataList[0].ORDERING_TYPE = "Foq";
                                }
                                else if (resp.DataList[0].ORDERING_TYPE == "03") {
                                    resp.DataList[0].ORDERING_TYPE = "Min/Max";
                                }
                                else if (resp.DataList[0].ORDERING_TYPE == "04") {
                                    resp.DataList[0].ORDERING_TYPE = "Issue";
                                }
                                if (resp.DataList[0].LOCDTLSRPTYPE == Repleshment_Type.Stock) {
                                    resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stock].toString();
                                }
                                else if (resp.DataList[0].LOCDTLSRPTYPE == Repleshment_Type.Nonstock) {
                                    resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Nonstock].toString();
                                }
                                else if (resp.DataList[0].LOCDTLSRPTYPE == Repleshment_Type.Consignment) {
                                    resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Consignment].toString();
                                }
                                else if (resp.DataList[0].LOCDTLSRPTYPE == Repleshment_Type.Stockless) {
                                    resp.DataList[0].REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stockless].toString();
                                }

                                if (resp.DataList[0].FILL_KILL_FLAG == "F") {
                                    resp.DataList[0].FILL_KILL_FLAG = "Fill";
                                }
                                else if (resp.DataList[0].FILL_KILL_FLAG == "K") {
                                    resp.DataList[0].FILL_KILL_FLAG = "Kill"
                                }
                                else {
                                    resp.DataList[0].FILL_KILL_FLAG = "";
                                }

                                if (resp.DataList[0].LOCDTLSUOI == "") {
                                    resp.DataList[0].LOCDTLSUOI = resp.DataList[0].ITMUOI;
                                }
                                else {
                                    resp.DataList[0].LOCDTLSUOI = resp.DataList[0].LOCDTLSUOI;
                                }


                                if (resp.DataList[0].OPTIMAL_QTY == null) {
                                    resp.DataList[0].OPTIMAL_QTY = 0;
                                }
                                else {
                                    resp.DataList[0].OPTIMAL_QTY = resp.DataList[0].OPTIMAL_QTY;
                                }
                                if (resp.DataList[0].FOQ_QTY == null) {
                                    resp.DataList[0].FOQ_QTY = 0;
                                }
                                else {
                                    resp.DataList[0].FOQ_QTY = resp.DataList[0].FOQ_QTY;
                                }


                                if (resp.DataList[0].MAX_QTY == null) {
                                    resp.DataList[0].MAX_QTY = 0;
                                }
                                else {
                                    resp.DataList[0].MAX_QTY = resp.DataList[0].MAX_QTY;
                                }

                                if (resp.DataList[0].LOCDTLSPARUOM != null) {
                                    resp.DataList[0].LOCDTLSPARUOM = resp.DataList[0].LOCDTLSPARUOM;
                                }
                                else {
                                    resp.DataList[0].LOCDTLSPARUOM = resp.DataList[0].ITMPARUOM;
                                }


                                if (resp.DataList[0].LOCDTLSCONVRATE != null) {
                                    if (resp.DataList[0].LOCDTLSCONVRATE > 0) {
                                        resp.DataList[0].LOCDTLSCONVRATE = resp.DataList[0].LOCDTLSCONVRATE;
                                    }
                                }

                                this.newParItem = new VM_ITEM_PAR_LOCATION();
                                this.newParItem.ITEM_ID = resp.DataList[0].ITEM_ID;
                                this.newParItem.SHORT_DESCR = resp.DataList[0].SHORT_DESCR;
                                this.newParItem.BIN_LOC = resp.DataList[0].BIN_LOC;
                                this.compold = resp.DataList[0].BIN_LOC;
                                this.newParItem.OPTIMAL_QTY = resp.DataList[0].OPTIMAL_QTY;
                                this.newParItem.UNIT_OF_PROCUREMENT = resp.DataList[0].LOCDTLSUOP;
                                this.newParItem.ORDERING_TYPE = resp.DataList[0].ORDERING_TYPE;
                                this.newParItem.MAX_QTY = resp.DataList[0].MAX_QTY;
                                this.newParItem.FOQ_QTY = resp.DataList[0].FOQ_QTY;
                                this.newParItem.PAR_UOM = resp.DataList[0].LOCDTLSPARUOM;
                                if (this.newParItem.PAR_UOM != "" && this.newParItem.PAR_UOM != null) {
                                    if (resp.DataList[0].LOCDTLSPARCONVRATE != null) {
                                        this.newParItem.CONV_RATE_PAR_UOM = resp.DataList[0].LOCDTLSPARCONVRATE;
                                    }
                                }
                                this.newParItem.CONVERSION_RATE = resp.DataList[0].LOCDTLSCONVRATE;
                                this.newParItem.COUNT_REQUIRED = resp.DataList[0].COUNT_REQUIRED;
                                this.newParItem.UNIT_OF_ISSUE = resp.DataList[0].LOCDTLSUOI;
                                this.newParItem.CHARGE_CODE = resp.DataList[0].LOCDTLCCODE
                                this.newParItem.REPLENISHMENT_TYPE = resp.DataList[0].REPLENISHMENT_TYPE;
                                this.newParItem.FILL_KILL_FLAG = resp.DataList[0].FILL_KILL_FLAG;
                                this.newParItem.COUNT_ORDER = resp.DataList[0].COUNT_ORDER;
                                this.newParItem.COST_CENTER = resp.DataList[0].COST_CENTER;
                                this.newParItem.INV_BUSINESS_UNIT = resp.DataList[0].INV_BUSINESS_UNIT;
                                this.newParItem.USER_FIELD_1 = resp.DataList[0].USER_FIELD_1;
                                this.newParItem.REQUISITION_TYPE = resp.DataList[0].REQUISITION_TYPE;
                                if (this.newParItem.UNIT_OF_ISSUE == "") {
                                    this.newParItem.UNIT_OF_ISSUE = resp.DataList[0].ITMUOI;
                                }
                                if (this.newParItem.COUNT_REQUIRED == YesNo_Enum[YesNo_Enum.N].toString()) {
                                    this.newParItem.COUNT_REQUIRED_STATUS = false;
                                }
                                else if (this.newParItem.COUNT_REQUIRED == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                    this.newParItem.COUNT_REQUIRED_STATUS = true;
                                }
                                this.newParItem.LOT_CONTROLLED = resp.DataList[0].LOCDTLSLOTCNTRL;
                                if (this.newParItem.LOT_CONTROLLED == YesNo_Enum[YesNo_Enum.N].toString()) {
                                    this.newParItem.LOT_CONTROLLED_STATUS = false;
                                }
                                else if (this.newParItem.LOT_CONTROLLED == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                    this.newParItem.LOT_CONTROLLED_STATUS = true;
                                }
                                this.newParItem.SERIAL_CONTROLLED = resp.DataList[0].LOCDTLSSRCNTRL;
                                if (this.newParItem.SERIAL_CONTROLLED == YesNo_Enum[YesNo_Enum.N].toString()) {
                                    this.newParItem.SERIAL_CONTROLLED_STATUS = false;
                                }
                                else if (this.newParItem.SERIAL_CONTROLLED == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                    this.newParItem.SERIAL_CONTROLLED_STATUS = true;
                                }
                                this.newParItem.STATUS = resp.DataList[0].STATUS;
                                //if (resp.DataList[0].STATUS)
                                //if (resp.DataList[0].STATUS == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                //    this.newParItem.ACTIVEFLAG = "true";
                                //    this.newParItem.INACTIVEFLAG = "";
                                //    this.newParItem.PENDINGFLAG = "";
                                //}
                                //else if (resp.DataList[0].STATUS == YesNo_Enum[YesNo_Enum.N].toString()) {
                                //    this.newParItem.INACTIVEFLAG = "true";
                                //    this.newParItem.ACTIVEFLAG = "";
                                //    this.newParItem.PENDINGFLAG = "";
                                //}
                                //else {
                                //    this.newParItem.PENDINGFLAG = "true";
                                //    this.newParItem.INACTIVEFLAG = "";
                                //    this.newParItem.ACTIVEFLAG = "";
                                //}

                                this.spinnerService.stop();
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "edititem");
        }
    }

    bindOrderingType() {
        this.ddlOrderingType = [];
        this.ddlOrderingType.push({ label: "Select One", value: "" });
        this.ddlOrderingType.push({ label: "Par", value: "Par" });
        this.ddlOrderingType.push({ label: "Foq", value: "Foq" });
        this.ddlOrderingType.push({ label: "Min/Max", value: "Min/Max" });
        this.ddlOrderingType.push({ label: "Issue", value: "Issue" });
    }

    bindRequisitionType() {
        this.ddlRequisitionType = [];
        this.ddlRequisitionType.push({ label: "Select One", value: "" });
        this.ddlRequisitionType.push({ label: "Issue", value: "I" });
        this.ddlRequisitionType.push({ label: "Transfer", value: "T" });
    }

    bindReplenishment() {
        this.ddlReplenishment = [];
        this.ddlReplenishment.push({ label: "Select One", value: "" });
        this.ddlReplenishment.push({ label: "Stock", value: "Stock" });
        this.ddlReplenishment.push({ label: "Nonstock", value: "Nonstock" });
        this.ddlReplenishment.push({ label: "Stockless", value: "Stockless" });
        this.ddlReplenishment.push({ label: "Consignment", value: "Consignment" });
    }

    bindFillKillFlag() {
        this.ddlFillKillFlag = [];
        this.ddlFillKillFlag.push({ label: "Select One", value: "" });
        this.ddlFillKillFlag.push({ label: "Fill", value: "Fill" });
        this.ddlFillKillFlag.push({ label: "Kill", value: "Kill" });
    }

    async fillItemsAuto(event) {

        this.lstFilteredItems = [];
        this.lstFilteredItemsList = [];
        let query = event.query;
        try {

            await this.AtparSetupParLocationServices.getItems("", this.orgID, this.appId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<PAR_MNGT_ITEM>;
                    this.statusMsgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstItems = data.DataList;
                            this.lstItems = asEnumerable(this.lstItems).Where(x => x.STATUS === 0).Select(x => x).ToArray();
                            this.lstFilteredItemsList = this.filterItems(query, this.lstItems)
                            for (let i = 0; i <= this.lstFilteredItemsList.length - 1; i++) {
                                this.lstFilteredItems[i] = this.lstFilteredItemsList[i].ITEM_ID + " - " + this.lstFilteredItemsList[i].SHORT_DESCR;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                            }
                            else {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillItemsAuto");
        }
    }

    filterItems(query, items: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                filtered.push(itemValue);
            }

        } else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.ITEM_ID.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(itemValue);
                    }
                }
            }
        }


        return filtered;
    }

    //async changeStatus(statusType: string) {
    //    this.spinnerService.start();
    //    if (statusType == "Active") {
    //        this.newParItem.ACTIVEFLAG = "true";
    //        this.newParItem.INACTIVEFLAG = "false";
    //        this.newParItem.PENDINGFLAG = "false";
    //        this.newParItem.STATUS = "Y";
    //    }
    //    else if (statusType == "InActive") {
    //        this.newParItem.ACTIVEFLAG = "false";
    //        this.newParItem.INACTIVEFLAG = "true";
    //        this.newParItem.PENDINGFLAG = "false";
    //        this.newParItem.STATUS = "N";
    //    }
    //    else if (statusType == "Pending") {
    //        this.newParItem.ACTIVEFLAG = "false";
    //        this.newParItem.INACTIVEFLAG = "false";
    //        this.newParItem.PENDINGFLAG = "true";
    //        this.newParItem.STATUS = "";
    //    }
    //    this.spinnerService.stop();
    //}

    async savedata() {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Item(s)';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        if (this.newParItem.ORDERING_TYPE == null || (this.newParItem.ORDERING_TYPE == undefined) || this.newParItem.ORDERING_TYPE === "" || this.newParItem.ORDERING_TYPE === "Select One") {
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Ordering Type" });
            return;
        }
        if (this.newParItem.ORDERING_TYPE === "Foq") {
            if (this.newParItem.FOQ_QTY == undefined || this.newParItem.FOQ_QTY == null || this.newParItem.FOQ_QTY === "") {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Foq" });
                return;
            }
            else {
                this.newParItem.FOQ_QTY = this.newParItem.FOQ_QTY
            }
        }
        if (this.newParItem.ORDERING_TYPE === "Min/Max") {
            if (this.newParItem.MAX_QTY == undefined || this.newParItem.MAX_QTY == null || this.newParItem.MAX_QTY === "") {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Max Qty" });
                return;
            }
            else {
                this.newParItem.MAX_QTY = this.newParItem.MAX_QTY
            }
        }
        if (this.newParItem.REPLENISHMENT_TYPE == null || this.newParItem.REPLENISHMENT_TYPE == undefined || this.newParItem.REPLENISHMENT_TYPE === "" || this.newParItem.REPLENISHMENT_TYPE === "Select One") {
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Replenishment Type" });
            return;
        }
        if (this.newParItem.REQUISITION_TYPE == null || this.newParItem.REQUISITION_TYPE == undefined || this.newParItem.REQUISITION_TYPE === "" || this.newParItem.REQUISITION_TYPE === "Select One") {
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Requisition Type" });
            return;
        }
        if (this.newParItem.COST_CENTER == null || this.newParItem.COST_CENTER == undefined || this.newParItem.COST_CENTER === "" || this.newParItem.COST_CENTER === "Select One") {
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Cost Center" });
            return;
        }
        else {
            if (this.newParItem.COUNT_REQUIRED_STATUS == true) {
                this.newParItem.COUNT_REQUIRED = "Y";
            }
            else {
                this.newParItem.COUNT_REQUIRED = "N";
            }

            if (this.newParItem.LOT_CONTROLLED_STATUS == true) {
                this.newParItem.LOT_CONTROLLED = "Y";
            }
            else {
                this.newParItem.LOT_CONTROLLED = "N";
            }
            if (this.newParItem.SERIAL_CONTROLLED_STATUS == true) {
                this.newParItem.SERIAL_CONTROLLED = "Y";
            }
            else {
                this.newParItem.SERIAL_CONTROLLED = "N";
            }
            if (this.newParItem.FILL_KILL_FLAG == "Fill") {
                this.newParItem.FILL_KILL_FLAG = "F";
            }
            else if (this.newParItem.FILL_KILL_FLAG == "Kill") {
                this.newParItem.FILL_KILL_FLAG = "K";
            }
            else {
                this.newParItem.FILL_KILL_FLAG = "";
            }

            if (this.newParItem.REPLENISHMENT_TYPE == Repleshment_Type[Repleshment_Type.Stock].toString()) {
                this.newParItem.REPLENISHMENT_TYPE = "1";
            }
            else if (this.newParItem.REPLENISHMENT_TYPE == Repleshment_Type[Repleshment_Type.Nonstock].toString()) {
                this.newParItem.REPLENISHMENT_TYPE = "2";
            }
            else if (this.newParItem.REPLENISHMENT_TYPE == Repleshment_Type[Repleshment_Type.Stockless].toString()) {
                this.newParItem.REPLENISHMENT_TYPE = "3";
            }
            else if (this.newParItem.REPLENISHMENT_TYPE == Repleshment_Type[Repleshment_Type.Consignment].toString()) {
                this.newParItem.REPLENISHMENT_TYPE = "4";
            }

            if (this.newParItem.OPTIMAL_QTY > 0) {
                this.newParItem.OPTIMAL_QTY = this.newParItem.OPTIMAL_QTY;
            }
            else {
                this.newParItem.OPTIMAL_QTY = 0;
            }
            if (this.newParItem.COUNT_ORDER > 0) {
                this.newParItem.COUNT_ORDER = this.newParItem.COUNT_ORDER;
            }
            else {
                this.newParItem.COUNT_ORDER = 0;
            }

            if (this.selectedItem != null && this.selectedItem != "") {
                if (this.selectedItem.indexOf(" ") != -1) {
                    let splitItemId: any[];
                    splitItemId = this.selectedItem.trim().split(" ");
                    this.newParItem.ITEM_ID = splitItemId[0];
                }
                else {
                    this.newParItem.ITEM_ID = this.selectedItem.trim();
                }
            }

            if (this.newParItem.MAX_QTY == undefined) {
                this.newParItem.MAX_QTY = "";
            }
            if (this.newParItem.FOQ_QTY == undefined) {
                this.newParItem.FOQ_QTY = "";
            }
            if (this.newParItem.CONV_RATE_PAR_UOM == undefined) {
                this.newParItem.CONV_RATE_PAR_UOM = "";
            }
            if (this.newParItem.PAR_UOM == undefined) {
                this.newParItem.PAR_UOM = "";
            }

            if (this.newParItem.PAR_UOM != null && this.newParItem.PAR_UOM != "") {
                if (this.newParItem.CONV_RATE_PAR_UOM == null||this.newParItem.CONV_RATE_PAR_UOM == "") {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Par Conversion Rate" });
                    return;
                }
            }
            else if (this.newParItem.CONV_RATE_PAR_UOM != null && this.newParItem.CONV_RATE_PAR_UOM != "") {
                if (this.newParItem.PAR_UOM == null || this.newParItem.PAR_UOM == "") {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Par UOM" });
                    return;
                }

            }
            else if (this.newParItem.PAR_UOM == null && this.newParItem.PAR_UOM == "") {
                if (this.newParItem.CONV_RATE_PAR_UOM == null) {
                    this.newParItem.CONV_RATE_PAR_UOM = 1;
                }
            }
            //if (this.newParItem.ACTIVEFLAG == "true") {
            //    this.newParItem.STATUS = "Y";
            //}
            //else if (this.newParItem.INACTIVEFLAG == "true") {
            //    this.newParItem.STATUS = "N";
            //}
            //else if (this.newParItem.PENDINGFLAG == "true") {
            //    this.newParItem.STATUS = "";
            //}

            if (this.newParItem.CHARGE_CODE == null) {
                this.newParItem.CHARGE_CODE = "";
            }

            if (this.newParItem.USER_FIELD_1 == null) {
                this.newParItem.USER_FIELD_1 = "";
            }
            if (this.newParItem.ORDERING_TYPE == "Par") {
                this.newParItem.ORDERING_TYPE = "01";
            }
            else if (this.newParItem.ORDERING_TYPE == "Foq") {
                this.newParItem.ORDERING_TYPE = "02";
            }
            else if (this.newParItem.ORDERING_TYPE == "Min/Max") {
                this.newParItem.ORDERING_TYPE = "03";
            }
            else if (this.newParItem.ORDERING_TYPE == "Issue") {
                this.newParItem.ORDERING_TYPE = "04";
            }
            await this.MatchAndInsertOrUpdate(this.newParItem.ITEM_ID, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.newParItem.LOT_CONTROLLED, this.newParItem.SERIAL_CONTROLLED, this.deviceTokenEntry);

            if (this.pUOI = 1) {
                this.strUOI = "";
            }
            else {
                this.strUOI = this.newParItem.UNIT_OF_ISSUE;
            }

            if (this.pUOP = 1) {
                this.strUOP = "";
            }
            else {
                this.strUOP = this.newParItem.UNIT_OF_PROCUREMENT.trim();
            }
            if (this.pChgCode = 1) {
                this.strChgCode = "";
            }
            else {
                this.strChgCode = this.newParItem.CHARGE_CODE;
            }
            if (this.pConvRate = 1) {
                this.strConvRate = "";
            }
            else {
                this.strConvRate = this.newParItem.CONVERSION_RATE.toString();
            }
            if (this.pUOPar = 1) {
                this.parUom = "";
            }
            else {
                this.parUom = this.newParItem.PAR_UOM;
            }

            if (this.pConvRTPar = 1) {
                this.convRtPar = "0";
            }
            if (this.pSrCntrl = 1) {
                this.strSrCntrl = "";
            }
            else {
                this.strSrCntrl = this.newParItem.SERIAL_CONTROLLED;
            }

            if (this.pLotCntrl = 1) {
                this.strLotCntrl = "";
            }
            else {
                this.strLotCntrl = this.newParItem.LOT_CONTROLLED;
            }

            if (this.pReplType = 1) {
                this.strReplType = "0";
            }
            else {
                this.strReplType = this.newParItem.REPLENISHMENT_TYPE;
            }

            if (this.newParItem.COST_CENTER == "Select One") {
                this.strCCCode = "";
            }
            else {
                this.strCCCode = this.newParItem.COST_CENTER;
            }

            if (this.btnItemTitle == "Update") {
                if (this.strMaxAllowQty != "") {
                    if (this.newParItem.OPTIMAL_QTY > +this.strMaxAllowQty) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                        document.getElementById("MaxQty").focus();
                        return;
                    }
                }
                if (this.newParItem.MAX_QTY != null) {
                    if (this.newParItem.MAX_QTY > +this.strMaxAllowQty) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                        document.getElementById("MaxQty").focus();
                        return;
                    }
                }
                if (this.newParItem.FOQ_QTY != null) {
                    if (this.newParItem.FOQ_QTY > +this.strMaxAllowQty) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                        document.getElementById("FoqQty").focus();
                        return;
                    }
                }


                this.insertParAuditItem.BUNIT = this.orgID;
                this.insertParAuditItem.CRTID = this.locID;
                this.insertParAuditItem.ITEMID = this.newParItem.ITEM_ID;
                this.insertParAuditItem.COMPARTMENT = this.newParItem.BIN_LOC;
                this.insertParAuditItem.PARQTY = this.newParItem.OPTIMAL_QTY.toString();
                this.insertParAuditItem.USERID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                this.insertParAuditItem.UOM = this.newParItem.UNIT_OF_PROCUREMENT.trim();
                this.insertParAuditItem.NOPQTY = this.newParItem.OPTIMAL_QTY.toString();

                this.dsInsertParAudit.push(this.insertParAuditItem);

                try {
                    this.spinnerService.start();
                    await this.AtparSetupParLocationServices.updateLocationItems(this.locID, this.orgID, this.newParItem.BIN_LOC, this.compold, this.newParItem.ITEM_ID, this.newParItem.OPTIMAL_QTY, this.newParItem.COUNT_REQUIRED,
                        this.newParItem.COUNT_ORDER, this.newParItem.REPLENISHMENT_TYPE, this.newParItem.FILL_KILL_FLAG, this.newParItem.ORDERING_TYPE,
                        this.newParItem.FOQ_QTY, this.newParItem.MAX_QTY, this.newParItem.LOT_CONTROLLED, this.newParItem.SERIAL_CONTROLLED, this.newParItem.COST_CENTER, this.newParItem.UNIT_OF_ISSUE,
                        this.newParItem.CONVERSION_RATE, this.newParItem.USER_FIELD_1, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.newParItem.STATUS, this.newParItem.INV_BUSINESS_UNIT,
                        this.newParItem.REQUISITION_TYPE, this.newParItem.UNIT_OF_PROCUREMENT, this.newParItem.PAR_UOM, this.newParItem.CONV_RATE_PAR_UOM, this.dsInsertParAudit, this.newParItem.CHARGE_CODE).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<number>;
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    this.statusMsgs = [];
                                    let statusmsg = AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", this.newParItem.ITEM_ID);
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                    (<HTMLInputElement>document.getElementById('Compartment')).focus();
                                    //this.form2 = false;
                                    //this.fdata = false;
                                    //this.newParItem = new VM_ITEM_PAR_LOCATION();     
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs = [];
                                    if (data.StatusCode == 111701) {
                                        data.StatusMessage = data.StatusMessage.replace("1%", this.newParItem.ITEM_ID).replace("2%", this.newParItem.BIN_LOC);
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    }
                                    else {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    }
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }    
                            }
                            if (this.newParItem.ORDERING_TYPE == "01") {
                                this.newParItem.ORDERING_TYPE = "Par";
                            }
                            else if (this.newParItem.ORDERING_TYPE == "02") {
                                this.newParItem.ORDERING_TYPE = "Foq";
                            }
                            else if (this.newParItem.ORDERING_TYPE == "03") {
                                this.newParItem.ORDERING_TYPE = "Min/Max";
                            }
                            else if (this.newParItem.ORDERING_TYPE == "04") {
                                this.newParItem.ORDERING_TYPE = "Issue";
                            }

                            if (this.newParItem.REPLENISHMENT_TYPE == "1") {
                                this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stock].toString();
                            }
                            else if (this.newParItem.REPLENISHMENT_TYPE == "2") {
                                this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Nonstock].toString();
                            }
                            else if (this.newParItem.REPLENISHMENT_TYPE == "3") {
                                this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stockless].toString();
                            }
                            else if (this.newParItem.REPLENISHMENT_TYPE == "4") {
                                this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Consignment].toString();
                            }

                            if (this.newParItem.FILL_KILL_FLAG == "F") {
                                this.newParItem.FILL_KILL_FLAG = "Fill";
                            }
                            else if (this.newParItem.FILL_KILL_FLAG == "K") {
                                this.newParItem.FILL_KILL_FLAG = "Kill";
                            }
                            this.atParConstant.scrollToTop();
                        });
                    //this.BindDataGrid(this.locationdata);
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "savedata");
                }

            }
            else if (this.btnItemTitle == "Save") {
                if (this.strMaxAllowQty != "") {
                    if (this.newParItem.OPTIMAL_QTY > +this.strMaxAllowQty) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                        document.getElementById("MaxQty").focus();
                        return;
                    }
                }
                if (this.newParItem.MAX_QTY != null) {
                    if (this.newParItem.MAX_QTY > +this.strMaxAllowQty) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                        document.getElementById("MaxQty").focus();
                        return;
                    }
                }
                if (this.newParItem.FOQ_QTY != null) {
                    if (this.newParItem.FOQ_QTY > +this.strMaxAllowQty) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                        document.getElementById("FoqQty").focus();
                        return;
                    }
                }
                try {
                    this.spinnerService.start();
                    await this.AtparSetupParLocationServices.addItems(this.locID, this.orgID, this.newParItem.BIN_LOC, this.newParItem.ITEM_ID, this.newParItem.OPTIMAL_QTY, this.newParItem.COUNT_REQUIRED,
                        this.newParItem.COUNT_ORDER, this.newParItem.REPLENISHMENT_TYPE, this.newParItem.FILL_KILL_FLAG, this.newParItem.ORDERING_TYPE,
                        this.newParItem.FOQ_QTY, this.newParItem.MAX_QTY, this.newParItem.LOT_CONTROLLED, this.newParItem.SERIAL_CONTROLLED, this.newParItem.COST_CENTER, this.newParItem.UNIT_OF_ISSUE,
                        this.newParItem.CONVERSION_RATE, this.newParItem.USER_FIELD_1, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.newParItem.STATUS, this.newParItem.INV_BUSINESS_UNIT,
                        this.newParItem.REQUISITION_TYPE, this.newParItem.UNIT_OF_PROCUREMENT, this.newParItem.PAR_UOM, this.newParItem.CONV_RATE_PAR_UOM, this.newParItem.CHARGE_CODE).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<number>;
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    this.statusMsgs = [];
                                    let statusmsg = AtParConstants.Created_Msg.replace("1%", "Item").replace("2%", this.newParItem.ITEM_ID);
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });
                                    //this.form2 = false;
                                    this.fdata = false;
                                    this.selectedItem = "";
                                    (<HTMLInputElement>document.getElementById('item')).focus();
                                    this.newParItem = new VM_ITEM_PAR_LOCATION();                                  
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs = [];
                                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION) {
                                        let statusmsg = "Item" + " " + this.newParItem.ITEM_ID + "  already exists with Location" + " " + this.locID;
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusmsg });
                                    }
                                    else {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    }
                                    if (this.newParItem.ORDERING_TYPE == "01") {
                                        this.newParItem.ORDERING_TYPE = "Par";
                                    }
                                    else if (this.newParItem.ORDERING_TYPE == "02") {
                                        this.newParItem.ORDERING_TYPE = "Foq";
                                    }
                                    else if (this.newParItem.ORDERING_TYPE == "03") {
                                        this.newParItem.ORDERING_TYPE = "Min/Max";
                                    }
                                    else if (this.newParItem.ORDERING_TYPE == "04") {
                                        this.newParItem.ORDERING_TYPE = "Issue";
                                    }

                                    if (this.newParItem.REPLENISHMENT_TYPE == "1") {
                                        this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stock].toString();
                                    }
                                    else if (this.newParItem.REPLENISHMENT_TYPE == "2") {
                                        this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Nonstock].toString();
                                    }
                                    else if (this.newParItem.REPLENISHMENT_TYPE == "3") {
                                        this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Stockless].toString();
                                    }
                                    else if (this.newParItem.REPLENISHMENT_TYPE == "4") {
                                        this.newParItem.REPLENISHMENT_TYPE = Repleshment_Type[Repleshment_Type.Consignment].toString();
                                    }
                                    if (this.newParItem.FILL_KILL_FLAG == "F") {
                                        this.newParItem.FILL_KILL_FLAG = "Fill";
                                    }
                                    else if (this.newParItem.FILL_KILL_FLAG == "K") {
                                        this.newParItem.FILL_KILL_FLAG = "Kill";
                                    }
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                            this.atParConstant.scrollToTop();
                        });
                    //this.BindDataGrid(location);
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "savedata");
                }
            }
        }
    }

    async MatchAndInsertOrUpdate(ITEM_ID, OrgGrpID, LOT_CONTROLLED, SERIAL_CONTROLLED, deviceTokenEntry) {
        try {
            this.spinnerService.start();
            await this.AtparSetupParLocationServices.getItemDataToAddOrUpdate(ITEM_ID, OrgGrpID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<PAR_MNGT_ITEM>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                for (let i = 0; i <= data.DataList.length - 1; i++) {
                                    this.pUOI = asEnumerable(data.DataList).Where(x => x.UNIT_OF_ISSUE == this.newParItem.UNIT_OF_ISSUE).ToArray().length;
                                    this.pConvRate = asEnumerable(data.DataList).Where(x => x.CONV_FACTOR == this.newParItem.CONVERSION_RATE).ToArray().length;
                                    this.pReplType = asEnumerable(data.DataList).Where(x => x.REPLENISHMENT_TYPE == this.newParItem.REPLENISHMENT_TYPE).ToArray().length;
                                    this.pSrCntrl = asEnumerable(data.DataList).Where(x => x.SERIAL_CONTROLLED == SERIAL_CONTROLLED).ToArray().length;
                                    this.pLotCntrl = asEnumerable(data.DataList).Where(x => x.LOT_CONTROLLED == LOT_CONTROLLED).ToArray().length;
                                    this.pChgCode = asEnumerable(data.DataList).Where(x => x.CHARGE_CODE == this.newParItem.CHARGE_CODE).ToArray().length;
                                    this.pUOP = asEnumerable(data.DataList).Where(x => x.UNIT_OF_PROCUREMENT == this.newParItem.UNIT_OF_PROCUREMENT).ToArray().length;
                                    this.pUOPar = asEnumerable(data.DataList).Where(x => x.PAR_UOM == this.newParItem.PAR_UOM).ToArray().length;
                                    if (this.newParItem.CONV_RATE_PAR_UOM != null) {
                                        this.pConvRTPar = asEnumerable(data.DataList).Where(x => x.CONV_RATE_PAR_UOM == this.newParItem.CONV_RATE_PAR_UOM).ToArray().length;
                                    }
                                    else {
                                        this.pConvRTPar = 0;
                                    }
                                }
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.statusMsgs = [];
                            }
                            else {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "MatchAndInsertOrUpdate");
        }
    }

    filterStatus(value, field, mode) {
        if (value === "All") {
            this.dgrd2Locs = this.tempdgrd2Locs;
        }
        else {
            this.dgrd2Locs = this.tempdgrd2Locs;
            this.dgrd2Locs = asEnumerable(this.tempdgrd2Locs).Where(x => x.STATUS === value).Select(x => x).ToArray();
        }
        var elmnt = this.document.getElementById('scrollcontainer');
     
        elmnt.scrollLeft = 0;
       
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.recordsPerPageSize = null;
        this.newItem = null;
        this.ddlCart = null;
        this.ddlLocType = null;
        this.ddlShipToId = null;
        this.getOrgIdsLst = null;
        this.ddlOrgId = null;
        this.getLocIdsLst = null;
        this.ddlLocIds = null;
        this.dgrdLocs = null;
        this.dgrd2Locs = null;
        this.tempdgrd2Locs = null;
        this.mode = null;
        this.buttonTitle = null;
        this.getCostCentersLst = null;
        this.ddlCostCenterId = null;
        this.getShipToIDsLst = null;
        this.strMaxAllowQty = null;
        this.searchItem = null;
        this.ddlOrderingType = null;
        this.ddlRequisitionType = null;
        this.ddlReplenishment = null;
        this.ddlFillKillFlag = null;
        this.selectedItem = null;
        this.lstFilteredItems = null;
        this.lstItems = null;
        this.orgID = null;
        this.locID = null;
        this.lstFilteredItemsList = null;
        this.btnItemTitle = null;
        this.dgrd2Locs = null;
        this.splitsearchItem = null;
        this.newParItem = null;
        this.ddlSelectedLocID = null;
        this.compold = null;
        this.pUOI = null;
        this.pConvRate = null;;
        this.pReplType = null;;
        this.pSrCntrl = null;
        this.pLotCntrl = null;;
        this.pChgCode = null;
        this.pUOP = null;
        this.pUOPar = null;
        this.pConvRTPar = null;
        this.strUOI = null;
        this.strUOP = null;
        this.strChgCode = null;
        this.strConvRate = null;
        this.parUom = null;
        this.convRtPar = null;
        this.strSrCntrl = null;
        this.strLotCntrl = null;
        this.strReplType = null;
        this.strCCCode = null;
        this.locationdata = null;
        this.bindSymbal = null;
        this.statusList = null;
    }

}