using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.PickPlan
{
    public interface IOrderPrefixService
    {
        AtParWebApiResponse<VM_PKPL_ORDER_PREFIX> GetOrderPrefixSetUp(params string[] DeviceTokenEntry);
        AtParWebApiResponse<MT_PKPL_ORDER_PREFIX> SaveOrderPrefixSetUp(List<MT_PKPL_ORDER_PREFIX> orderPrefix);
    }
}
