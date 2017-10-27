import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { VM_UPDATE_REVIEWER_DATA } from '../entities/VM_UPDATE_REVIEWER_DATA';

@Injectable()
export class ProcessCountsService {
    constructor(private httpService: HttpService) {

    }

    public async getEventDetails(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/GetEventDetails",
            params: {
                "eventID": eventID,
                "bUnit": bUnit,
                "userID": userID,
            }
        });
    }  

    public async CheckIfEventIsParentEvent(bUnit, eventID, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/CheckIfEventIsParentEvent",
            params: {
                "bUnit": bUnit,
                "eventID": eventID,
                "userID": userID,
            }
        });
    }

    public async updateReviewer(userID, lstUpdateReviewerData: Array<VM_UPDATE_REVIEWER_DATA>, eventID, bUnit) {
        return await this.httpService.create({
            apiMethod: "/api/ProcessCounts/UpdateReviewer",
            formData: lstUpdateReviewerData,
            params: {
                "updateUser": userID,
                "eventID": eventID,
                "bUnit": bUnit,
            }
        }).toPromise();
    }

    public async updateHdrDetails(userID, bUnit, eventID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/UpdateHdrDetails",
            params: {
                "updateUser": userID,
                "bUnit": bUnit,
                "eventID": eventID
            }
        });
    }

    public async updateStatusForTransaction(status, transID, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/UpdateStatusForTransaction",
            params: {
                "status": status,
                "transID": transID,
                "userID": userID
            }
        });
    }

    public async CheckIfAllEventsDownloaded(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/CheckIfAllEventsDownloaded",
            params: {
                "eventID": eventID,
                "bUnit": bUnit,
                "userID": userID
            }
        });

    }

    public async CheckIfAllEventsCounted(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/CheckIfAllEventsCounted",
            params: {
                "eventID": eventID,
                "bUnit": bUnit,
                "userID": userID
            }
        });
    }

    public async CheckIfStatusUpdatedForCountedEvent(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/CheckIfStatusUpdatedForCountedEvent",
            params: {
                "eventID": eventID,
                "bUnit": bUnit,
                "userID": userID
            }
        });
    }

    public async CheckStatusOfEvents(userID, bUnit, eventID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/CheckStatusOfEvents",
            params: {
                "userID": userID,
                "bUnit": bUnit,
                "eventID": eventID


            }
        });
    }

    public async SendEvent(bUnit, eventID, userID, profileID, orderHistory) {
        return await this.httpService.getSync({
            apiMethod: "/api/ProcessCounts/SendEvent",
            params: {

                "bUnit": bUnit,
                "eventID": eventID,
                "userID": userID,
                "profileID": profileID,
                "storeDetailHistory": orderHistory
            }
        });
    }
}
