import { Injectable } from '@angular/core'; 
import { Response } from '@angular/http';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class SetupReasonsServices {
    constructor(private httpservice: HttpService) {

    }
    async getCodes(codeType, code, descr) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ReasonCodes/GetCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr
            }
        });
    }

    async addCodes(codeType, userId, code, descr, specCode) {

        return await this.httpservice.create({
            "apiMethod": "/api/ReasonCodes/AddCodes",
            params: {
                "codeType": codeType,
                "userId": userId,
                "code": code,
                "descr": descr,
                "specCode": specCode
            }

        }).toPromise();

    }

    async updateCodes(codeType, code, descr, specCode)
    {
        return await this.httpservice.update({
            "apiMethod": "/api/ReasonCodes/UpdateCodes",
            params: {
                "codeType": codeType,
                "code": code,
                "descr": descr,
                "specCode": specCode
            }
        }).toPromise();
   }

   async deleteCodes(codeType, code, descr)
   {
       return await this.httpservice.create({
           "apiMethod": "/api/ReasonCodes/DeleteCodes",
           params: {
               "codeType": codeType,
               "code": code,
               "descr": descr
           }
       }).toPromise();
  }

}
