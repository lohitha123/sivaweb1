using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IRequestStatusService
    {
        AtParWebApiResponse<VM_TKIT_ORDER_DETAILS> GetOrderDetails(string requestID, string status, string deptID);
        AtParWebApiResponse<VM_TKIT_ORDER_DETAILS> GetOrderIDs(string fromDate, string toDate, string status, string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdateOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, List<TKIT_ORDER_DETAILS> updateOrderDetails, string userID, string serverUserID);
        AtParWebApiResponse<TKIT_ORDER_HEADER> GetOrdersForDashboard(string[] deviceTokenEntry);
        AtParWebApiResponse<TKIT_ORDER_DETAILS> GetOrderDetailsForDashboard(int orderNumber);
    }
}
