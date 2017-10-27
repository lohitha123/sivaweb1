/// <reference path="../Entities/MT_ATPAR_SECURITY_PARAMS.ts" />
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import { MT_ATPAR_USER } from '../entities/mt_atpar_user';




@Injectable()

export class AddUserServices {

    constructor(private httpservice: HttpService) {
    }

    async readConfig() {
        return await this.httpservice.getSync({
            "apiMethod": "/api/AddUser/PopulateConfigData",
        })
    };

    async populateUserFields() {
        return await this.httpservice.getSync({
            "apiMethod": "/api/Common/GetSecurityParams",
        });
    };

    async  getLdapUsers(userID, strSearchFilter, entryLimit) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/AddUser/GetLdapUsers",
            params: {
                userID: userID,
                strSearchFilter: strSearchFilter,
                strEntryLimit: entryLimit
            }
        })
    };

    async  getProfiles(userId) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/Common/GetProfiles",
            params: {
                'userID': userId

            }

        });
    };

    async   checkUser(userId) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/AddUser/CheckUser",
            params: { 'userID': userId },
        })
    };

    async  checkProfile(userId, profileID, profileType) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/AddUser/CheckProfileAppACL",
            params: {
                'userID': userId,
                'profileID': profileID,
                'accessType': profileType
            },
        })
    };

    addUser(newUser) {
        return this.httpservice.create({
            "apiMethod": "/api/AddUser/AddUser",
            formData: newUser,
        });

    }

    updateUser(User) {
        return this.httpservice.create({
            "apiMethod": "/api/ManageUsers/UpdateUser",
            formData: User,
        });

    }

    saveLdapUser(lstLdapUser, userID, tokenExpiryPeriod, idleTime, orgGroupID, profileID) {
        if (orgGroupID == null || orgGroupID == undefined) {
            orgGroupID = '';
        }
        if (profileID == null || profileID == undefined) {
            profileID = '';
        }
        return this.httpservice.create({
            "apiMethod": "/api/AddUser/SaveLdapUsers",
            formData: lstLdapUser,
            params: {
                'userID': userID,
                'sessionTime': tokenExpiryPeriod,
                'idleTime': idleTime,
                'orgGrpId': orgGroupID,
                'profileID': profileID
            },
        });

    }

    async  refreshUserDN(userId, firstName, lastName) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ManageUsers/RefreshUserDN",
            params: {
                'user': userId,
                'userFname': firstName,
                'userLname': lastName
            },
        })
    };

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}