
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class ParOptimizationReportService {

    constructor(
        private httpservice: HttpService
    ) { }

    async  getOptimizationReport(bUnit, deptID, cartID, fDate, tDate, orgGrpID, appId) {
        return await this.httpservice.getSync({
            apiMethod: "/api/ParOptimizationReport/GetOptimizationReport",
            params: {
                "bUnit": bUnit,
                "deptID": deptID,
                "cartID": cartID,
                "fDate": fDate,
                "tDate": tDate,
                "orgGrpID": orgGrpID,
                "appId": appId
            }
        });
    }


    async  UpdateParQty(dicDataItems, appId) {
        return await this.httpservice.create({
            apiMethod: "/api/ParOptimizationReport/UpdateParQty",
            formData: dicDataItems,
            params: {
                "appId": appId
            }
        }).toPromise();
    }

    public handleError(error: Response) {
       
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
