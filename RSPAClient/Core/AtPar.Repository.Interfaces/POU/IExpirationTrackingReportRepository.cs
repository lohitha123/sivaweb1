using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IExpirationTrackingReportRepository
    {
        Tuple<DataSet, long> GetExpireTrackRep(int pIntDuration, string pStrFromDate,string pStrToDate, string pStrDeptID, string pStrCartID, string pStrOrgGrpID, int pAppID);

        long GetExpItemCnt(string pStrOrgGrpID, string pStrUserID,int pAppID, string[] pDeviceTokenEntry, ref int pIntDuration,ref int pIntExpiredCnt, ref int pIntExpiringCnt);

        List<VM_GetDeptCartAllocations> GetDeptCartAllocations(string businessUnit, string deptID, int appID, string locType);
    }
}
