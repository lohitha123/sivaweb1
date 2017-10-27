import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';

@Injectable()
export class ProcessParametersService {

    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;
    }

    async getDeptAllocatedCarts(deptID, userId, bUnit, cartID, appId) {
     
        return await this.httpService.getSync({
            "apiMethod": "/api/ProcessParameter/GetDeptAllocatedCarts",
            params: {
                "departmentID": deptID,
                "strUserId": userId,
                "strBunit": bUnit,
                "strCartID": cartID,
                "appID": appId                             
            }
        });
    }

    async getAllocDepartment(deptID, bUnit, appId) {
    
        return await this.httpService.getSync({
            "apiMethod": "/api/ProcessParameter/GetAllocDepartment",
            params: {
                "departmentID": deptID,
                "bUnit": bUnit,               
                "appID": appId
            }
        });
    }

    async getCartSchedules(bUnit, cartID, procType, appId, deviceTokenEntry: string[]) {
       
        return await this.httpService.getSync({
            "apiMethod": "/api/ProcessParameter/GetCartSchedules",
            params: {
                "strBunit": bUnit,
                "strCartID": cartID,
                "strUserId": deviceTokenEntry[TokenEntry_Enum.UserID],
                "procType": procType,
                "appID": appId
                
            }
        });
    }

    async getSheduleIDs(deviceTokenEntry: string[]) {
      
        return await this.httpService.getSync({
            "apiMethod": "/api/ProcessParameter/GetSheduleIDs",
            params: {
                "userId": deviceTokenEntry[TokenEntry_Enum.UserID],
                "strOrgGroupID": deviceTokenEntry[TokenEntry_Enum.OrgGrpID]
            }
        });
    }

    async assignScheduleToCarts(dicAssignSchedule,bunit, appId, deviceTokenEntry) {
        return await this.httpService.create({
            "apiMethod": "/api/ProcessParameter/AssignScheduleToCarts",
            formData: dicAssignSchedule,

            params: {
                "strBunit": bunit,
                "strUserId": deviceTokenEntry[TokenEntry_Enum.UserID],
                "appID": appId
            }

        }).toPromise();
    }

    async assignAlertSchedules(schdAlerts, appId) {
        return await this.httpService.create({
            "apiMethod": "/api/ProcessParameter/AssignAlertSchedules",
            formData: schdAlerts,

            params: {               
                "appID": appId              
            }

        }).toPromise();
    }   

    async getAssignedLocationDetails(bUnit, locId, locationOrgId, locGroupId, orgGrpId) {
      
            return await this.httpService.getSync({
                "apiMethod": "/api/ProcessParameter/GetAssignedLocationDetails",
                params: {
                    "bUnit": bUnit,
                    "locId": locId,
                    "locationOrgId": locationOrgId,
                    "locGroupId": locGroupId,
                    "orgGrpId": orgGrpId
                }
            });
        }
  
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}