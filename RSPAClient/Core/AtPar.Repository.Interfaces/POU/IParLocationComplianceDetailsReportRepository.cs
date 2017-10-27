using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IParLocationComplianceDetailsReportRepository
    {
       Tuple<long, DataSet> GetComplianceDetails(string pStrDept, string pStrLoc, string pStrUserId, string pStrFromDate, string pStrToDate, string pStrOrgGrpID, int pAppID);
       List<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO> GetDeptCartAllocations(string pBusinessUnit, string pDeptId, int pAppID, string pLocationType ="" );
    }
}
