import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams } from "@angular/http";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { VM_SETUP_PAR_AUDIT } from '../entities/vm_setup_par_audit';


@Injectable()
export class AtparSetupParLocationServices {
    // public headers: Headers;

    constructor(private httpservice: HttpService) {
    }


    async getCodes(costCenterCode, orgGroupID, deptID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/CostCenter/GetCodes",
            params: {
                "costCenterCode": costCenterCode,
                "orgGroupID": orgGroupID,
                "deptID": deptID
            },
        })

    }

    async getLocations(orgID, locID, locName, appID, orgGroupID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupParLocations/GetLocations",
            params: {
                "orgID": orgID,
                "locID": locID,
                "locName": locName,
                "appID": appID,
                "orgGroupID": orgGroupID

            },
        })

    }

    async updateLoc(objHeader, mode) {
        return await this.httpservice.create({
            apiMethod: "/api/SetupParLocations/UpdateLoc",
            formData: objHeader,
            params: {
                "mode": mode
            },
        }).toPromise();

    }

    async getShipToIds(orgID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupParLocations/GetShipToIds",
            params: {
                "orgID": orgID
            },
        })

    }

    async getLocationHeader(locID, orgID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupParLocations/GetLocationHeader",
            params: {
                "locID": locID,
                "orgID": orgID
            },
        })

    }

    async getOrgIdName(orgID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupParLocations/GetOrgIdName",
            params: {
                "orgID": orgID
            },
        })

    }

    async getItems(ItemID, OrgId, AppID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupItems/GetItems",
            params: {
                "ItemID": ItemID,
                "OrgId": OrgId,
                "AppID": AppID
            },
        })

    }

    async getLocDetails(locID, companyID, itemID, deptID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupParLocations/GetLocDetails",
            params: {
                "locID": locID,
                "companyID": companyID,
                "itemID": itemID,
                "deptID": deptID
            },
        })

    }


    async getItemUOM(ItemID, OrgGrpID, AppID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupItems/GetItemUOM",
            params: {
                "ItemID": ItemID,
                "OrgGrpID": OrgGrpID,
                "AppID": AppID

            },
        })
    }
    async getItemDataToAddOrUpdate(ItemID, OrgGrpID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/SetupItems/GetItemDataToAddOrUpdate",
            params: {
                "ItemID": ItemID,
                "OrgGrpID": OrgGrpID

            },
        })
    }

    async updateLocationItems(locID, companyID, compartment, oldcomprmnt, itemID, optQty, cntReq, cntOrder, replnshType, flag, orderingType, foqQty, maxQty,
        lotCntrld, srCntrld, costCenterCode, unitOfIssue, converstionRate, userField1, userID, status, invBusinessUnit, requisitionType, UOMProc, parUom,
        convRtParUom, lstInsertParAudit: VM_SETUP_PAR_AUDIT[], chargeCode) {
        return await this.httpservice.create({
            apiMethod: "/api/SetupParLocations/UpdateLocationItems",
            formData: lstInsertParAudit,
            params: {
                "locID": locID,
                "companyID": companyID,
                "compartment": compartment,
                "oldcomprmnt": oldcomprmnt,
                "itemID": itemID,
                "optQty": optQty,
                "cntReq": cntReq,
                "cntOrder": cntOrder,
                "replnshType": replnshType,
                "flag": flag,
                "orderingType": orderingType,
                "foqQty": foqQty,
                "maxQty": maxQty,
                "lotCntrld": lotCntrld,
                "srCntrld": srCntrld,
                "costCenterCode": costCenterCode,
                "unitOfIssue": unitOfIssue,
                "converstionRate": converstionRate,
                "userField1": userField1,
                "userID": userID,
                "status": status,
                "invBusinessUnit": invBusinessUnit,
                "requisitionType": requisitionType,
                "UOMProc": UOMProc,
                "parUom": parUom,
                "convRtParUom": convRtParUom,
                "chargeCode": chargeCode
            },
        }).toPromise();
    }

    async addItems(locID, companyID, comp, itemID, optQty, cntReq, cntOrder, replnshType, flag, orderingType, foqQty, maxQty,
        lotCntrld, srCntrld, costCenterCode, unitOfIssue, converstionRate, userField1, userID, status, invBusinessUnit, requisitionType, UOMProc, parUom,
        convRtParUom, chargeCode) {
        return await this.httpservice.create({
            apiMethod: "/api/SetupParLocations/AddItems",
            params: {
                "locID": locID,
                "companyID": companyID,
                "comp": comp,
                "itemID": itemID,
                "optQty": optQty,
                "cntReq": cntReq,
                "cntOrder": cntOrder,
                "replnshType": replnshType,
                "flag": flag,
                "orderingType": orderingType,
                "foqQty": foqQty,
                "maxQty": maxQty,
                "lotCntrld": lotCntrld,
                "srCntrld": srCntrld,
                "userID": userID,
                "unitOfIssue": unitOfIssue,
                "converstionRate": converstionRate,
                "costCenterCode": costCenterCode,
                "userField1": userField1,
                "status": status,
                "invBusinessUnit": invBusinessUnit,
                "requestionType": requisitionType,
                "UOMProc": UOMProc,
                "parUom": parUom,
                "convRtParUom": convRtParUom,
                "chargeCode": chargeCode

            },
        }).toPromise();
    }



    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }






}