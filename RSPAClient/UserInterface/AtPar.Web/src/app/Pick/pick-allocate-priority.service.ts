import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';


@Injectable()
export class PickAllocatePriorityService {

    constructor(private httpservice: HttpService) {

    }
    async getLocationPriorities(bUnit, location) {
        return this.httpservice.getSync({
            apiMethod: "/api/AllocatePriority/GetLocationPriorities",
            params: {
                "bUnit": bUnit,
                "location": location
            }

        });
    }

    async saveLocationPriorities(priority, priorities) {
        return this.httpservice.create({
            apiMethod: "/api/AllocatePriority/SaveLocationPriorities",
            formData: priorities,
            params: {
                "priority": priority,

            }

        }).toPromise();
    }
}