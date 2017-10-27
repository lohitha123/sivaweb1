
import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { Http, Response, Jsonp, RequestOptions, Headers, } from '@angular/http';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { TokenEntry_Enum, ClientType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';

import { TKIT_ITEM_MASTER } from '../../app/Entities/TKIT_ITEM_MASTER';
import { TKIT_ITEM_TYPE } from '../../app/Entities/TKIT_ITEM_TYPE';

import { VM_TKIT_ITEM_MASTER } from '../../app/Entities/VM_TKIT_ITEM_MASTER';

import { VM_TKIT_ITEM_DETAILS } from '../../app/Entities/VM_TKIT_ITEM_DETAILS';

import { VM_TKIT_ITEM_DEPT } from '../../app/Entities/VM_TKIT_ITEM_DEPT';
import { TKIT_ITEM_INVENTORY } from '../../app/Entities/TKIT_ITEM_INVENTORY';

import { ManageEquipmentItemsService } from './tkit-manage-equipment-items.service';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { StatusType, EnumApps, EventType } from '../Shared/AtParEnums';
import { Menus } from '../AtPar/Menus/routepath';
@Component({
    templateUrl: 'tkit-manage-equipment-items.component.html',

    providers: [HttpService, AtParCommonService, AtParConstants, ManageEquipmentItemsService, datatableservice]
})

export class ManageEquipmentItemsComponent {

    page: boolean = true;
    showLotSerialFields: boolean = false;
    showCommentsGrid: boolean = false;
    statusType: string = "";
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;

    showQuantityLabel: boolean = false;
    pazeSize: number;
    deviceTokenEntry: string[] = [];

    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    vendorData: PAR_MNGT_VENDOR[];
    tkitItemMasterDetails: TKIT_ITEM_MASTER[];
    lstFilteredItems: any = [];
    tkitItmEquipmentType: TKIT_ITEM_TYPE[];
    tkitEquipmentItemDetails: any[];
    tkitEquipmentItemDetailsList: VM_TKIT_ITEM_DETAILS[];
    tkitEqItmLotSerail: any = [];
    tkitEqItmLotSerailList: TKIT_ITEM_INVENTORY[];
    tkitItemDetials: VM_TKIT_ITEM_MASTER[];
    lstgridfilterData: VM_TKIT_ITEM_DETAILS[];
    tkitDeptDetails: VM_TKIT_ITEM_DEPT[];
    mainlstGridData: Array<TKIT_ITEM_INVENTORY>;
    tkitItemTypeDetials: any = [];
    typeIndicator: string;

    orgGrpID: string = "";
    orgGrpIDData: string = "";
    selectedOrgGroupId: string;
    selectedEquipmentType: string;
    selectedItemAsset: string;
    selectedItemID: string;

    selectedDeptIDs: string[] = [];
    selectedOwnerType: string;
    lstOrgGroups: SelectItem[];

    lstEquipmentTypes: SelectItem[];
    lstItemDetails: SelectItem[];
    lstDeptDetails: SelectItem[];
    lstOwnerType: SelectItem[];
    lstOwnerDetails: SelectItem[];
    lstVendorDetails: SelectItem[];

    onitemidvaluechanged: boolean = false;
    growlMessage: Message[] = [];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;

    lstItems: any = [];
    showgrid: boolean = false;
    startIndex: number;
    EndIndex: number;
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    selectedEqType: string;
    dataCheckedSorting: VM_TKIT_ITEM_DETAILS[] = [];
    dataUncheckedSorting: Array<VM_TKIT_ITEM_DETAILS>;
    sortedcheckedrec: VM_TKIT_ITEM_DETAILS[];
    sorteduncheckedrec: VM_TKIT_ITEM_DETAILS[];

    showitemdetailsFields: boolean = false;
    showlotserialsgrid: boolean = false;

    newItem = new VM_TKIT_ITEM_DETAILS();
    newItemLotSerial = new TKIT_ITEM_INVENTORY();
    validationITEM_ID: number;
    validationITEM_DESCR: number;
    validationMANUFACTURER: number;
    validationVENDOR: number;
    validationDESTRUCTION_DATE: number;
    validationDESCRIPTION: number;
    validationSTORAGE_LOCATION: number;
    validationITEM_QTY: number;

    validationOWNER: number;
    validationDEPT_ID: number;
    validationSERIAL_NO: number;

    validationLOT_NO: number;
    validationUSER_FIELD_1: number;
    validationASSET_ID: number;


    showImageColumn: boolean = true;
    showMfrColumn: boolean = true;
    showVendorColumn: boolean = true;
    showDescriptionColumn: boolean = true;
    showQuantityColumn: boolean = false;
    showDestructionColumn: boolean = true;
    showDepartmentsColumn: boolean = true;

    showAddSerailbutton: boolean = false;

    ddlStatusType: any[] = [];

    selectedDeptDetails: string[] = [];

    userSelectedFile: string = '';
    disableButton: boolean = true;
    disablelotserailButton: boolean = true;

    addnewitembutton: boolean = false;
    searchFlag: boolean = false;
    gobutton: boolean = false;

    editItemDetailsFlag: boolean = false;
    addItemDetailsFlag: boolean = false;
    editLotSerialFlag: boolean = false;
    addLotSerailFlag: boolean = false;
    updateLotSerialFlag: boolean = false;


    selectedLotSerialRow: TKIT_ITEM_INVENTORY;
    showImage: boolean = false

    additemflag: boolean = false;
    edititemflag: boolean = false;

    addserailflag: boolean = false;
    editserailflag: boolean = false;

    imgBasePath: string = '';
    enteredDescription: string = '';
    assetfieldpart2: boolean = false;

    selectedVendor: string;
    selectedOwner: string;
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice,
        private atParCommonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private manageEquipmentItemsService: ManageEquipmentItemsService,
        private httpService: HttpService,
        private http: Http
    ) {
        this.breadCrumbMenu = new Menus();
    }




    async  ngOnInit() {
        this.spinnerService.start();
        this.growlMessage = [];
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.newItem = new VM_TKIT_ITEM_DETAILS();

        this.InitializationProperties();

        this.dataCheckedSorting = new Array<VM_TKIT_ITEM_DETAILS>();
        this.dataUncheckedSorting = new Array<VM_TKIT_ITEM_DETAILS>();
        this.ddlStatusType.push({ label: 'All', value: "" });
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'Inactive', value: false });
        //for org group data
        await this.bindUserOrgGroups();
        await this.GetSearchItems();
        await this.PopulateTypesDropDown();
        await this.PopulateItemsDropDown();

        var nowDate = new Date();
        this.date2 = new Date();

        this.imgBasePath = window.location.protocol + "//" + window.location.hostname + '/AtPar/Web/Uploaded/';


    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        this.growlMessage = [];
        let filterData;
        this.tkitEqItmLotSerailList = [];

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let manageEquipDetails = new TKIT_ITEM_INVENTORY();
                manageEquipDetails.SERIAL_NO = filterData[x].SERIAL_NO;
                manageEquipDetails.LOT_NO = filterData[x].LOT_NO;
                manageEquipDetails.ASSET_ID = filterData[x].ASSET_ID;
                manageEquipDetails.USER_FIELD_1 = filterData[x].USER_FIELD_1;
                manageEquipDetails.SERVICE_DT_TIME = filterData[x].SERVICE_DT_TIME;
                manageEquipDetails.STATUS = filterData[x].STATUS;
                this.tkitEqItmLotSerailList.push(manageEquipDetails);
            }
        }
    }

    InitializationProperties() {
        this.newItem = new VM_TKIT_ITEM_DETAILS();
        this.newItem.ORG_GROUP_ID = '';
        this.newItem.ITEM_ID = '';
        this.newItem.DESCRIPTION = '';
        this.newItem.IMAGE = '';
        this.newItem.CHK_VALUE = +'';
        this.newItem.COMMENTS = '';
        this.newItem.CREATEUSERNAME = '';
        this.newItem.CREATE_DATE = new Date();
        this.newItem.DEPT_ID = '';
        this.newItem.OWNER = '';
        this.newItem.ITEM_INACTIVATED = false;
        this.newItem.VENDOR = '';
        this.newItem.MANUFACTURER = '';
        this.newItem.ITEM_DESCR = '';
        this.newItem.DESTRUCTION_DATE = new Date();
        this.newItem.ITEM_QTY = +'';
        this.newItem.ITEM_TYPE = '';
        this.newItem.OWNER_TYPE = '';
        this.newItem.STORAGE_LOCATION = '';
        this.newItem.UPDATEUSERNAME = '';
        this.newItem.UPDATE_DATE = new Date();
        this.newItem.Disable = false;


        this.newItemLotSerial = new TKIT_ITEM_INVENTORY();
        this.newItemLotSerial.AVAILABILITY = false;
        this.newItemLotSerial.CHECKIN_DATE = new Date();
        this.newItemLotSerial.ITEM_ID = '';
        this.newItemLotSerial.ITEM_QTY = +'';
        this.newItemLotSerial.ITEM_TYPE = '';
        this.newItemLotSerial.LOT_NO = '';
        this.newItemLotSerial.ORG_GROUP_ID = '';
        this.newItemLotSerial.OWNER = '';
        this.newItemLotSerial.OWNER_TYPE = '';
        this.newItemLotSerial.ROW_INDEX = +'';
        this.newItemLotSerial.SERIAL_NO = '';
        this.newItemLotSerial.SERVICE_DT_TIME = new Date();
        this.newItemLotSerial.STATUS = false;
        this.newItemLotSerial.STORAGE_LOCATION = '';
        this.newItemLotSerial.UPDATE_DATE = new Date();
        this.newItemLotSerial.USER_FIELD_1 = '';
        this.newItemLotSerial.USER_FIELD_2 = '';
        this.newItemLotSerial.ASSET_ID = '';
        // this.newItemLotSerial.

        this.populateOwnerTypeDD();

    }

    async  bindUserOrgGroups() {


        try {

            this.spinnerService.start();
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;

                            if (this.orgGroupData.length == 1) {

                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpID = this.orgGroupData[0].ORG_GROUP_ID;
                                this.selectedOrgGroupId = this.orgGroupData[0].ORG_GROUP_ID;

                                this.spinnerService.stop();
                                this.populateData();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.blnShowOrgGroupLabel = false;

                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select OrgGrpID", value: "Select OrgGrpID" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;

                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async ddlOrgGrpIdChanged() {

        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "Select OrgGrpID") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid OrgGrpId" });
            return;
        }
        else {
            // this.populateData();
        }



    }

    async GetSearchItems() {

        try {

            this.spinnerService.start();
            await this.manageEquipmentItemsService.GetMasterItems().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredItems = data.DataList;
                            this.tkitEquipmentItemDetails = [];
                            this.tkitEquipmentItemDetails = data.DataList;

                            if (this.searchFlag) {
                                this.DisplayItemDetailsGrid();
                            }

                            this.spinnerService.stop();

                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async PopulateTypesDropDown() {
        //equipment type 


        try {

            var itemindicator;// GetEqTypes

            this.spinnerService.start();
            await this.manageEquipmentItemsService.GetEquipmentTypes("", this.orgGrpID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.tkitItmEquipmentType = data.DataList;

                            if (this.tkitItmEquipmentType != null && this.tkitItmEquipmentType != undefined) {

                                this.lstEquipmentTypes = [];
                                this.lstEquipmentTypes.push({ label: "Select Equipment Type", value: "Select Equipment Type" })

                                for (let i = 0; i < data.DataList.length; i++) {
                                    this.lstEquipmentTypes.push({
                                        label: data.DataList[i].ITEM_TYPE_DESCR + " " + "(" + data.DataList[i].ITEM_TYPE + ")",

                                        value: data.DataList[i].ITEM_TYPE
                                    })
                                }

                                // this.PopulateItemsDropDown();
                                this.spinnerService.stop();

                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async  PopulateItemsDropDown() {
        //items dropdown
        // GetItemsForSelectedType


        this.lstItemDetails = [];
        this.lstItemDetails.push({ label: "Select Item", value: "Select Item" })

        if (this.selectedEquipmentType != null && this.selectedEquipmentType != undefined && this.selectedEquipmentType != '' && this.selectedEquipmentType != 'Select Equipment') {


            try {

                this.spinnerService.start();
                await this.manageEquipmentItemsService.GetItemsForSelectedEqType(this.selectedEquipmentType, "").
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json();
                        this.growlMessage = [];

                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.tkitItemDetials = [];
                                this.tkitItemDetials = data.DataVariable.m_Item2;
                                this.selectedEqType = '';
                                this.selectedEqType = data.DataVariable.m_Item1;

                                if (this.tkitItemDetials != null && this.tkitItemDetials != undefined) {

                                    for (let i = 0; i < data.DataVariable.m_Item2.length; i++) {
                                        this.lstItemDetails.push({

                                            label: data.DataVariable.m_Item2[i].DESCRIPTION,

                                            value: data.DataVariable.m_Item2[i].ITEM_ID
                                        })
                                    }




                                    this.spinnerService.stop();


                                    break;
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }

                    });


            } catch (ex) {
                this.clientErrorMsg(ex);
            }
        }




    }

    async GetEquipmentItemDetails() {

        this.spinnerService.start();
        try {


            if (this.selectedItemID == null || this.selectedItemID == undefined || this.selectedItemID == '' || this.selectedItemID == 'Select Item') {
                this.selectedItemID = '';
            }

            await this.PopulateDepartments();

            if (this.selectedEqType == "E") {
                await this.GetVendorDetials();

            }

            //  this.spinnerService.start();

            await this.manageEquipmentItemsService.GetTypeItems(this.selectedEquipmentType, this.selectedItemID).then((res: Response) => {
                let data = res.json();
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {
                        this.tkitEquipmentItemDetails = [];
                        this.tkitEqItmLotSerail = [];
                        this.typeIndicator = data.DataVariable.m_Item1;
                        this.tkitEquipmentItemDetails = data.DataVariable.m_Item2;
                        this.tkitEqItmLotSerail = data.DataVariable.m_Item3;
                        if (this.tkitEqItmLotSerail != null) {
                            for (let i = 0; i < this.tkitEqItmLotSerail.length; i++) {
                                let changeDate = this.tkitEqItmLotSerail[i].SERVICE_DT_TIME;
                                var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                this.tkitEqItmLotSerail[i].SERVICE_DT_TIME = dateStr.replace(',', '');
                                let datepart = this.tkitEqItmLotSerail[i].SERVICE_DT_TIME.split(' ');
                                if (datepart != null && datepart.length > 0) {
                                    var time = datepart[1].split(':');
                                    this.tkitEqItmLotSerail[i].SERVICE_DT_TIME = datepart[0] + ' ' + time[0] + ':' + time[1] + ' ' + datepart[2];
                                }
                            }
                        }


                        if (this.editItemDetailsFlag == true) {
                            // this.bindtkitEquipmentItemDetails();
                            this.selectedEqType = data.DataVariable.m_Item1;

                            if (data.DataVariable.m_Item1 == "E") {
                                this.showlotserialsgrid = true;
                                this.showAddSerailbutton = true;
                            }




                        }


                        if (this.addnewitembutton == false) {
                            // this.bindtkitEquipmentItemDetails();
                        }


                        this.bindtkitEquipmentItemDetails();
                        this.spinnerService.stop();

                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }

            });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async ddlEquipmentTypeChanged() {

        this.enteredDescription = '';
        this.showLotSerialFields = false;
        this.showgrid = false;
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = false;

        this.selectedItemID = "";
        this.lstItemDetails = [];
        this.showCommentsGrid = false;
        this.selectedItemAsset = '';
        this.tkitEquipmentItemDetails = [];
        //clear the items drop down
        this.tkitItemDetials = [];
        this.selectedEqType = "";


        this.PopulateItemsDropDown();

    }

    async ddlItemIDsChanged() {

    }

    populateData() {
        this.GetSearchItems();
        // this.showgrid = true;
    }

    async fillItemsAuto(event) {

        this.lstFilteredItems = [];


        let query = event.query;
        if (this.blnShowOrgGroupLabel == true) {
            this.selectedOrgGroupId = this.orgGrpID;

        }
        else {
            this.selectedOrgGroupId = this.selectedOrgGroupId;
        }

        if (this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "Select OrgGrpID") {

            this.growlMessage = [];

            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
            return;
        }
        try {
            await this.manageEquipmentItemsService.GetMasterItems().
                catch(this.httpService.handleError).then((res: Response) => {
                    this.spinnerService.stop();
                    let data = res.json();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstItems = data.DataList;
                            this.lstFilteredItems = this.filterBusinessUnits(query, this.lstItems);
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.StatusCode != AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    DisplayItemDetailsGrid() {
        //need to dispaly the data of search matched records in the grid.

        if (this.selectedItemAsset != null && this.selectedItemAsset != undefined && this.selectedItemAsset != "") {


            this.tkitEquipmentItemDetailsList = [];

            for (let k = 0; k < this.tkitEquipmentItemDetails.length; k++) {


                this.tkitEquipmentItemDetailsList.push(this.tkitEquipmentItemDetails[k]);
            }


            if (this.tkitEquipmentItemDetailsList.length > 0) {
                this.showCommentsGrid = true;
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                return;
            }


        }
        else {
            this.showgrid = false;
        }
    }

    filterBusinessUnits(query, businessunits: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < businessunits.length; i++) {
                let Bunitvalue = businessunits[i];

                filtered.push(Bunitvalue.ITEM_DESCR + " " + "(" + Bunitvalue.ITEM_ID + ")");
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i];
                    Bunitvalue = Bunitvalue.ITEM_DESCR + " " + "(" + Bunitvalue.ITEM_ID + ")";
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }


        return filtered;
    }

    async  PopulateDepartments() {
        try {

            this.lstDeptDetails = [];
            this.spinnerService.start();
            await this.manageEquipmentItemsService.GetItemDepartments(this.selectedItemID, this.selectedOrgGroupId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.tkitDeptDetails = [];
                            this.tkitDeptDetails = data.DataList;

                            if (this.tkitDeptDetails != null && this.tkitDeptDetails != undefined) {

                                this.selectedDeptIDs = [];

                                for (let i = 0; i < data.DataList.length; i++) {


                                    this.lstDeptDetails.push({

                                        label: data.DataList[i].DESCRIPTION + " - " + data.DataList[i].DEPT_ID,

                                        value: data.DataList[i].DEPT_ID


                                    })


                                }

                            }

                            this.populateOwnerDD();

                            this.spinnerService.stop();

                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ddlDeptIDChanged() {


        this.newItem.DEPT_ID = '';

        let id: string = '';
        if (this.selectedDeptIDs != null && this.selectedDeptIDs != undefined && this.selectedDeptIDs != []) {
            if (this.selectedDeptIDs.length > 0) {
                id = this.selectedDeptIDs.join();
            }
        }

        else {
            this.selectedDeptIDs = [];
            id = '';
        }
    }

    btnGo_Click() {


        this.selectedDeptDetails = [];
        this.selectedDeptIDs = [];

        this.selectedItemAsset = '';
        this.enteredDescription = '';

        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '' || this.selectedOrgGroupId == "Select OrgGrpID") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select OrgGroupID" });
            return;
        }

        this.addnewitembutton = false;
        this.gobutton = true;
        this.growlMessage = [];
        if (this.selectedEqType == null || this.selectedEqType == undefined || this.selectedEqType == '') {
            this.selectedItemAsset = "";
            this.showgrid = false;

            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment" });
            return;
        }


        if (this.selectedItemID == null || this.selectedItemID == undefined || this.selectedItemID == '' || this.selectedItemID == 'Select Item') {
            this.selectedItemID = '';
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Item ID" });
            return;

        }

        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Equipment Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.GetEquipmentItemDetails();

    }

    bindtkitEquipmentItemDetails() {

        this.selectedDeptDetails = [];
        this.selectedDeptIDs = [];
        this.InitializationProperties();
        this.tkitEquipmentItemDetailsList = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.tkitEqItmLotSerailList = [];

        for (let k = 0; k < this.tkitEquipmentItemDetails.length; k++) {


            this.tkitEquipmentItemDetailsList.push(this.tkitEquipmentItemDetails[k]);
        }

        if (this.tkitEqItmLotSerail != null && this.tkitEqItmLotSerail != undefined && this.tkitEqItmLotSerail.length != 0) {
            for (let j = 0; j < this.tkitEqItmLotSerail.length; j++) {

                this.tkitEqItmLotSerail[j].ORG_GROUP_ID = this.selectedOrgGroupId;
                this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                this.tkitEqItmLotSerailList.push(this.tkitEqItmLotSerail[j]);
            }

            this.mainlstGridData = this.tkitEqItmLotSerailList;

        }

        for (let i = 0; i <= this.tkitEquipmentItemDetailsList.length - 1; i++) {

            if (this.tkitEquipmentItemDetailsList[i].IMAGE != null && this.tkitEquipmentItemDetailsList[i].IMAGE != undefined && this.tkitEquipmentItemDetailsList[i].IMAGE != '') {
                this.tkitEquipmentItemDetailsList[i].showImage = true;
            }
            this.tkitEquipmentItemDetails[i].IMAGE_PATH = this.imgBasePath + this.tkitEquipmentItemDetails[i].IMAGE;
            this.userSelectedFile = this.tkitEquipmentItemDetails[i].IMAGE;

            if (this.tkitEquipmentItemDetailsList[i].CHK_VALUE == 1) {
                this.dataCheckedSorting.push(this.tkitEquipmentItemDetailsList[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.tkitEquipmentItemDetailsList[i]);
            }


            if (this.selectedEqType == "B") {
                this.showImageColumn = false;
                this.showMfrColumn = false;
                this.showQuantityColumn = false;
                this.showQuantityLabel = false;
                this.showVendorColumn = false;
                this.showDepartmentsColumn = true;
                this.showDestructionColumn = true;
                this.showAddSerailbutton = false;
                this.showlotserialsgrid = false;
            }
            else if (this.selectedEqType == "E") {

                if (this.tkitEqItmLotSerailList.length > 0) {
                    this.showlotserialsgrid = true; //for item lot/serial details
                }
                this.showAddSerailbutton = true; //for displaying the add serials button
                this.showImageColumn = true;
                this.showMfrColumn = true;
                this.showQuantityLabel = true;

                this.showVendorColumn = true;
                this.showQuantityColumn = false;
                this.showDestructionColumn = false;
                this.showDepartmentsColumn = true;
            }
            else if (this.selectedEqType == "F") {

                this.showImageColumn = true;
                this.showMfrColumn = true;
                this.showQuantityLabel = false;
                this.showAddSerailbutton = false;
                this.showVendorColumn = true;
                this.showQuantityColumn = true;
                this.showDestructionColumn = true;
                this.showlotserialsgrid = false;
                this.showDepartmentsColumn = false;

            }

            // this.show
        }

        this.showitemdetailsFields = true;

        this.editItemDetailsFlag = true;
        this.newItem.DEPT_ID = '';
        this.newItem = this.tkitEquipmentItemDetailsList[0];
        this.newItem.Disable = true;

        if (this.newItem.DEPT_ID != null && this.newItem.DEPT_ID != undefined && this.newItem.DEPT_ID != '')
            var deptiddata = this.newItem.DEPT_ID.trim();

        if (this.newItem.IMAGE != null && this.newItem.IMAGE != undefined && this.newItem.IMAGE != '')
            this.userSelectedFile = this.newItem.IMAGE;

        if (this.newItem.DEPT_ID != null && this.newItem.DEPT_ID != undefined && this.newItem.DEPT_ID != '') {

            if (deptiddata.indexOf(',') > 0) {
                for (let x = 0; x < deptiddata.split(',').length; x++) {
                    this.selectedDeptDetails.push(deptiddata.split(',')[x].trim());
                }
            } else {
                this.selectedDeptDetails.push(this.newItem.DEPT_ID);
            }



        }

        this.selectedDeptIDs = this.selectedDeptDetails;

        this.selectedOwnerType = this.newItem.OWNER_TYPE;
        this.selectedVendor = this.newItem.VENDOR;
        this.selectedOwner = this.newItem.OWNER;
        this.disableButton = false;
        this.spinnerService.stop();
        this.validationITEM_ID = 0;
        this.validationITEM_QTY = 0;
        this.validationDESCRIPTION = 0;
        this.validationSTORAGE_LOCATION = 0;
        this.edititemflag = true;
        this.additemflag = false;
        this.page = false;
    }


    selectedLotSerialAvailability(values: any, event) {
        try {
            if (event == true) {
                values.STATUS = true;
            }
            else {
                values.STATUS = false;
            }

        }

        catch (ex) {
         this.clientErrorMsg(ex);
        }


    }

   

    ddlOwnerChanged() {
        this.newItem.OWNER = this.selectedOwner;
    }

    checkAll() {

        try {

            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.EndIndex > this.tkitEquipmentItemDetailsList.length) {
                    this.EndIndex = this.tkitEquipmentItemDetailsList.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.tkitEquipmentItemDetailsList[i].CHK_VALUE = 1;

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    filterdata(event) {
        try {
            this.lstgridfilterData = [];
            this.lstgridfilterData = new Array<VM_TKIT_ITEM_DETAILS>();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    unCheckAll() {
        try {

            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    //  this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;

                }
            }
            else {
                if (this.EndIndex > this.tkitEquipmentItemDetailsList.length) {
                    this.EndIndex = this.tkitEquipmentItemDetailsList.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    //  this.tkitEquipmentItemDetailsList[i].checkvalue = false;
                    this.tkitEquipmentItemDetailsList[i].CHK_VALUE = 0;

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    selectedRow(values: any, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    customSort(event) {
        try {
            var element = event;
            this.tkitEquipmentItemDetailsList = [];
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];

            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });

            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });

            if (this.blnsortbycolumn == false) {
                this.tkitEquipmentItemDetailsList = [];
                this.tkitEquipmentItemDetailsList = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.tkitEquipmentItemDetailsList = [];
                this.tkitEquipmentItemDetailsList = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }

            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async search() {

        this.searchFlag = true;
        this.addnewitembutton = false;
        this.gobutton = true;
        this.showgrid = false;
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = false;
        this.selectedItemID = '';
        this.selectedEqType = '';
        this.newItem = new VM_TKIT_ITEM_DETAILS();
        this.showAddSerailbutton = false;
        this.showLotSerialFields = false;
        this.selectedEquipmentType = '';


        this.growlMessage = [];
        this.tkitEquipmentItemDetails = [];
        this.tkitEquipmentItemDetailsList = [];
        this.showCommentsGrid = false;

        if (this.selectedItemAsset == null || this.selectedItemAsset == undefined || this.selectedItemAsset == '') {
            this.showgrid = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter search string" });
            return;
        }
        else {

            // it will call the both PopulateTypesDropDown(),PopulateItemsDropDown()
            await this.PopulateTypesDropDown();
            await this.PopulateItemsDropDown();

            //   if (this.enteredDescription != null && this.enteredDescription != undefined && this.enteredDescription != '') {


            await this.GetSearchItemDetails();
            //}
            //else {
            //    await this.GetSearchItems();
            //}

        }


    }

    async GetSearchItemDetails() {
        try {

            this.spinnerService.start();

            var itemidvalue = this.selectedItemAsset.split('(')[1].trim();
            itemidvalue = itemidvalue.replace(')', '');


            await this.manageEquipmentItemsService.GetMasterItemsdetails(itemidvalue, this.enteredDescription).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredItems = data.DataList;
                            this.tkitEquipmentItemDetails = [];
                            this.tkitEquipmentItemDetails = data.DataList;

                            if (this.searchFlag) {
                                this.DisplayItemDetailsGrid();
                            }

                            this.spinnerService.stop();

                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.showCommentsGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.showCommentsGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.showCommentsGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async  addNewItem() {


        this.additemflag = true;
        this.edititemflag = false;
        // this.validationITEM_ID = 1;
        this.validationITEM_DESCR = 1;
        this.validationSTORAGE_LOCATION = 1;

        this.validationDESCRIPTION = 1;
        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '' || this.selectedOrgGroupId == "Select OrgGrpID") {

            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid OrgGrpId" });
            return;
        }

        this.selectedItemAsset = '';
        this.enteredDescription = '';
        this.userSelectedFile = ''
        this.selectedOwner = '';
        this.selectedOwnerType = '';
        this.selectedDeptIDs = [];
        this.selectedDeptDetails = [];
        this.selectedVendor = '';

        this.InitializationProperties();
        this.selectedDeptIDs = [];
        this.selectedOwnerType = this.lstOwnerType[0].value;
        this.newItem.OWNER_TYPE = this.selectedOwnerType;
        this.showCommentsGrid = false;


        this.showgrid = false;
        this.editItemDetailsFlag = false;
        this.addnewitembutton = true;
        this.gobutton = false;
        this.addItemDetailsFlag = true;


        this.growlMessage = [];
        this.tkitEquipmentItemDetails = [];
        this.tkitEquipmentItemDetailsList = [];




        this.growlMessage = [];
        if (this.selectedEqType == null || this.selectedEqType == undefined || this.selectedEqType == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment" });
            return;
        }

        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        this.selectedItemAsset = '';
        this.showCommentsGrid = false;

        this.page = false;
        this.showgrid = false;
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = false;
        this.selectedItemID = null;


        this.showAddSerailbutton = false;
        this.showLotSerialFields = false;




        await this.PopulateDepartments();

        this.showitemdetailsFields = true;
        this.showgrid = false;



        if (this.selectedEqType == "E") {

            this.showAddSerailbutton = true;
        }
        else {
            this.showAddSerailbutton = false;
        }



        this.newItem.ITEM_TYPE = this.selectedEquipmentType;
        this.newItem.ITEM_QTY = null;

        this.newItem.CREATEUSERNAME = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();

        this.showAndHideTextBoxs();
        //need to implement the following service call

        await this.GetLatestValue();

        this.tkitEqItmLotSerailList = [];
        this.tkitEquipmentItemDetailsList = [];

        this.disableButton = true;
    }

    async GetLatestAssetIDValue() {
        try {

            let tkitAppId: number = EnumApps.TrackIT;
            let orgGrpParamName = '';
            await this.SetMaxSorageDate();
            this.spinnerService.start();
            await this.manageEquipmentItemsService.GetLatestAssetIDValue(tkitAppId
                , "ASSET_ID").then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.newItemLotSerial.ASSET_ID = data.DataVariable;
                            this.assetfieldpart2 = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    grddata(ven3) {

        var imagepath = ven3.IMAGE_PATH;

    }

    async  editItemDetails(vendata: VM_TKIT_ITEM_DETAILS) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Equipment Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        this.showgrid = false;

        this.editItemDetailsFlag = true;
        this.addItemDetailsFlag = false;

        this.page = false;
        this.showitemdetailsFields = true;
        this.showgrid = false;
        if (this.selectedEqType == "E") {

            this.showAddSerailbutton = true;

            this.showlotserialsgrid = true;

        }

        this.selectedItemID = vendata.ITEM_ID;
        this.selectedEquipmentType = vendata.ITEM_TYPE;

        await this.PopulateTypesDropDown();

        await this.PopulateItemsDropDown();

        await this.GetEquipmentItemDetails();

        this.showCommentsGrid = false;

        this.showAndHideTextBoxs();


        if (this.editItemDetailsFlag) {
            //udpate details 
            this.disableButton = false;

            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == undefined || this.newItem.ITEM_DESCR == '') {
                this.disableButton = true;
            }
            if (this.newItem.STORAGE_LOCATION == null || this.newItem.STORAGE_LOCATION == undefined || this.newItem.STORAGE_LOCATION == '') {
                this.disableButton = true;
            }


            if (this.newItem.DESCRIPTION == null || this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == '') {
                this.disableButton = true;
            }



            if (this.disableButton) {

            }
            else {
                this.disableButton = false;
            }

        }




    }

    showAndHideTextBoxs() {

        if (this.selectedEqType == "B") {

            this.showImageColumn = false;  //for btype items no need of image column


            this.showMfrColumn = false;
            this.showQuantityColumn = false;
            this.showVendorColumn = false;
            this.showDepartmentsColumn = true;
            this.showDestructionColumn = true;
            this.showQuantityLabel = false;
        }
        else if (this.selectedEqType == "E") {

            this.showImageColumn = true;
            this.showMfrColumn = true;
            this.showQuantityLabel = false;
            this.showVendorColumn = true;
            this.showQuantityColumn = false;
            this.showDestructionColumn = false;
            this.showDepartmentsColumn = true;
        }
        else if (this.selectedEqType == "F") {

            this.showImageColumn = true;
            this.showMfrColumn = true;

            this.showVendorColumn = true;
            this.showQuantityColumn = true;
            this.showDestructionColumn = true;
            this.showQuantityLabel = false;
            this.showDepartmentsColumn = false;

        }
    }

    async addNewserials() {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Serial';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        //for displaying the buttons and test boxes in add serail div tag


        this.addserailflag = true;
        this.editserailflag = false;
        this.editLotSerialFlag = false;
        this.addLotSerailFlag = true;
        this.disablelotserailButton = true;

        this.newItemLotSerial = new TKIT_ITEM_INVENTORY();
        this.showLotSerialFields = true;
        this.showAddSerailbutton = true;
        this.page = false;
        this.showgrid = false;
        this.showCommentsGrid = false;
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = false;
        setTimeout(function () {
            let txtSerialIDValue = <HTMLInputElement>document.getElementById("txtSD1");
            txtSerialIDValue.focus();
        }, 500);
        this.validationSERIAL_NO = null;
        this.validationLOT_NO = null;
        this.validationUSER_FIELD_1 = null;

        await this.GetLatestAssetIDValue();



    }

    previousvalue: any;

    editserial(vendata: TKIT_ITEM_INVENTORY) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Serial';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        //edit the lot/serail values from the grid

        // this.edititemflag = true;
        this.addserailflag = false;
        this.editserailflag = true;
        this.addLotSerailFlag = false;
        this.updateLotSerialFlag = true;
        this.selectedLotSerialRow = vendata;
        vendata.Disable = true;
        this.page = false;
        this.showgrid = false;
        this.showCommentsGrid = false;
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = true;
        this.newItemLotSerial = new TKIT_ITEM_INVENTORY();
        setTimeout(function () {
            let txtLotIDValue = <HTMLInputElement>document.getElementById("txtLD1");
            txtLotIDValue.focus();
        }, 500);

        let lotid = vendata.LOT_NO;
        let serialNo = vendata.SERIAL_NO;


        if (vendata.ASSET_ID.length == 13) {
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetid = vendata.ASSET_ID.slice(4, 13);



            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetidpart1 = vendata.ASSET_ID.slice(0, 4);
        }
        else {
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetid = vendata.ASSET_ID;
        }

        let useridField1 = vendata.USER_FIELD_1;
        let checkindate = vendata.CHECKIN_DATE;
        let servicedate = vendata.SERVICE_DT_TIME;

        var newdate = new Date(vendata.SERVICE_DT_TIME);

        let isdiable = vendata.Disable;

        this.newItemLotSerial.LOT_NO = lotid;
        this.newItemLotSerial.SERIAL_NO = serialNo;
        this.newItemLotSerial.ASSET_ID = assetid;
        this.newItemLotSerial.ASSET_IDPART1 = assetidpart1;
        this.newItemLotSerial.USER_FIELD_1 = useridField1;
        this.newItemLotSerial.CHECKIN_DATE = checkindate;
        this.newItemLotSerial.SERVICE_DT_TIME = newdate;
        this.newItemLotSerial.Disable = isdiable;

        this.showLotSerialFields = true;
        this.disablelotserailButton = false;

    }

    getFormattedDate(date: Date) {
        var year = date.getFullYear();
        /// Add 1 because JavaScript months start at 0
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }


    async   lotSerailValidations() {
        //whether the value of serial id is already present

        if (this.tkitEqItmLotSerailList == null || this.tkitEqItmLotSerailList == undefined) {
            this.tkitEqItmLotSerailList = new Array<TKIT_ITEM_INVENTORY>();
        }
        if (this.tkitEqItmLotSerailList != null && this.tkitEqItmLotSerailList != undefined) {
            var result = this.tkitEqItmLotSerailList.filter(x => x.SERIAL_NO == this.newItemLotSerial.SERIAL_NO)

            if (result.length > 0) {

                this.growlMessage = [];

                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Serial ID already Exists" });
                return;

            }
            else {

                this.growlMessage = [];

                if (this.newItemLotSerial.SERIAL_NO != null && this.newItemLotSerial.SERIAL_NO != undefined && this.newItemLotSerial.SERIAL_NO != '') {

                    var valueofassetId = this.newItemLotSerial.ASSET_ID;
                    var valueofcheckindate = this.newItemLotSerial.CHECKIN_DATE;

                    this.newItemLotSerial.ORG_GROUP_ID = this.selectedOrgGroupId;
                    this.newItemLotSerial.ITEM_ID = this.newItem.ITEM_ID;
                    this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                    this.newItemLotSerial.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                    this.newItemLotSerial.ITEM_QTY = this.newItem.ITEM_QTY;

                    if (this.newItemLotSerial.ASSET_IDPART1 == undefined || this.newItemLotSerial.ASSET_IDPART1 == null || this.newItemLotSerial.ASSET_IDPART1 == '')
                        this.newItemLotSerial.ASSET_IDPART1 = '';
                    this.newItemLotSerial.ASSET_ID = this.newItemLotSerial.ASSET_IDPART1 + this.newItemLotSerial.ASSET_ID;

                    var dateStr = new Date(this.newItemLotSerial.SERVICE_DT_TIME).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
<<<<<<< .mine
                    //this.newItemLotSerial.SERVICE_DT_TIME = dateStr.replace(',', '');                   
||||||| .r18524
                    this.newItemLotSerial.SERVICE_DT_TIME = dateStr.replace(',', '');                   
=======
                    this.newItemLotSerial.SERVICE_DT_TIME = dateStr.replace(',', '');
                    let datepart = this.newItemLotSerial.SERVICE_DT_TIME.split(' ');
                    if (datepart != null && datepart.length > 0) {
                        var time = datepart[1].split(':');
                        this.newItemLotSerial.SERVICE_DT_TIME = datepart[0] + ' ' + time[0] + ':' + time[1] + ' ' + datepart[2];
                    }
>>>>>>> .r18701
                    this.tkitEqItmLotSerailList.push(this.newItemLotSerial);
                    this.showlotserialsgrid = true;

                    this.newItemLotSerial = new TKIT_ITEM_INVENTORY();
                    this.newItemLotSerial.CHECKIN_DATE = valueofcheckindate;
                    this.newItemLotSerial.ASSET_ID = valueofassetId;

                }




                await this.GetLatestAssetIDValue();
                this.growlMessage = [];

                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Lot/serials Added Successfully" });
                (<HTMLInputElement>document.getElementById("txtSD1")).focus();
                this.disablelotserailButton = true;
                this.validationSERIAL_NO = null;
                this.validationLOT_NO = null;
                this.validationUSER_FIELD_1 = null;
                return;
            }

        }
        else {
            this.tkitEqItmLotSerailList = new Array<TKIT_ITEM_INVENTORY>();
        }

    }

    gobackFromAddEditSerial() {
        if (this.additemflag) {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Item';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        }
        else {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Equipment Item';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        }
        // remove the add/edit lot/serail text fields
        this.showLotSerialFields = false;
        this.growlMessage = [];
        this.page = false;
        this.showitemdetailsFields = true;
        this.addLotSerailFlag = false;

        if (this.updateLotSerialFlag == true) {

            if (this.previousvalue != this.newItemLotSerial) {
                this.newItemLotSerial = this.previousvalue;

            }
        }



        if (this.selectedEqType == 'E' && this.tkitEqItmLotSerailList != null && this.tkitEqItmLotSerailList != undefined && this.tkitEqItmLotSerailList.length != 0) {
            this.showlotserialsgrid = true;

        }
        else {
            this.showlotserialsgrid = false;;
        }

        this.addserailflag = false;
        this.editserailflag = false;

    }

    //// regrion for add functionality

    async GetLatestValue() {
        try {

            let tkitAppId: number = EnumApps.TrackIT;
            let orgGrpParamName = '';

            this.spinnerService.start();
            await this.SetMaxSorageDate();
            await this.manageEquipmentItemsService.GetLatestValue(tkitAppId
                , "ITEM_ID").then((res: Response) => {
                    // let response = res.json();
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.newItem.ITEM_ID = data.DataVariable;
                            this.spinnerService.stop();

                            if (this.selectedEqType == "E") {
                                //for displaying the vendor drop down when equipment type is E

                                this.GetVendorDetials();

                            }


                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }


    async GetVendorDetials() {
        try {

            this.lstVendorDetails = [];
            this.lstVendorDetails.push({ label: "Select Vendor", value: "Select Vendor" });
            this.spinnerService.start();
            await this.manageEquipmentItemsService.getVendorDetails(this.selectedOrgGroupId, "", "").then((res: Response) => {
                let data = res.json();
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.vendorData = data.DataList;



                        for (var i = 0; i < this.vendorData.length; i++) {

                            this.lstVendorDetails.push({ label: this.vendorData[i].VENDOR_ID + " - " + this.vendorData[i].VENDOR_NAME, value: this.vendorData[i].VENDOR_ID })
                        }

                        this.spinnerService.stop();
                        break;



                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Vendor Id not found" });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }

            });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async SetMaxSorageDate() {
        try {

            let tkitAppId: number = EnumApps.TrackIT;
            let orgGrpParamName = 'B_MAX_STOR';

            this.spinnerService.start();
            await this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, tkitAppId, this.selectedOrgGroupId)
                .catch(this.httpService.handleError).then(async (res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {

                            let dataRange = response.DataVariable.toString();
                            let formDate = new Date();
                            this.newItem.DESTRUCTION_DATE = await this.addDays(formDate, dataRange);
                            this.newItemLotSerial.CHECKIN_DATE = await this.addDays(formDate, dataRange);
                            this.newItemLotSerial.SERVICE_DT_TIME = await this.addDays(formDate, dataRange);


                            this.spinnerService.stop();


                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    async  SaveItemQtyDetails(modeofoperation: string) {

        try {

            this.spinnerService.start();

            this.growlMessage = [];
            let lstItemInvDetails: Array<TKIT_ITEM_INVENTORY> = [];
            var todayDate = new Date(this.formateDate());
            let lstItemDetails: Array<VM_TKIT_ITEM_DETAILS> = [];

            if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
                for (var item = 0; item < this.tkitEqItmLotSerailList.length; item++) {
                    if (this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != null && this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != undefined) {
                        if (new Date(this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME) < todayDate) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "NextService Date Time must be greater than or equal to current date" });
                            this.spinnerService.stop();
                            return
                        }
                    }
                }

            }


            this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;


            var deptids = this.selectedDeptIDs.join();

            this.newItem.DEPT_ID = deptids.trim();
            if (this.newItem.DESTRUCTION_DATE != null && this.newItem.DESTRUCTION_DATE != undefined) {
                var toDate = new Date(this.newItem.DESTRUCTION_DATE);
                if (toDate < todayDate) {
                    // this.grdHide = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Storage Date must be greater than or equal to current date" });
                    this.spinnerService.stop();
                    return;
                }


            }

            if (this.selectedEqType == "B") {
                this.newItem.ITEM_QTY = 1;
            }

            lstItemDetails.push(this.newItem);

            // this.newItem.DESTRUCTION_DATE = this.date2;



            if (this.selectedEqType == "E") {

                if (this.tkitEqItmLotSerailList == null || this.tkitEqItmLotSerailList == undefined || this.tkitEqItmLotSerailList.length == 0) {

                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'Warn', summary: AtParConstants.GrowlTitle_Success, detail: "Please enter atleast one serial number" });
                    return;

                }
                else {

                    for (var item = 0; item < this.tkitEqItmLotSerailList.length; item++) {
                        this.tkitEqItmLotSerailList[item].ORG_GROUP_ID = this.newItem.ORG_GROUP_ID;
                        this.tkitEqItmLotSerailList[item].ITEM_ID = this.newItem.ITEM_ID;
                        this.tkitEqItmLotSerailList[item].STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;

                        // if (this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != null && this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != undefined) {

                        //var toDate = this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME;
                        //var time = new Date(this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME).getTime() - new Date(todayDate).getTime();
                        //let x = time / 60000;
                        //if (x >= 0) {
                        //    // this.grdHide = false;
                        //    this.growlMessage = [];
                        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "NextService Date Time must be greater than or equal to current date" });
                        //    this.spinnerService.stop();
                        //    return;
                        //}

                        //if (new Date(this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME) < todayDate)
                        //{
                        //    this.growlMessage = [];
                        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "NextService Date Time must be greater than or equal to current date" });
                        //    this.spinnerService.stop();
                        //    return
                        //}

                        //}

                    }

                    lstItemInvDetails = this.tkitEqItmLotSerailList;

                }

            }
            else {
                // this.newItemLotSerial.CHECKIN_DATE = this.date2;


                this.newItemLotSerial.ORG_GROUP_ID = this.selectedOrgGroupId;
                this.newItemLotSerial.ITEM_ID = this.newItem.ITEM_ID;
                this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                this.newItemLotSerial.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                this.newItemLotSerial.OWNER = this.newItem.OWNER;
                this.newItemLotSerial.OWNER_TYPE = this.newItem.OWNER_TYPE;
                this.newItemLotSerial.ITEM_QTY = this.newItem.ITEM_QTY;
                //  this.newItem.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                this.newItemLotSerial.UPDATE_USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();
                lstItemInvDetails.push(this.newItemLotSerial);

            }



            await this.manageEquipmentItemsService.SaveItemDetails(lstItemDetails, lstItemInvDetails, this.selectedEqType, modeofoperation)

                .then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.spinnerService.stop();

                            if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Item" + " ' " + this.newItem.ITEM_ID + " ' " + "created successfully" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Item" + " ' " + this.newItem.ITEM_ID + " ' " + "updated  successfully" });
                            }

                            this.breadCrumbMenu.SUB_MENU_NAME = '';
                            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                            this.InitializationProperties();
                            this.showitemdetailsFields = false;
                            this.showLotSerialFields = false;
                            this.selectedEquipmentType = '';
                            this.selectedItemID = '';
                            this.newItem.DEPT_ID = '';
                            this.page = true;
                            this.selectedItemAsset = '';
                            this.tkitEqItmLotSerailList = [];
                            this.tkitEquipmentItemDetailsList = [];
                            this.selectedDeptDetails = [];
                            this.selectedDeptIDs = [];
                            this.userSelectedFile = '';
                            this.selectedOwnerType = '';
                            this.selectedOwner = '';
                            this.additemflag = false;
                            this.edititemflag = false;
                            this.addserailflag = false;
                            this.editserailflag = false;
                            this.selectedEqType = '';
                            break;

                        }
                        case StatusType.Warn: {

                            this.spinnerService.stop();
                            if (data.StatusCode == 1193001) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Serial ID already Exists" });
                                break;
                            }

                            if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                                if (data.StatusCode == 1112329) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Item '" + this.newItem.ITEM_ID + "' created successfully and no printer address available" });

                                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                    this.InitializationProperties();
                                    this.showitemdetailsFields = false;
                                    this.showLotSerialFields = false;
                                    this.selectedEquipmentType = '';
                                    this.selectedItemID = '';
                                    this.newItem.DEPT_ID = '';
                                    this.page = true;
                                    this.selectedItemAsset = '';
                                    this.tkitEqItmLotSerailList = [];
                                    this.tkitEquipmentItemDetailsList = [];
                                    this.selectedDeptDetails = [];
                                    this.selectedDeptIDs = [];
                                    this.userSelectedFile = '';
                                    this.selectedOwnerType = '';
                                    this.selectedOwner = '';
                                    this.additemflag = false;
                                    this.edititemflag = false;
                                    this.addserailflag = false;
                                    this.editserailflag = false;
                                    this.selectedEqType = '';
                                    break;
                                }

                                if (data.StatusCode == 1302201) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Item '" + this.newItem.ITEM_ID + "' created successfully. Remote printer error" });
                                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                    break;
                                }
                            }
                            else {


                                if (data.StatusCode == 1112329) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Item '" + this.newItem.ITEM_ID + "' updated successfully and no printer address available" });
                                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                    this.InitializationProperties();
                                    this.showitemdetailsFields = false;
                                    this.showLotSerialFields = false;
                                    this.selectedEquipmentType = '';
                                    this.selectedItemID = '';
                                    this.newItem.DEPT_ID = '';
                                    this.page = true;
                                    this.selectedItemAsset = '';
                                    this.tkitEqItmLotSerailList = [];
                                    this.tkitEquipmentItemDetailsList = [];
                                    this.selectedDeptDetails = [];
                                    this.selectedDeptIDs = [];
                                    this.userSelectedFile = '';
                                    this.selectedOwnerType = '';
                                    this.selectedOwner = '';
                                    this.additemflag = false;
                                    this.edititemflag = false;
                                    this.addserailflag = false;
                                    this.editserailflag = false;
                                    this.selectedEqType = '';
                                    break;
                                }

                                if (data.StatusCode == 1302201) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Item '" + this.newItem.ITEM_ID + "' updated successfully. Remote printer error" });
                                    this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                    break;
                                }
                            }
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.breadCrumbMenu.SUB_MENU_NAME = '';
                            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async createandprint() {

        this.disableButton = false;


        await this.datevalidation();
        await this.SaveItemQtyDetails("ADDNPRINT");

    }

    async create() {


        this.disableButton = false;



        await this.datevalidation();

        await this.SaveItemQtyDetails("ADD");
    }

    //// end  regrion for add functionality




    //// regrion for update functionality


    async  updateandprint() {

        await this.datevalidation();
        await this.SaveItemQtyDetails("UPDATENPRINT");

    }

    async    update() {

        await this.datevalidation();
        await this.SaveItemQtyDetails("EDIT");


    }
    //// end  regrion for update functionality



    ///validations

    FieldsvalidationRules() {
        this.growlMessage = [];

        if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == undefined || this.newItem.ITEM_ID == '') {
            this.disableButton = true;
        }

        if (this.newItem.ITEM_DESCR == null || this.newItem.ITEM_DESCR == undefined || this.newItem.ITEM_DESCR == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Success, detail: "Please enter valid Item Desc" });
            this.disableButton = true;
            return;
        }


        if (this.newItem.DESCRIPTION == null || this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Success, detail: "Please enter valid StorgLoc " });
            this.disableButton = true;
            return;
        }

    }

    //// regrion for image upload functionality

    files: any;
    fileUpload(event) {
        try {
            //this.spinnerService.start();
            let fileList: FileList = event.target.files;
            this.userSelectedFile = event.target.files[0].name;

            if (this.userSelectedFile != null && this.userSelectedFile != undefined && this.userSelectedFile != '') {
                let formData: FormData = new FormData();
                if (fileList.length > 0) {
                    let file: File = fileList[0];
                    this.files = file.name;
                    var listData = [];
                    this.newItem.showImage = false;
                    this.newItem.IMAGE = this.newItem.ITEM_TYPE + "_" + this.newItem.ITEM_ID + '.' + file.name.split('.')[1];
                    this.newItem.IMAGE_PATH = this.imgBasePath + this.newItem.IMAGE;
                    //this.newItem.showImage = true;
                    var obj = { FileName: this.newItem.ITEM_TYPE + "_" + this.newItem.ITEM_ID + '.' + file.name.split('.')[1], File: file };
                    listData.push(obj);
                    formData.append('uploadFile', file, this.newItem.IMAGE);
                }



                let headers = new Headers();
                headers.append('Authorization', 'bearer');
                headers.append('enctype', 'multipart/form-data');
                let options = new RequestOptions({ headers: headers });
                let apiUrl = this.httpService.BaseUrl + "/api/ManageEquipmentItems/SaveUploadImage";

                this.http.post(apiUrl, formData, options)
                    .toPromise()
                    .then((res: Response) => {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        let data = res.json();
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.files = '';
                                //this.showUploadImage = false;
                                this.newItem.showImage = false;
                                this.newItem.IMAGE_PATH = this.imgBasePath + this.newItem.IMAGE;
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Warn: {
                                //this.showUploadImage = true;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                // this.showUploadImage = true;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    },
                    error => console.log(error)
                    );

            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }


    //// end region for image upload functionality


    //item  activ
    ItemActiveInActive(values: any, event) {

        if (event == true) {
            values.ITEM_INACTIVATED = true;

        }
        else {
            values.ITEM_INACTIVATED = false;

        }

    }


    bindModelDataChange(event: any) {

        try {

            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                this.validationITEM_ID = 1;
            }
            else {
                if (this.validationITEM_ID == 1) {
                    this.validationITEM_ID = 1;
                }
                else {
                    this.validationITEM_ID = 0;
                }
            }

            if (this.selectedEqType == "F") {

                if ("txtQuantity" == event.TextBoxID.toString()) {
                    this.validationITEM_QTY = event.validationrules.filter(x => x.status == false).length;
                }
            }

            if ("txtItemDvalue" == event.TextBoxID.toString()) {
                this.validationITEM_ID = event.validationrules.filter(x => x.status == false).length;
            }

            if ("txtStoragelocation" == event.TextBoxID.toString()) {
                this.validationSTORAGE_LOCATION = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtDescription" == event.TextBoxID.toString()) {
                this.validationDESCRIPTION = event.validationrules.filter(x => x.status == false).length;
            }



            if (this.selectedEqType == "F") {
                if (this.validationITEM_QTY == 0 && this.validationITEM_ID === 0 && this.validationSTORAGE_LOCATION === 0 && this.validationDESCRIPTION === 0) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            else {


                if (this.validationITEM_ID === 0 && this.validationSTORAGE_LOCATION === 0 && this.validationDESCRIPTION === 0) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }


            }









            if (this.selectedEqType == "E") {

                if (this.updateLotSerialFlag == true) {
                    this.disablelotserailButton = false;

                    if (this.newItemLotSerial.SERIAL_NO == null || this.newItemLotSerial.SERIAL_NO == undefined || this.newItemLotSerial.SERIAL_NO == '') {
                        this.disablelotserailButton = true;
                    }
                    if (this.newItemLotSerial.LOT_NO == null || this.newItemLotSerial.LOT_NO == undefined || this.newItemLotSerial.LOT_NO == '') {
                        this.disablelotserailButton = true;
                    }

                    if (this.newItemLotSerial.USER_FIELD_1 == null || this.newItemLotSerial.USER_FIELD_1 == undefined || this.newItemLotSerial.USER_FIELD_1 == '') {

                        this.disablelotserailButton = true;
                    }



                    if (this.disablelotserailButton) {

                    }
                    else {
                        this.disablelotserailButton = false;
                    }
                }
                else if (this.addLotSerailFlag == true) {

                    if (this.showLotSerialFields == true || this.addnewitembutton == true) {
                        if ("txtSD1" == event.TextBoxID.toString()) {
                            this.validationSERIAL_NO = event.validationrules.filter(x => x.status == false).length;
                        }
                        if ("txtLD1" == event.TextBoxID.toString()) {
                            this.validationLOT_NO = event.validationrules.filter(x => x.status == false).length;
                        }
                        if ("txtUserf" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(x => x.status == false).length;
                        }
                        if ("txtAssetId" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(x => x.status == false).length;
                        }
                        if ("txtAssetId1" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(x => x.status == false).length;
                        }


                        if (this.validationSERIAL_NO == 0 && this.validationLOT_NO == 0 && this.validationUSER_FIELD_1 == 0) {
                            this.disablelotserailButton = false;
                        }
                        else {
                            this.disablelotserailButton = true;
                        }
                    }

                }


            }

        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }


    }


    populateOwnerTypeDD() {
        this.lstOwnerType = [];
        this.lstOwnerType.push({ label: "Owned", value: "O" });
        this.lstOwnerType.push({ label: "Leased", value: "L" });
        this.lstOwnerType.push({ label: "Rented", value: "R" });
        //
    }


    ddlvendorChanged() {
        //var data:any[] = this.selectedDeptIDs;
        // data.

        // this.newItem.DEPT_ID = this.selectedDeptIDs;
        this.newItem.VENDOR = this.selectedVendor;

    }

    ddlOwnerTypeChanged() {
        this.newItem.OWNER_TYPE = this.selectedOwnerType;
    }

    populateOwnerDD() {
        this.lstOwnerDetails = [];
        this.lstOwnerDetails.push({ label: "Select One", value: "Select One" });

        for (var k = 0; k < this.tkitDeptDetails.length; k++) {

            this.lstOwnerDetails.push({
                label: this.tkitDeptDetails[k].DESCRIPTION + " " + "(" + this.tkitDeptDetails[k].DEPT_ID + ")",

                value: this.tkitDeptDetails[k].DEPT_ID
            })
        }



    }


    async  createLotSerials() {

        await this.lotSerailValidations();

    }

    updateLotSerials() {
        // this.lotSerailValidations();
        this.page = false;
        this.showLotSerialFields = false;
        this.showitemdetailsFields = true;
        this.showAddSerailbutton = true;

        let selectedrow = this.tkitEqItmLotSerailList.filter(x => x.SERIAL_NO == this.newItemLotSerial.SERIAL_NO)[0];


        if (this.newItemLotSerial.ASSET_IDPART1 == undefined || this.newItemLotSerial.ASSET_IDPART1 == null || this.newItemLotSerial.ASSET_IDPART1 == '')
            this.newItemLotSerial.ASSET_IDPART1 = '';

        this.newItemLotSerial.ASSET_ID = this.newItemLotSerial.ASSET_IDPART1 + this.newItemLotSerial.ASSET_ID;

        selectedrow.LOT_NO = this.newItemLotSerial.LOT_NO;

        selectedrow.ASSET_ID = this.newItemLotSerial.ASSET_ID;
        selectedrow.USER_FIELD_1 = this.newItemLotSerial.USER_FIELD_1;
        selectedrow.CHECKIN_DATE = this.newItemLotSerial.CHECKIN_DATE;
        selectedrow.SERVICE_DT_TIME = this.newItemLotSerial.SERVICE_DT_TIME;
        let changeDate = selectedrow.SERVICE_DT_TIME;
        var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        //selectedrow.SERVICE_DT_TIME = dateStr.replace(',', '');
        let datepart = selectedrow.SERVICE_DT_TIME.split(' ');
        if (datepart != null && datepart.length > 0) {
            var time = datepart[1].split(':');
            selectedrow.SERVICE_DT_TIME = datepart[0] + ' ' + time[0] + ':' + time[1] + ' ' + datepart[2];
        }
        selectedrow.UPDATE_DATE = this.date1;
        selectedrow.UPDATE_USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
        selectedrow.ORG_GROUP_ID = this.selectedOrgGroupId;

        //this.newItemLotSerial = this.newItemLotSerial;

    }


    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }

    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;

    }

    async  datevalidation() {

    }

    gobackFromItemdetails() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        this.page = true;
        this.growlMessage = [];
        this.showitemdetailsFields = false;
        this.showLotSerialFields = false;
        this.additemflag = false;
        this.edititemflag = false;
        this.addserailflag = false;
        this.editserailflag = false;
        this.selectedItemID = '';
        this.selectedItemAsset = '';
        this.selectedEquipmentType = '';
        this.enteredDescription = '';
        if (this.blnShowOrgGroupDD) {
            this.selectedOrgGroupId = '';
        }

    }


    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    formateDate() {

        //var customDate = new Date(date).getMonth().toString() + "/" + new Date(date).getDay().toString() + "/" + new Date(date).getFullYear();
        var today: any = new Date();
        var dd: any = today.getDate();
        var mm: any = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        return today;

        //return this.archiveDate;
    }
} 