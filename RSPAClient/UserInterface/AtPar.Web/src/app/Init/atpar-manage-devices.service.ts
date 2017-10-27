import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';

@Injectable()

export class ManageDevicesService {

    constructor(private httpService: HttpService, public http: Http) { }

    public getDevIDs(userID,deviceSearch) {

        return this.httpService.getSync({
            apiMethod: "/api/ManageDevices/GetDevices",
            params: {
                "userID": userID,
                "deviceSearch": deviceSearch
            }
        });
    }

    public updateDeviceStatus(userID, deviceID, deviceStatus) {

        return this.httpService.update({
            apiMethod: "/api/ManageDevices/UpdateDeviceStatus",
            params: {
                "userID": userID,
                "devID": deviceID,
                "status": deviceStatus

            }
        }).toPromise();
    }

    public saveDevice(userID, devID, desc, macAddr) {
        return this.httpService.create({
            apiMethod: "/api/ManageDevices/SaveDevice",
            params: {
                "userID": userID,
                "devID": devID,
                "desc": desc,
                "macAddr": macAddr

            }
        })
    }

    public updateDevice(userID, devID, desc, oldMacAddr, newMacAddr) {
        return this.httpService.update({
            apiMethod: "/api/ManageDevices/UpdateDevice",
            params: {
                "userID": userID,
                "devID": devID,
                "desc": desc,
                "oldMacAddr": oldMacAddr,
                "newMacAddr": newMacAddr

            }
        }).toPromise();
    }

    public deleteDevice(userID, devID, desc, macAddr) {
        return this.httpService.create({
            apiMethod: "/api/ManageDevices/DeleteDevice",
            params: {
                "userID": userID,
                "devID": devID,
                "desc": desc,
                "macAddr": macAddr

            }
        }).toPromise();
    }
}
