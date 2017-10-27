import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { TokenEntry_Enum, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { Employee } from '../components/datatable/employee';
import { POUSetupItemAttributeService } from './pou-setup-item-attributes.service';

import { VM_MT_POU_USER_DEPARTMENTS } from '../../app/Entities/VM_MT_POU_USER_DEPARTMENTS';
import { VM_MT_POU_ITEM_ATTRIBUTES } from '../../app/Entities/VM_MT_POU_ITEM_ATTRIBUTES';
import { VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT } from '../../app/Entities/VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT';

import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'pou-setup-item-attributes.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, datatableservice, POUSetupItemAttributeService]
})

export class SetupItemAttributesComponent {

    page: boolean = true;
    form: boolean = false;
    sales: Employee[];
    ven: any;
    pop: boolean = false;

    pazeSize: number;
    deviceTokenEntry: string[] = [];
    lstItemQuantityList: string[] = [];
    growlMessage: Message[] = [];
    lstDBData: VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT[];
    lstCheckedLotValues: Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>;
    lstCheckedSerialValues: Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>;
    lstCheckedValues: Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>;
    showgrid: boolean = false;
    messageDetials:string ="";


    //sort
    dataCheckedSorting: VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT[] = [];
    dataUncheckedSorting: Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>;
    sortedcheckedrec: VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT[];
    sorteduncheckedrec: VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT[];

    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpID: string = "";
    orgGrpIDData: string = "";

    orgGroupIDForDBUpdate: string;

    bunitsData: any = [];

    lstOrgGroups: SelectItem[];
    lstDept: SelectItem[];
    lstLocType: SelectItem[];
    lstBunit: SelectItem[];

    selectedOrgGroupId: string = "";
    selectedDeptID: string = "";
    selectedLocType: string = "";
    selectedBunit: string = "";

    strCartID: string = "";
    strItemID: string = "";
    showIssueUomColumn: boolean = false;
    submitStatus: number;
    loading: boolean = false;
    blnsortbycolumn: boolean = true;
    lblcountmsg: string;


    constructor(public dataservice: datatableservice,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private PouSetupItemAttributeService: POUSetupItemAttributeService,
        private atParConstant: AtParConstants) {
        this.ven = new Employee();
    }

    ngOnInit() {
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.lstCheckedLotValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
        this.lstCheckedSerialValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
        this.dataCheckedSorting = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
        this.dataUncheckedSorting = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();

        //for org group data
        this.bindUserOrgGroups();
        this.populateLocTypeDD();
        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

        this.lstDept = [];
        this.lstDept.push({ label: "Select Department", value: "Select Department" });

    }

    btn_go_Click() {

        this.GetItemAttributesDetails();
        //this.dataservice.getsetupItemAttr().then(countries => { this.sales = countries; });
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
                            this.spinnerService.stop();
                            if (this.orgGroupData.length == 1) {

                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpID = this.orgGroupData[0].ORG_GROUP_ID;
                                this.PopulateDepts();
                                this.populateLocTypeDD();
                                this.populateBusinessUnits();
                                this.spinnerService.stop();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;

                                this.lstBunit = [];
                                this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
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
        this.showgrid = false;
        this.growlMessage = [];

        this.lstDept = [];
        this.lstDept.push({ label: "Select Department", value: "Select Department" });

        if (this.selectedOrgGroupId == "Select One") {
            this.lstBunit = [];
            this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

            this.lstDept = [];
            this.lstDept.push({ label: "Select Department", value: "Select Department" });
            this.lstLocType = [];
            this.lstLocType.push({ label: "Select Loc Type", value: "Select Loc Type" });
            return;
        }


        this.spinnerService.start();

        try {

            this.selectedBunit = "";
            this.selectedDeptID = "";
            this.selectedLocType = "";

            let isDeptExists = await this.PopulateDepts();
            if (isDeptExists == true) {


                await this.populateBusinessUnits();
            }
            else {
                this.lstBunit = [];
                this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

            }

            this.populateLocTypeDD();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }

    }

    ddl_Changed() {
        this.showgrid = false;
    }


    async  PopulateDepts(): Promise<boolean> {
        let isDeptExixt: boolean = false;



        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }



        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }

        try {

            await this.PouSetupItemAttributeService.getUserDepartments(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;

                switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstDept = [];
                            this.lstDept.push({ label: "Select Department", value: "Select Department" });

                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstDept.push({
                                    label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME,
                                    value: data.DataList[i].DEPARTMENT_ID


                                })
                            }

                            isDeptExixt = true;
                            break;
                        }
                        case StatusType.Warn: {
                        isDeptExixt = false;
                        this.selectedBunit = "";
                        this.selectedDeptID = "";
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                        this.selectedBunit = "";
                        this.selectedDeptID = "";
                            isDeptExixt = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                        this.selectedBunit = "";
                        this.selectedDeptID = "";
                            isDeptExixt = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                }

                );

            return Promise.resolve(isDeptExixt);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }


      

    }

    async populateBusinessUnits(): Promise<boolean> {
        let isOrgBUnitsExist: boolean = false;
        this.spinnerService.start();


        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }



        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }

        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

        try {
            await this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.spinnerService.stop();
                            this.bunitsData = data.DataList;
                            for (let i = 0; i < this.bunitsData.length; i++) {
                                this.lstBunit.push({
                                    label: this.bunitsData[i],
                                    value: this.bunitsData[i]
                                })
                            }

                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }

                });
            return Promise.resolve(isOrgBUnitsExist);

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }


    //sort

    customSort(event) {
        var element = event;

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
            this.lstDBData = [];
            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
        }
        else {
            this.lstDBData = [];

            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        }

        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];

    }

    async GetItemAttributesDetails() {
        try {


            this.showgrid = false;
            this.growlMessage = [];
            ///orgGrop ID 
            this.spinnerService.start();

            this.lstCheckedLotValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
            this.lstCheckedSerialValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }


            if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }


            ///department ID

            if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
                return;
            }


            ///Location Type

            if (this.selectedLocType == null || this.selectedLocType == "" || this.selectedLocType == "Select Loc Type" || this.selectedLocType == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Location Type" });
                return;
            }

            ///Bunit 

            if (this.selectedBunit == null || this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                this.selectedBunit = "";
            }

            this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;

            await this.PouSetupItemAttributeService.GetItemAttributesDetails(this.selectedDeptID, this.selectedBunit, 0, this.strCartID, this.selectedLocType, 15, this.strItemID).
                 catch(this.httpService.handleError).then((res: Response) => {
                     let data = res.json() as AtParWebApiResponse<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>;

                     switch (data.StatType) {
                        case StatusType.Success: {

                            this.lstDBData = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();

                            this.lstDBData = data.DataList;


                            this.spinnerService.stop();

                            this.BindDataGrid();
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
                }

                );


        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async Save_Click() {
        await this.SaveDeptItemAttributes();
    }

    async SaveDeptItemAttributes() {
        try {

            this.growlMessage = [];
            this.lstCheckedValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();

           

            ///orgGrop ID 
            this.spinnerService.start();


            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }


            if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }


            ///department ID

            if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
                return;
            }
            
            

            await this.PouSetupItemAttributeService.saveDeptItemAttributes(this.lstDBData, this.selectedDeptID, this.selectedBunit, this.strCartID, this.strItemID)
                .subscribe((response) => {

                    switch (response.StatType) {

                        case StatusType.Success: {


                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully..." });
                            this.spinnerService.stop();
                            //clear the values
                            this.lstCheckedLotValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedSerialValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.selectedDeptID = "";
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            this.selectedLocType = "";
                            this.selectedOrgGroupId = "";
                            
                            this.showgrid = false;
                            this.lstDBData = [];

                            break;
                        }
                        case StatusType.Warn: {

                            this.spinnerService.stop();
                            this.lstCheckedLotValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedSerialValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.lstItemQuantityList = response.DataList;

                            if (this.lstItemQuantityList != null)
                            {
                                for (let i = 0; i < this.lstItemQuantityList.length; i++)
                                {
                                    if (this.messageDetials != null && this.messageDetials != undefined && this.messageDetials != "")
                                    {
                                        this.messageDetials = this.messageDetials + "," + this.lstItemQuantityList[i];

                                    } else {
                                        this.messageDetials = this.lstItemQuantityList[i];
                                    }
                                  
                                }
                            }

                            this.spinnerService.stop();
                            this.lstCheckedLotValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedSerialValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();

                            this.lstDBData = asEnumerable(this.lstDBData).OrderByDescending(x => x.LOT).OrderByDescending(x => x.SERIAL).ToArray();

                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage + " " + this.messageDetials });

                            this.lstItemQuantityList = [];
                            this.messageDetials = "";
                            break;
                        }
                        case StatusType.Custom: {

                            this.spinnerService.stop();
                            this.lstCheckedLotValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedSerialValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.lstCheckedValues = new Array<VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT>();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                }

                );

        }
        catch (ex) {
            this.spinnerService.stop();

            this.clientErrorMsg(ex);
        }
    }


    //lot controlled 
    selectedRowLotControlled(values: any, event) {

        if (event == true) {

            values.LOT_CONTROLLED = "Y";
            values.LOT = true;
        }
        else {

            values.LOT_CONTROLLED = "N";
            values.LOT = false;
        }

        for (var i = 0; i < this.lstCheckedLotValues.length; i++) {
            if (this.lstCheckedLotValues[i].ITEM_ID === values.ITEM_ID) {
                var index = this.lstCheckedLotValues.indexOf(this.lstCheckedLotValues[i], 0)
                this.lstCheckedLotValues.splice(index, 1);
            }
        }



        this.lstCheckedLotValues.push(values);
    }


    //serail controlled
    selectedRowSerialControlled(values: any, event) {

        if (event == true) {
            values.SERIAL_CONTROLLED = "Y";
            values.SERIAL = true;
        }
        else {
            values.SERIAL_CONTROLLED = "N";
            values.SERIAL = false;
        }

        for (var i = 0; i < this.lstCheckedSerialValues.length; i++) {
            if (this.lstCheckedSerialValues[i].ITEM_ID === values.ITEM_ID) {
                var index = this.lstCheckedSerialValues.indexOf(this.lstCheckedSerialValues[i], 0)
                this.lstCheckedSerialValues.splice(index, 1);
            }
        }

        this.lstCheckedSerialValues.push(values);
    }





    BindDataGrid() {
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];


        var count = this.lstDBData.length;
        this.lblcountmsg = count + " Record(s) Found";



        for (let i = 0; i < this.lstDBData.length; i++) {

            if (this.lstDBData[i].LOT == true || this.lstDBData[i].SERIAL == true)
            {
                this.dataCheckedSorting.push(this.lstDBData[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDBData[i]);
            }


            if (this.lstDBData[i].ASSIGN_CART == null || this.lstDBData[i].ASSIGN_CART == undefined || this.lstDBData[i].ASSIGN_CART == "") {
                this.lstDBData[i].ASSIGN_CART = "N";
            }

            this.lstDBData[i].ROWINDEX = i;

            if (this.lstDBData[i].LOT_CONTROLLED == null || this.lstDBData[i].LOT_CONTROLLED == "" || this.lstDBData[i].LOT_CONTROLLED == undefined) {
                this.lstDBData[i].LOT_CONTROLLED == "N"
            }

            if (this.lstDBData[i].SERIAL_CONTROLLED == null || this.lstDBData[i].SERIAL_CONTROLLED == "" || this.lstDBData[i].SERIAL_CONTROLLED == undefined) {
                this.lstDBData[i].SERIAL_CONTROLLED == "N"
            }


            this.lstDBData[i].ISSUE_UOM_ID = 'txtIssueuom' + i;
            this.lstDBData[i].CONVERSION_FACTOR_ID = 'txtConFact' + i;

            //To hide Issue UOM & Conversion Factor columns 

            if (this.selectedLocType == "I") {
                this.showIssueUomColumn = false;
                this.lstDBData[i].ISSUE_UOM_ID_VISIBLE = true;
                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
            }
            else {
                this.lstDBData[i].ISSUE_UOM_ID_VISIBLE = false;


                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;




                this.showIssueUomColumn = true;
            }

            //for switch enabled/disabled

            if (this.lstDBData[i].LOT_SERIAL_DISABLE === "Y") {
                this.lstDBData[i].lotvalue = true;
                this.lstDBData[i].serialvalue = true;
               
            }


            else {
                this.lstDBData[i].lotvalue = false;
                this.lstDBData[i].serialvalue = false;
              

            }

        }



        this.showgrid = true;
    }


    issueUomOnchanged(UomData: VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT, event) {


        for (let i = 0; i < this.lstDBData.length; i++) {
            console.log(event);

            if (UomData.ROWINDEX == this.lstDBData[i].ROWINDEX) {
                if (UomData.ISSUE_UOM == UomData.PAR_UOM) {
                    this.lstDBData[i].CONVERSION_FACTOR = "1";
                    this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;

                }
                else if (UomData.ISSUE_UOM == null || UomData.ISSUE_UOM == undefined || UomData.ISSUE_UOM == "") {

                    this.lstDBData[i].CONVERSION_FACTOR = "";
                    this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;

                }
                else {
                    this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = false;
                }

            }
            else {
                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
            }
        }




    }



    bindModelDataChange(event: any) {


        for (let i = 0; i < this.lstDBData.length; i++) {


            if (this.lstDBData[i].ISSUE_UOM_ID == event.TextBoxID.toString())
            {

                if (this.lstDBData[i].ISSUE_UOM != null && this.lstDBData[i].ISSUE_UOM != undefined && this.lstDBData[i].ISSUE_UOM != "") {
                    this.submitStatus = event.validationrules.filter(x => x.status == false).length;

                    if (this.submitStatus == 0) {
                        if (this.lstDBData[i].CONVERSION_FACTOR == null || this.lstDBData[i].CONVERSION_FACTOR == undefined || this.lstDBData[i].CONVERSION_FACTOR == "") {
                            this.submitStatus = -1;
                            break;
                        }


                    }
                    else {
                        continue;
                    }
                }
                else {
                    if (this.lstDBData[i].CONVERSION_FACTOR != null && this.lstDBData[i].CONVERSION_FACTOR != undefined && this.lstDBData[i].CONVERSION_FACTOR != "")
                    {
                        this.lstDBData[i].CONVERSION_FACTOR = "";
                        this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
                        this.submitStatus = 0;
                    }
                    else {
                        this.submitStatus = 0;
                    }
                }


            }
            else if (this.lstDBData[i].CONVERSION_FACTOR_ID == event.TextBoxID.toString() )
            {
           
                    if (this.lstDBData[i].CONVERSION_FACTOR != null && this.lstDBData[i].CONVERSION_FACTOR != "" && this.lstDBData[i].CONVERSION_FACTOR != undefined) {

                        this.submitStatus = 0;
                    }
                    else {

                        if (this.lstDBData[i].ISSUE_UOM == null || this.lstDBData[i].ISSUE_UOM == undefined || this.lstDBData[i].ISSUE_UOM == "") {
                            if (this.lstDBData[i].CONVERSION_FACTOR == null || this.lstDBData[i].CONVERSION_FACTOR == "" || this.lstDBData[i].CONVERSION_FACTOR == undefined) {
                                this.submitStatus = 0;

                            }
                            else {
                                this.submitStatus = -1;
                                break;

                            }

                        }
                        else {

                            if (this.lstDBData[i].CONVERSION_FACTOR == null || this.lstDBData[i].CONVERSION_FACTOR == undefined || this.lstDBData[i].CONVERSION_FACTOR == "") {
                                this.submitStatus = -1;
                                break;
                            }
                        }


                    }
                }


            if (this.lstDBData[i].ISSUE_UOM == null || this.lstDBData[i].ISSUE_UOM == undefined || this.lstDBData[i].ISSUE_UOM == "")
            {
                this.lstDBData[i].CONVERSION_FACTOR = "";
                this.lstDBData[i].CONVERSION_FACTOR_ID_VISIBLE = true;
            }

        }

        if (this.submitStatus != 0) {
            this.loading = true;
        }
        else {
            this.loading = false;
        }


    }

    populateLocTypeDD() {
        this.lstLocType = [];
        this.lstLocType.push({ label: "Select Loc Type", value: "Select Loc Type" });
        this.lstLocType.push({ label: "Inventory", value: "I" });
        this.lstLocType.push({ label: "Par", value: "P" });
    }


    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;       
        this.lstOrgGroups = null;       
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }




}