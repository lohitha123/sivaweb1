using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IChangePasswordService
    {
        AtParWebApiResponse<long> UpdatePassword(string[] pDeviceTokenEntry, string userID, string newPwd, string hintQ, string oldPwd, string hintA, string deviceId = "");
    }
}
