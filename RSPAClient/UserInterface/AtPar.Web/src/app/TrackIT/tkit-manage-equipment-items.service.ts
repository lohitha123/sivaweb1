import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

//import { VM_TKIT_ITEM_DEPT } from '../../app/Entities/VM_TKIT_ITEM_DEPT';


@Injectable()
export class ManageEquipmentItemsService {

    constructor(private httpservice: HttpService) {

    }

    async  GetMasterItems() {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetMasterItems"      
        });
    }


    async  GetMasterItemsdetails(itemID, description) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetMasterItems",
            params: {
                "itemID": itemID,
                "description": description


            }
        });
    }

    async  GetEquipmentTypes(itemIndicator, orgGrpId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetEquipmentTypes",
            params: {
                "itemIndicator": itemIndicator,
                "orgGrpId": orgGrpId
               

            }

        });
    }


    async GetItemsForSelectedEqType(equipmentType, itemId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetItemsForSelectedEqType",
            params: {
                "equipmentType": equipmentType,
                "itemId": itemId
                


            }

        });
    }


     GetLatestValue( appId,  fieldName) {
        return this.httpservice.getSync({
            apiMethod: "/api/CommonTrackIT/GetLatestValue",
            params: {
                "appId": appId,
                "fieldName": fieldName



            }

        });
    }


     GetLatestAssetIDValue(appId, fieldName) {
         return this.httpservice.getSync({
             apiMethod: "/api/CommonTrackIT/GetLatestValue",
             params: {
                 "appId": appId,
                 "fieldName": fieldName



             }

         });
     }


    GetItemDepartments(itemId, orgGrpId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetItemDepartments",

            params: {


                "itemId": itemId,
                "orgGrpId": orgGrpId

            }

        });
    }

    IsItemOrdered(itemId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/IsItemOrdered",

            params: {


                "itemId": itemId
              

            }

        });
    }


    GetTypeItems(itemType, itemId) {
        return this.httpservice.getSync({
            apiMethod: "/api/ManageEquipmentItems/GetTypeItems",

            params: {


                "itemType": itemType,
                "itemId": itemId

            }

        });
    }


    UpdateItems(lstItemDetails, itemTypeIndicator) {

       
        return this.httpservice.create({
            apiMethod: "/api/ManageEquipmentItems/UpdateItems",
            formData: lstItemDetails,
            params: {


                "lstItemDetails": lstItemDetails,
                "itemTypeIndicator": itemTypeIndicator

            }

        });
    }



    SaveItemDetails(lstItemDetails, lstItemInvDetails, itemTypeIndicator, mode) {
        var dicitemdetails = { "lstItemDetails": lstItemDetails, "lstItemInvDetails": lstItemInvDetails };

        return this.httpservice.create({

            apiMethod: "/api/ManageEquipmentItems/SaveItemDetails",
            formData: dicitemdetails,
            params: {
                "itemTypeIndicator": itemTypeIndicator,
                "mode": mode


            }

        }).toPromise();
    }




    getVendorDetails(orgGroupID, vendorID, search) {
        return this.httpservice.getSync({
            apiMethod: "/api/CommonTrackIT/GetVendorDetails",
            params: {
                "orgGroupID": orgGroupID,
                "vendorID": vendorID,
                "search": search,
            }

        });
    }



    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}