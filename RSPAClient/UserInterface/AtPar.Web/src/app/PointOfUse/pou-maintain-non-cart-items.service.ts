import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';



@Injectable()

export class MaintainNonCartItemService {

    constructor(private httpService: HttpService) {
    }

    async getUserDepartments(userID, orgGroupID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ConsignmentItems/GetUserDepartments",
            params: {
                "orgGroupID": orgGroupID,
                "userID": userID,
            }
        });
    }
    async getUserdepartmentsCarts(userID, orgGroupID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ConsignmentItems/GetUserdepartmentsCarts",
            params: {
                "orgGrpID": orgGroupID,
                "userID": userID,
               // "locationType": locationType
            }
        });
    } 

    async getConsignmentItems(businessUnit, cartID, itemID, itemDescription) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ConsignmentItems/GetConsignmentItems",
            params: {
                "businessUnit": businessUnit,
                "cartID": cartID,
                "itemID": itemID,
                "itemDescription": itemDescription
            }
        });
    }

    async addConsignmentItem(lstConsignmentItems) {
        return await this.httpService.create({
            "apiMethod": "/api/ConsignmentItems/AddConsignmentItem",
            formData: lstConsignmentItems,
        }).toPromise();
    }

    async  updateConsignmentItem(lstConsignmentItems) {
        return await this.httpService.create({
            "apiMethod": "/api/ConsignmentItems/UpdateConsignmentItem",
            formData: lstConsignmentItems
        }).toPromise();
    }

    async getPrefListDetails(prefID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ConsignmentItems/GetPrefListDetails",
            params: {
                "prefID": prefID
            }
        });
    }

    async getItemsAdjustQty(bUnit, cartID, itemID, compartment, userID, orgGrpID, systemID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ConsignmentItems/GetItemsAdjustQty",
            params: {
                "bUnit": bUnit,
                "cartID": cartID,
                "itemID": itemID,
                "compartment": compartment,
                "userID": userID,
                "orgGrpID": orgGrpID,
                "systemID": systemID
            }
        });
        
    }
    async updateCartInventory(lstCartInvItemList) {
        return await this.httpService.create({
            "apiMethod": "/api/ConsignmentItems/UpdateCartInventory",
            formData: lstCartInvItemList,
        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}