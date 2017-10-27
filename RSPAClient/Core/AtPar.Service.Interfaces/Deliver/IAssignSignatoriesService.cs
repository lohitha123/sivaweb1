using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.Deliver
{
    public interface IAssignSignatoriesService
    {
        AtParWebApiResponse<long> AddAuthSign(string costCenterCode, string userId, string firstName, string lastName, string middleName);
        AtParWebApiResponse<long> DeleteAuthSign(string costCenterCode, string userId);
        AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON> GetAuthSign(string code);
        AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON> GetCodes(string code);
        AtParWebApiResponse<long> UpdateAuthSign(string newCostCenterCode, string oldCostCenterCode);
    }
}