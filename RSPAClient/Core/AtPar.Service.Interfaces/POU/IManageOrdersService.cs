using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.POU
{
    public interface IManageOrdersService
    {
        
        AtParWebApiResponse<PAR_MNGT_ORDER_DETAILS> GetOrderDetails_ManageOrders(string ordNo, string ordStatus, string cartID, string bUnit, string itemID, string orgGrpID, int appID, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_POU_MNGT_ORDER_DETAILS> GetOrderHeaders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string itemID,
string orgGrpID, int appID, string[] deviceTokenEntry);
    }
}
