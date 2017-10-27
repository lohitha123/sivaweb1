
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum } from '../Shared/AtParEnums';
import { MT_ATPAR_MENUS } from '../../app/Entities/MT_ATPAR_MENUS';

@Injectable()
export class AtParAuditSetupService {

    constructor(private httpService: HttpService) {

    }

    getAppMenus(userID, appID) {
        return this.httpService.get({
            apiMethod: "/api/AuditSetup/GetAppMenus",
            params: {

                "userID": userID,
                "appID": appID
            }
            }).map(res => <AtParWebApiResponse<MT_ATPAR_MENUS>>res.json()).catch(this.handleError);
    }

   
    saveAuditSetUpInfo(lstMenu, user) {
        return this.httpService.create({
            apiMethod: "/api/AuditSetup/SaveAuditSetUpInfo",
            formData: lstMenu,
            params: {
             
                "user": user
            }

        }).map(res => <AtParWebApiResponse<MT_ATPAR_MENUS>>res.json()).catch(this.handleError);
    }




    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}