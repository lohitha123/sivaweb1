using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IUserParamsRepository
    {
        List<string> GetDistinctParamValues(string fileldName, string tableName, string whereCondition);
        List<string> GetParamValue(string fileldName, string tableName, string whereCondition);
        long SetUserParams(List<MT_ATPAR_USER_APP_PARAMETERS> lstUserParams);
        List<VM_MT_ATPAR_USER_PARAMS> GetUserParams(string appID, string userID, string enterpriseSystem);
    }
}
