import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class ManageParLocServcies {
    constructor(private httpservice: HttpService)
    {
    }

    async getMultipleLocations(orgID, locID, locName, orgGroupID, depID, depName, itemID, itemName, priceFrom, priceTo, appID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ManageParLocations/GetMultipleLocations",
            params: {
                orgID: orgID,
                locID: locID,
                locName: locName,
                orgGroupID: orgGroupID,
                depID: depID,
                depName: depName,
                itemID: itemID,
                itemName: itemName,
                priceFrom: priceFrom,
                priceTo: priceTo,
                appID: appID
            }
        })
    }

    async  getItemsToAddMultipleParLocations(itemID, orgGroupID, orgID, parLocIDs, transType, appID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ManageParLocations/GetItemsToAddMulParLoc",
            params: {
                itemID: itemID,
                orgGroupID: orgGroupID,
                orgID: orgID,
                parLocIDs: parLocIDs,
                //transType: transType,
                appID: appID
            }
        })
    }
    async  getItemsToAddMulParLocReqTypeU(itemID, orgGroupID, orgID, parLocIDs, transType, appID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ManageParLocations/GetItemsToAddMulParLocReqTypeU",
            params: {
                itemID: itemID,
                orgGroupID: orgGroupID,
                orgID: orgID,
                parLocIDs: parLocIDs,
                //transType: transType,
                appID: appID
            }
        })
    }


    async updateMultipleParItems(lstItems) {

        return this.httpservice.create({
            apiMethod: "/api/ManageParLocations/UpdateMultipleParItems",
            formData: lstItems           
        }).toPromise();
    }
    

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}