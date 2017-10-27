using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.UI;
using System.Data;

namespace AtPar.Init.WebApi
{
    public class UserUploadAutomationController : ApiController
    {

        #region Private Variable

        ILog _log;
        IUserUploadAutomationService _userUploadService;

        #endregion

        #region Constructor

        public UserUploadAutomationController(IUserUploadAutomationService userUploadService, ILog log)
        {
            _log = log;
            _userUploadService = userUploadService;
            _log.SetLoggerType(typeof(UserUploadAutomationController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<object> DoUploadData(bool chkUser, bool chkProfile, bool chkOrgGroup, string strUserUploadPath, string strProfileUploadPath, string strOrgGroupUploadPath, string enterpriseSystem, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userUploadService.DoUploadData(chkUser, chkProfile, chkOrgGroup, strUserUploadPath, strProfileUploadPath, strOrgGroupUploadPath, enterpriseSystem, userID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UploadPostedFile([FromUri] string[] deviceTokenEntry)
        {

            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var response = new AtParWebApiResponse<long>();
                var postedFileName = HttpContext.Current.Request.Form.GetValues("fileName");
                var postelFiles = HttpContext.Current.Request.Form.GetValues("uploadFile");
                string folderName = string.Empty;

                if (httpRequest.Files.Count > 0)
                {
                    var postedFile = httpRequest.Files[0];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {
                        folderName = "Upload" + DateTime.Now.ToString("yyyyMMddHHmmss");
                        var filePath = HttpContext.Current.Server.MapPath(@"~/Uploaded/" + folderName + "/");

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        filePath = HttpContext.Current.Server.MapPath(@"~/Uploaded/" + folderName + "/" + postedFileName[0] + ".xls");
                        postedFile.SaveAs(filePath);
                        response.AtParSuccess();
                        response.DataVariable = filePath;
                    }
                    return response;
                }
                else
                {
                    return response;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

    }
}