using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IManageOrdersRepository
    {
        Tuple<DataSet, long> GetOrderDetails(int orderID, string orderStatus, string[] deviceTokenEntry);
        Tuple<DataSet, long> GetOrders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string orgGroupID, string[] deviceTokenEntry);
        long UpdateOrderDetails(DataSet dSOrderDetails, string[] pDeviceTokenEntry);
    }
}
