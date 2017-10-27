import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { PAR_MNGT_ITEM } from '../../app/Entities/PAR_MNGT_ITEM';
import { VM_MT_POU_CASE_INFO } from '../entities/vm_mt_pou_case_info';
import { MT_POU_CASE_CART_DETAILS } from '../entities/MT_POU_CASE_CART_DETAILS';




@Injectable()
export class ManageCasesServices {

    constructor(private httpservice: HttpService) {

    }

    async getServiceCodes() {
        return await this.httpservice.getSync({
            apiMethod: "/api/ManageCases/GetServiceCodes",
        });
    }
    async getCases() {
        return await this.httpservice.getSync({
            apiMethod: "/api/ManageCases/GetCases",
        });
    }
    
    getCasesforQA(startDate, endDate, reviewType, deptID, serviceCode, caseID) {
        return this.httpservice.getSync({
            apiMethod: "/api/PostPickQA/GetCasesforQA",
            params: {
                "startDate": startDate,
                "endDate": endDate,
                "reviewType": reviewType,
                "deptID": deptID,
                "serviceCode": serviceCode,
                "caseID": caseID
            }
        });
    }
    processCases(lstCaseInfo) {
        return this.httpservice.update({
            apiMethod: "/api/ManageCases/ProcessCases",
            formData: lstCaseInfo
        });

    }
    getCaseItems(caseID, previewType) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageCases/GetCaseItems",
            params: {
                "caseID": caseID,
                "previewType": parseInt(previewType),
            }

        });

    }
    SearchItem() {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageCases/SearchItem",
            params: {
            }

        });

    }

    async getPreferenceListIDs() {
        return await this.httpservice.getSync({
            "apiMethod": "/api/SetupCase/GetPreferenceListIDs",
            params: {

            }
        });

    }

    async getDepartments() {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ManageCases/GetDepartments",
            params: {

            }
        });

    }
    async getDeptCostCenters() {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ManageCases/GetDeptCostCenters",
            params: {

            }
        });

    }

    async getProcedureCodes(codeType, code, descr) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/Common/GetCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr
            }
        });

    }
    async addCaseInfo(caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status, emergCase, deptId, serviceCode, costCenter) {
        return await this.httpservice.create({
            apiMethod: "/api/SetupCase/AddCaseInfo",
            params: {
                "caseID": caseID,
                "caseDesc": caseDesc,
                "physID": physID,
                "patient": patient,
                "prefID": prefID,
                "procID": procID,
                "date": date,
                "userID": userID,
                "roomNo": roomNo,
                "status": status,
                "emergCase": emergCase,
                "deptId": deptId,
                "serviceCode": serviceCode,
                "costCenter": costCenter

            },
        }).toPromise();//.map(res => res.json()).catch(this.handleError);
    }
    getItemDetails(ItemId, Description, Vendor, UpicId, Manf, ItemPriceFrom, ItemPriceTo, CustItemId, VendItemId, ManfItemId, Lot, Serial, Mode, Status, OrgGrpId, SubItems) {
        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetItemDetails",
            params: {
                "ItemID": ItemId,
                "Descr": Description,
                "Vendor": Vendor,
                "UPCcode": UpicId,
                "Manf": Manf,
                "ItemPriceFrom": ItemPriceFrom,
                "ItemPriceTo": ItemPriceTo,
                "CustItemID": CustItemId,
                "VendItemID": VendItemId,
                "ManfItemID": ManfItemId,
                "Lot": Lot,
                "Serial": Serial,
                "Mode": Mode,
                "status": Status,
                "OrgGrpID": OrgGrpId,
                "SubItems": SubItems,
            }

        }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM>>res.json()).catch(this.handleError);


    }

    async replacePrefCard(lstCaseInfo: VM_MT_POU_CASE_INFO[]) {
        return await this.httpservice.create({
            apiMethod: "/api/ManageCases/ReplacePrefCard",
            formData: lstCaseInfo,
            params: {

            },
        }).toPromise();
    }
    async SaveReviewCaseItems(lstCaseInfo: MT_POU_CASE_CART_DETAILS[]) {
        return await this.httpservice.update({
            apiMethod: "/api/ManageCases/SaveReviewCaseItems",
            formData: lstCaseInfo,
            params: {

            },
        }).toPromise();
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
