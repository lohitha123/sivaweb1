using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using log4net;
using SharpCompress.Common;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Xml;
using SharpCompress.Archive;

namespace AtPar.Init.WebApi
{
    public class MaintainPrinterController : ApiController
    {
        #region Private Variables

        private IMaintainPrintersService _maintainPrintersService;
        private ILog _log;

        #endregion

        #region Constructor
        public MaintainPrinterController(IMaintainPrintersService maintainPrintersService, ILog log)
        {
            _maintainPrintersService = maintainPrintersService;
            _log = log;
            _log.SetLoggerType(typeof(MaintainPrinterController));
        }
        #endregion

        #region Public Methods

        [HttpPut]
        public AtParWebApiResponse<long> UpdatePrinterStatus(int appID, string friendlyName, int functionality, int status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.UpdatePrinterStatus(appID, friendlyName, functionality, status);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_LBL_PRINTERS> GetPrinterModels([FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.GetPrinterModels();
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrinterData(int appID, string friendlyName,
                                                                 string functionality, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.GetPrinterData(appID, friendlyName, functionality);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_APP_LABELS> GetFunctionalities(int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.GetFunctionalities(appID);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetModels(int appID, int functionality, string printerCode, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.GetModels(appID, functionality, printerCode);
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_LABELS_DATA> GetModelImage(int appID, string model, int functionality, string printerModelType, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.GetModelImage(appID, model, functionality, printerModelType);

            if (result.DataList.Count > 0)
            {
                byteArrayToImage_grid(result.DataList[0].LABEL_IMAGE, result.DataList[0].LABEL_FILE_NAME, deviceTokenEntry);
            }

            return result;

        }


        private void byteArrayToImage_grid(byte[] byteArrayIn, string pFileName, [FromUri] string[] deviceTokenEntry)
        {
            try
            {
                Image newImage = default(Image);
                var filePath = HttpContext.Current.Server.MapPath(@"~/LabelImage/");

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string strFileName = filePath + pFileName + ".jpg";

                if (File.Exists(strFileName) == true)
                {
                    File.Delete(strFileName);
                    //  pImg.ImageUrl = "";

                }

                if (byteArrayIn != null)
                {
                    using (MemoryStream stream = new MemoryStream(byteArrayIn))
                    {
                        newImage = Image.FromStream(stream);
                        newImage.Save(strFileName);
                    }
                }
            }
            catch (Exception ex)
            {

            }
        }

        [HttpGet]
        public AtParWebApiResponse<MT_ATPAR_APP_LINKED_LABELS> GetLinkedFunctionalities(int appID, int labelType, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.GetLinkedFunctionalities(appID, labelType);
            return result;

        }

        [HttpPost]
        public AtParWebApiResponse<long> InsertModel(int appID, string fileName, [FromUri] byte[] PNLData,
                                                                      string LVXData, [FromUri] byte[] image, string model,
                                                                      double width, double height, string userID,
                                                                      int functionality, int linkFunctionality,
                                                                      string printerCode, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.InsertModel(appID, fileName, PNLData, LVXData,
                                                      image, model, width, height, userID, functionality,
                                                      linkFunctionality, printerCode);
            return result;

        }

        [HttpPost]
        public AtParWebApiResponse<long> SavePrinterDetails(List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData, [FromUri] string[] deviceTokenEntry)
        {
            var result = _maintainPrintersService.SavePrinterDetails(lstPrintData);
            return result;

        }

        [HttpPut]
        public AtParWebApiResponse<long> UpdatePrinterDetails(string oldFriendlyName, bool blnPrinterExists,
                                                              List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData, [FromUri] string[] deviceTokenEntry)

        {
            var result = _maintainPrintersService.UpdatePrinterDetails(oldFriendlyName, blnPrinterExists, lstPrintData);
            return result;

        }

        [HttpPost]
        public AtParWebApiResponse<long> UploadSingleFile(string _strLvx, string _strPnl, string getModels,
            int labelWidth, int labelHeight, int appID, string printerCode, int functionality, string userID, [FromUri] string[] deviceTokenEntry)
        {


            var response = new AtParWebApiResponse<long>();
            try
            {
                var httpRequest = HttpContext.Current.Request;



                var filePath = HttpContext.Current.Server.MapPath("~/ZipFiles/");
                if (httpRequest.Files.Count > 0)
                {

                    var postedFile = httpRequest.Files[0];

                    if (!Directory.Exists(filePath))
                    {

                        Directory.CreateDirectory(filePath);
                    }
                    else
                    {
                        try
                        {
                            var checkFilePathArray = Directory.GetFiles(filePath);
                        }
                        catch (Exception ex)
                        {

                            response.StatType = AtParWebEnums.StatusType.Error;
                            response.StatusMessage = ex.Message;
                            return response;

                        }
                    }


                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        IList<string> AllowedFileExtensions = new List<string> { ".zip", ".rar", ".7z" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.')).ToLower();

                        if (!AllowedFileExtensions.Contains(ext))
                        {
                            response.StatusMessage = "Only zip file formats (.zip, .rar, .7z) are allowed";
                            response.StatType = AtParWebEnums.StatusType.Warn;
                            return response;
                        }
                        else
                        {
                            string fileName = string.Empty;
                            if (postedFile.FileName.Contains('\\'))
                            {
                                fileName = Path.GetFileName(postedFile.FileName);
                            }
                            else
                            {
                                fileName = postedFile.FileName;
                            }

                            var fileLocation = filePath + fileName;
                            // File.Delete(fileLocation);
                            postedFile.SaveAs(fileLocation);


                            IArchive archive = ArchiveFactory.Open(fileLocation);
                            archive.ExtractAllEntries();
                            string _tempByte_lvx = string.Empty;
                            byte[] _tempByte_pnl = null;
                            byte[] _tempByte_img = null;

                            if (archive.Entries.Count() == 2)
                            {
                                string Extractedfiles = HttpContext.Current.Server.MapPath("~/images/bAbandon.gif");
                                FileInfo _fileInfo = new FileInfo(Extractedfiles);
                                long _NumBytes = _fileInfo.Length;
                                FileStream _FStream = new FileStream(Extractedfiles, FileMode.Open, FileAccess.Read);
                                BinaryReader _BinaryReader = new BinaryReader(_FStream);
                                _tempByte_img = _BinaryReader.ReadBytes(Convert.ToInt32(_NumBytes));
                                _fileInfo = null;
                                _NumBytes = 0;
                                _FStream.Close();
                                _FStream.Dispose();
                                _BinaryReader.Close();
                                _BinaryReader.Dispose();
                            }



                            foreach (var entry in archive.Entries)
                            {

                                if (!entry.IsDirectory)
                                {
                                    entry.WriteToDirectory(HttpContext.Current.Server.MapPath("~/ZipFiles/"), ExtractOptions.ExtractFullPath | ExtractOptions.Overwrite);
                                    string Extractedfiles = HttpContext.Current.Server.MapPath("~/ZipFiles/" + entry.FilePath);
                                    string extension = Path.GetExtension(Extractedfiles).ToLower();

                                    string _outXmlStr = string.Empty;


                                    if (extension == ".lvx")
                                    {
                                        string fileReader = File.ReadAllText(Extractedfiles);
                                        _outXmlStr = fileReader;

                                        string _fileName = string.Empty;

                                        _fileName = appID + "_" + printerCode + "_" + functionality + "_" + getModels;

                                        XmlDocument doc1 = new XmlDocument();
                                        doc1.LoadXml(_outXmlStr);
                                        foreach (XmlNode node in doc1.SelectNodes("Label/Data/File"))
                                        {
                                            node.InnerText = _fileName + ".pnl";
                                        }
                                        doc1.PreserveWhitespace = true;
                                        doc1.Save(HttpContext.Current.Server.MapPath("~/ZipFiles/" + entry.FilePath));


                                        fileReader = File.ReadAllText(Extractedfiles);
                                        _outXmlStr = fileReader;
                                        _tempByte_lvx = _outXmlStr;
                                        _strLvx = "LVX";
                                    }

                                    FileInfo _fileInfo = new FileInfo(Extractedfiles);
                                    long _NumBytes = _fileInfo.Length;
                                    FileStream _FStream = new FileStream(Extractedfiles, FileMode.Open, FileAccess.Read);
                                    BinaryReader _BinaryReader = new BinaryReader(_FStream);


                                    if (extension == ".lvx")
                                    {
                                    }
                                    else if (extension == ".pnl")
                                    {
                                        _tempByte_pnl = _BinaryReader.ReadBytes(Convert.ToInt32(_NumBytes));
                                        _strPnl = "PNL";
                                    }
                                    else if (extension == ".jpg")
                                    {
                                        _tempByte_img = _BinaryReader.ReadBytes(Convert.ToInt32(_NumBytes));
                                    }
                                    else
                                    {
                                        response.StatusMessage = "In a zip file should include .lvx , .pnl and .jpg files";
                                        response.StatType = AtParWebEnums.StatusType.Warn;
                                        return response;
                                    }

                                    _fileInfo = null;
                                    _NumBytes = 0;
                                    _FStream.Close();
                                    _FStream.Dispose();
                                    _BinaryReader.Close();
                                    _BinaryReader.Dispose();
                                }
                            }
                            if (_strPnl == "A" || _strLvx == "B")
                            {
                                response.StatusMessage = "In a zip file should include .lvx , .pnl and .jpg files";
                                response.StatType = AtParWebEnums.StatusType.Warn;
                                return response;
                            }


                            string uploadedZipFileWithOutExtension = Path.GetFileNameWithoutExtension(postedFile.FileName);
                            string unit = uploadedZipFileWithOutExtension;
                            int index1 = unit.LastIndexOf('_');
                            string getModel = unit.Substring(index1 + 1);

                            uploadedZipFileWithOutExtension = appID + "_" + printerCode + "_" + functionality + "_" + getModels;

                            var result = InsertModel(appID, uploadedZipFileWithOutExtension, _tempByte_pnl, _tempByte_lvx, _tempByte_img, getModels, labelWidth, labelHeight, userID, functionality, 0, printerCode, deviceTokenEntry);
                            //try
                            //{
                            //    var checkFilePathArray = Directory.GetFiles(filePath);
                            //    foreach (var item in checkFilePathArray)
                            //    {
                            //        File.Delete(item.ToString());
                            //    }
                            //}
                            //catch (Exception ex)
                            //{

                            //    response.StatType = AtParWebEnums.StatusType.Error;
                            //    response.StatusMessage = ex.Message;
                            //    return response;
                            //}

                            _tempByte_img = null;                        

                            return result;

                        }

                    }


                }
                response.StatusMessage = "Please Upload the file.";
                response.StatType = AtParWebEnums.StatusType.Warn;
                return response;
            }
            catch (Exception ex)
            {

                response.StatType = AtParWebEnums.StatusType.Error;
                response.StatusMessage = ex.Message;
                return response;
            }
        }

        [HttpPost]
        public AtParWebApiResponse<long> UploadMultipleFiles(string _strLvx, string _strPnl, string getModels, int appID, string printerCode, int functionality, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var response = new AtParWebApiResponse<long>();

            try
            {
                var httpRequest = HttpContext.Current.Request;


                var formHeightResponse = HttpContext.Current.Request.Form.GetValues("height");
                var formWidthResponse = HttpContext.Current.Request.Form.GetValues("width");
                var formLabelResponse = HttpContext.Current.Request.Form.GetValues("labelLinkType");
                var filePath = HttpContext.Current.Server.MapPath(@"~/ZipFiles/");


                if (!Directory.Exists(filePath))
                {

                    Directory.CreateDirectory(filePath);
                }
                else
                {
                    try
                    {

                        var checkFilePathArray = Directory.GetFiles(filePath);
                        //foreach (var item in checkFilePathArray)
                        //{
                        //    File.Delete(item.ToString());
                        //}
                    }
                    catch (Exception ex)
                    {

                        response.StatType = AtParWebEnums.StatusType.Error;
                        response.StatusMessage = ex.Message;
                        return response;

                    }

                }

                if (httpRequest.Files.Count > 0)
                {
                    for (int i = 0; i < httpRequest.Files.Count; i++)
                    {
                        var postedFile = httpRequest.Files[i];

                        if (postedFile != null && postedFile.ContentLength > 0)
                        {
                            IList<string> AllowedFileExtensions = new List<string> { ".zip", ".rar", ".7z" };
                            var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.')).ToLower();

                            if (!AllowedFileExtensions.Contains(ext))
                            {
                                response.StatusMessage = "Please Upload image of type .zip,.rar,.7z.";
                                response.StatType = AtParWebEnums.StatusType.Warn;
                                return response;
                            }
                            else
                            {
                                string fileName = string.Empty;
                                if (postedFile.FileName.Contains('\\'))
                                {
                                    fileName = Path.GetFileName(postedFile.FileName);
                                }
                                else
                                {
                                    fileName = postedFile.FileName;
                                }

                                var fileLocation = filePath + fileName;
                                postedFile.SaveAs(fileLocation);


                                IArchive archive = ArchiveFactory.Open(fileLocation);
                                archive.ExtractAllEntries();

                                _strPnl = "A";
                                _strLvx = "B";

                                foreach (var entry in archive.Entries)
                                {

                                    if (!entry.IsDirectory)
                                    {
                                        entry.WriteToDirectory(HttpContext.Current.Server.MapPath("~/ZipFiles/"), ExtractOptions.ExtractFullPath | ExtractOptions.Overwrite);
                                        string Extractedfiles = entry.FilePath;
                                        string extension = Path.GetExtension(Extractedfiles).ToLower();

                                        if (extension == ".lvx")
                                        {
                                            _strLvx = "LVX";
                                        }
                                        else if (extension == ".pnl")
                                        {
                                            _strPnl = "PNL";
                                        }
                                        else if (extension == ".jpg")
                                        {

                                        }
                                        else
                                        {
                                            response.StatusMessage = "In a zip file should include .lvx , .pnl and .jpg files";
                                            response.StatType = AtParWebEnums.StatusType.Warn;
                                            return response;
                                        }
                                    }

                                }
                                if (_strPnl == "A" || _strLvx == "B")
                                {
                                    response.StatusMessage = "In a zip file should include .lvx , .pnl and .jpg files";
                                    response.StatType = AtParWebEnums.StatusType.Warn;
                                    return response;
                                }

                            }

                        }
                        else
                        {
                            response.StatusMessage = "Please Enter the label size/ upload file.";
                            response.StatType = AtParWebEnums.StatusType.Warn;
                            return response;
                        }
                    }



                    string _getModel = string.Empty;
                    for (int i2 = 0; i2 < httpRequest.Files.Count; i2++)
                    {
                        HttpPostedFile PostedFile = httpRequest.Files[i2];


                        if (PostedFile.ContentLength > 0)
                        {
                            string uploadedZipFile = Path.GetFileName(PostedFile.FileName);
                            string uploadedZipFileWithOutExtension = Path.GetFileNameWithoutExtension(uploadedZipFile);
                            string zipFileLocation = HttpContext.Current.Server.MapPath("~/ZipFiles/" + uploadedZipFile);
                            string fileExtention = Path.GetExtension(zipFileLocation);

                            int _intExtentionindex = zipFileLocation.LastIndexOf('.');
                            string _getFileNmae = zipFileLocation.Substring(_intExtentionindex);

                            zipFileLocation = zipFileLocation.Replace(_getFileNmae, "abc" + fileExtention);
                           // File.Delete(zipFileLocation);
                            PostedFile.SaveAs(zipFileLocation);
                            IArchive archive = ArchiveFactory.Open(zipFileLocation);
                            archive.ExtractAllEntries();

                            string _tempByte_lvx = string.Empty;
                            byte[] _tempByte_pnl = null;
                            byte[] _tempByte_img = null;


                            if (archive.Entries.Count() == 2)
                            {
                                string Extractedfiles = HttpContext.Current.Server.MapPath("~/images/bAbandon.gif");
                                FileInfo _fileInfo = new FileInfo(Extractedfiles);
                                long _NumBytes = _fileInfo.Length;
                                FileStream _FStream = new FileStream(Extractedfiles, FileMode.Open, FileAccess.Read);
                                BinaryReader _BinaryReader = new BinaryReader(_FStream);
                                _tempByte_img = _BinaryReader.ReadBytes(Convert.ToInt32(_NumBytes));
                                _fileInfo = null;
                                _NumBytes = 0;
                                _FStream.Close();
                                _FStream.Dispose();
                                _BinaryReader.Close();
                                _BinaryReader.Dispose();
                            }
                            int labelLinkType = Convert.ToInt32(formLabelResponse[i2]);

                            foreach (var entry in archive.Entries)
                            {


                                if (!entry.IsDirectory)
                                {
                                    entry.WriteToDirectory(HttpContext.Current.Server.MapPath("~/ZipFiles/"), ExtractOptions.ExtractFullPath | ExtractOptions.Overwrite);
                                    string Extractedfiles = HttpContext.Current.Server.MapPath("~/ZipFiles/" + entry.FilePath);
                                    string extension = Path.GetExtension(Extractedfiles).ToLower();

                                    string _outXmlStr = string.Empty;


                                    if (extension == ".lvx")
                                    {
                                        string fileReader = File.ReadAllText(Extractedfiles);
                                        _outXmlStr = fileReader;

                                        string _fileName = string.Empty;

                                        if (labelLinkType == 0)
                                        {
                                            _fileName = appID + "_" + printerCode + "_" + functionality + "_" + getModels;
                                        }
                                        else
                                        {
                                            _fileName = appID + "_" + printerCode + "_" + labelLinkType + "_" + getModels;
                                        }

                                        XmlDocument doc1 = new XmlDocument();
                                        doc1.LoadXml(_outXmlStr);
                                        foreach (XmlNode node in doc1.SelectNodes("Label/Data/File"))
                                        {
                                            node.InnerText = _fileName + ".pnl";
                                        }
                                        doc1.PreserveWhitespace = true;
                                        doc1.Save(HttpContext.Current.Server.MapPath("~/ZipFiles/" + entry.FilePath));

                                        fileReader = File.ReadAllText(Extractedfiles);
                                        _outXmlStr = fileReader;
                                        _tempByte_lvx = _outXmlStr;
                                        _strLvx = "LVX";
                                    }


                                    FileInfo _fileInfo = new FileInfo(Extractedfiles);
                                    long _NumBytes = _fileInfo.Length;
                                    FileStream _FStream = new FileStream(Extractedfiles, FileMode.Open, FileAccess.Read);
                                    BinaryReader _BinaryReader = new BinaryReader(_FStream);


                                    if (extension == ".lvx")
                                    {
                                    }
                                    else if (extension == ".pnl")
                                    {
                                        _tempByte_pnl = _BinaryReader.ReadBytes(Convert.ToInt32(_NumBytes));
                                    }
                                    else if (extension == ".jpg")
                                    {
                                        _tempByte_img = _BinaryReader.ReadBytes(Convert.ToInt32(_NumBytes));
                                    }
                                    _fileInfo = null;
                                    _NumBytes = 0;
                                    _FStream.Close();
                                    _FStream.Dispose();
                                    _BinaryReader.Close();
                                    _BinaryReader.Dispose();
                                }
                            }

                            string unit = uploadedZipFileWithOutExtension;
                            int index1 = unit.LastIndexOf('_');
                            string getModel = unit.Substring(index1 + 1);
                            _getModel = getModel;

                            double _dblHeight = 0;
                            double _dblWidth = 0;


                            _dblHeight = Convert.ToDouble(formHeightResponse[i2]);

                            _dblWidth = Convert.ToDouble(formWidthResponse[i2]);


                            try
                            {
                                if (labelLinkType == 0)
                                {
                                    uploadedZipFileWithOutExtension = appID + "_" + printerCode + "_" + functionality + "_" + getModels;
                                }
                                else
                                {
                                    uploadedZipFileWithOutExtension = appID + "_" + printerCode + "_" + labelLinkType + "_" + getModels;
                                }
                                response = InsertModel(appID, uploadedZipFileWithOutExtension, _tempByte_pnl, _tempByte_lvx, _tempByte_img, getModels, _dblWidth, _dblHeight, userID, functionality, labelLinkType, printerCode, deviceTokenEntry);

                                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    return response;
                                }
                                try
                                {
                                    var checkFilePathArray = Directory.GetFiles(filePath);
                                    //foreach (var item in checkFilePathArray)
                                    //{
                                    //    File.Delete(item.ToString());
                                    //}
                                }
                                catch (Exception ex)
                                {

                                    response.StatType = AtParWebEnums.StatusType.Error;
                                    response.StatusMessage = ex.Message;
                                    return response;

                                }

                            }
                            catch (Exception ex)
                            {

                                response.StatType = AtParWebEnums.StatusType.Error;
                                response.StatusMessage = ex.Message;
                                return response;
                            }

                        }
                    }
                    return response;
                }
                response.StatusMessage = "Please Upload the file.";
                response.StatType = AtParWebEnums.StatusType.Warn;
                return response;
            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.StatusMessage = ex.Message;
                return response;
            }
        }


        #endregion
    }
}
