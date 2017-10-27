import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
@Injectable()
export class ManageCarriersService {
    constructor(private httpService: HttpService) {

    }
    public async getCarriersData(Search) {
        return await this.httpService.getSync({
            apiMethod: "/api/ManageCarriers/GetCarriersData",
            params: {
                "search": Search,
            }
        });
    }

    public  updateCarriers(mode, searchString, startPosition, carrier, status ) {
        return this.httpService.create({
            apiMethod: "/api/ManageCarriers/UpdateCarriers",
            params: {
                "mode": mode,
                "searchString": searchString,
                "startPosition": startPosition,
                "carrier": carrier,
                "status": status,
            }
        });
    }
}