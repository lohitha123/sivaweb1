import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class SetupSpecialtyServices {
    constructor(private httpService: HttpService){}

    async getSpecialtyCodes(codeType, code, descr) {

        return await this.httpService.getSync({
            "apiMethod": "/api/SpecialtyCodes/GetSpecialtyCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr
            }
        });
    }

    async getProcedureCodes(codeType, code, descr) {
        return await this.httpService.getSync({
            "apiMethod": "/api/SpecialtyCodes/GetProcedureCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr
            }
        });
    }
    async addCodes(codeType, userId, code, descr, specCode) {
        return await this.httpService.create({
            "apiMethod": "/api/SpecialtyCodes/AddCodes",
            params: {
                "codeType": codeType,
                "userId": userId,
                "code": code,
                "descr": descr,
                "specCode": specCode
            }
        }).toPromise();
    }

    async updateCodes(codeType, code, descr, specCode) {
        return await this.httpService.update({
            "apiMethod": "/api/SpecialtyCodes/UpdateCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr,
                "specCode": specCode
            }
        }).toPromise();
    }

    async deleteCodes(codeType, code, descr) {
        return await this.httpService.create({
            "apiMethod": "/api/SpecialtyCodes/DeleteCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr,
            }
        }).toPromise();
    }   

}
