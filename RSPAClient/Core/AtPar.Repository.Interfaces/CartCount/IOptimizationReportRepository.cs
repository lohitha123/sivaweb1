using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IOptimizationReportRepository
    {

        #region GetCartOptimizationRep
        List<MT_ATPAR_TRANSACTION> GetDeptIDs(string deptID, string cartID);

        List<MT_ATPAR_DEVIATION> GetOptimRep(DateTime tDate, DateTime fDate, string bUnit, string cartIDs,
                                               string cartID);

        List<MT_ATPAR_TRANSACTION> GetCartBunits(string deptID, string cartID, string bUnit);

        List<VM_DEVIATION_USER_ALLOCATION> GetOpt(DateTime tDate, DateTime fDate, string bUnit, string cartIDs,
                                               string cartID);

        #endregion

        #region GetOptRep
        string GetStartDate(string itemID, DateTime fDate, string pComp, string bUnit, string cartID);

        string GetEndDate(string itemID, DateTime tDate, string pComp, string bUnit, string cartID);
        // create view model
        List<VM_DEVIATION_TRANSACTION> GetDev(string itemID, string pComp, string bUnit, string cartID, string startDate,
          DateTime fDate, string endDate, DateTime tDate);

        double GetOrderQty(string itemID, string bUnit, string cartID, string comp, DateTime fdate, string dtTempTodate);
        #endregion

        #region GetOrphanItems
        List<MT_ATPAR_DEVIATION> GetOrphanItems(int appID, string bUnit, string cartID);
        #endregion

        #region InsertParAuditReportData
        long InsertParAuditReportData(string bUnit, string cartID, string compt,
                                             string itemID, double optQty, double nopQty, int transID,
                                             string userID, string uom, string strItemDesc);
        #endregion
    }
}
