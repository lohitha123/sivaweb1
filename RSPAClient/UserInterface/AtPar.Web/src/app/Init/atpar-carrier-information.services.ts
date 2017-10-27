
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum } from '../Shared/AtParEnums';

@Injectable()
export class AtParCarrierInformationService {

    constructor(private httpService: HttpService) {      
    }

    async getCarriersData() {
        return await this.httpService.getSync({
            "apiMethod": "/api/CarrierInformation/GetCarriersData",
        });
    }

    async getCarriers(deviceTokenEntry: string[]) {
        return await this.httpService.getSync({
            "apiMethod": "/api/CarrierInformation/GetCarriers",
            params: {
                "userId": deviceTokenEntry[TokenEntry_Enum.UserID]     
            }
        });
    }

    async addCarrier(carrierId,desc,userId) {
        return await this.httpService.create({
            "apiMethod": "/api/CarrierInformation/AddCarrier",
            params: {
                "carrierID": carrierId,
                "descr": desc,
                "userID": userId
            }
        }).toPromise();
    }

    async deleteCarriers(carrierId, userId) {
        return await this.httpService.create({
            "apiMethod": "/api/CarrierInformation/DeleteCarrier",
            params: {
                "carrierID": carrierId,              
                "userID": userId
            }
        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}