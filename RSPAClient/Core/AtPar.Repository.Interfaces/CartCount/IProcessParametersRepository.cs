using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.CartCount
{
    public interface IProcessParametersRepository
    {
        long AssignScheduleToCarts(List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> lstCartSchedules, string orgGroupID, string bUnit);
        List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> GetAllocatedScheduleCarts(string bUnit, string orgGroupID, string cartID);
        List<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS> GetCartSchedules(string orgGroupID, string cartID, string bUnit);
        List<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string orgGroupID);
        List<MT_CRCT_USER_ALLOCATION> GetUserCarts(string bUnit, string cartID, string userID);
    }
}
