using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Web;
using System.Web.Http;

namespace AtPar.TrackIT.WebApi
{
    public class CommonTrackITController : ApiController
    {
        #region Private Variable

        private ICommonTrackITService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public CommonTrackITController(ICommonTrackITService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(CreateRequestController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_VENDOR> GetVendorDetails(string orgGroupID, [FromUri] string[] deviceTokenEntry, string vendorID = "", string search = "")
        {
            var result = _Service.GetVendorDetails(vendorID, orgGroupID, search);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_EQ_INDICATOR> GetEqIndicators([FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetEqIndicators();
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<RM_SHIP_TO_LOCACTION> GetLocations([FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetLocations(deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetRequestorDefLoc([FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetRequestorDefLoc(deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> AddToCart(string eqIndicator, TKIT_CART_MANAGER cartManager, [FromUri] string[] deviceTokenEntry)
        {
            List<TKIT_CART_MANAGER> lstDelItems = null;
            var result = _Service.AddToCart(eqIndicator, cartManager, lstDelItems, deviceTokenEntry);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<long> GetLatestValue(int appId, string fieldName)
        {
            var result = _Service.GetLatestValue(appId, fieldName);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId, string searchEqTypeOrDesc, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetEquipmentTypes(itemIndicator, orgGrpId, searchEqTypeOrDesc);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_REQUESTOR> GetUserDetails(string requestorID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetUserDetails(requestorID);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateUserDetails(string pPassword, string newPassword, TKIT_REQUESTOR requestor, [FromUri] string[] deviceTokenEntry)
        {

            var result = _Service.UpdateUserDetails(requestor, pPassword, newPassword);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItemsForTheSelectedEqType(string eqType, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetMasterItemsForTheSelectedEqType(eqType);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetTKITMyPreferences(string preference, string requestorID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetTKITMyPreferences(preference, requestorID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_VIEW_CART> GetCartItems([FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetCartItems(deviceTokenEntry);
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
