using AtPar.Common;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IManageOrdersService
    {
        AtParWebApiResponse<long> GetOrderDetails(int orderID, string orderStatus, string[] deviceTokenEntry);
        AtParWebApiResponse<long> GetOrders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string orgGroupID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdateOrderDetails(List<VM_CARTCOUNT_ORDER_DETAILS> lstOrderDetails, string[] deviceTokenEntry);
    }
}
