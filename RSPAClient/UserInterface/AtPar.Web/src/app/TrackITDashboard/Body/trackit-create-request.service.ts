import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { TkitHttpService } from '../../Shared/tkitHttpService';

@Injectable()

export class TrackITCreateRequestService {

    constructor(private httpService: TkitHttpService, public http: Http) { }

    public getLocations() {

        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetLocations"
        });
    }

    public getRequestorDefaultLocation() {
        
                return this.httpService.getSync({
                    apiMethod: "/api/CommonTrackIT/GetRequestorDefLoc"
                });
            }

    public getPatients(itemID) {

        return this.httpService.getSync({
            apiMethod: "/api/CreateRequest/GetPatientList",
            params: {
                "itemID": itemID
            }
        });
    }

    public getEquipmentType(userID) {
        return this.httpService.getSync({
            apiMethod: "/api/CreateRequest/GetEquipmentType",
            params: {
                "userID": userID
            }
        });
    }

    async  getMasterItems(eqType) {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetMasterItemsForTheSelectedEqType",
            params: {
                "eqType": eqType
            }
        });
    }

    async  getItemsForAutoSearch(eqType, eqpInidcator) {
        return this.httpService.getSync({
            apiMethod: "/api/CreateRequest/GetItemsForAutoSearch",
            params: {
                "eqType": eqType,
                "eqpInidcator": eqpInidcator
            }
        });
    }


    async  getEquipmentItems(eqpType, itemDescr) {
        return this.httpService.getSync({
            apiMethod: "/api/CreateRequest/GetEquipmentItems",
            params: {
                "eqpType": eqpType,
                "itemDescr": itemDescr
            }
        });
    }

    async  getLatestValue(appId, fieldName) {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetLatestValue",
            params: {
                "appId": appId,
                "fieldName": fieldName
            }
        });
    }

    async  getOrgGroupParamValue(orgGpId, appId, fieldName) {
        return this.httpService.getSync({
            apiMethod: "/api/Common/GetOrgGroupParamValue",
            params: {
                "orgGroupID": orgGpId,
                "appID": appId,
                "orgParamName": fieldName
            }
        });
    }

    public addToCart(eqIndicator, itemDetails) {
        return this.httpService.create({
            apiMethod: "/api/CommonTrackIT/AddToCart",
            formData: itemDetails,
            params: {
                "eqIndicator": eqIndicator
            }           
        }).toPromise();
    }
    public getTKITMyPreferences(preference,userID) {

        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetTKITMyPreferences",
        params: {
            "preference": preference,
            "requestorID": userID
            }
        });
    }
}
