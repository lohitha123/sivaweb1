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
    public class ManageEquipmentItemsController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private IManageEquipmentItemsService _manageEqItemsservice;

        #endregion

        #region Constructor

        public ManageEquipmentItemsController(ILog log, IManageEquipmentItemsService manageEqItemsService)
        {
            _log = log;
            _manageEqItemsservice = manageEqItemsService;
            _log.SetLoggerType(typeof(ManageEquipmentItemsController));

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItems()
        {
            return _manageEqItemsservice.GetMasterItems();
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItems(string itemID, string description)
        {
            return _manageEqItemsservice.GetMasterItems(itemID, description);
        }

        [HttpGet]
        public AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId)
        {
            return _manageEqItemsservice.GetEquipmentTypes(itemIndicator, orgGrpId);
        }

        [HttpGet]
        public AtParWebApiResponse<object> GetItemsForSelectedEqType(string equipmentType, string itemId)
        {
            var result = _manageEqItemsservice.GetItemsForSelectedEqType(equipmentType, itemId);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<VM_TKIT_ITEM_DEPT> GetItemDepartments(string itemId, string orgGrpId)
        {
            return _manageEqItemsservice.GetItemDepartments(itemId, orgGrpId);
        }

        [HttpGet]
        public AtParWebApiResponse<bool> IsItemOrdered(string itemId)
        {
            return _manageEqItemsservice.IsItemOrdered(itemId);
        }

        [HttpGet]
        public AtParWebApiResponse<object> GetTypeItems(string itemType, string itemId)
        {

            //var response = new AtParWebApiResponse<object>();
            var result = _manageEqItemsservice.GetTypeItems(itemType, itemId);

            // result.DataVariable[1].
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateItems([FromBody] List<VM_TKIT_ITEM_DETAILS> lstItemDetails, string itemTypeIndicator)
        {
            var result = _manageEqItemsservice.UpdateItems(lstItemDetails, itemTypeIndicator);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> SaveItemDetails([FromBody] Dictionary<string, dynamic> dicitemdetails,
                                                         string itemTypeIndicator, string mode, [FromUri] string[] deviceTokenEntry)
        {


            var result = _manageEqItemsservice.SaveItemDetails(dicitemdetails, itemTypeIndicator, mode,
                                                         deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString());
            return result;
        }



        public bool ThumbnailCallback()
        {
            return false;
        }


        [HttpPost]
        public AtParWebApiResponse<long> SaveUploadImage([FromUri] string[] deviceTokenEntry)
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

                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".jfif" };
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
                        filePath = @"" + AppDomain.CurrentDomain.BaseDirectory[0] + ":\\AtPar\\Web\\Uploaded\\";

                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        else
                        {
                            var pathFiles = Directory.GetFiles(filePath);
                            foreach (var file in pathFiles)
                            {
                                if ((file.Split('.')[0].ToString() == (filePath + postedFile.FileName.Split('.')[0])) || (file.Split('.')[0].ToString() == (filePath + postedFile.FileName.Split('.')[0] + "_thumb.bmp")))
                                {
                                    File.Delete(file.ToString());
                                }
                            }
                        }

                        filePath = @"" + AppDomain.CurrentDomain.BaseDirectory[0] + ":\\AtPar\\Web\\Uploaded\\";  ;
                        postedFile.SaveAs(filePath+ postedFile.FileName);

                        var myCallback = new Image.GetThumbnailImageAbort(ThumbnailCallback);
                        var myBitmap = new Bitmap(postedFile.InputStream);
                        var myThumbnail = myBitmap.GetThumbnailImage(25, 25, myCallback, IntPtr.Zero);
                        myThumbnail.Save(filePath + postedFile.FileName.Split('.')[0] + "_thumb.bmp");

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
