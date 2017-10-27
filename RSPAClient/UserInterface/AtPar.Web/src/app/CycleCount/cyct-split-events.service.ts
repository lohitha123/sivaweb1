import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';

import { MT_STIS_DISTRIB_TYPE } from '../Entities/MT_STIS_DISTRIB_TYPE';

@Injectable()

export class SplitEventsService {
    constructor(private httpService: HttpService) {

    }
    public async checkForSplit(selectedEvent, selectedBUnit, blnCheckSplit,
        userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/SplitEvents/CheckForSplit",
            params: {
                "eventID": selectedEvent,
                "bUnit": selectedBUnit,
                "checkSplit": blnCheckSplit,
                "userID": userID,
            }
        });
    }

    public async GetEventsList(bUnit) {

        return await this.httpService.getSync({
            apiMethod: "/api/SplitEvents/GetEventsList",
            params: {
                "bUnit": bUnit,
            }
        });
    }

    public async SplitEvent(selectedBUnit, selectedEvent, noOfSubEvents,
        userID, profileID, orgGroupID, selectedSortValue, fromLoc, toLoc) {
        return await this.httpService.getSync({
            apiMethod: "/api/SplitEvents/SplitEvents",
            params: {
                "bUnit": selectedBUnit,
                "eventID": selectedEvent,
                "noOfSubEvents": noOfSubEvents,
                "userID": userID,
                "profileID": profileID,
                "orgGroupID": orgGroupID,
                "orderBy": selectedSortValue,
                "fromLoc": fromLoc,
                "toLoc": toLoc,
            }
        });
    }
}