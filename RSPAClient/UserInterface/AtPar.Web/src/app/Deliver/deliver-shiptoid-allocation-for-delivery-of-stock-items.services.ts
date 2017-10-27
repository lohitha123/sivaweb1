import { Injectable } from '@angular/core';
import { HttpService } from '../Shared/HttpService';
import { MT_DELV_SHIPTO_ID_ALLOCATION } from '../Entities/MT_DELV_SHIPTO_ID_ALLOCATION';

@Injectable()
export class ShipToIdAllocationForDeliveryOfStockItemsServices {
    constructor(private httpservice: HttpService) { }

    public async getOrgGrpShiptoIDs(orgGroupID, serverUserID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/DeliverShiptoIDs/GetOrgGrpShiptoIDs",
            params: {
                "orgGroupID": orgGroupID,
                "serverUserID": serverUserID
            }
        });
    }

    public async allocateShiptoIDs(serverUserID, lstShiptoIDs: Array<MT_DELV_SHIPTO_ID_ALLOCATION>) {
        return await this.httpservice.create({
            apiMethod: "/api/DeliverShiptoIDs/AllocateShiptoIDs",
            formData:lstShiptoIDs,
            params: {
                "serverUserID": serverUserID
            }
        }).toPromise();
    }
}