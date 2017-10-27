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
export class PreferenceListsService {

    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;
    }

    async AddPreferenceListHeader( prefListID,  prefListDesc,  deptID,  userID,  procedureID,  physicianID) {
        return await this.httpService.create({
            "apiMethod": "/api/PreferenceLists/AddPreferenceListHeader",

            params: {
                "prefListID": prefListID,
                "prefListDesc":prefListDesc,
                "deptID": deptID,
                "userID": userID,
                "procedureID": procedureID,
                "physicianID": physicianID,
               
            }

        }).toPromise();
    }   

    async DeletePreferenceList( prefListID,  procedureID) {
        return await this.httpService.create({
            "apiMethod": "/api/PreferenceLists/DeletePreferenceList",

            params: {
                "prefListID": prefListID,
                "procedureID": procedureID,
               
            }

        }).toPromise();
    }

    async DisablePrefList(prefListID, procedureID, status) {
        return await this.httpService.update({
            "apiMethod": "/api/PreferenceLists/DisablePrefList",

            params: {
                "prefListID": prefListID,
                "procedureID": procedureID,
                "status": status,
               
            }

        }).toPromise();
    }

    async UpdatePreferenceListItem( prefListID,  procedureID,  itemID,  itemQty,  holdQty) {
        return await this.httpService.update({
            "apiMethod": "/api/PreferenceLists/UpdatePreferenceListItem",

            params: {
                "prefListID": prefListID,
                "procedureID": procedureID,
                "itemID": itemID,
                "itemQty": itemQty,
                "holdQty":holdQty,
                
            }

        }).toPromise();
    }

    async AddPreferenceListItem( prefListID,  procedureID,  itemID,  itemDesc,  itemQty,  holdQty,  userID,  custItemNo) {
        return await this.httpService.create({
            "apiMethod": "/api/PreferenceLists/AddPreferenceListItem",

            params: {
                "prefListID": prefListID,
                "procedureID": procedureID,
                "itemID": itemID,
                "itemDesc": itemDesc,
                "itemQty": itemQty,
                "holdQty": holdQty,
                "userID": userID,
                "custItemNo": custItemNo,
               
            }

        }).toPromise();
    }


    async DeletePreferenceListItem(prefListID, procedureID, itemID) {
        return await this.httpService.create({
            "apiMethod": "/api/PreferenceLists/DeletePreferenceListItem",

            params: {
                "prefListID": prefListID,
                "procedureID": procedureID,
                "itemID": itemID,
                
            }

        }).toPromise();
    }

    async GetPrefListDetails( prefListID,  procID ) {

        return await this.httpService.getSync({
            "apiMethod": "/api/PreferenceLists/GetPrefListDetails",
            params: {
                "prefListID": prefListID,
              
                "procID": procID
            }
        });
    }

    async GetDepartmentItems( deptID,  orgGrpID) {

        return await this.httpService.getSync({
            "apiMethod": "/api/PreferenceLists/GetDepartmentItems",
            params: {
                "deptID": deptID,
                "orgGrpID": orgGrpID,
               
            }
        });
    }

    async GetUserDepartments( userID,  orgGrpID) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetUserDepartments",
            params: {
                "userID": userID,
                "orgGrpID": orgGrpID
            }
        });
    }

    

    async GetPrefList(id, descr, deptID, procCode, physicians, statusFlag) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetPrefList",
            params: {
                "id": id,
                "descr": descr,
                "deptID": deptID,
                "procCode": procCode,
                "physicians": physicians,
                "statusFlag": statusFlag
            }
        });
    }

    async GetCodes( codeType,  code,  descr) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr
            }
        });
    }

    async GetPhysicians() {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetPhysicians",
            params: {
                
            }
        });
    }
}