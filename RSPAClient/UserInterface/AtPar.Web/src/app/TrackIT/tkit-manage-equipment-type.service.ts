import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';

@Injectable()

export class ManageEqTypeService {

    constructor(private httpService: HttpService, public http: Http) { }

    public updateEqTypeData(itemType) {

        return this.httpService.create({
            apiMethod: "/api/ManageEquipmentType/UpdateEqTypeData",
            formData: itemType
        }).toPromise();
    }

    public saveEqTypeData(itemType) {
        return this.httpService.create({
            apiMethod: "/api/ManageEquipmentType/SaveEqTypeData",
            formData: itemType
        }).toPromise();
    }

    public getEquipmentTypes(itemIndicator, orgGrpId, searchEqTypeOrDesc) {

        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetEquipmentTypes",
            params: {
                "itemIndicator": itemIndicator,
                "orgGrpId": orgGrpId,
                "searchEqTypeOrDesc": searchEqTypeOrDesc
            }
        });
    }

    public getEqIndicators() {

        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetEqIndicators"            
        });
    }


}
