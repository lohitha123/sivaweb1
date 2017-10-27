import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { Http, Response, Headers } from '@angular/http';
import { MT_RECV_SHIPTO_ID_ALLOCATION } from '../../app/Entities/MT_RECV_SHIPTO_ID_ALLOCATION';
import { VM_RECV_SETUPSHIPTO_ID_ALLOCATION } from '../entities/VM_RECV_SETUPSHIPTO_ID_ALLOCATION';

@Injectable()
export class SetupShipToIDsServices {

    constructor(private httpservice: HttpService) {
    }

    async getShipToIDs(setID, shipToID, shipToName, status, bArray, serverUserID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/ShipToIDs/GetShipToIDs",
            params: {
                "userID": serverUserID,
                "setID": setID,
                "shipToID": shipToID,
                "shipToName": shipToName,
                "status": status,
                "bArray": bArray,
                "serverUserID": serverUserID              
            }
        });

    }

    async updateShipToIDStatus(userID, orgID, shipToID, status) {
        return this.httpservice.update({
            apiMethod: "/api/ShipToIDs/UpdateShiptoIDStatus",
            params: {
                "userID": userID,
                "orgID": orgID,
                "shipToID": shipToID,
                "status": status               
            }
        }).toPromise();

    }

    async insertShipToIDs(userID, lstShiptoids) {
        return await this.httpservice.create({
            apiMethod: "/api/ShipToIDs/InsertShiptoIDs",
            formData: lstShiptoids,
            params: {
                "userID": userID              
            },
        }).toPromise();
    }

    async updateShiptoIDs(userID, lstShiptoids: Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>, NewOrgId) {
        return await this.httpservice.update({
            apiMethod: "/api/ShipToIDs/UpdateShiptoIDs",
            formData: lstShiptoids,
            params: {
                "userID": userID,
                "NewOrgId": NewOrgId             
            }
        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}

