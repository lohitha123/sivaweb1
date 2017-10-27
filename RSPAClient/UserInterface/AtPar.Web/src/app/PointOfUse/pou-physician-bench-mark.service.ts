import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';
@Injectable()
export class POUPhysicianBenchmarkingService {
    constructor(private httpservice: HttpService) {

    } 
    

    Getphysiciansummarybyspeciality(year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            "apiMethod": "/api/PhysicianBenchMark/GetPhysicianSummaryBySpeciality",
            params: {
                "pstrYear": year,
                "pstrHalfYear": halfyear,
                "pstrQuarter": quater,
                "pstrMonth": monthly
            }
        });
    }

    Getphysicianbenchmarkrankingdata(SpecialityCode,year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/PhysicianBenchMark/GetPhysicianRankData",
            params: {
                "pstrSpecialityCode": SpecialityCode,
                "pstrYear": year,
                "pstrHalfYear": halfyear,
                "pstrQuarter": quater,
                "pstrMonth": monthly
            }
        });
    }
    GetPhysicianScoreCardData(SpecialityCode,PhysicianId, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/PhysicianBenchMark/GetPhysicianScoreCardData",
            params: {  
                "pstrSpecialityCode": SpecialityCode,
                "pstrPhysicianId": PhysicianId,           
                "pstrYear": year,
                "pstrHalfYear": halfyear,
                "pstrQuarter": quater,
                "pstrMonth": monthly               
            }
        });
    }
}