using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.Deliver
{
    public interface IAssignSignatoriesRepository
    {
        long AddAuthSign(string costCenterCode, string userId, string firstName, string lastName, string middleName);
        long DeleteAuthSign(string costCenterCode, string userId);
        List<MT_DELV_COST_CENTER_AUTH_PERSON> GetAuthSign(string code);
        List<MT_DELV_COST_CENTER_AUTH_PERSON> GetCodes(string code);
        long UpdateAuthSign(string newCostCenterCode, string oldCostCenterCode);
    }
}