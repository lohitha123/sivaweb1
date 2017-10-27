using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IStationaryPrintDesignRepository
    {
        List<MT_ATPAR_PROFILE_APP_ACL> GetDynamicPrintProducts(string userID);
        List<string> GetDynamicPrintReportTypes(int appID);
        Dictionary<string, object> GetDynamicReport(string appID, string objectID);
        long SaveDynamicPrintReport(string appID, string objectID, string printType, string objectDesc, List<VM_MT_ATPAR_REPORT_DETAILS> lstReportDtls);
    }
}
