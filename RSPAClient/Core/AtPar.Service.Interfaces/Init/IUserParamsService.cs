using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System.Collections.Generic;

namespace AtPar.Service.Interfaces.Init
{
    public interface IUserParamsService
    {
        AtParWebApiResponse<VM_MT_ATPAR_USER_PARAMS> GetUserParams(string svrUserID, string appID, string userID, string[] deviceTokenEntry);
        AtParWebApiResponse<long> SetUserParams(List<MT_ATPAR_USER_APP_PARAMETERS> userParams, string[] deviceTokenEntry);
        AtParWebApiResponse<string> GetParameterValues(string userID, string parameterID, string fieldName, string tableName, string whereCondition);
    }
}
