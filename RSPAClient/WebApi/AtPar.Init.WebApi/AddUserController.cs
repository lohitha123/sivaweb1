using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace AtPar.Init.WebApi
{
    public class AddUserController : ApiController
    {
        private IAddUserService _userService;
        private ILog _log;

        public AddUserController(IAddUserService userService, ILog log)
        {
            _userService = userService;
            _log = log;
            Utils.SetProductLog(AtParWebEnums.EnumApps.Init);
            _log.SetLoggerType(typeof(AddUserController));
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER> CheckUser(string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.CheckUser(userID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_PROFILE_APP_ACL> CheckProfileAppACL(string userID, string profileID, int accessType, [FromUri] string[] deviceTokenEntry)
        {
            if ((profileID) == null)
            {
                profileID = string.Empty;
            }
            var result = _userService.CheckProfileAppACL(userID, profileID, accessType);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> AddUser(VM_MT_ATPAR_USER_ADD user, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.AddUser(user);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<VM_MT_ATPAR_USER_ACL_ADD> SaveLdapUsers(string userID, string sessionTime, string idleTime, string orgGrpId, string profileID, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.SaveLdapUsers(userID, sessionTime, idleTime, orgGrpId, profileID, lstLdapUsers);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<AtParKeyValuePair> PopulateConfigData([FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.PopulateConfigData();
            return result;
        }
        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER> GetLdapUsers(string userID, string strSearchFilter, string strEntryLimit, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.GetLdapUsers(userID, strSearchFilter, strEntryLimit);         
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> SaveUserProfileImage([FromUri] string[] deviceTokenEntry)
        {
            var httpRequest = HttpContext.Current.Request;
            var filePath = string.Empty;
            Dictionary<string, object> dict = new Dictionary<string, object>();
            var response = new AtParWebApiResponse<long>();
            try
            {
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);
                var postedFile = httpRequest.Files[0];
                Image img = Image.FromStream(postedFile.InputStream);
                int height = img.Height;
                int width = img.Width;

                if (postedFile != null && postedFile.ContentLength > 0)
                {
                    int MaxContentLength = 1024 * 1024 * 1; //Size = 512kb  

                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var ext1 = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                    var extension = ext1.ToLower();
                    if (!AllowedFileExtensions.Contains(extension))
                    {
                        response.StatusMessage = "Please Upload image of type .jpg,.gif,.png.";
                        response.StatType = AtParWebEnums.StatusType.Warn;
                        return response;
                        //var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                        //dict.Add("error", message);
                        //return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                    }
                    else if (postedFile.ContentLength > MaxContentLength)
                    {
                        response.StatusMessage = "Please Upload a file upto 1 mb.";
                        response.StatType = AtParWebEnums.StatusType.Warn;
                        return response;
                        //var message = string.Format("Please Upload a file upto 1 mb.");
                        //dict.Add("error", message);
                        //return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                    }
                    else if (height > 2000 || width > 2000)
                    {
                        response.StatusMessage = "Image height and width should not excced 100px respectively.";
                        response.StatType = AtParWebEnums.StatusType.Warn;
                        return response;
                        //var message2 = string.Format("Image height and width should not excced 100px respectively.");
                        //return Request.CreateErrorResponse(HttpStatusCode.Created, message2);
                    }
                    else
                    {
                        filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/userprofileimage/");

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        else
                        {
                            var pathFiles = Directory.GetFiles(filePath);
                            foreach (var file in pathFiles)
                            {
                                if (file.ToString() == filePath + "default.png")
                                {
                                    File.Delete(file.ToString());
                                }
                            }
                        }

                        filePath = HttpContext.Current.Server.MapPath("~/assets/images/userprofileimage/" + "default.png");
                        postedFile.SaveAs(filePath);

                        //var message1 = string.Format("Image Uploaded Successfully.");
                        //return Request.CreateErrorResponse(HttpStatusCode.Created, message1);
                        response.StatusMessage = "Image Uploaded Successfully.";
                        response.StatType = AtParWebEnums.StatusType.Success;
                        return response;

                    }
                }

                //var res = string.Format("Please Upload a image.");
                //dict.Add("error", res);
                //return Request.CreateResponse(HttpStatusCode.NotFound, dict);
                response.StatusMessage = "Please Upload a image.";
                response.StatType = AtParWebEnums.StatusType.Warn;
                return response;
            }
            catch (Exception ex)
            {
                //var res = string.Format("some Message");
                //dict.Add("error", res);
                //throw ex;
                response.StatType = AtParWebEnums.StatusType.Error;
                response.StatusMessage = ex.Message;
                return response;
            }
        }

    }
}
