import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { PAR_MNGT_COST_CENTER } from '../../app/Entities/PAR_MNGT_COST_CENTER';
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { Observable } from 'rxjs/Rx';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { PAR_MNGT_VENDOR } from '../../app/Entities/PAR_MNGT_VENDOR'; 
import { PAR_MNGT_ITEM } from '../../app/Entities/PAR_MNGT_ITEM'; 
import { PAR_MNGT_PAR_LOC_DETAILS } from '../../app/Entities/PAR_MNGT_PAR_LOC_DETAILS';
import { PAR_MNGT_ITEM_SUBSTITUTE } from '../../app/Entities/PAR_MNGT_ITEM_SUBSTITUTE';
@Injectable()
export class SetupItemsServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    getVendorDetails(orgGroupID, vendorID, search) {

        return this.httpservice.get({
            apiMethod: "/api/Vendor/GetVendorDetails",
            params: {
                "orgGroupID": orgGroupID,
                "vendorID": vendorID,
                "search": search,
            }

        }).map(res => <AtParWebApiResponse<PAR_MNGT_VENDOR>>res.json()).catch(this.handleError);
    }


    getItemDetails(ItemId, Description, Vendor, UpicId, Manf, ItemPriceFrom, ItemPriceTo, CustItemId,VendItemId,ManfItemId,Lot,Serial,Mode,Status,OrgGrpId,SubItems) {
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

    
    getOrgGroupDetails(deviceTokenEntry) {

        return this.httpservice.get({
            apiMethod: "/api/Common/GetUserOrgGroups",
            params: {
                "user": deviceTokenEntry[0],
                "orgGrpId":deviceTokenEntry[5]
                
            }

        }).map(res => <AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>>res.json()).catch(this.handleError);
    }
    CreateSetupItem(newItem) {

        return this.httpservice.create({
            apiMethod: "/api/SetupItems/InsertItem",
            formData: newItem
        }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM>>res.json()).catch(this.handleError);
    }
    UpdateItem(newItem) {

        return this.httpservice.update({
            apiMethod: '/api/SetupItems/UpdateItem',
            formData: newItem
        }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM>>res.json()).catch(this.handleError);
    }

    UpdateSubstituteItem(OrgGrpId,ItemId,SubItemId,Status,PharmItemAllocated) {

        return this.httpservice.update({
            apiMethod: '/api/SetupItems/UpdateSubstituteItem',
            params: {
                "OrgGrpID": OrgGrpId,
                "ItemID": ItemId,
                "SubItemID": SubItemId,
                "Status": Status,
                "blnPharmItemAllocated": PharmItemAllocated
            }
          
        }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM_SUBSTITUTE>>res.json()).catch(this.handleError);
    }

    InsertSubstituteItem(OrgGrpId, ItemId, SubItemId, Priority, ItemDescr, Status,blnpharmitemallocated,lstParLocDetails) {

        return this.httpservice.create({
            apiMethod: "/api/SetupItems/InsertSubstituteItem",
            formData: lstParLocDetails,
            params: {
                "OrgGrpID": OrgGrpId,
                "ItemID": ItemId,
                "SubItemID": SubItemId,
                "Priority": Priority,
                "ItemDescr": ItemDescr,
                "Status": Status,
                "blnPharmItemAllocated": blnpharmitemallocated
            }
        }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM_SUBSTITUTE>>res.json()).catch(this.handleError);

    }



    UpdateItemStatus(ItemId,status) {

        if (status == true) {
            return this.httpservice.update({
                apiMethod: '/api/SetupItems/UpdateItemStaus',
                params: {
                    "itemID": ItemId,
                    "status": 0

                }

            }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM>>res.json()).catch(this.handleError);
        }
        else {
            return this.httpservice.update({
                apiMethod: '/api/SetupItems/UpdateItemStaus',
                params: {
                    "itemID": ItemId,
                    "status": 1

                }

            }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM>>res.json()).catch(this.handleError);

        }
       


    }
    getLatestItemId(appId) {

        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetLatestItemId",
            params: {
                "appID": appId
            }

        }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM>>res.json()).catch(this.handleError);
    }

    GetPharmacyItemLocations(ItemId) {

        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetPharmacyItemLocations",
            params: {
                "ItemID": ItemId
            }

        }).map(res => <AtParWebApiResponse<PAR_MNGT_PAR_LOC_DETAILS>>res.json()).catch(this.handleError);
    }

    GetSubstituteItemDetails(ItemId,OrgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/SetupItems/GetSubstituteItemDetails",
            params: {
                "ItemID": ItemId,
                "OrgGrpID": OrgGrpId
            }

        }).map(res => <AtParWebApiResponse<PAR_MNGT_ITEM_SUBSTITUTE>>res.json()).catch(this.handleError);

    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}