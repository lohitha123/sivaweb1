using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.Service.Interfaces.Init;
using System.Net.Http;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.ViewModel;
using log4net;
using System.Web;
using System.Net;
using System.IO;
using System.Net.Http.Headers;
using System.Drawing;

namespace AtPar.Init.WebApi
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        #region Private Variables

        private IUserService _userService;
        private ILog _log;

        #endregion

        #region Constructor
        public UserController(IUserService userService, ILog log)
        {
            _log = log;
            _userService = userService;
            _log.SetLoggerType(typeof(UserController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER> GetAllUsers([FromUri] string[] deviceTokenEntry)
        {
                var result = _userService.GetAllUsers();
                return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL> GetAppRoleIDs(string UserId, [FromUri] string[] deviceTokenEntry)
        {
                var result = _userService.GetAppRoleIDs(UserId);
                return result;
        }


        [HttpGet]
        public AtParWebApiResponse<long> GetGroupMenusList(string profileID, string UserID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.GetGroupMenusList(profileID, UserID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_MT_ATPAR_USER_PROFILE> GetUser(string userId, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.GetUser(userId);
            return result;
        }

        [HttpPost]
        public HttpResponseMessage UploadCustomerLogo([FromUri] string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Current.Request;
                string message = string.Empty;

                if (httpRequest.Files.Count > 0)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[0];

                    Image img = Image.FromStream(postedFile.InputStream);
                    int height = img.Height;
                    int width = img.Width;

                    if (postedFile != null && postedFile.ContentLength > 0)
                    {
                        int MaxContentLength = 1024 * 1024 * 1; //Size = 512kb  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {
                            message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {
                            message = string.Format("Please Upload a file upto 1 mb.");
                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }

                        else if (height > 50 || width > 250)
                        {
                            message = string.Format("Image height and width should not exceed 100px respectively.");
                            return Request.CreateErrorResponse(HttpStatusCode.Created, message);
                        }

                        else
                        {
                            var checkFilePath = HttpContext.Current.Server.MapPath(@"~/assets/images/customerlogo/");

                            if (!Directory.Exists(checkFilePath))
                            {
                                Directory.CreateDirectory(checkFilePath);
                            }
                            else
                            {
                                var checkFilePathArray = Directory.GetFiles(checkFilePath);
                                foreach (var item in checkFilePathArray)
                                {
                                    if (item.ToString() == checkFilePath + "logo.png")
                                    {
                                        File.Delete(item.ToString());
                                    }
                                }
                            }

                            var filePath = HttpContext.Current.Server.MapPath("~/assets/images/customerlogo/" + "logo.png");
                            postedFile.SaveAs(filePath);
                        }
                    }
                    message = string.Format("Image Uploaded Successfully.");
                    return Request.CreateErrorResponse(HttpStatusCode.Created, message);
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                var res = string.Format("Internal server error");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
        }

        [HttpPut]
        public AtParWebApiResponse<long> SaveUserDetails(VM_MT_ATPAR_USER_PROFILE user, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.SaveUserDetails(user);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_USER_STATUS> GetUserStatus(string serverUserID, string userID, string firstName, string lastName,
                                                  string status, string orgGroupID, string profileID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.GetUserStatus(serverUserID, userID, firstName, lastName, status, orgGroupID, profileID);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateUserStatus(string serverUserID, string userID, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _userService.UpdateUserStatus(serverUserID, userID, status);
            return result;
        }

        #endregion

    }
}
