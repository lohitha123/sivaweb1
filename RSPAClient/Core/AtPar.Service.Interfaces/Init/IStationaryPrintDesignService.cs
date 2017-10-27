using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface IStationaryPrintDesignService
    {
        AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL> GetDynamicPrintProducts(string userID);
        AtParWebApiResponse<string> GetDynamicPrintReportTypes(int appID);
        AtParWebApiResponse<long> GetDynamicReport(string appID, string objectID);
        AtParWebApiResponse<long> SaveDynamicPrintReport(string appID, string objectID, string printType, string objectDesc, List<VM_MT_ATPAR_REPORT_DETAILS> lstReportDtls);
        AtParWebApiResponse<string> GetFonts();
    }
}
