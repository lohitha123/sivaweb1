import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { VM_TKIT_INACTIVE_ITEMS } from '../../app/Entities/VM_TKIT_INACTIVE_ITEMS';
import { TKIT_ITEM_MASTER } from '../../app/Entities/TKIT_ITEM_MASTER';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class TrackITInactiveItemsService{

    constructor(private httpservice: HttpService) {
    }

    getItemsToInActivate(typeIndicator, destDate, deviceTokenEntry) {
        return this.httpservice.get({
            apiMethod: "/api/InactivateItems/GetItemsToInActivate",
            params: {
                "typeIndicator": typeIndicator,
                "destDate": destDate,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(res => <AtParWebApiResponse<VM_TKIT_INACTIVE_ITEMS>>res.json()).catch(this.handleError);
    }
  
    inactivateItems(lstItemMaster , deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/InactivateItems/InactivateItem",
            formData: lstItemMaster,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(res => res.json()).catch(this.handleError);

    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}