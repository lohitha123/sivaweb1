using System;
using System.Data;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IScheduleComplianceReportRepository
    {
        Tuple<DataSet, long> GetCartSchedComplianceRep(string SvrUser, string userID, DateTime dt, string orgGrpID);
        Tuple<DataSet, long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID);
    }
}
