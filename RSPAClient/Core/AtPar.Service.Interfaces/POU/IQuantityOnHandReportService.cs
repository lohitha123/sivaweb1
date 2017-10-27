using AtPar.Common;

namespace AtPar.Service.Interfaces.POU
{
    public interface IQuantityOnHandReportService
    {
        AtParWebApiResponse<long> GetQtyOnHandReportData(string businessUnit, string cartID,
            string itemID, string vendID, string userID,
            string serialNumber, bool negativeStatus,
            string lotNumber,
            string orgGrpID, int appID,  string[] deviceTokenEntry);

        AtParWebApiResponse<long> GetUserdepartmentsitems(string userID, string orgGrpID,
             bool synchInvCarts, int appID,  string[] deviceTokenEntry);
    }
}
