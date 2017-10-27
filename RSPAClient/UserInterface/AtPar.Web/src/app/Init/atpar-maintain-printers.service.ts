
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';



@Injectable()

export class MaintainPrinterServices {

    constructor(private httpService: HttpService) {
    }

    updatePrinterStatus(appID, friendlyName, labelType, status) {
        return this.httpService.update({
            "apiMethod": "/api/MaintainPrinter/UpdatePrinterStatus",
            params: {
                appID: appID,
                friendlyName: friendlyName,
                functionality: labelType,
                status: status
            }

        }).toPromise();
    };

    async getPrinterModels() {
        return await this.httpService.getSync({
            "apiMethod": "/api/MaintainPrinter/GetPrinterModels",
        });
    }
    async getFunctionalities(appID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/MaintainPrinter/GetFunctionalities",
            params: {
                appID: appID,
            }
        });
    }
    async getLinkedFunctionalities(appID, labelType) {
        return await this.httpService.getSync({
            "apiMethod": "/api/MaintainPrinter/GetLinkedFunctionalities",
            params: {
                appID: appID,
                labelType: labelType
            }
        });
    }

    async getModelImage(appID, model, functionality, printerModelType) {
        return await this.httpService.getSync({
            "apiMethod": "/api/MaintainPrinter/GetModelImage",
            params: {
                appID: appID,
                model: model,
                functionality: functionality,
                printerModelType: printerModelType
            }
        });
    }

    async getModels(appID, functionality, printerCode) {
        return await this.httpService.getSync({
            "apiMethod": "/api/MaintainPrinter/GetModels",
            params: {
                appID: appID,
                functionality: functionality,
                printerCode: printerCode
            }
        });
    }
    async savePrinterDetails(lstPrintData) {
        return await this.httpService.create({
            "apiMethod": "/api/MaintainPrinter/SavePrinterDetails",
            formData: lstPrintData,
        }).toPromise();
    }

    async updatePrinterDetails(oldFriendlyName, blnPrinterExists, lstPrintData) {
        return await this.httpService.update({
            "apiMethod": "/api/MaintainPrinter/UpdatePrinterDetails",
            formData: lstPrintData,
            params: {
                oldFriendlyName: oldFriendlyName,
                blnPrinterExists: blnPrinterExists
            }
        }).toPromise();
    }

    async getPrinterData(appID, friendlyName, functionality) {
        return await this.httpService.getSync({
            "apiMethod": "/api/MaintainPrinter/GetPrinterData",
            params: {
                appID: appID,
                functionality: functionality,
                friendlyName: friendlyName
            }
        });
    }

    async uploadSingleFile(formData, header, strLvx, strPnl, getModels, labelWidth,
        labelHeight, appID, printerCode, functionality, userID) {
        return await this.httpService.createUpload({
            "apiMethod": "/api/MaintainPrinter/UploadSingleFile",
            formData: formData,
            params: {
                _strLvx: strLvx,
                _strPnl: strPnl,
                getModels: getModels,
                labelWidth: labelWidth,
                labelHeight: labelHeight,
                appID: appID,
                printerCode: printerCode,
                functionality: functionality,
                userID: userID

            }

        }, header).toPromise();
    }
    async uploadMultipleFiles(formData, header, strLvx, strPnl, getModels, appID, printerCode, functionality, userID) {
        return await this.httpService.createUpload({
            "apiMethod": "/api/MaintainPrinter/UploadMultipleFiles",
            formData: formData,
            params: {
                _strLvx: strLvx,
                _strPnl: strPnl,
                getModels: getModels,
                appID: appID,
                printerCode: printerCode,
                functionality: functionality,
                userID: userID
            }

        }, header).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}