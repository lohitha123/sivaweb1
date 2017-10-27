using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Reflection;
using System.Management;
using System.IO;
using System.Text;
using System.Drawing;


using System.Linq;
//using Newtonsoft.Json;

namespace AtPar.TrackIT.Service
{
    public class ManageEquipmentItemsService : IManageEquipmentItemsService
    {
        #region Private Variable

        ILog _log;
        IManageEquipmentItemsRepository _repo;
        ICommonRepository _commonRepo;
        bool _isZebraPrinter = false;
        StreamReader _streamToPrint;
        Font _printFont;
        #endregion

        #region Constructor

        public ManageEquipmentItemsService(IManageEquipmentItemsRepository repo, ILog log, ICommonRepository commonRepository)
        {
            _repo = repo;
            _log = log;
            _commonRepo = commonRepository;
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets all Master Items
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItems()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_MASTER>();

            try
            {
                response.DataList = _repo.GetMasterItems();
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }



        /// <summary>
        /// Gets all Master Items
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<TKIT_ITEM_MASTER> GetMasterItems(string itemID,string description)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_MASTER>();

            try
            {
                response.DataList = _repo.GetMasterItems(itemID,description);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }



        /// <summary>
        /// Gets the Items for the passed Equipment type
        /// </summary>
        /// <param name="equipmentType"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<object> GetItemsForSelectedEqType(string equipmentType, string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            Tuple<string, List<VM_TKIT_ITEM_MASTER>> output = null;

            var response = new AtParWebApiResponse<object>();

            try
            {
                output = _repo.GetItemsForSelectedEqType(equipmentType, itemId);

                response.DataVariable = output;


                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        /// <summary>
        /// Gets the Item Departments
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="orgGrpId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_TKIT_ITEM_DEPT> GetItemDepartments(string itemId, string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_TKIT_ITEM_DEPT>();

            try
            {
                response.DataList = _repo.GetItemDepartments(itemId, orgGrpId);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        /// <summary>
        /// Gets the Equipment Types
        /// </summary>
        /// <param name="itemIndicator"></param>
        /// <param name="orgGrpId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_ITEM_TYPE>();

            try
            {
                response.DataList = _repo.GetEquipmentTypes(itemIndicator, orgGrpId);
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        /// <summary>
        /// Checks is Item is Ordered or not
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<bool> IsItemOrdered(string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<bool>();
            bool isItemOrdered = false;
            try
            {
                var transCount = _repo.CheckIfItemIsOrdered(itemId);
                if (transCount > 0)
                {
                    isItemOrdered = true;
                }
                response.DataVariable = isItemOrdered;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        /// <summary>
        /// Gets the Items Details based on the specified Item Type
        /// </summary>
        /// <param name="itemType"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<object> GetTypeItems(string itemType, string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            try
            {
                if (string.IsNullOrEmpty(itemId) || itemId == "null" || itemId == "undefined")
                {
                    itemId = string.Empty; ;
                }


                List<VM_TKIT_ITEM_DETAILS> lstItemDetails = null;
                List<TKIT_ITEM_INVENTORY> lstLotSerialDetails = null;

                string itemTypeIndicator = _repo.GetItemTypeIndicator(itemType);

                if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()))
                {
                    lstItemDetails = _repo.GetBoxItemDetails(itemType, itemId);
                }
                else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    lstItemDetails = _repo.GetEquipmentItemDetails(itemType, itemId);

                    if (lstItemDetails.Count == 1)
                    {
                        itemId = lstItemDetails.FirstOrDefault().ITEM_ID;
                    }

                    lstLotSerialDetails = _repo.GetLotSerialDetails(itemId);
                }
                else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                {
                    lstItemDetails = _repo.GetFurnitureItemDetails(itemType, itemId);
                }

                if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()) || itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    BuildDeptDetails(lstItemDetails);
                }

                var filePath = string.Empty;

                lstItemDetails.ForEach(x => x.CHK_VALUE = 0);

                response.DataVariable = new Tuple<string, List<VM_TKIT_ITEM_DETAILS>, List<TKIT_ITEM_INVENTORY>>(itemTypeIndicator, lstItemDetails, lstLotSerialDetails);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        /// <summary>
        /// Updates the Item Info
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateItems(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, string itemTypeIndicator)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = AtparStatusCodes.ATPAR_OK;

            try
            {
                lstItemDetails.RemoveAll(x => x.CHK_VALUE == 0);

                if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()))
                {
                    StatusCode = _repo.UpdateBoxItemInfo(lstItemDetails);
                }
                else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    StatusCode = _repo.UpdateEquipmentItemInfo(lstItemDetails);
                }
                else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                {
                    StatusCode = _repo.UpdateFurnitureItemInfo(lstItemDetails);
                }

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// Insert/Update/Print the Item Details based on mode specified
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="lstItemInvDetails"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <param name="mode"></param>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> SaveItemDetails(Dictionary<string, dynamic> dicitemdetails,
                                                         string itemTypeIndicator, string mode, string profileId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = AtparStatusCodes.ATPAR_OK;

            List<VM_TKIT_ITEM_DETAILS> lstItemDetails = new List<VM_TKIT_ITEM_DETAILS>();
            List<TKIT_ITEM_INVENTORY> lstItemInvDetails = new List<TKIT_ITEM_INVENTORY>();



            foreach (var keyValuePair in dicitemdetails)
            {
                switch (keyValuePair.Key)
                {
                    case "lstItemDetails":
                        foreach (var item in keyValuePair.Value)
                        {
                            // lstItemDetails = JsonConvert.DeserializeObject<List<VM_TKIT_ITEM_DETAILS>>(item.ToString());

                            var itemdetails = new VM_TKIT_ITEM_DETAILS
                            {
                                ORG_GROUP_ID = item.ORG_GROUP_ID,

                                ITEM_ID = item.ITEM_ID,
                                ITEM_DESCR = item.ITEM_DESCR,
                                ITEM_QTY = item.ITEM_QTY,
                                MANUFACTURER = item.MANUFACTURER,
                                VENDOR = item.VENDOR,
                                IMAGE = item.IMAGE,
                                COMMENTS = item.COMMENTS,
                                DESTRUCTION_DATE = item.DESTRUCTION_DATE,
                                CREATE_DATE = item.CREATE_DATE,
                                UPDATE_DATE = item.UPDATE_DATE,
                                ITEM_INACTIVATED = item.ITEM_INACTIVATED,
                                DESCRIPTION = item.DESCRIPTION,
                                STORAGE_LOCATION = item.STORAGE_LOCATION,
                                OWNER = item.OWNER,
                                OWNER_TYPE = item.OWNER_TYPE,
                                ITEM_TYPE = item.ITEM_TYPE,
                                UPDATEUSERNAME = item.UPDATEUSERNAME,
                                CREATEUSERNAME = item.CREATEUSERNAME,
                                DEPT_ID = item.DEPT_ID,
                                CHK_VALUE = item.CHK_VALUE

                            };

                            lstItemDetails.Add(itemdetails);

                        }
                        break;

                    case "lstItemInvDetails":

                        foreach (var item in keyValuePair.Value)
                        {
                            // lstItemInvDetails = JsonConvert.DeserializeObject<List<TKIT_ITEM_INVENTORY>>(item.ToString());
                            var iteminventorydetails = new TKIT_ITEM_INVENTORY
                            {
                                ORG_GROUP_ID = item.ORG_GROUP_ID,
                                ITEM_TYPE = item.ITEM_TYPE,
                                ITEM_ID = item.ITEM_ID,
                                SERIAL_NO = item.SERIAL_NO,
                                LOT_NO = item.LOT_NO,
                                ITEM_QTY = item.ITEM_QTY,

                                STORAGE_LOCATION = item.STORAGE_LOCATION,
                                SERVICE_DT_TIME = item.SERVICE_DT_TIME,
                                STATUS = item.STATUS,
                                USER_FIELD_1 = item.USER_FIELD_1,
                                USER_FIELD_2 = item.USER_FIELD_2,
                                AVAILABILITY = item.AVAILABILITY,
                                CHECKIN_DATE = item.CHECKIN_DATE,
                                UPDATE_DATE = item.UPDATE_DATE,
                                UPDATE_USER_ID = item.UPDATE_USER_ID,


                                ASSET_ID = item.ASSET_ID

                            };



                            lstItemInvDetails.Add(iteminventorydetails);
                        }
                        break;
                }
            }

            try
            {
                if (mode.Equals(AtParWebEnums.AddEdit_Enum.ADD.ToString()) || mode.Equals(AtParWebEnums.AddEdit_Enum.ADDNPRINT.ToString()))
                {
                    StatusCode = _repo.CreateItem(lstItemDetails, lstItemInvDetails, itemTypeIndicator);
                }
                else if (mode.Equals(AtParWebEnums.AddEdit_Enum.EDIT.ToString()) || mode.Equals(AtParWebEnums.AddEdit_Enum.UPDATENPRINT.ToString()))
                {
                    StatusCode = _repo.UpdateItem(lstItemDetails, lstItemInvDetails, itemTypeIndicator);
                }

                if (StatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    if (mode.Equals(AtParWebEnums.AddEdit_Enum.ADDNPRINT.ToString()) || mode.Equals(AtParWebEnums.AddEdit_Enum.UPDATENPRINT.ToString()) || mode.Equals(AtParWebEnums.AddEdit_Enum.PRINT.ToString()))
                    {
                        StatusCode = PrintLabel(lstItemDetails[0].ITEM_ID, lstItemDetails[0].ITEM_DESCR, lstItemDetails[0].STORAGE_LOCATION, profileId);
                    }
                }

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }



        #endregion

        #region Private Methods

        /// <summary>
        /// Builds the Item Departments
        /// </summary>
        /// <param name="itemDetails"></param>
        private void BuildDeptDetails(List<VM_TKIT_ITEM_DETAILS> itemDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                List<TKIT_ITEM_DEPT> lstItemDepatments = _repo.GetDepartments();

                foreach (var item in itemDetails)
                {
                    var departments = lstItemDepatments.Where(x => x.ITEM_ID == item.ITEM_ID).Select(x => x.DEPT_ID);

                    item.DEPT_ID = string.Join(",", departments);

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Prints the Label
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="itemDescription"></param>
        /// <param name="storageLocation"></param>
        /// <param name="profileId"></param>
        /// <returns></returns>
        private long PrintLabel(string itemId, string itemDescription, string storageLocation, string profileId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = AtparStatusCodes.ATPAR_OK;
            bool printerMatched = false;
            const string DEFAULT_PRINTER = "DEFAULT_PRINTER";

            try
            {
                if (string.IsNullOrWhiteSpace(itemId).Equals(false) && string.IsNullOrWhiteSpace(itemDescription).Equals(false)
                               && string.IsNullOrWhiteSpace(storageLocation).Equals(false))
                {
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug(methodBaseName + string.Format("Item Id : {0}, Item Desc : {1}, Storage Loc : {2}",
                         itemId, itemDescription, storageLocation));
                    }

                    string defaultPrinter = _commonRepo.GetProfileParamValue(profileId, (int)AtParWebEnums.EnumApps.TrackIT, DEFAULT_PRINTER);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + String.Concat("Default Printer ", defaultPrinter)); }

                    foreach (var installedPrinter in PrinterSettings.InstalledPrinters)
                    {
                        if (defaultPrinter.Equals(installedPrinter))
                        {
                            printerMatched = true;
                            break;
                        }
                    }

                    string query = string.Format("SELECT * from Win32_Printer WHERE Name LIKE '%{0}'", defaultPrinter);
                    var search = new ManagementObjectSearcher(query);
                    ManagementObjectCollection printerCollection = search.Get();

                    foreach (ManagementObject printer in printerCollection)
                    {
                        foreach (PropertyData property in printer.Properties)
                        {
                            if ((property.Name == "DriverName"))
                            {
                                if ((property.Value.ToString().Contains("ZEBRA")))
                                {
                                    _isZebraPrinter = true;
                                }
                            }
                        }
                    }

                    //Based on the printer type we are formating the printed string here. 
                    //Here "*" indicates the portion which needs to be printed in the Bar code format and this "*" will be removed while printing the page before aplying the font
                    string message = "*" + itemId + "*" + Environment.NewLine + itemId + Environment.NewLine + " " + itemDescription + Environment.NewLine + "*" + storageLocation + "*" + Environment.NewLine + " " + storageLocation;

                    if (printerMatched)
                    {
                        try
                        {
                            MemoryStream stream = new MemoryStream(new ASCIIEncoding().GetBytes(message));
                            _streamToPrint = new StreamReader(stream);
                            try
                            {
                                _printFont = new Font("Arial", 10);
                                PrintDocument printDoc = new PrintDocument();
                                printDoc.PrintPage += this.PrintDocument_PrintPage;
                                printDoc.PrinterSettings.PrinterName = defaultPrinter;
                                printDoc.Print();
                            }
                            finally
                            {
                                _streamToPrint.Close();
                                _streamToPrint.Dispose();
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} Failed to print the output file {1} {2}:", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                            statusCode = AtparStatusCodes.E_REMOTEERROR;
                        }
                    }
                    else
                    {
                        statusCode = AtparStatusCodes.ATPAR_E_NOPRINTADDRESS;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2}:", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                statusCode = AtparStatusCodes.E_SERVERERROR;
            }

            return statusCode;
        }

        /// <summary>
        /// Formats the Info to Print
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void PrintDocument_PrintPage(object sender, PrintPageEventArgs e)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            float linesPerPage = 0;
            float yPosition = 0;
            int count = 0;
            float leftMargin = e.MarginBounds.Left;
            float topMargin = e.MarginBounds.Top;
            string line = null;
            float drawStringheight = 0;

            try
            {
                // Calculate the number of lines per page.
                linesPerPage = e.MarginBounds.Height / _printFont.GetHeight(e.Graphics);

                if (_isZebraPrinter || linesPerPage == 0)
                {
                    linesPerPage = 8;
                    topMargin = 0;
                    leftMargin = 4;
                }

                // Print each line of the file.
                while (count < linesPerPage)
                {
                    line = _streamToPrint.ReadLine();
                    if (line == null)
                    {
                        break;
                    }
                    if (line.Length > 25)
                    {
                        string lineData = string.Empty;
                        int chunkSize = 26;
                        int stringLength = line.Length;
                        int i = 0;
                        while (i < stringLength)
                        {
                            if (i + chunkSize > stringLength)
                            {
                                chunkSize = stringLength - i;
                            }
                            lineData = line.Substring(i, chunkSize);

                            if (lineData.Contains("*"))
                            {
                                lineData = lineData.Replace("*", "");
                                BarcodeDefns.BarcodeDefns barcodedef = new BarcodeDefns.BarcodeDefns();
                                _printFont = new Font("IDAutomationC128S", 11);
                                lineData = barcodedef.Code128(line);
                            }
                            else
                            {
                                _printFont = new Font("Arial", 9);
                            }

                            yPosition = yPosition + drawStringheight + 1;
                            drawStringheight = _printFont.GetHeight(e.Graphics);
                            e.Graphics.DrawString(lineData, _printFont, Brushes.Black, leftMargin, yPosition, new StringFormat());
                            count += 1;
                            i += chunkSize;
                        }
                    }
                    else
                    {
                        if (line.Contains("*"))
                        {
                            line = line.Replace("*", "");
                            BarcodeDefns.BarcodeDefns barcodedef = new BarcodeDefns.BarcodeDefns();
                            _printFont = new Font("IDAutomationC128S", 11);
                            line = barcodedef.Code128(line);
                        }
                        else
                        {
                            _printFont = new Font("Arial", 9);
                        }

                        yPosition = yPosition + drawStringheight + 1;
                        drawStringheight = _printFont.GetHeight(e.Graphics);
                        e.Graphics.DrawString(line, _printFont, Brushes.Black, leftMargin, yPosition, new StringFormat());
                        count += 1;
                    }
                }
                // If more lines exist, print another page.
                if ((line != null))
                {
                    e.HasMorePages = true;
                }
                else
                {
                    e.HasMorePages = false;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} Failed to print the output file {1} {2}:", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
            }
        }



        #endregion

    }
}

