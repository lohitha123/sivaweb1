using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
    public interface IUserUploadAutomationService
    {
        AtParWebApiResponse<object> GenerateOrgGroupData(string filename, string enterpriseSystem);
        AtParWebApiResponse<object> GenerateUserData(string filename, string enterpriseSystem);
        AtParWebApiResponse<object> GenerateProfileData(string filename, string enterpriseSystem);
        AtParWebApiResponse<object> DoUploadData(bool chkUser, bool chkProfile, bool chkOrgGroup, string strUserUploadPath, string strProfileUploadPath, string strOrgGroupUploadPath, string enterpriseSystem, string userID, string[] deviceTokenEntry);
    }
}
