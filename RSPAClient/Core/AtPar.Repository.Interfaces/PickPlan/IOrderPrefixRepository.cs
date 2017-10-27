using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.PickPlan
{
    public interface IOrderPrefixRepository
    {
        List<MT_PKPL_ORDER_PREFIX> GetOrderPrefixSetUp();
        long SaveOrderPrefixSetUp(List<MT_PKPL_ORDER_PREFIX> orderPrefix);
    }
}
