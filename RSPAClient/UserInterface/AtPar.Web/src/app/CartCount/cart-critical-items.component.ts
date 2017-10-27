import { Component, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../entities/mt_atpar_org_group_bunits';
import { VM_MT_CRCT_CRITICAL_ITEMS } from '../entities/vm_mt_crct_critical_items';
import { TextboxControl } from '../Common/DynamicControls/TextboxControl';
import { DropDownControl } from '../Common/DynamicControls/DropDownControl';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { StatusType } from '../Shared/AtParEnums';
import { Message } from '../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { BusinessType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_CRCT_USER_ALLOCATION } from '../entities/mt_crct_user_allocation';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { TokenEntry_Enum, EnumApps, ElementType } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { CriticalCommonService } from './cartcount.service';
import { DataTable } from '../components/datatable/datatable';
import { AtParConstants } from '../Shared/AtParConstants';

declare var module: {
    id: string;
}

@Component({

    templateUrl: 'cart-critical-items.component.html',
    providers: [datatableservice, AtParCommonService, CriticalCommonService]
})

export class CriticalItemsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    table: boolean = true;
    form: boolean = false;
    sales: Employee[];
    dropdownData: SelectItem[] = [];
    bUnitdropdownData: SelectItem[] = [];
    selectedOrgGroupID: string = "";
    deviceTokenEntry: string[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    orgBUnitsData: MT_ATPAR_ORG_GROUP_BUNITS[];
    ven: any;
    growlMessage: Message[] = [];
    errorMessage: string = "";
    selectedOrgGrpID: string = "";
    blnStatusMsg: boolean = false;
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string;
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedBunit: string = "";
    selectedDescription: string = "";
    orgGroupIDForDBUpdate: string;
    lstOrgGroups: SelectItem[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: SelectItem[] = [];
    lstFilteredCartIDs: SelectItem[] = [];
    lstUsers: SelectItem[] = [];
    startIndex: number;
    EndIndex: number;
    content: boolean = false;
    BindGrid: VM_MT_CRCT_CRITICAL_ITEMS[];
    lstgridfilterData: VM_MT_CRCT_CRITICAL_ITEMS[];
    ddlOrgGrpID: boolean = false;
    lblOrgGrpID: boolean = false;
    lstBUnitsData: SelectItem[] = [];
    FilterCartsId = new Array<MT_CRCT_USER_ALLOCATION>();
    selectedDropDownBunitID: string = "";
    selectedDropDownCartID: string = "";
    blnSortByColumn: boolean = true;
    custom: string = "custom";
    preField: string = "";
    sortedCheckedrec: VM_MT_CRCT_CRITICAL_ITEMS[];
    sortedUnCheckedrec: VM_MT_CRCT_CRITICAL_ITEMS[];
    dataCheckedSorting: VM_MT_CRCT_CRITICAL_ITEMS[] = [];
    dataUncheckedSorting: Array<VM_MT_CRCT_CRITICAL_ITEMS>;
    lstCheckedCarts: Array<VM_MT_CRCT_CRITICAL_ITEMS>;
    grdHide: boolean = false;
    strBUnit: string = "";
    drpCartItems: MT_CRCT_USER_ALLOCATION[] = [];
    orgGrpId1: string;
    recordsPerPageSize: number;
    buttonID: string = "";

    constructor(private httpservice: HttpService, private _http: Http, private spinnerService: SpinnerService, private commonService: AtParCommonService, private CartCommonService: CriticalCommonService, private atParConstant: AtParConstants) {
    }

    ngOnInit(): void {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedCarts = new Array<VM_MT_CRCT_CRITICAL_ITEMS>();
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.bindBusinessUnit();
    }


    async bindBusinessUnit() {
        this.spinnerService.start();

        try {
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpservice.handleError).then((res: Response) => res.json()).then((response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            this.spinnerService.stop();

                            this.lstOrgGroups = [];
                            this.orgGroupData = response.DataList;
                            this.blnStatusMsg = false;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.blnShowOrgGroupDD = false;
                                this.orgGrpId1 = response.DataList[0].ORG_GROUP_ID + " - " + response.DataList[0].ORG_GROUP_NAME;
                                this.orgGrpId = response.DataList[0].ORG_GROUP_ID;
                                this.populateBusinessunits();
                                this.spinnerService.stop();
                                break;
                            }
                            else if (response.DataList.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.blnShowOrgGroupLabel = false;
                                this.lstFilteredCartIDs = [];
                                this.lstFilteredBUnits = [];
                                this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                })
                                this.lstFilteredBUnits.push({
                                    label: "Select Company",
                                    value: ""
                                })
                                this.lstOrgGroups.push({
                                    label: "Select One",
                                    value: ""
                                })
                                for (var i = 0; i < response.DataList.length; i++) {
                                    if (response.DataList[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: response.DataList[i].ORG_GROUP_ID + " - " + response.DataList[i].ORG_GROUP_NAME, value: response.DataList[i].ORG_GROUP_ID })
                                    }
                                }
                                // this.growlMessage = [];
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindBusinessUnit");
        }
    }

    async ddlOrgGrpId_SelectChanged(event) {
        this.spinnerService.start();
        this.grdHide = false;

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = "";
            this.orgGroupIDForDBUpdate = this.orgGrpId;
            this.lstFilteredBUnits = [];
            this.lstFilteredCartIDs = [];
            this.lstFilteredCartIDs.push({
                label: "Select Cart ID/Par Location",
                value: ""
            })
            this.lstFilteredBUnits.push({
                label: "Select Company",
                value: ""
            })
        }
        else if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "") {
            this.grdHide = false;
            this.lstFilteredBUnits = [];
            this.lstFilteredCartIDs = [];
            this.lstFilteredCartIDs.push({
                label: "Select Cart ID/Par Location",
                value: ""
            })
            this.lstFilteredBUnits.push({
                label: "Select Company",
                value: ""
            })
            this.selectedOrgGroupId = "";
            this.orgGroupIDForDBUpdate = "";
            this.growlMessage = [];
            this.spinnerService.stop();
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            try {
                this.selectedBunit = "";
                this.selectedDropDownCartID = "";
                this.lstFilteredBUnits = [];
                this.lstFilteredCartIDs = [];
                this.lstFilteredCartIDs.push({
                    label: "Select Cart ID/Par Location",
                    value: ""
                })
                this.lstFilteredBUnits.push({
                    label: "Select Company",
                    value: ""
                })
                if (this.orgGroupIDForDBUpdate != null || this.orgGroupIDForDBUpdate != undefined || this.orgGroupIDForDBUpdate != "") {
                    await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                        catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<string>>res.json()).then((response) => {
                            switch (response.StatType) {
                                case StatusType.Success: {
                                    this.growlMessage = [];
                                    this.spinnerService.stop();
                                    this.lstBUnits = response.DataList;
                                    if (response.DataList.length > 0) {
                                        for (var i = 0; i < response.DataList.length; i++) {
                                            this.lstFilteredBUnits.push({ label: response.DataList[i], value: response.DataList[i] })
                                        }
                                        break;
                                    }
                                    else {
                                        this.grdHide = false;
                                        this.spinnerService.stop();
                                        this.lstFilteredBUnits = [];
                                        this.lstFilteredBUnits.push({
                                            label: "Select Company",
                                            value: ""
                                        })
                                        this.lstFilteredCartIDs = [];
                                        this.lstFilteredCartIDs.push({
                                            label: "Select Cart ID/Par Location",
                                            value: ""
                                        })
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                        break;
                                    }
                                }
                                case StatusType.Warn: {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.lstFilteredBUnits = [];
                                    this.lstFilteredBUnits.push({
                                        label: "Select Company",
                                        value: ""
                                    })
                                    this.lstFilteredCartIDs = [];
                                    this.lstFilteredCartIDs.push({
                                        label: "Select Cart ID/Par Location",
                                        value: ""
                                    })
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.lstFilteredBUnits = [];
                                    this.lstFilteredBUnits.push({
                                        label: "Select Company",
                                        value: ""
                                    })
                                    this.lstFilteredCartIDs = [];
                                    this.lstFilteredCartIDs.push({
                                        label: "Select Cart ID/Par Location",
                                        value: ""
                                    })
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.lstFilteredBUnits = [];
                                    this.lstFilteredBUnits.push({
                                        label: "Select Company",
                                        value: ""
                                    })
                                    this.lstFilteredCartIDs = [];
                                    this.lstFilteredCartIDs.push({
                                        label: "Select Cart ID/Par Location",
                                        value: ""
                                    })
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    break;
                                }
                            }
                        });
                }
                else {
                    this.lstFilteredBUnits = [];
                    this.lstFilteredCartIDs = [];

                    this.lstFilteredCartIDs.push({
                        label: "Select Cart ID/Par Location",
                        value: ""
                    })
                    this.lstFilteredBUnits.push({
                        label: "Select Company",
                        value: ""
                    })
                    this.grdHide = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Org GroupID' });
                    this.spinnerService.stop();
                }
            }
            catch (ex) {
                this.clientErrorMsg(ex, "ddlOrgGrpId_SelectChanged");
            }
        }
    }

    ddlCart_SelectChanged() {
        this.grdHide = false;
    }

    async populateBusinessunits() {
        this.spinnerService.start();

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }

        try {
            await this.commonService.getOrgBusinessUnits(this.orgGrpId, BusinessType.Inventory).
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<string>>res.json()).then((response) => {
                    this.lstFilteredBUnits = [];
                    this.lstFilteredCartIDs = [];
                    this.lstFilteredCartIDs.push({
                        label: "Select Cart ID/Par Location",
                        value: ""
                    })
                    this.lstFilteredBUnits.push({
                        label: "Select Company",
                        value: ""
                    })
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.lstFilteredBUnits = [];
                            this.lstFilteredCartIDs = [];
                            this.lstFilteredCartIDs.push({
                                label: "Select Cart ID/Par Location",
                                value: ""
                            })
                            this.lstFilteredBUnits.push({
                                label: "Select Company",
                                value: ""
                            })
                            if (response.DataList.length > 0) {
                                for (var b = 0; b < response.DataList.length; b++) {
                                    this.lstFilteredBUnits.push({ label: response.DataList[b], value: response.DataList[b] })
                                }
                            }
                            else {
                                this.grdHide = false;
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessunits");
        }
    }

    filterBusinessUnits(query, businessunits: any[]): any[] {
        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < businessunits.length; i++) {
                let Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }
        } else {
            if (query.length >= 3) {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }

        return filtered;
    }

    async ddlBUnit_SelectChanged() {
        this.grdHide = false;
        this.selectedDropDownCartID = "";
        this.spinnerService.start();

        if (this.selectedBunit == "") {
            this.lstFilteredCartIDs = [];
            this.lstFilteredCartIDs.push({
                label: "Select Cart ID/Par Location",
                value: ""
            })
            this.growlMessage = [];
            this.spinnerService.stop();
        }
        else {
            try {
                await this.CartCommonService.GetCartBunitsInfo(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry[TokenEntry_Enum.UserID].toString(), this.selectedBunit).
                    catch(this.httpservice.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.lstFilteredCartIDs = [];
                                this.spinnerService.stop();
                                this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                })
                                if (data.DataList.length > 0 && data.DataList.length != null) {
                                    this.growlMessage = [];
                                    if (this.selectedBunit != "") {
                                        let bUnits = data.DataList;
                                        var lstdata = asEnumerable(bUnits).Where(x => x.BUSINESS_UNIT == this.selectedBunit).ToArray();
                                        for (let bu = 0; bu < lstdata.length; bu++) {
                                            this.lstFilteredCartIDs.push({
                                                label: lstdata[bu].CART_ID + " - " + lstdata[bu].DESCR,
                                                value: lstdata[bu].CART_ID
                                            })
                                        }
                                    }
                                    break;
                                }
                                else {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.lstFilteredCartIDs = [];
                                    this.lstFilteredCartIDs.push({
                                        label: "Select Cart ID/Par Location",
                                        value: ""
                                    })
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                    break;
                                }
                            }
                            case StatusType.Warn: {
                                this.grdHide = false;
                                this.spinnerService.stop();
                                this.lstFilteredCartIDs = [];
                                this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                })
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.grdHide = false;
                                this.spinnerService.stop();
                                this.lstFilteredCartIDs = [];
                                this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                })
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.grdHide = false;
                                this.spinnerService.stop();
                                this.lstFilteredCartIDs = [];
                                this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                })
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });
            }
            catch (ex) {
                this.grdHide = false;
                this.lstFilteredCartIDs = [];
                this.lstFilteredCartIDs.push({
                    label: "Select Cart ID/Par Location",
                    value: ""
                })
                this.clientErrorMsg(ex, "ddlBUnit_SelectChanged");
            }
        }
    }

    async btnGo_Click() {
        this.lstCheckedCarts = [];
        this.lstgridfilterData = [];
        this.errorMessage = "";
        if (this.grdHide == true) {
            this.dataTableComponent.reset();
        }
        if (this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == undefined) {
            this.grdHide = false;
            this.growlMessage = [];
            this.errorMessage = "Please select valid orgGroup ID";
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
            this.content = false;
        }
        else
            if (this.selectedBunit == "") {
                this.grdHide = false;
                this.growlMessage = [];
                this.errorMessage = "Please Select Business Unit / Company";
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                this.content = false;
            }
            else if (this.selectedDropDownCartID == "") {
                this.grdHide = false;
                this.growlMessage = [];
                this.errorMessage = "Please select valid Location";
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errorMessage });
                this.content = false;
            }
            else {
                this.growlMessage = [];
                this.content = true;
                this.BindGrid = [];
                try {
                    this.spinnerService.start();
                    this.grdHide = false;
                    await this.CartCommonService.GetCartItemInfo(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.selectedBunit, this.selectedDropDownCartID, this.deviceTokenEntry[TokenEntry_Enum.UserID].toString(), this.deviceTokenEntry[TokenEntry_Enum.ProfileID].toString()).
                        catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<VM_MT_CRCT_CRITICAL_ITEMS>>res.json()).then((response) => {
                            switch (response.StatType) {
                                case StatusType.Success:
                                    {
                                        this.growlMessage = [];
                                        this.spinnerService.stop();
                                        this.BindGrid = [];
                                        this.grdHide = true;
                                        let bindData = response.DataDictionary["listDetails"];
                                        let lstHeaders = response.DataDictionary["listHeaders"];
                                        for (let i = 0; i <= bindData.length - 1; i++) {
                                            bindData[i].OPTIMAL_QTY = + bindData[i].OPTIMAL_QTY;
                                            if (bindData[i].ChkValue == "Y") {
                                                bindData[i].checkvalue = true;
                                            }
                                            else {
                                                bindData[i].checkvalue = false;
                                            }
                                        }
                                        let griddata = bindData;
                                        if (lstHeaders.length > 0) {
                                            if (griddata.length > 0) {
                                                for (let i = 0; i < griddata.length; i++) {
                                                    switch (griddata[i].CART_REPLEN_OPT.toString()) {
                                                        case "01":
                                                        case "1":
                                                            griddata[i].CART_REPLEN_OPT = "Stock";
                                                            break;
                                                        case "02":
                                                        case "2":
                                                            griddata[i].CART_REPLEN_OPT = "Non Stock";
                                                            break;
                                                        case "03":
                                                        case "3":
                                                            griddata[i].CART_REPLEN_OPT = "Stockless";
                                                            break;
                                                        case "04":
                                                        case "4":
                                                            griddata[i].CART_REPLEN_OPT = "Consignment";
                                                            break;
                                                        case "05":
                                                        case "5":
                                                            griddata[i].CART_REPLEN_OPT = "Not Replenished";
                                                            break;
                                                    }
                                                }
                                            }
                                            this.BindGrid = griddata;
                                            var orderBydData = asEnumerable(this.BindGrid).OrderBy(x => x.checkvalue == false && x.INV_ITEM_ID).ToArray();
                                            this.BindGrid = [];
                                            this.BindGrid = orderBydData;
                                            this.bindDataSortedGrid();
                                            this.grdHide = true;
                                            break;
                                        }
                                    }
                                case StatusType.Warn: {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    break;
                                }
                            }

                        });

                }
                catch (ex) {
                    this.grdHide = false;
                    this.spinnerService.stop();
                    this.clientErrorMsg(ex, "btnGo_Click");
                }
            }
    }

    bindDataSortedGrid() {
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];

        try {
            for (let i = 0; i <= this.BindGrid.length - 1; i++) {
                if (this.BindGrid[i].ChkValue == "Y") {
                    this.dataCheckedSorting.push(this.BindGrid[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindDataSortedGrid");
        }

    }

    //Sorting for Gridview
    customSort1(event, elementType: string = "") {
        var element = event;
        this.BindGrid = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;

        } else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
       
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
        try {
            if (elementType == ElementType[ElementType.FLOAT].toString()) {
                this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                    if (parseFloat(a[element.field]) < parseFloat(b[element.field]))
                        return -1;
                    if (parseFloat(a[element.field]) > parseFloat(b[element.field]))
                        return 1;
                    return 0;
                });

                this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (parseFloat(a[element.field]) < parseFloat(b[element.field]))
                        return -1;
                    if (parseFloat(a[element.field]) > parseFloat(b[element.field]))
                        return 1;
                    return 0;
                });
            } else {
                this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {

                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });

                this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
            }

            if (this.blnSortByColumn == false) {
                this.BindGrid = [];
                this.BindGrid = this.sortedCheckedrec.reverse().concat(this.sortedUnCheckedrec.reverse());
            }
            else {
                this.BindGrid = [];
                this.BindGrid = this.sortedCheckedrec.concat(this.sortedUnCheckedrec);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
    }


    customSort(event, field) {
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
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
        let result = null;
        let order: boolean;

        try { 
            this.sortedCheckedrec = this.dataCheckedSorting.sort(function (a, b) {
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

            this.sortedUnCheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
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


        this.BindGrid = this.sortedCheckedrec.concat(this.sortedUnCheckedrec);
        this.sortedCheckedrec = [];
        this.sortedUnCheckedrec = [];
    }

    //Check All for Menu Datatable
    checkAll() {
        this.lstCheckedCarts = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length != 0) {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].ChkValue = "Y";
                    this.lstCheckedCarts.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.BindGrid.length) {
                    this.EndIndex = this.BindGrid.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.BindGrid[i].checkvalue = true;
                    this.BindGrid[i].ChkValue = "Y";
                    this.lstCheckedCarts.push(this.BindGrid[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }

    }

    //UnCheck All for Menu Datatable
    unCheckAll() {
        this.lstCheckedCarts = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length != 0) {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].ChkValue = "N";
                    this.lstCheckedCarts.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.BindGrid.length) {
                    this.EndIndex = this.BindGrid.length;

                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.BindGrid[i].checkvalue = false;
                    this.BindGrid[i].ChkValue = "N";
                    this.lstCheckedCarts.push(this.BindGrid[i]);

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    //Save Click to Save data to database
    async  btnSubmit_Click() {
        let lstdata = this.BindGrid;

        if (lstdata.length > 0) {
            for (let i = 0; i < lstdata.length; i++) {
                if (lstdata[i].checkvalue == true) {
                    lstdata[i].ChkValue = "Y";
                }
                else {
                    lstdata[i].ChkValue = "N";
                }
            }
            this.lstCheckedCarts = lstdata;
        }

        try {
            this.spinnerService.start();
            await this.CartCommonService.AllocateCartItemInfo(this.lstCheckedCarts, this.selectedBunit, this.selectedDropDownCartID, this.deviceTokenEntry[TokenEntry_Enum.UserID].toString()).catch(this.httpservice.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_MT_CRCT_CRITICAL_ITEMS>;
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.spinnerService.stop();
                                this.selectedDropDownCartID = "";
                                // this.selectedBunit = "";
                                //if (this.blnShowOrgGroupLabel == true) {
                                //    this.selectedOrgGroupId = "";
                                //}
                                //else {
                                //    this.orgGroupIDForDBUpdate = "";
                                //    this.selectedBunit = 'Select Company';
                                //    this.selectedOrgGroupId = "";
                                //}
                                this.lstgridfilterData = [];
                                this.BindGrid = [];
                                this.grdHide = false;
                                this.lstCheckedCarts = [];
                                this.selectedDropDownCartID = "";
                                this.selectedBunit = "";
                                // this.lstgridfilterData = [];
                                //// this.lstOrgGroups = [];
                                // this.bindBusinessUnit();
                                // this.lstFilteredBUnits = [];
                                // this.lstFilteredBUnits.push({
                                //     label: "Select Company",
                                //     value: ""
                                // })
                                this.lstFilteredCartIDs = [];
                                this.lstFilteredCartIDs.push({
                                    label: "Select Cart ID/Par Location",
                                    value: ""
                                })
                                this.growlMessage = [];
                                data.StatusMessage = "Updated Successfully";
                                this.growlMessage.push({
                                    severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully"
                                });
                                break;
                            }
                        case StatusType.Warn: {
                            this.grdHide = true;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = true;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = true;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSubmit_Click");
        }
    }

    close() {
        this.table = true;
        this.form = false;
    }

    myfilterdata(event) {
        this.lstgridfilterData = new Array<VM_MT_CRCT_CRITICAL_ITEMS>();
        this.lstgridfilterData = event;
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
} 