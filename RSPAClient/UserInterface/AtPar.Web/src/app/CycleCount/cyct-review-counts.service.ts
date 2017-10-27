import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { VM_REVIEW_COUNTS_EVENT_DATA } from '../entities/vm_review_counts_event_data';

@Injectable()
export class ReviewCountsService {
    constructor(private httpService: HttpService) {

    }

    public async getReCountUsersList(appId, orgGrpID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/GetReCountUsersList",
            params: {
                "appID": appId,
                "orgGrpID": orgGrpID
            }
        });
    }

    async UpdateReviewCountEvent(reviewedUser, bUnit, eventID, lstEventDetails: Array<VM_REVIEW_COUNTS_EVENT_DATA>, userID, recntUsers) {
        return await this.httpService.create({
            apiMethod: "/api/ReviewCounts/UpdateReviewCountEvent",
            formData: lstEventDetails,
            params: {
                "reviewedUser": reviewedUser,
                "bUnit": bUnit,
                "eventID": eventID,
                "userID": userID,
                "reCntUser": recntUsers
            }
        }).toPromise();
    }

    public  getReviewCountsEventIds(bUnit, userID) {
        return  this.httpService.get({
            apiMethod: "/api/ReviewCounts/GetReviewCountsEventIds",
            params: {
                "bUnit": bUnit,
                "userID": userID
            }
        });
    }  

    public async CheckIfEventHasMultipleTransactions(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/CheckIfEventHasMultipleTransactions",
            params: {
                "eventId": eventID,
                "bunit": bUnit,
                "userID": userID,
            }
        });
    }

    public async getReviewCountEventDetails(bUnit, eventID, userID, recntUserId) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/GetReviewCountEventDetails",
            params: {
                "bUnit": bUnit,
                "eventID": eventID,
                "userID": userID,
                "recntuserID": recntUserId,
            }
        });
    }

    public async getUser_Date(bUnit, eventID, userID, ) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/GetUser_Date",
            params: {
                "bUnit": bUnit,
                "eventID": eventID,
                "userID": userID
            }
        });
    }

    public async updateStatusForTransaction(status, transID, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/UpdateStatusForTransaction",
            params: {
                "userID": userID
            }
        });
    }

    public async CheckIfAllEventsDownloaded(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/CheckIfAllEventsDownloaded",
            params: {
                "eventID": eventID,
                "bUnit": bUnit,
                "userID": userID
            }
        });
    }

    public async CheckIfAllEventsCounted(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/CheckIfAllEventsCounted",
            params: {
                "eventID": eventID,
                "bUnit": bUnit,
                "userID": userID
            }
        });
    }

    public async CheckIfStatusUpdatedForCountedEvent(eventID, bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/CheckIfStatusUpdatedForCountedEvent",
            params: {
                "eventID": eventID,
                "bUnit": bUnit,
                "userID": userID
            }
        });
    }

    public async CheckIfSplitEvntIsPartEvnt(bUnit,eventID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/CheckIfSplitEvntIsPartEvnt",
            params: {
                "bUnit": bUnit,
                "eventID": eventID
            }
        });
    }

    public async CheckStatusOfEvents(userID, bUnit, eventID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ReviewCounts/CheckStatusOfEvents",
            params: {
                "userID": userID,
                "bUnit": bUnit,
                "eventID": eventID
            }
        });
    }

    public async SendRevCntEvntsToERP(loginUser, reviewedUser, bUnit, eventID, lstEventDetails: Array<VM_REVIEW_COUNTS_EVENT_DATA>, profileID, orgGroupID) {
        return await this.httpService.create({
            apiMethod: "/api/ReviewCounts/SendRevCntEvntsToERP",
            formData: lstEventDetails,
            params: {
                "loginUser": loginUser,
                "reviewedUser": reviewedUser,
                "bUnit": bUnit,
                "eventID": eventID,
                "profileID": profileID,
                "orgGroupID": orgGroupID
            }
        }).toPromise();
    }
}
