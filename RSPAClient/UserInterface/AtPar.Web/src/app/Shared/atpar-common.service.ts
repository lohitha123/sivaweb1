import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_ORG_GROUP_PARAMETERS } from '../entities/mt_atpar_org_group_parameters';

@Injectable()
export class AtParCommonService {

    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;
    }

    async getOrgGrpIDs(orgGroupId, orgGroupName, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgGrpIDs",
            params: {
                "userID": deviceTokenEntry[TokenEntry_Enum.UserID],
                "orgGrpID": orgGroupId,
                "name": orgGroupName
            }
        });
    }

    async getOrgGroupIDS() {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgGroupIDS",
            params: {
            }
        });
    }

    async getOrgBusinessUnits(orgGroupID: string, bUnitType: any) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgBusinessUnits",
            params: {
                "orgGrpId": orgGroupID,
                "businessUnitType": bUnitType
            }
        });
    }

    async getAuditAllowed(appId, menuCode) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetAuditAllowed",
            params: {
                "appId": appId,
                "menuCode": menuCode
            }
        });
    }

    async doAuditData(userId, appId, strMenuCode, lstConfigData) {

        return this.httpService.create({
            apiMethod: "/api/Common/DoAuditData",
            formData: lstConfigData,
            params: {
                "userID": userId,
                "appId": appId,
                "strFunctionName": strMenuCode
            }
        }).toPromise();
    }

    async saveImage(Image, Imagename) {
        let bodyTextDic = { "bodyText": Image };
        return this.httpService.create({
            apiMethod: "/api/Common/SaveImage",
            formData: bodyTextDic,
            params: {
                "ImgName": Imagename
            }
        }).toPromise();

    }

    async getMyPreferences(preference, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetMyPreferences",            
            params: {
                "preference": preference,//"RECORDS_PER_PAGE"
                "uId": deviceTokenEntry[TokenEntry_Enum.UserID]
            }
        });
    }

    async getOrgBUnits(orgGroupId, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgBUnits",
            params: {
                "userID": deviceTokenEntry[TokenEntry_Enum.UserID],
                "orgGrpID": orgGroupId
            }
        });
    }

    async insertAuditData(auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>, userId, pStrFunction) {
        return await this.httpService.create({
            "apiMethod": "/api/Common/InsertAuditData",

            formData: auditSecurityLst,

            params: {
                "pStrUser": userId,
                "pStrFunction": pStrFunction

            }

        }).toPromise();
    }

    async getApps(userId) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetApps",
            params: {
                "userID": userId
            }
        });
    }

    async getAppParameters(userId, orgGroupId, appID) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetAppParameters",
            params: {
                "userID": userId,
                "orgGrpID": orgGroupId,
                "appID": appID
            }
        });
    }

    async getCheckRecall() {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/CheckRecall",
        });
    }

    async saveAppParameters(lstAppParams: Array<MT_ATPAR_ORG_GROUP_PARAMETERS>, orgGrpId, appId, userId) {
        return await this.httpService.create({
            "apiMethod": "/api/Common/SaveAppParameters",

            formData: lstAppParams,

            params: {
                "orgGrpID": orgGrpId,
                "appID": appId,
                "user": userId
            }

        }).toPromise();

    }

    async getUsersList(userId, appId, orgGrpId) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetUsersList",
            params: {
                "userID": userId,
                "appID": appId,
                "orgGrpID": orgGrpId

            }
        });
    }

    async getUserOrgGroups(userId, orgGrpId) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetUserOrgGroups",
            params: {
                "user": userId,
                "orgGrpID": orgGrpId

            }
        });

    }

    async getEnterpriseSystem() {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetEnterpriseSystem"

        });
    }

    async getPrintersData(appID, printerName) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetPrintersData",
            params: {
                "appID": appID,
                "printerName": printerName

            }
        })
    }

    async getProfileParamValue(profileID, appID, parameterID) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetProfileParamValue",
            params: {
                "profileID": profileID,
                "appID": appID,
                "parameterID": parameterID
            }
        })
    }

    async getOrgGroupBUnits(userId, orgGrpId, bUnitType: any) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgGroupBUnits",
            params: {
                "userId": userId,
                "orgGrpId": orgGrpId,
                "businessUnitType": bUnitType
            }
        })
    }

    async getOrgGroupParamValue(orgParamName, appID, orgGroupID) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgGroupParamValue",
            params: {
                "orgParamName": orgParamName,
                "appID": appID,
                "orgGroupID": orgGroupID
            }
        });
    }
    async GetOrderHeaders(fromDate, toDate, CompID, locID, deptID, vendorID, ordStatus, strReqNo, strItemID, orgGrpID, appid) {
        return await this.httpService.getSync({
            apiMethod: "/api/ManageOrders/GetOrderHeaders",
            params: {
                "fromDate": fromDate,
                "toDate": toDate,
                "compID": CompID,
                "locID": locID,
                "deptID": deptID,
                "vendorID": vendorID,
                "ordStatus": ordStatus,
                "reqNo": strReqNo,
                "itemID": strItemID,
                "orgGrpID": orgGrpID,
                "appID": appid,
                // "deviceTokenEntry": deviceTokenEntry,


            }

        })
    }

    async GetOrders(fromDate, toDate, CompID, locID, deptID, vendorID, ordStatus, strReqNo, orgGrpID) {
        return await this.httpService.getSync({
            apiMethod: "/api/ManageOrdersCartCount/GetOrders",
            params: {
                "fromDate": fromDate,
                "toDate": toDate,
                "compID": CompID,
                "locID": locID,
                "deptID": deptID,
                "vendorID": vendorID,
                "ordStatus": ordStatus,
                "reqNo": strReqNo,
                "orgGroupID": orgGrpID
            }

        })
    }

    async GetOrderDetails(CompID, ordStatus) {
        return await this.httpService.getSync({
            apiMethod: "/api/ManageOrdersCartCount/GetOrderDetails",
            params: {
                "orderID": CompID,
                "orderStatus": ordStatus,
            }

        })
    }

    async UpdateManageOrderDetails(lstPouOrderDetails) {
        return await this.httpService.create({
            apiMethod: "/api/ManageOrdersCartCount/UpdateOrderDetails",
            formData: lstPouOrderDetails,
            params: {
              
            }
        }).toPromise();
    }

    async GetProfileParamValue(profileID, appID, parameterID) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetProfileParamValue",
            params: {
                "profileID": profileID,
                "appID": appID,
                "parameterID": parameterID,
                // "deviceTokenEntry": deviceTokenEntry,


            }

        })
    }

    async GetMyPreferences(preference, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetMyPreferences",
            params: {
                "preference": preference,
                "uId": userID,
                //"deviceTokenEntry": deviceTokenEntry,


            }

        })
    }


    async GetOrderDetails_ManageOrders(CompID, ordStatus, parID, deptID, orgID, ItemId, appid) {
        return await this.httpService.getSync({
            apiMethod: "/api/ManageOrders/GetOrderDetails_ManageOrders",
            params: {

                "ordNo": CompID,
                "ordStatus": ordStatus,
                "cartID": parID,
                "bUnit": deptID,
                "itemID": ItemId,
                "orgGrpID": orgID,
                "appID": appid,
                // "deviceTokenEntry": deviceTokenEntry,


            }

        })
    }



    async UpdateOrderDetails(lstPouOrderDetails) {
        return await this.httpService.update({
            apiMethod: "/api/Common/UpdateOrderDetails",
            formData: lstPouOrderDetails,
            params: {
                //"lstOrderDetails": lstPouOrderDetails,
                // "deviceTokenEntry": deviceTokenEntry,
            }
        }).toPromise();
    }

   


    async getOrgGrpName(OrgGrpId) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetOrgGroupName",
            params: {
                "orgGrpID": OrgGrpId

            }
        })
    }

    async getBusinessUnits(userId: string, bUnitType: string) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetBusinessUnits",
            params: {
                "userID": userId,
                "busineesUnitType": bUnitType
            }
        });
    }

    async getLocations(orgGrpID, status, locID, locName) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetLocations",
            params: {
                "orgGrpID": orgGrpID,
                "status": status,
                "locID": locID,
                "locName": locName

            }

        })
    }

    UpdateLocIDStatus(orgGrpID, status, locID) {
        return this.httpService.update({
            apiMethod: "/api/Common/UpdateLocIDStatus",
            params: {
                "orgGrpID": orgGrpID,
                "status": status,
                "locID": locID
            }

        }).map(res => <number>res.json()).catch(this.handleError);
    }

    async getOrgIds(userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetOrgIds",
            params: {
                "userId": userID

            }

        })
    }
    async getLocByOrgId(orgID) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetLocByOrgId",
            params: {
                "orgID": orgID

            }

        })
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    async getSSLConfigDetails() {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetSSLConfigDetails",
            params: {
            }
        });
    }


    async getServerIP() {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetServerIP",
            params: {
            }
        });
    }

    async getItems(ItemID, OrgId, AppID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetItems",
            params: {
                ItemID: ItemID,
                OrgId: OrgId,
                AppID: AppID
            }
        });
    }

    async getOrgDetails(userID: string) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgDetails",
            params: {
                "userID": userID
            }
        });
    }

    async getCostCenterOrgIds(userID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetCostCenterOrgIds",
            params: {
                userID: userID
            }
        });
    }

    async getUserDepartments(userID, orgGrpID, deviceTokenEntry) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetUserDepartments",
            params: {
                userID: userID,
                orgGrpID: orgGrpID,
                deviceTokenEntry: deviceTokenEntry
            }
        });
    }

    async getPhysiciansByPrefOrProc(flag: number) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetPhysiciansByPrefOrProc",
            params: {
                flag: flag
            }
        })
    } 

    async getBUnits(serverUserID, bUnits, appId, selectedUserID, bUnit, descr) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetBUnits",
            params: {
                bArray: bUnits,
                appId: appId,
                userID: selectedUserID,
                bUnit: bUnit,
                description: descr,
                serverUserID: serverUserID
            }
        });
    }

    async  getBUs(userID, bArray, appID, selectedUserID, bUnit, descr) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetBUs",
            params: {
                userID: userID,
                bArray: bArray,
                appID: appID,
                selectedUserID: selectedUserID,
                bUnit: bUnit,
                descr: descr,

            }
        });

    }

    allocateBUnits(appID, selectedUserID, serverUserID, lstBUnitsAllocation, blnSearched) {
        return this.httpService.create({
            apiMethod: "/api/Common/AllocateBUnits",
            formData: lstBUnitsAllocation,
            params: {
                "appId": appID,
                "userId": selectedUserID,
                "serverUserId": serverUserID,
                "searched": blnSearched
            }

        }).toPromise();
    }

    async  getNiceLabelsPrintersData(appID, status, printerType) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetNiceLabelsPrintersData",
            params: {
                appID: appID,
                status: status,
                printerType: printerType
            }
        });
    }

    async getCarriersData() {
        return await this.httpService.getSync({
            "apiMethod": "/api/CarrierInformation/GetCarriersData",
        });
    }

    async  getPhysicians() {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetPhysicians",
            params: {

            }
        });

    }

    async  getCodes(codeType, code, descr) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetCodes",
            params: {
                codeType: codeType,
                code: code,
                descr: descr
            }
        });
    } 

    async sendEmbeddedEmail(systemID, subject, bodyText, toAddress, imageName, deliverSign, mailPriority, attachment) {
        bodyText = await bodyText.replace(/&nbsp;/g, "");
        let bodyTextDic = { "bodyText": bodyText };
        return await this.httpService.create({
            "apiMethod": "/api/Common/SendEmbeddedEmail",
            formData: bodyTextDic,
            params: {
                "systemID": systemID,
                "subject": subject,
                "toAddress": toAddress,
                "imageName": imageName,
                "deliverSign": deliverSign,
                "mailPriority": mailPriority,
                "attachment": attachment
            }
        }).toPromise();

    }
    async sendEmail(systemID, subject, bodyText, toAddress, mailPriority, attachment) {
       bodyText = await bodyText.replace(/&nbsp;/g, "");
            let bodyTextDic = { "bodyText": bodyText };
            return await this.httpService.create({
                "apiMethod": "/api/Common/SendEmail",
                formData: bodyTextDic,
                params: {
                    "systemID": systemID,
                    "subject": subject,
                    "toAddress": toAddress,
                    "mailPriority": mailPriority,
                    "attachment": attachment
                }
            }).toPromise();
      
    }

    async exportToExcel(html, screenName, excelName) {
        html = await html.replace(/&nbsp;/g, "%%%");
        let dicData: any = { "html": html };
        return await this.httpService.create({
            apiMethod: "/api/Common/ExportToExcel",
            formData: dicData,
            params: {
                "screenName": screenName,
                "excelName": excelName
            }
        }).toPromise();
    }

    async deleteExcel(folderName, excelName) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/DeleteExcel",
            params: {
                "folderName": folderName,
                "excelName": excelName
            }
        });
    }

    public async getEventIds(bUnit, userID) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetEventIds",
            params: {
                "bUnit": bUnit,
                "userID": userID
            }
        });
    }

    async getDepartment(departmentID, deptDescr, orgGrpID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetDepartment",
            params: {
                departmentID: departmentID,
                deptDescr: deptDescr,
                orgGrpID: orgGrpID
            }
        });
    }
    async getUserFullName(userID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetUserFullName",
            params: {
                userID: userID               
            }
        });
    }

    async getHeirarchyUsersList(appID, userID, orgGroupID) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetHeirarchyUsersList",
            params: {
                appID: appID,
                userID: userID,
                orgGrpID: orgGroupID
            }
        })
    }
    
}