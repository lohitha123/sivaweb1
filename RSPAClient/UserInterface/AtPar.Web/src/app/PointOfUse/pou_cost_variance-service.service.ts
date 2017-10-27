import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';

@Injectable()
export class POUCostVarianceService{
    constructor(private httpservice: HttpService) {

    }
    private headers = new Headers({ 'Content-Type': 'application/json' });

    Getcostvarianceanalysisspecialitydata(VarianceDiagCode,year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/Getcostvarianceanalysisspecialitydata",
            params: {
                "pselectedVarianceType": VarianceDiagCode,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }
  
    GetCostVarianceByDiagnosiscode(SpecialityCode,Codetext,Descrtext,year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostVarianceByDiagnosiscode",
            params: {
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pDescrtext": Descrtext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }
   
    GetCostVarianceBySurgeon(VarianceDiagCode,SpecialityCode, ReimbursementCode, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostVarianceBySurgeon",
            params: {
                "pselectedVarianceType": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,               
                "pReimbursementCode": ReimbursementCode,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }
       
    GetCostvarianceSurgeonHdrData(DiagnosisCode,SpecialityCode, Codetext, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceSurgeonHdrData",
            params: {
                "pDiagnosisCode": DiagnosisCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }

    GetCostVarianceItemGroups(VarianceDiagCode,SpecialityCode, Codetext, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostVarianceItemGroups",
            params: {
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }
    
    GetCostvarianceItemHdrDetails(VarianceDiagCode,SpecialityCode, Codetext, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceItemHdrDetails",
            params: {
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }

    
    GetCostvarianceSurgeonItemgroupDetails(VarianceDiagCode,SpecialityCode, Codetext, PhysicianId, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceSurgeonItemgroupDetails",
            params: {
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pPhysicianId": PhysicianId,                
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }
    
    GetCostvarianceSupplyItemData(ItemGroup,VarianceDiagCode, SpecialityCode, Codetext, PhysicianId, year, halfyear, quater, monthly) {
        return this.httpservice.getSync({
            apiMethod: "/api/CostVarianceAnalysis/GetCostvarianceSupplyItemData",
            params: {
                "pItemGroup": ItemGroup,
                "pDiagnosisCode": VarianceDiagCode,
                "pSpecialityCode": SpecialityCode,
                "pCodetext": Codetext,
                "pPhysicianId": PhysicianId,
                "pYear": year,
                "pHalfYear": halfyear,
                "pQuater": quater,
                "pMonthly": monthly
            }
        });
    }
    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}
