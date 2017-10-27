using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IDeliveryReportRepository
    {
        long GetTkITDeliverReport(string pFromDate, string pToDate, string pRequest, string pRecipient, string pUserId, string pDepartmentId, string pItemId, string pVendorName, string pDescr, string pLocation,
        string pReqId, string pStatus, ref DataSet pDsDeliverRep, string[] pDeviceTokenEntry);

        long GetRequestors(bool pInactiveStatusChk, ref DataSet pDsTkitRequestors, string[] pDeviceTokenEntry);

        long GetTKITDepts(string pStrDeptID, string pStatus, ref DataSet pDsDepts, string[] pDeviceTokenEntry);
    }
}
