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
export class PickStatusReportService {

    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;
    }

    async GetPickstatusReport(inputxml) {

        return await this.httpService.getSync({
            "apiMethod": "/api/PickStatusReport/GetPickstatusReport",
            params: {
                "inputXml": inputxml     
            }
        });
    }

    


}