import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
//import { MT_POU_DEPT_CART_ALLOCATIONS } from '../Entities/mt_pou_dept_cart_allocations';
//import { VM_POU_CART_DETAILS } from '../Entities/VM_POU_CART_DETAILS';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ManageConsignedItemOrderReportServices {

    constructor(private httpservice: HttpService) {

    }

    async GetVendorsInfo(orgGrpID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyAndConsignedItems/GetVendorsInfo",
            params: {
                "orgGrpID": orgGrpID
            }
        });
    }

    async GetConsignmentItemOrderReports(ItemID, vendorID, departmentID, businessUnit, cartID, startDate, endDate, poNumber) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyAndConsignedItems/GetConsignmentItemOrderReports",
            params: {
                "ItemID": ItemID,
                "vendorID": vendorID,
                "departmentID": departmentID,
                "businessUnit": businessUnit,
                "cartID": cartID,
                "startDate": startDate,
                "endDate": endDate,
                "poNumber": poNumber
            }
        });
    }


    UpdateNonCatalogItemDtls(billOnlyItems) {
        return this.httpservice.update({
            apiMethod: "/api/BillonlyAndConsignedItems/UpdateNonCatalogItemDtls",
            formData: billOnlyItems
        }).toPromise();
    }

    UpdateItemStatus(transID, itemID, status) {
        return this.httpservice.update({
            apiMethod: "/api/BillonlyAndConsignedItems/UpdateItemStatus",
            params: {
                "transID": transID,
                "itemID": itemID,
                "status": status
            }
        }).toPromise();
    };

    UpdateConsignmentItemOrderReports(transID, itemID, vendorResponse, approverResponse, reviewerResponse, itemPrice, workflowInstanceID, responseFrom, uom, deptID, lotID, serialID, lineNo, comments) {
        return this.httpservice.update({
            apiMethod: "/api/BillonlyAndConsignedItems/UpdateConsignmentItemOrderReports",
            params: {
                "transID": transID,
                "itemID": itemID,
                "vendorResponse": vendorResponse,
                "approverResponse": approverResponse,
                "reviewerResponse": reviewerResponse,
                "itemPrice": itemPrice,
                "workflowInstanceID": workflowInstanceID,
                "responseFrom": responseFrom,
                "uom": uom,
                "deptID": deptID,
                "lotID": lotID,
                "serialID": serialID,
                "lineNo": lineNo,
                "comments": comments
            }
        }).toPromise();
    };

    async SearchInERPItemMaster(strItemID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyAndConsignedItems/SearchInERPItemMaster",
            params: {
                "strItemID": strItemID
            }
        });
    }

    async GetERPName() {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyAndConsignedItems/GetERPName"
        });
    }

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}