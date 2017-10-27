import { Component, OnInit, EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

@Injectable()
export class UserUploadAutomationService {

    constructor(
        private httpService: HttpService
    ) { }

    async doUploadData(chkUser, chkProfile, chkOrgGroup, strUserUploadPath, strProfileUploadPath, strOrgGroupUploadPath, enterpriseSystem, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/UserUploadAutomation/DoUploadData",
            params: {
                "chkUser": chkUser,
                "chkProfile": chkProfile,
                "chkOrgGroup": chkOrgGroup,
                "strUserUploadPath": strUserUploadPath,
                "strProfileUploadPath": strProfileUploadPath,
                "strOrgGroupUploadPath": strOrgGroupUploadPath,
                "enterpriseSystem": enterpriseSystem,
                "userID": userID

            }
        });
    }


}