import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { TKIT_REQUESTOR } from '../../app/Entities/TKIT_REQUESTOR';
import { VM_TKIT_ITEM_DETAILS } from '../../app/Entities/VM_TKIT_ITEM_DETAILS';
import { RM_SHIP_TO_LOCACTION } from '../../app/Entities/RM_SHIP_TO_LOCACTION';
import { MT_ATPAR_PATIENT_CACHE } from '../../app/Entities/MT_ATPAR_PATIENT_CACHE';
import { TKIT_REQUESTOR_DEPT } from '../../app/Entities/TKIT_REQUESTOR_DEPT';
import { TKIT_DEPT } from '../../app/Entities/TKIT_DEPT';
import { TKIT_ITEM_INVENTORY } from '../../app/Entities/TKIT_ITEM_INVENTORY';
import { VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS } from "../../app/Entities/VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS";


@Injectable()
export class CheckInCheckOutItemsServices {
    public headers: Headers;
    constructor(private httpservice: HttpService) {

    }

    getTypeIndicator(itemId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetTypeIndicator",
            params: {
                "itemId": itemId

            }
        }).map(res => res.json()).catch(this.handleError);
    }

    checkEqItemAvailability(itemId, requestor) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/CheckEqItemAvailability",
            params: {
                "itemId": itemId,
                "requestor": requestor

            }
        }).map(res => res.json()).catch(this.handleError);
    }

    checkItemAvailability(itemId, requestor, itemTypeIndicator) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/CheckItemAvailability",
            params: {
                "itemId": itemId,
                "requestor": requestor,
                "itemTypeIndicator": itemTypeIndicator

            }
        }).map(res => res.json()).catch(this.handleError);
    }

    checkSerialId(itemId, serialId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/CheckSerialId",
            params: {
                "itemId": itemId,
                "serialId": serialId

            }
        }).map(res => res.json()).catch(this.handleError);
    }

    getItemDetails(itemId, requestor, itemTypeIndicator, serialId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetItemDetails",
            params: {
                "itemId": itemId,
                "requestor": requestor,
                "itemTypeIndicator": itemTypeIndicator,
                "serialId": serialId

            }
        }).map(res => <VM_TKIT_ITEM_DETAILS>res.json()).catch(this.handleError);
    }


    getRequestors(inActiveCheck, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetRequestors",
            params: {
                "inActiveCheck": inActiveCheck,

                "deviceTokenEntry": deviceTokenEntry

            }
        }).map(res => <TKIT_REQUESTOR[]>res.json()).catch(this.handleError);
    }

    checkOutItems(lstCheckInOutItemDetails, requestedUserId, checkInOutMode, deviceTokenEntry) {
      
        return this.httpservice.update({
            apiMethod: '/api/CheckInCheckOutItems/UpdateRequestorDetails',
            formData: lstCheckInOutItemDetails,
            params: {
                "requestedUserId": requestedUserId, 
                "checkInOutMode": checkInOutMode,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(res => res.json()).catch(this.handleError);

    }

    async  getOrgGroupParamValue(orgGpId, appId, fieldName) {
        return this.httpservice.getSync({
            apiMethod: "/api/Common/GetOrgGroupParamValue",
            params: {
                "orgGroupID": orgGpId,
                "appID": appId,
                "orgParamName": fieldName
            }
        });
    }

    getLocations(orgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetLocations",
            params: {
                "orgGrpId": orgGrpId

            }
        }).map(res => <RM_SHIP_TO_LOCACTION[]>res.json()).catch(this.handleError);
    }

    checkInOutItems(lstCheckInOutItemDetails, requestedUserId, checkInOutMode) {
        return this.httpservice.update({
            apiMethod: "/api/CheckInCheckOutItems/CheckInOutItems",
            formData: lstCheckInOutItemDetails,
            params: {
                "requestedUserId": requestedUserId,
                "checkInOutMode": checkInOutMode
            }
        });
    }

    getTKITDepts(deptID, status) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetTKITDepts",
            params: {
                "deptID": deptID,
                "status": status
            }
        }).map(res => <TKIT_DEPT[]>res.json()).catch(this.handleError);
    }

    getPatientList() {
        return this.httpservice.get({
            apiMethod: "/api/CreateRequest/GetPatientList",
        }).map(res => <MT_ATPAR_PATIENT_CACHE[]>res.json()).catch(this.handleError);
    }

    getUserDepts() {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetUserDepts",
        }).map(res => <TKIT_REQUESTOR_DEPT[]>res.json()).catch(this.handleError);
    }

    async  getItemsForAutoSearch(eqType, eqpInidcator) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateRequest/GetItemsForAutoSearch",
            params: {
                "eqType": eqType,
                "eqpInidcator": eqpInidcator
            }
        });
    }
    public getEquipmentType(userID) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateRequest/GetEquipmentType",
            params: {
                "userID": userID
            }
        });
    }
    async  getEquipmentItems(eqpType, itemDescr) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateRequest/GetEquipmentItems",
            params: {
                "eqpType": eqpType,
                "itemDescr": itemDescr
            }
        });
    }

    getItems(itemId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetItems",
            params: {
                "itemID": itemId
            }
        }).map(res => <VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS>res.json()).catch(this.handleError);
    }

    getSerialIDs(itemId) {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetSerialIDs",
            params: {
                "itemID": itemId
            }
        }).map(res => <TKIT_ITEM_INVENTORY>res.json()).catch(this.handleError);
    }
    getRequestorDefLoc() {
        return this.httpservice.get({
            apiMethod: "/api/CheckInCheckOutItems/GetSerialIDs",
        }).map(res => <string>res.json()).catch(this.handleError);
    }
    public getPatients(itemID) {

        return this.httpservice.getSync({
            apiMethod: "/api/CreateRequest/GetPatientList",
            params: {
                "itemID": itemID
            }
        });
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}