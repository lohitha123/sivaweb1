/// <reference path="../entities/atparkeyvaluepair.ts" />

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MT_POU_PROCEDURE_CODE } from '../../app/Entities/MT_POU_PROCEDURE_CODE';
import { MT_POU_SPECIALTY_CODE } from '../../app/Entities/MT_POU_SPECIALTY_CODE';

import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class SetupProcedureServices {
   
    constructor(private httpservice: HttpService) {
    }


    GetSpecialtyCodes(codeType, code, descr) {
        return this.httpservice.get({
            apiMethod: "/api/ProcedureCodes/GetSpecialtyCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr,
            }

        }).map(res => <AtParWebApiResponse<MT_POU_SPECIALTY_CODE>>res.json()).catch(this.handleError);
    }

   
    GetProcedureCodes(codeType, code, descr) {
        return this.httpservice.get({
            apiMethod: "/api/ProcedureCodes/GetProcedureCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr,
            }

        }).map(res => <AtParWebApiResponse<MT_POU_PROCEDURE_CODE>>res.json()).catch(this.handleError);
    }
    


    AddCodes(codeType, userId, code, descr, specCode) {
        return this.httpservice.get({
            apiMethod: "/api/ProcedureCodes/AddCodes",
            params: {
                "codeType": codeType,
                "userId": userId,
                "code": code,
                "descr": descr,
                "specCode": specCode
            }

        }).map(res => <AtParWebApiResponse<MT_POU_PROCEDURE_CODE>>res.json()).catch(this.handleError);
    }


    UpdateCodes(codeType, code, descr, specCode) {
        return this.httpservice.get({
            apiMethod: "/api/ProcedureCodes/UpdateCodes",
            params: {
                "codeType": codeType,             
                "code": code,
                "descr": descr,
                "specCode": specCode
            }

        }).map(res => <AtParWebApiResponse<MT_POU_PROCEDURE_CODE>>res.json()).catch(this.handleError);
    }


    DeleteCodes(codeType,  code, descr) {
        return this.httpservice.get({
            apiMethod: "/api/ProcedureCodes/DeleteCodes",
            params: {
                "codeType": codeType,        
                "code": code,
                "descr": descr,
                
            }

        }).map(res => <AtParWebApiResponse<MT_POU_PROCEDURE_CODE>>res.json()).catch(this.handleError);
    }

 

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }






}