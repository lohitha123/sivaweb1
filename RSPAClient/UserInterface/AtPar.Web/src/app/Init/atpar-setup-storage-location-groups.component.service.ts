import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class setupStorageLocationGroupServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  GetStorageZoneGroups(selectedZone, selectedDescription,orgGroupID) {

        return await this.httpservice.getSync({
            apiMethod: "/api/SetupStorageLocationGroups/GetStorageZoneGroups",
            params: {
                "zoneGrpID": selectedZone,
                "zoneGrpDescr": selectedDescription,
                "orgID": orgGroupID
                
            }

        })
    }

    async InsertStorageZoneGroups(selectedZone, selectedDescription, UserID, strOrgGrpId) {

        return await this.httpservice.create({
            apiMethod: "/api/SetupStorageLocationGroups/InsertStorageZoneGroups",
            
            params: {
                "zoneID": selectedZone,
                "zoneDescr": selectedDescription,
                "userID": UserID,
                "orgID": strOrgGrpId

            }

        }).toPromise()
    }


    async UpdateZones(ZoneId, ZoneDescr, status, strOrgGrpId) {

        return await this.httpservice.update({
            apiMethod: "/api/SetupStorageLocationGroups/UpdateZones",
            
            params: {
                "zoneID": ZoneId,
                "zoneDescr": ZoneDescr,
                "status": status,
                "orgGrpID": strOrgGrpId
            }

        }).toPromise()
    }

    async  GetZoneStorageLevelDetails(orgGrpId, Zone, Bunit, Area, UserId) {

        return await this.httpservice.getSync({
            apiMethod: "/api/SetupStorageLocationGroups/GetZoneStorageLevelDetails",
            params: {
                "orgGroupID": orgGrpId,
                "zoneGroupID": Zone,
                "bUnit": Bunit,
                "area": Area,
                "userID": UserId
              

            }

        })
    }


    async InsertZoneStorageLevels(userID, OrgGrpID, ZoneId, lstDBData) {

        return await this.httpservice.create({
            apiMethod: "/api/SetupStorageLocationGroups/InsertZoneStorageLevels",
            formData: lstDBData,
            params: {
                "userID": userID,
                "orgGroupID": OrgGrpID,
                "zoneGroupID": ZoneId,
               

            }

        }).toPromise()
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}