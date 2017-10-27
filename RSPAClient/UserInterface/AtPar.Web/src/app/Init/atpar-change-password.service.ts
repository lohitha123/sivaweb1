
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum } from '../Shared/AtParEnums';
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS'

@Injectable()
export class ChangePasswordService {


    constructor(private httpservice: HttpService) {
    }

   

    async  GetSecurityParams() {

     return await this.httpservice.getSync({
            "apiMethod": "/api/Common/GetSecurityParams"
        });

    }  

    async HashUpdatePassword(uName,oldPwd, newPwd, hintQ, hintA)
    {
        return await this.httpservice.update({
            "apiMethod": "/api/ChangePassword/HashUpdatePassword",
            params: {
                "uName": uName,
                "oldPwd": oldPwd,
                "pPassword": newPwd,
                "hintQ": hintQ,
                "hintA": hintA
            }

        }).toPromise();
    }
   


}