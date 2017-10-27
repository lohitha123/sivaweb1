import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { VM_MT_POU_USER_DEPARTMENTS } from '../../app/Entities/VM_MT_POU_USER_DEPARTMENTS';
import { VM_MT_POU_ITEM_ATTRIBUTES } from '../../app/Entities/VM_MT_POU_ITEM_ATTRIBUTES';
import { VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT } from '../../app/Entities/VM_MT_POU_ITEM_ATTRIBUTES_OUTPUT';

@Injectable()
export class POUSetupItemAttributeService {

    constructor(private httpservice: HttpService) {

    }

  async  getUserDepartments(userID, orgGrpID)
    {
      return this.httpservice.getSync({
          apiMethod: "/api/Common/GetUserDepartments",
          params: {
              "userID": userID,
              "orgGrpID": orgGrpID

          }

      });
    }
  

    async GetItemAttributesDetails(deptID, bUnit, display, cartID, locationType, appID, itemID) {
        return this.httpservice.getSync({
            apiMethod: "/api/SetupItemAttributes/GetItemAttributesDetails",
            params: {
                "deptID": deptID,
                "bUnit": bUnit,
                "display": display,
                "cartID": cartID,
                "locationType": locationType,
                "appID": appID,
                "itemID": itemID,                
            }

        });
    }


    saveDeptItemAttributes(lstItemAtributes, deptID, bUnit, locationType, itemID) {
        return this.httpservice.create({
            apiMethod: "/api/SetupItemAttributes/SaveDeptItemAttributes",
            formData: lstItemAtributes,
            params: {
               
                
                "deptID": deptID,
                "bUnit": bUnit,
                "locationType": locationType,
                "itemID": itemID                              
            }

        }).map(res => <AtParWebApiResponse<VM_MT_POU_ITEM_ATTRIBUTES>>res.json()).catch(this.handleError);
    }



    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}