using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IRequestStatusRepository
    {
        List<VM_TKIT_ORDER_DETAILS> GetOrderDetails(string requestID, string status, string deptID);
        int GetStatusFromDetailTransaction(int orderNumber, int orderLineNo);
        long UpdateOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails, List<TKIT_ORDER_DETAILS> updateOrderDetails, string userID, string serverUserID);
        List<VM_TKIT_ORDER_DETAILS> GetOrderIDs(string fromDate, string toDate, string status, string[] deviceTokenEntry);
        List<TKIT_ORDER_HEADER> GetOrdersForDashboard(string[] deviceTokenEntry);
        List<TKIT_ORDER_DETAILS> GetOrderDetailsForDashboard(int orderNumber);
    }
}
