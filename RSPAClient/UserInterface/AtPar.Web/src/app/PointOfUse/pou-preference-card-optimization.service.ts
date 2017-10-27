
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class PreferenceCardOptimizationServices {

    constructor(
        private httpservice: HttpService
    ) { }

  
    getPrefOptBySpeciality(strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptBySpeciality",
            params: {
                "strYear": strYear,
                "strHalfYear": strHalfYear,
                "strQuarter": strQuarter,
                "strMonth": strMonth,               
            }
        });
    }

    getPrefOptByProcedure(strSpecialityCode,strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptByProcedure",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    }

    getPrefOptByPhysician(strSpecialityCode, strProcedureCode, strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptByPhysician",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrProcedureCode": strProcedureCode,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    }

    getPrefOptHeaderData(strSpecialityCode, strProcedureCode, strPhysicianId, strPrefListId, strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptHeaderData",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrProcedureCode": strProcedureCode, 
                "pstrPhysicianId": strPhysicianId,
                "pstrPrefListId": strPrefListId,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    }

    getPrefOptDetailsData(strSpecialityCode, strProcedureCode, strPhysicianId, strPrefListId, strRemove, strAddToHoldStart, strAddToHoldEnd, strAddToOpen, strYear, strHalfYear, strQuarter, strMonth) {
        return this.httpservice.getSync({
            apiMethod: "/api/PreferenceCardOpt/GetPrefOptByPreference",
            params: {
                "pstrSpecialityCode": strSpecialityCode,
                "pstrProcedureCode": strProcedureCode,
                "pstrPhysicianId": strPhysicianId,
                "pstrPrefListId": strPrefListId,
                "pstrRemove": strRemove,
                "pstrAddToHoldStart": strAddToHoldStart,
                "pstrAddToHoldEnd": strAddToHoldEnd,
                "pstrAddToOpen": strAddToOpen,
                "pstrYear": strYear,
                "pstrHalfYear": strHalfYear,
                "pstrQuarter": strQuarter,
                "pstrMonth": strMonth,
            }
        });
    }
   

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
