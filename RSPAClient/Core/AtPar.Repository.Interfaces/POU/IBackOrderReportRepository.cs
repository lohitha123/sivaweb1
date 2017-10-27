using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IBackOrderReportRepository
    {
        List<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID);
        Tuple<long, DataSet> GetUserdepartmentsCarts(string userID, string orgGrpID, string locationType = "");
        Tuple<long, DataSet> GetBackOrderReportData(string pStrBusinessUnit, string pStrCartId, string pStrUserId, string pStrFromDate, string pStrToDate, string pOrgGrpID, int pAppID);
        List<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string[] deviceTokenEntry, string locationType = "", string cartType = "");
    }
}
