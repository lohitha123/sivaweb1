using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IManageOrdersRepository
    {
        
        List<PAR_MNGT_ORDER_DETAILS> GetOrderDetails(string ordNo, string itemID, string ordStatus);
        List<VM_POU_MNGT_ORDER_DETAILS> GetDistinctOrderDetails(int appID, string orgGrpID, string compID, string locID, string deptID, string ordStatus, string reqNo, string itemID, DateTime fDate, DateTime tDate);
    }
}
