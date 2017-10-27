import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { PAR_MNGT_ITEM } from '../../app/Entities/PAR_MNGT_ITEM';
import { PAR_MNGT_INVENTORY_ITEM_DETAILS } from '../../app/Entities/PAR_MNGT_INVENTORY_ITEM_DETAILS';

@Injectable()
export class SetupInventoryServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    getUserOrgGroups(user, orgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": user

            }

        }).map(res => <MT_ATPAR_ORG_GROUPS[]>res.json()).catch(this.handleError);
        //return this.httpservice.get({

        //    apiMethod: "/api/Common/GetOrgGroupIDS",
        //    params: {
        //        "user": user,
        //        "orgGrpId": orgGrpId,
        //        "deviceTokenEntry": _deviceTokenEntry
        //    }

        //}).map(res => <MT_ATPAR_ORG_GROUPS[]>res.json()).catch(this.handleError);
    }


    getOrgBusinessUnits(orgGrpId, businessUnitType) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgBusinessUnits",
            params: {
                "orgGrpId": orgGrpId,
                "businessUnitType": businessUnitType
                
            }

        }).map(res => res.json()).catch(this.handleError);
    }
    getItemDetailsForAutoComplete(orgID, orgGroupID, itemID) {
        return this.httpservice.get({
            apiMethod: "/api/SetupInventory/GetItemDetailsForAutoComplete",
            params: {
                "orgID": orgID,
                "orgGroupID": orgGroupID,
                "itemID": itemID
            }

        }).map(res => <PAR_MNGT_ITEM[]> res.json()).catch(this.handleError);

    }

   getItemDetails(orgID, orgGroupID, itemID) {

        return this.httpservice.get({

            apiMethod: "/api/SetupInventory/GetItemDetails",

            params: {

                "orgID": orgID,
                "orgGroupID": orgGroupID,
                "itemID": itemID
            }

        }).map(res => <PAR_MNGT_ITEM[]>res.json()).catch(this.handleError);
    }

    getExistingItemDetails(orgID, orgGroupID, itemID) {

        return this.httpservice.get({

            apiMethod: "/api/SetupInventory/GetExistingItemDetails",

            params: {

                "orgID": orgID,
                "orgGroupID": orgGroupID,
                "itemID": itemID
            }

        }).map(res => <PAR_MNGT_INVENTORY_ITEM_DETAILS[]>res.json()).catch(this.handleError);
    }
    
    updateInventoryItems(inventory, oldUOM, oldDfltStorLoc, altStorLoc1, oldAltStorLoc1, altStorLoc2, oldAltStorLoc2, orgGroupID ) {
         return this.httpservice.update({

             apiMethod: '/api/SetupInventory/UpdateInventoryItems',
             formData: inventory, 
             params: {
                 
                 "oldUOM": oldUOM,
                 "oldDfltStorLoc": oldDfltStorLoc,
                 "altStorLoc1": altStorLoc1,
                 "oldAltStorLoc1": oldAltStorLoc1,
                 "altStorLoc2": altStorLoc2,
                 "oldAltStorLoc2": oldAltStorLoc2,
                 "orgGroupID": orgGroupID

             }
         }).map(res => res.json()).catch(this.handleError);

    }
    insertInventoryItems(inventory, altStorLoc1, altStorLoc2, orgGroupID) {
        return this.httpservice.create({

            apiMethod: '/api/SetupInventory/InsertInventoryItems',
            formData: inventory,
            params: {
                "altStorLoc1": altStorLoc1,
                "altStorLoc2": altStorLoc2,
                "orgGroupID": orgGroupID

            }
        }).map(res => res.json()).catch(this.handleError);

    }

    updateOrgItemStatus(orgID,itemID,uom, dfltStorLoc,
        altStorloc1, altStorLoc2, status) {
        if (status == true) {
            return this.httpservice.update({

                apiMethod: '/api/SetupInventory/UpdateOrgItemStatus',

                params: {
                    "orgID": orgID,
                    "itemID": itemID,
                    "uom": uom,
                    "dfltStorLoc": dfltStorLoc,
                    "altStorloc1": altStorloc1,
                    "altStorLoc2": altStorLoc2,
                    "status": 0

                }
            }).map(res => res.json()).catch(this.handleError);
        }
        else {

            return this.httpservice.update({

                apiMethod: '/api/SetupInventory/UpdateOrgItemStatus',

                params: {
                    "orgID": orgID,
                    "itemID": itemID,
                    "uom": uom,
                    "dfltStorLoc": dfltStorLoc,
                    "altStorloc1": altStorloc1,
                    "altStorLoc2": altStorLoc2,
                    "status": 1
                }
            }).map(res => res.json()).catch(this.handleError);

        }
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}