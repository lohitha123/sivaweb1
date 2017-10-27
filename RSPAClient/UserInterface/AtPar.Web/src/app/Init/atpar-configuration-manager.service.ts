import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_CONFIGURATION_SECTION_DTLS } from '../Entities/MT_ATPAR_CONFIGURATION_SECTION_DTLS';


@Injectable()
export class ConfigurationManagerService {

    configDetails: MT_ATPAR_CONFIGURATION_SECTION_DTLS[];
    name: string = "AtPar";
    urlString: string = "";
    constructor(public http: Http, private httpService: HttpService, ) {

    }

    async  getConfigDetails(systemId) {
        return await this.httpService.getSync({
            "apiMethod": "/api/ConfigurationManager/GetConfigurationDetails",
            params: {
                "pSystemId": systemId,
            }
        })


    }
    SaveSSLConfigDetails(protocol, serverNameValue, portNoValue) {
        return this.httpService.create({
            "apiMethod": "/api/ConfigurationManager/SaveSSLConfigDetails",
            params: {
                "pStrProtocalValue": protocol,
                "pStrServerNameValue": serverNameValue,
                "pStrPortNoValue": portNoValue
            }
        }).toPromise();


    }
    GetSSLConfigDetails() {
        return this.httpService.get({
            "apiMethod": "/api/ConfigurationManager/GetSSLConfigDetails"
        })
    }
    updateConfigDetails(systemId, userId, configdata: MT_ATPAR_CONFIGURATION_SECTION_DTLS[]) {
        return this.httpService.update({
            apiMethod: "/api/ConfigurationManager/SaveConfigurationDetails",
            formData: configdata,
            params: {
                "systemId": systemId,
                "userId": userId
            }
        }).toPromise();


    }

  async  UpdateReportsConnection(body, options)
  {   
      this.urlString = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingApi/api/connection";
      return await this.http.post( this.urlString, body, options)
                  .toPromise();
    }


  async  UpdateEmailSettings(body, options) {
      this.urlString = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingApi/api/systemSetting/email";
      return await this.http.post(this.urlString, body, options)
          .toPromise();
  }

  async  UpdateQuerySource() {
      return this.httpService.update({
          "apiMethod": "/api/ConfigurationManager/UpdateQuerySource",
      }).toPromise();
  }

  public UpdateLogConfigDetails(userId, confXml) {
        return this.httpService.update({
            apiMethod: "/api/ConfigurationManager/SetEntrpServiceConfDtls",
            params: {
                "userID": userId,
                "confXml": confXml
            }
        }).toPromise();
    }
    public GetAuditAllowed(appId, strMenuCode) {

        return this.httpService.get({
            apiMethod: "/api/Common/GetAuditAllowed",
            params: {
                "appId": appId,
                "menuCode": strMenuCode
              
            }
        });
    }

    public DoAuditData(userId, appId, strMenuCode, lstConfigData) {

        return this.httpService.create({
            apiMethod: "/api/Common/DoAuditData",
            formData: lstConfigData,
            params: {
                "userID": userId,
                "appId": appId,
                "strFunctionName": strMenuCode
            }
        });
    }


    public async GetEntrpServiceConffile(userId, boolRequestType) {
        return await this.httpService.getSync({
            apiMethod: "/api/ConfigurationManager/GetEntrpServiceConffile",

            params: {
                "userID": userId,
                "boolRequestType": boolRequestType
            }
        });
    }


    public async getOracleConnection(server, userId, pwd) {
        return await this.httpService.getSync({
            apiMethod: "/api/ConfigurationManager/GetOracleConnection",
            params: {
                "server": server,
                "userId": userId,
                "pwd": pwd
            }
        });

    }

    public async getSqlServerConnection(server, userId, pwd, dataSource) {

        return await this.httpService.getSync({
            apiMethod: "/api/ConfigurationManager/GetSqlServerConnection",
            params: {
                "server": server,
                "userId": userId,
                "pwd": pwd,
                "dataSource": dataSource
            }
        });


    }

    getConfigTabNames() {

        return this.http.get("/api/ConfigurationManager/GetTabNames")
            .map(res => <MT_ATPAR_CONFIGURATION_SECTION_DTLS[]>res.json()).catch(this.handleError);
        //http://localhost:8001/api/ConfigurationManager/GetTabNames
    }
    public async TestLDAPConnection(ldapConnectString, userName, password, authType, entryLimit, resultsFields, searchFilterValue, searchScope, strserverName, strProtocol) {

        return await this.httpService.getSync({
            apiMethod: "/api/ConfigurationManager/TestLDAPConnection",
            params: {
                "ldapConnectString": ldapConnectString,
                "userName": userName,
                "pwd": password,
                "authType": authType,
                "entryLimit": entryLimit,
                "resultsFields": resultsFields,
                "searchFilterValue": searchFilterValue,
                "searchScope": searchScope,
                "strserverName": strserverName,
                "strProtocol": strProtocol

            }
        });


    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}