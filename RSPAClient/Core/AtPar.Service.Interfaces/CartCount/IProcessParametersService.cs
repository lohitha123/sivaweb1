using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.CartCount
{
    public interface IProcessParametersService
    {
        AtParWebApiResponse<long> AssignScheduleToCarts(List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstCartSchedules, string orgGroupID, string bUnit);
        AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> GetCartSchedules(string orgGroupID, string cartID, string bUnit);
        AtParWebApiResponse<VM_CART_SCHEDULES> GetProcessParametersCarts(string orgGroupID, string bUnit, string cartID, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string orgGroupID);
    }
}
