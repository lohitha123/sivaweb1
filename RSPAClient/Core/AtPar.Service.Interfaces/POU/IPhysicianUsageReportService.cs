﻿using AtPar.Common;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.POU
{
    public interface IPhysicianUsageReportService
    {
        AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_HEADER> GetPhysicianUsage(string pStrPhysicianID, string pStrProcedure, string pStrFromDate, string pStrToDate, string OrgGrpID);
        AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_DETAILS> GetPhysicianCompareDetails(List<VM_POU_PHYSICIAN_USAGE_HEADER> lstPhysicianUsageHeader);
    }
}