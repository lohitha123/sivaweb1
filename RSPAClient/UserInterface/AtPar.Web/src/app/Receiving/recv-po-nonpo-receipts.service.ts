import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum } from '../Shared/AtParEnums';

@Injectable()
export class RecvPoNonPoReceiptsService {

    constructor(private httpService: HttpService) {
    }

    async getReceivePrerequisites() {
        return await this.httpService.getSync({
            "apiMethod": "/api/POorNONPOReceipts/GetReceivePrerequisites",
        });
    }

    async getIUTDetails(lstIUTHeader) {
        return await this.httpService.create({
            "apiMethod": "/api/POorNONPOReceipts/GetIUTDetails",
            formData: lstIUTHeader
        }).toPromise();
    }

    async getHeader(lstPoHeader) {
        return this.httpService.create({
            apiMethod: "/api/POorNONPOReceipts/GetHeader",
            formData: lstPoHeader
        }).toPromise();
    }

    async deleteHeader(lstDeleteHeader) {
        return await this.httpService.create({
            "apiMethod": "/api/POorNONPOReceipts/DeleteHeader",
            formData: lstDeleteHeader
        }).toPromise();
    }

    async sendIUTDetails(dicDataItems) {
        return await this.httpService.update({
            "apiMethod": "/api/POorNONPOReceipts/SendIUTDetails",
            formData: dicDataItems
        }).toPromise();
    }

    async sendDetails(dicSendDataItems) {
        return await this.httpService.update({
            "apiMethod": "/api/POorNONPOReceipts/SendDetails",
            formData: dicSendDataItems
        }).toPromise();
    }

    async printNiceLabel(prntrAddressOrName: string, pntrPort: string, pntrTye: string, niceLblName: string, noOfPrints: string, errMsg: string, lstprintDetails) {
        return await this.httpService.update({
            "apiMethod": "/api/POorNONPOReceipts/PrintNiceLabel",
            formData: lstprintDetails,
            params: {
                "printerAddressOrName": prntrAddressOrName,
                "printerPort": pntrPort,
                "printerTye": pntrTye,
                "niceLabelName": niceLblName,
                "noOfPrints": noOfPrints,
                "errMsg": errMsg
            }
        }).toPromise();
    }

    async printStaionaryReport(dicPrintDetails, noOfCopies) {
        return await this.httpService.update({
            "apiMethod": "/api/POorNONPOReceipts/PrintStaionaryReport",
            formData: dicPrintDetails,
            params: {
                "noOfCopies": noOfCopies
            }
        }).toPromise();
    }

    async searchHeader(lstRecvPOHeader) {
        return await this.httpService.create({
            "apiMethod": "/api/POorNONPOReceipts/SearchHeader",
            formData: lstRecvPOHeader

        }).toPromise();
    }

    async searchIUTHeader(lstIUTHeader) {
        return await this.httpService.create({
            "apiMethod": "/api/POorNONPOReceipts/SearchIUTHeader",
            formData: lstIUTHeader

        }).toPromise();
    }

    //Non Po
    async sendNonPoDetails(lstSendHeader) {
        return await this.httpService.update({
            "apiMethod": "/api/POorNONPOReceipts/SendNonPos",
            formData: lstSendHeader
        }).toPromise();
    }

    async generateTrackingNumber() {
        return await this.httpService.getSync({
            "apiMethod": "/api/POorNONPOReceipts/GenerateTrackingNo",
        })
    }

    async getRecipients(recipient) {
        return await this.httpService.getSync({
            "apiMethod": "/api/POorNONPOReceipts/GetBadgeDetails",
            params: {
                "recpName": recipient
            }
        })
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}