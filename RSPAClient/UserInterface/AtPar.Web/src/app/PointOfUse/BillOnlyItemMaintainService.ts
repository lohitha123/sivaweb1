import { Injectable } from '@angular/core';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_POU_DEPT_CART_ALLOCATIONS } from '../Entities/mt_pou_dept_cart_allocations';
import { VM_POU_CART_DETAILS } from '../Entities/VM_POU_CART_DETAILS';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { PAR_MNGT_VENDOR } from '../entities/par_mngt_vendor';
import { VM_MT_POU_BILLONLY_ITEMS } from '../entities/vm_mt_pou_billonly_items';

@Injectable()

export class BillOnlyItemMaintainService {

    constructor(private httpservice: HttpService) {

    }
    async GetBillonlyItemsDtls(itemID, orgGrpID, deptID, descr, deviceTokenEntry) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyItemMaintenance/GetBillonlyItemsDtls",
            params: {
                "itemID": itemID,
                "orgGrpID": orgGrpID,
                "deptID": deptID,
                "descr": descr,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async GetVendorsInfo(orgGrpID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyAndConsignedItems/GetVendorsInfo",
            params: {

                "orgGrpID": orgGrpID

            }
        });
    }

    //async UpdateBillonlyItemsDtls(updategrddata,deviceTokenEntry) {

    //    return await this.httpservice.create({
    //        apiMethod: "/api/BillonlyItemMaintenance/UpdateBillonlyItemsDtls",
    //        formData: updategrddata,
    //        params: {
    //            "deviceTokenEntry": deviceTokenEntry

    //        }
    //    });
    //}

    UpdateBillonlyItemsDtls(updategrddata, deviceTokenEntry) {
        return this.httpservice.create({
            "apiMethod": "/api/BillonlyItemMaintenance/UpdateBillonlyItemsDtls",
            formData: updategrddata,
        });

    }
    async GetLocations(appID, orgID, userID, deptID, deviceTokenEntry) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyItemMaintenance/GetLocations",
            params: {
                "appID": appID,
                "orgID": orgID,
                "userID": userID,
                "deptID": deptID,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }
    async GetCostCenterOrgIds(userID, deviceTokenEntry) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyItemMaintenance/GetCostCenterOrgIds",
            params: {
                "userID": userID,

                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async GetInventoryBUnits(userID, deviceTokenEntry) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyItemMaintenance/GetInventoryBUnits",
            params: {
                "userID": userID,

                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async GetAllBillOnlyItems(deviceTokenEntry) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyItemMaintenance/GetAllBillOnlyItems",
            params: {       
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }
    ConvertBillonlyItem(updateConvertdata, deviceTokenEntry) {
        return this.httpservice.create({
            "apiMethod": "/api/BillonlyItemMaintenance/ConvertBillonlyItem",
            formData: updateConvertdata,
        });

    }
}