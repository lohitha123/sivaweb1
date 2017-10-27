import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class AllocateLocationGroupsService {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  getLocationGroups(orgGroupID, UserID, locationGroupId, displayMode, appId) {

        return await this.httpservice.getSync({
            apiMethod: "/api/AllocateLocationGroups/GetLocationGroups",
            params: {
                "orgGroupID": orgGroupID,
                "userId": UserID,
                "locationGroupId": locationGroupId,
                "displayMode": displayMode,
                "appId": appId,
                
            }

        })
    }

    async allocateLocationGroups(lstDBData, orgGroupID, locationGroupId, assignedUserId, userId,clientIP,appId) {

        return await this.httpservice.update({
            apiMethod: "/api/AllocateLocationGroups/InsertLocationGroups",
            formData: lstDBData,
            params: {
                "orgGroupID": orgGroupID,
                "locationGroupId": locationGroupId,
                "assignedUserId": assignedUserId,
                "userId": userId,
                "clientIP": clientIP,
                "appId": appId

            }

        }).toPromise()
    }

    async copyAllocateLocationGroups(lstDBData, copyToUserId, userID, orgGroupID, locationGroupId, clientIP, appId) {

        return await this.httpservice.update({
            apiMethod: "/api/AllocateLocationGroups/CopyLocationDetails",
            formData: lstDBData,
            params: {
                "copyToUserId": copyToUserId,
                "userId": userID,
                "orgGroupID": orgGroupID,
                "locationGroupId": locationGroupId,
                "clientIP": clientIP,
                "appId": appId

            }

        }).toPromise()
    }


    async moveAllocateLocationGroups(lstDBData, fromUserId, toUserId, userID, orgGroupID, locationGroupId, clientIP,appId) {

        return await this.httpservice.update({
            apiMethod: "/api/AllocateLocationGroups/MoveLocationDetails",
            formData: lstDBData,
            params: {
                "fromUserId": fromUserId,
                "toUserId": toUserId,
                "userId": userID,
                "orgGroupID": orgGroupID, 
                "locationGroupId": locationGroupId,
                "clientIP": clientIP,
                "appId": appId

            }

        }).toPromise()
    }

    async deleteAllocateLocationGroups(lstDBData, orgGroupID, locationGroupId, userId, appId) {

        return await this.httpservice.update({
            apiMethod: "/api/AllocateLocationGroups/DeleteLocationDetails",
            formData: lstDBData,
            params: {
                "orgGroupID": orgGroupID,
                "locationGroupId": locationGroupId,
                "userId": userId,
                "appId": appId

            }

        }).toPromise()
    }

    
}