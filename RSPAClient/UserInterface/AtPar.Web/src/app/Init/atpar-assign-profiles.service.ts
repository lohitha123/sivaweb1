import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_ORG_GROUPS } from '../Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_PROFILE } from '../Entities/MT_ATPAR_PROFILE';
import { VM_MT_ATPAR_PROF_USER } from '../Entities/VM_MT_ATPAR_PROF_USER';
import { MT_ATPAR_USER } from '../Entities/MT_ATPAR_USER';
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';


@Injectable()
export class AssignProfilesService {

    constructor(private httpservice: HttpService) { }
    private headers = new Headers({ 'Content-Type': 'application/json' }); 

    GetOrgGroupIds(userId,orgGrpId,name){
        
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetOrgGrpIDs",
            params: {
                "userId": userId,
                "orgGrpId": orgGrpId,
                "name": name
            }
        });
    }

     GetProfileIds(userID){
         return this.httpservice.getSync({
             "apiMethod": "/api/Common/GetProfiles",
             params: {
                 "userID": userID
             }
         });
    }

    GetProfileUserInfo(userId,uId,lDap,fName,lOrg,profileId,orgGrpId){
        return this.httpservice.getSync({
            "apiMethod": "/api/AssignProfile/GetProfileUsersInfo",
            params: {
                "userID": userId,
                "uID": uId,
                "lDap": lDap,
                "fName": fName,
                "lOrg": lOrg,
                "profileID": profileId,
                "orgGrpID": orgGrpId
            }
        });
    }

    SaveProfileUsersInfo(lstProfUserInfo,profile,orgGrp,uId){
        return this.httpservice.create({
            "apiMethod": "/api/AssignProfile/SaveProfileUsersInfo",
            formData : lstProfUserInfo,
            params:{               
                "profile" : profile,
                "orgGrp" : orgGrp,
                "uId": uId
            }
        }).toPromise();//.map(res => res.json()).catch(this.handleError)
        
    }
    GetSecurityParamVal(userId){
        return this.httpservice.getSync({
            "apiMethod": "/api/AssignProfile/GetSecurityParamVal",
            params:{
                "userId":userId
            }
        })//.map(res => res.json()).catch(this.handleError)
          
    }
    GetServerAccessCnt(userId,profileId){
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetServerAccessCnt",
            params:{
                "userId":userId,
                "profileId":profileId
            }
        })//.map(res => res.json()).catch(this.handleError)
          
    }
    GetClientAccessCnt(userId,profileId){
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetClientAccessCnt",
            params:{
                "userId":userId,
                "profileId":profileId
            }
        })//.map(res => res.json()).catch(this.handleError)
          
    }
    GetAuditAllowed(userId,appId,menuCode){
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetAuditAllowed",
            params:{
                "userId": userId,
                "appId":appId,
                "menuCode":menuCode
            }
        })//.map(res => res.json()).catch(this.handleError)
          
    }
     InsertAuditData(audit,pStrUser,pStrFunction){
        return this.httpservice.create({
            "apiMethod": "/api/Common/InsertAuditData",
             formData : audit,
            params:{
                "pStrUser": pStrUser,
                "pStrFunction":pStrFunction
            }
        }).map(res => res.json()).catch(this.handleError)
          
    }
   
   public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}