
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { TkitHttpService } from '../../Shared/tkitHttpService';

@Injectable()
export class TrackITDashBoardService {

    constructor
        (
        private httpService: TkitHttpService,
        public http: Http
        ) {
    }

    public getOrderHeaders() {
        return this.httpService.getSync({
            apiMethod: "/api/RequestStatus/GetOrdersForDashboard"
        });
    }

    public getOrderDetails(orderNumber) {
        return this.httpService.getSync({
            apiMethod: "/api/RequestStatus/GetOrderDetailsForDashboard",
            params: {
                "orderNumber": orderNumber
            }
        });
    }

}
