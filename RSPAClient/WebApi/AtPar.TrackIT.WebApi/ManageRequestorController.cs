using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Web;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class ManageRequestorController : ApiController
    {
        #region Private Variable

        private IManageRequestorService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageRequestorController(IManageRequestorService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(ManageRequestorController));
        }

        #endregion

        #region Public Methods

        // to do need to move this to common place
        [HttpGet]
        public AtParWebApiResponse<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetTKITAllDepts(deptID, status, deviceTokenEntry);
            return result;
        }        

        [HttpGet]
        public AtParWebApiResponse<TKIT_REQUESTOR> GetAllRequestors(string search, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetAllRequestors(search, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetRequestorDetails(string requestorID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetRequestorDetails(requestorID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> SaveRequestorDetails([FromBody] Dictionary<string, dynamic> requestorDetails, string pPassword, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.SaveRequestorDetails(requestorDetails, pPassword);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateRequestorDetails([FromBody] Dictionary<string, dynamic> requestorDetails, string pPassword,  [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.UpdateRequestorDetails(requestorDetails, pPassword);
            return result;
        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdateRequestorStatus(string requestorID, string status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.UpdateRequestorStatus(requestorID, status);
            return result;
        }


        [HttpPost]
        public AtParWebApiResponse<long> SaveTrackItUserProfileImage([FromUri] string[] deviceTokenEntry)
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
                        filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/TrackITUserProfileImage/");

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

                        filePath = HttpContext.Current.Server.MapPath("~/assets/images/TrackITUserProfileImage/" + "default.png");
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
        #endregion
    }
}
