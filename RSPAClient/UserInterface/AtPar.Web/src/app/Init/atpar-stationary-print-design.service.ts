import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';

@Injectable()


export class PrintScreenService {
    _deviceTokenEntry: string[] = [];
    constructor(private httpservice: HttpService) {
        this._deviceTokenEntry = JSON.parse(sessionStorage.getItem("DeviceTokenEntry"));
    }
    private headers = new Headers({ 'Content-Type': 'application/json' });


    getDynamicReport(appID, ObjectID, deviceToken, printerType) {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetDynamicReport",
            params: {
                "appId": appID,
                "objectId": ObjectID
                
            }
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    }


    getDynamicFonts() {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetFonts",
            params: {
              
            }
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    }

    getDynamicPrintProducts(userId) {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetDynamicPrintProducts",
            params: {
                "userId": userId
               
            }
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    }

    getDynamicPrintReportTypes(appId) {
        return this.httpservice.getSync({
            apiMethod: "/api/StationaryPrintDesign/GetDynamicPrintReportTypes",
            params: {
                "appId": appId
                
                
            }
        });
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    }

    

    saveDynamicPrintReport(appId, objectId, printType, objectDesc, lstReportDtls) {
        return this.httpservice.create({
            apiMethod: "/api/StationaryPrintDesign/SaveDynamicPrintReport",
            formData: lstReportDtls,          
            params: {
                "appId": appId,
                "objectId": objectId,
                "printType": printType,
                "objectDesc": objectDesc
                
               
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);;
        //.catch(this.httpservice.handleError).map((res: Response) => res.json());
    }

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}