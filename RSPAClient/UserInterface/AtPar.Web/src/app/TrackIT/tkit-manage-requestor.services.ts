import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { TKIT_REQUESTOR } from "../../app/Entities/TKIT_REQUESTOR";
import { TKIT_DEPT } from "../../app/Entities/TKIT_DEPT";
import { TKIT_REQUESTOR_DEPT } from "../../app/Entities/TKIT_REQUESTOR_DEPT";
import { RM_SHIP_TO_LOCACTION } from "../../app/Entities/RM_SHIP_TO_LOCACTION";
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/mt_atpar_org_groups';
@Injectable()
export class ManageRequestorServices {
    public headers: Headers;
    constructor(private httpservice: HttpService) {

    }

    getTKITAllDepts(deptID, status, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetTKITAllDepts",
            params: {
                "deptID": deptID,
                "status": status,
                "deviceTokenEntry": deviceTokenEntry

            }
        }).map(res => <TKIT_DEPT[]>res.json()).catch(this.handleError);
    }
    
    getAllRequestors(search, devicetokenEntry) {
         return this.httpservice.get({
             apiMethod: "/api/ManageRequestor/GetAllRequestors",
             params: {

                "search": search,
                "devicetokenEntry": devicetokenEntry
             }

         }).map(res => <TKIT_REQUESTOR[]>res.json()).catch(this.handleError);
    }

    getRequestorDetails(requestorID, devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/ManageRequestor/GetRequestorDetails",
            params: {
                "requestorID": requestorID,
                "deviceTokenEntry": devicetokenEntry
            }
        }).map(res => <TKIT_REQUESTOR[]>res.json()).catch(this.handleError);
    }

    getLocations( devicetokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/CommonTrackIT/GetLocations",
            params: {

                "deviceTokenEntry": devicetokenEntry
            }
        }).map(res => <RM_SHIP_TO_LOCACTION[]>res.json()).catch(this.handleError);
    }

    getOrgGroupList(userId) {

        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": userId

            }

        }).map(res => <MT_ATPAR_ORG_GROUPS[]>res.json()).catch(this.handleError);
    }

    saveRequestorDetails(requestor, lstRequestorDepts,Password, deviceTokenEntry) {
        var requestorDetails = { "requestor": requestor, "lstRequestorDepts": lstRequestorDepts };
        return this.httpservice.create({
            apiMethod: "/api/ManageRequestor/SaveRequestorDetails",
            formData: requestorDetails,
            params: {
                "pPassword": Password,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(res => res.json()).catch(this.handleError);

    }

    updateRequestorDetails(requestor, lstRequestorDepts, Password,deviceTokenEntry) {
        var requestorDetails = { "requestor": requestor, "lstRequestorDepts": lstRequestorDepts };
        return this.httpservice.update({
            apiMethod: '/api/ManageRequestor/UpdateRequestorDetails',
            formData: requestorDetails,
            params: {
                "pPassword": Password,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(res => res.json()).catch(this.handleError);

    }

    updateRequestorStatus(requestorID, status, deviceTokenEntry) {
        if (status == 'A') {
            return this.httpservice.update({
                apiMethod: '/api/ManageRequestor/UpdateRequestorStatus',
               
                params: {
                    "requestorID": requestorID,
                    "status": "I",
                    "deviceTokenEntry": deviceTokenEntry
                }
            }).map(res => res.json()).catch(this.handleError);

        } else {
            return this.httpservice.update({
                apiMethod: '/api/ManageRequestor/UpdateRequestorStatus',
               
                params: {
                    "requestorID": requestorID,
                    "status": "A",
                    "deviceTokenEntry": deviceTokenEntry
                }
            }).map(res => res.json()).catch(this.handleError);

        }
        

    }
    
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    

}