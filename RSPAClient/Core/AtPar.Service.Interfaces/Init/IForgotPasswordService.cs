using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IForgotPasswordService
    {        
        AtParWebApiResponse<MT_ATPAR_APP> ForgotHashPassword(string[] deviceTokenEntry, string userID, string hintQ, string hintA = "", string newPwd = "");        
    }
}
