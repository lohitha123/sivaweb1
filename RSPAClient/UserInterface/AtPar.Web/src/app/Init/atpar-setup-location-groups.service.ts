import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_LOC_GROUPS } from '../entities/mt_atpar_loc_groups';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';


@Injectable()
export class SetupLocationGroupsServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {
    }

    async getLocationGroups(locGrpID, locGrpDescr, orgID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/SetupLocationGroups/GetLocationGroups",
            params: {
                "locGrpID": locGrpID,
                "locGrpDescr": locGrpDescr,
                "orgID": orgID
               
            }

        });

        
    }
     
    
    async getLocationDetails(bUnit, locID, appID, userID, orgGroupID, locGroupID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/SetupLocationGroups/GetLocationDetails",
            params: {
                "bUnit": bUnit,
                "locID": locID,
                "appID": appID,
                "userID": userID,
                "orgGroupID": orgGroupID,
                "locGroupID": locGroupID
                
            }

        });

    }


    insertLocationGroups(orgID, groupID, groupDescr, userID) {
        return this.httpservice.create({
            "apiMethod": "/api/SetupLocationGroups/InsertLocationGroups",
            params: {
                "orgID": orgID,
                "groupID": groupID,
                "groupDescr": groupDescr,
                "userID": userID
            }

        }).toPromise();

    }

    async updateLocationGroups(status, locGrpID, orgGrpID) {
        if (status == true) {
            return await this.httpservice.update({
                "apiMethod": "/api/SetupLocationGroups/UpdateLocationGroups",
                params: {
                    "status": 1,
                    "locGrpID": locGrpID,
                    "orgGrpID": orgGrpID

                }
            }).toPromise();
        }
        else if (status == false) {
            return this.httpservice.update({
                "apiMethod": "/api/SetupLocationGroups/UpdateLocationGroups",
                params: {
                    "status": 0,
                    "locGrpID": locGrpID,
                    "orgGrpID": orgGrpID

                }
            }).toPromise();
        }

    }

    async getExcludedLocations() {
        return await this.httpservice.getSync({
            "apiMethod": "/api/SetupLocationGroups/GetExcludedLocations",
            params: {
               

            }

        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>).toPromise();
    }

    async insertLocationDetails(orgID, locGroupID, clientIP, orgGroupID, userID, lstLocGroups) {

        return this.httpservice.create({
            "apiMethod": "/api/SetupLocationGroups/InsertLocationDetails",
            //"lstLocGroups": lstLocGroups,
            formData: lstLocGroups,
            params: {
                "orgID": orgID,
                "locGroupID": locGroupID,
                "clientIP": clientIP,
                "orgGroupID": orgGroupID,
                "userID": userID
             

            }

        }).toPromise();
    }
 

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }



}