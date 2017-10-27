using System;

using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.POU;
using System.Collections.Generic;
using System.Text;
using AtPar.ViewModel;
using BarcodeLib;
using System.Data;
using System.Diagnostics;
using System.Reflection;
using System.Linq;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Common;
using AtPar_BusinessRules;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;

namespace AtPar.POU.Service
{
    public class PostPickQAService : IPostPickQAService
    {
        #region Private

        IPostPickQARepository _postPickQARepository;
        ICommonPOUService _PouCommonService;
        ILog _log;
        ICommonRepository _commonRepo;
        #endregion

        #region Constructor

        public PostPickQAService(IPostPickQARepository repository, ILog log, ICommonRepository commonRepository, ICommonPOUService pouService)
        {
            _postPickQARepository = repository;
            _PouCommonService = pouService;
            _log = log;
            _commonRepo = commonRepository;          
            _log.SetLoggerType(typeof(ProcedureCodeService));
        }
        #endregion

        #region BuildReportPrint
        public AtParWebApiResponse<long> BuildReportPrint(string appID, string objectID, string section, List<VM_MT_POU_CASE_CART_DETAILS> lstPrint1, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
            string m_CartID = null;
            int m_cnt = 0;
            int m_cntForCompletlyPicked = 0;
            int m_cntForUnknownLoc = 0;
            DataSet dsReportHdrStructure = new DataSet();
            DataSet lstPrint = new DataSet();
            string reportString = string.Empty;
            List<VM_MT_POU_CASE_CART_DETAILS> obj = new List<VM_MT_POU_CASE_CART_DETAILS>();

            obj = lstPrint1;
            // DataTable dsReportTable1 = obj.ToDataTable();//Utils.ToDataTable(obj);
            // dsReportTable1.TableName = "ITEMS";
            //lstPrint.Tables.Add(dsReportTable1);

            lstPrint = obj.ToDataSet();
            lstPrint.Tables[0].TableName = "ITEMS";


            try
            {
                var dsReportHdrStructure1 = _postPickQARepository.BuildReportPrint(appID, objectID, section, deviceTokenEntry);
                // DataTable dsReportTable = dsReportHdrStructure1.ToDataTable();// Utils.ToDataTable(dsReportHdrStructure1);
                //dsReportTable.TableName = "Table";
                // dsReportHdrStructure.Tables.Add(dsReportTable);

                dsReportHdrStructure = dsReportHdrStructure1.ToDataSet();

                DataTable tbPrint = new DataTable();
                for (int intHdrCnt = 0; intHdrCnt <= dsReportHdrStructure.Tables[0].Rows.Count - 1; intHdrCnt++)
                {
                    //  DataColumn ColPrint = new DataColumn(dsReportHdrStructure.Tables[0].Rows[intHdrCnt].Item//["FIELD_NAME"]);
                    DataColumn ColPrint = new DataColumn(dsReportHdrStructure.Tables[0].Rows[intHdrCnt]["FIELD_NAME"].ToString());
                    tbPrint.Columns.Add(ColPrint);
                }

                for (int intPrintCnt = 0; intPrintCnt <= lstPrint.Tables["ITEMS"].Rows.Count - 1; intPrintCnt++)
                {
                    DataRow drRow = tbPrint.NewRow();
                    for (int intColCnt = 0; intColCnt <= tbPrint.Columns.Count - 1; intColCnt++)
                    {
                        //drRow[tbPrint.Columns[intColCnt].ColumnName] = lstPrint.Tables["ITEMS"].Rows[intPrintCnt].Item[tbPrint.Columns[intColCnt].ColumnName];
                        drRow[tbPrint.Columns[intColCnt].ColumnName] = lstPrint.Tables["ITEMS"].Rows[intPrintCnt][tbPrint.Columns[intColCnt].ColumnName];
                    }
                    tbPrint.Rows.Add(drRow);
                }

                StringBuilder sbHtmlString = new StringBuilder();
                StringBuilder sbHdrHtmlString = new StringBuilder();
                StringBuilder sbTdHtmlString = new StringBuilder();
                double dblShortageQty = 0;
                string strCartID = string.Empty;
                string strCartDescr = string.Empty;
                string chr = Convert.ToString((char)34);

                //Details Table Headres Starts
                sbHtmlString.Append("<table align=left width=100% style=" + chr + "BORDER-COLLAPSE:collapse" + chr + " border=1>");
                sbHtmlString.Append("<tr bgcolor=#d3d3d3>");
                for (int intCnt = 0; intCnt <= tbPrint.Columns.Count - 1; intCnt++)
                {
                    if (tbPrint.Columns[intCnt].ColumnName != "CART_ID")
                    {
                        if (tbPrint.Columns[intCnt].ColumnName != "CART_DESCR" && tbPrint.Columns[intCnt].ColumnName != "TOTAL_QTY")
                        {
                            //sbHtmlString.Append("<td align=center nowrap><span class=c2><b>" + dsReportHdrStructure.Tables[0].Rows[intCnt].Item["DISPLAY_NAME"] + "</b></span></td>");
                            sbHtmlString.Append("<td align=center nowrap><span class=c2><b>" + dsReportHdrStructure.Tables[0].Rows[intCnt]["DISPLAY_NAME"] + "</b></span></td>");
                        }
                    }
                }

                sbHtmlString.Append("</tr>");
                //Details Table Starts
                for (int i = 0; i <= tbPrint.Rows.Count - 1; i++)
                {
                    for (int k = 0; k <= tbPrint.Columns.Count - 1; k++)
                    {
                        if (tbPrint.Columns[k].ColumnName != "CART_ID")
                        {
                            if (tbPrint.Columns[k].ColumnName != "CART_DESCR" && tbPrint.Columns[k].ColumnName != "TOTAL_QTY")
                            {
                                DataRow[] drFieldType = null;
                                drFieldType = dsReportHdrStructure.Tables[0].Select("FIELD_NAME='" + tbPrint.Columns[k].ColumnName + "'");
                                if (drFieldType[0]["FIELD_TYPE"].ToString() == "BARCODE")
                                {
                                    if (tbPrint.Rows[i]["ITEM"] != null)
                                    {
                                        sbTdHtmlString.Append("<td align=center valign=middle> <img style='vertical-align:middle' src='data:image/jpg;base64," + createBarCode(tbPrint.Rows[i]["ITEM"].ToString())+"'/></td>");

                                    }

                                }
                                else
                                {
                                    if (drFieldType[0]["FIELD_TYPE"].ToString() == "TEXT")
                                    {
                                        sbTdHtmlString.Append("<td align=left width='300px'>");
                                    }
                                    else if (drFieldType[0]["FIELD_TYPE"].ToString() == "INTEGER")
                                    {
                                        sbTdHtmlString.Append("<td align=right nowrap>");
                                    }
                                    //sbTdHtmlString.Append("<span class=c2>" + tbPrint.Rows[i].Item(tbPrint.Columns[k].ColumnName) + "</span></td>");
                                    sbTdHtmlString.Append("<span class=c2>" + tbPrint.Rows[i][tbPrint.Columns[k].ColumnName] + "</span></td>");
                                    if (tbPrint.Columns[k].ColumnName == "SHORTAGE_QTY")
                                    {
                                        //dblShortageQty = Convert.ToDouble(tbPrint.Rows[i].Item(tbPrint.Columns[k].ColumnName));
                                        dblShortageQty = Convert.ToDouble(tbPrint.Rows[i][tbPrint.Columns[k].ColumnName]);
                                    }
                                }
                            }
                        }
                        else
                        {
                            strCartID = string.Empty;
                            strCartDescr = string.Empty;
                            strCartID = (Convert.IsDBNull(tbPrint.Rows[i][tbPrint.Columns[k].ColumnName]) ? string.Empty : tbPrint.Rows[i][tbPrint.Columns[k].ColumnName].ToString());
                            strCartDescr = (Convert.IsDBNull(tbPrint.Rows[i]["CART_DESCR"]) ? string.Empty : tbPrint.Rows[i]["CART_DESCR"].ToString());
                            if (dblShortageQty > 0 && !string.IsNullOrEmpty(strCartID) && m_CartID != strCartID)
                            {
                                sbHdrHtmlString.Remove(0, sbHdrHtmlString.Length);
                                if (m_cnt == 0)
                                {
                                    m_cnt = m_cnt + 1;
                                    var with1 = sbHdrHtmlString;
                                    with1.Append("<tr>");
                                    with1.Append("<td colspan=9 align=left nowrap><span class=c8><b>Shortage items:</b></span></td>");
                                    with1.Append("</tr>");
                                }
                                var with2 = sbHdrHtmlString;
                                with2.Append("<tr>");
                                with2.Append("<td colspan=4 align=left nowrap><span class=c2><b>Supply location:  " + strCartDescr + "</b></span></td>");
                                with2.Append("<td colspan=5 align=center valign=middle ><img style='vertical-align:middle' src='data:image/jpg;base64," + createBarCode(strCartID) + "'</td>");
                                with2.Append("<td></td>");
                                with2.Append("</tr>");
                            }
                            else if (dblShortageQty == 0 && m_cntForCompletlyPicked == 0)
                            {
                                m_cnt = m_cnt + 1;
                                m_cntForCompletlyPicked = 1;
                                sbHtmlString.Append("<tr>");
                                sbHtmlString.Append("<td colspan=9 align=left nowrap><span class=c8><b>Completely picked items:</b></span></td>");
                                sbHtmlString.Append("</tr>");
                            }
                            else if (dblShortageQty > 0 && string.IsNullOrEmpty(strCartID) & m_cntForUnknownLoc == 0)
                            {
                                sbHdrHtmlString.Remove(0, sbHdrHtmlString.Length);
                                m_cnt = m_cnt + 1;
                                m_cntForUnknownLoc = m_cntForUnknownLoc + 1;
                                var _with3 = sbHdrHtmlString;
                                _with3.Append("<tr>");
                                _with3.Append("<td colspan=9 align=left nowrap><span class=c8><b>Unknown items:</b></span></td>");
                                _with3.Append("</tr>");
                            }
                            m_CartID = strCartID;
                        }
                    }
                    if (sbHdrHtmlString.Length > 0)
                    {
                        sbHtmlString.Append(sbHdrHtmlString.ToString());
                        sbHdrHtmlString.Remove(0, sbHdrHtmlString.Length);
                    }
                    sbHtmlString.Append("<tr>");
                    sbHtmlString.Append(sbTdHtmlString.ToString());
                    sbHtmlString.Append("</tr>");
                    sbTdHtmlString.Remove(0, sbTdHtmlString.Length);
                }
                sbHtmlString.Append("</table>");
                reportString = sbHtmlString.ToString();
                response.DataVariable = reportString;
                response.AtParSuccess();

                return response;


            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion
        private string createBarCode(string itemId)
        {
            var br = new BarcodeLib.Barcode();
            br.IncludeLabel = true;
            br.LabelPosition = BarcodeLib.LabelPositions.BOTTOMCENTER;
            br.Height = 50;
            System.Drawing.Image img = br.Encode(BarcodeLib.TYPE.CODE128, itemId);
            var ms = new MemoryStream();
            br.EncodedImage.Save(ms, ImageFormat.Gif);

            // var ms2 = new MemoryStream(ms.GetBuffer());
            byte[] byteArr = ms.ToArray();
            var binStr = Convert.ToBase64String(byteArr);
            return binStr;
            // System.Drawing.Image rimg = Image.FromStream(ms2);
        }       
        #region GetPostPickQAItems

        public AtParWebApiResponse<long> GetPostPickQAItems(string caseID, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string cartName = string.Empty;
            string strCartDescr = string.Empty;
            string businessUnit = string.Empty;
            string strLocType = string.Empty; 
            long statusCode = -1;
            string strErpSystem = string.Empty;
            string strCustItemNo = string.Empty;
            string strItemID = string.Empty;
            string strPrefId = string.Empty;
            string strProcId = string.Empty;
            StringBuilder sbItems = new StringBuilder();
            string strSearch = string.Empty;
            string strAllocSearch = string.Empty;
            DataTable retTbl = new DataTable();
            DataTable tblItems = new DataTable();
            DataRow[] drAllocItems;
            DataRow drItems;
            DataRow[] drPickedItems;
            var listPickedDetails = new List<VM_MT_POU_CHARGECAPTURE_DETAILS>();
            List<VM_MT_POU_CHARGECAPTURE_DETAILS> arrayOfPickedItem = null;//= listPickedDetails.ToArray();
            DataSet dsCaseItemsInfo = new DataSet();
            List<VM_MT_POU_CASE_CART_DETAILS> lstPickedItem = null;
            var listCartAllocDetails = new List<MT_POU_DEPT_CART_ALLOCATIONS>();
            List<VM_MT_POU_CASE_CART_DETAILS> arrayCartAllocDetails = null;
            List<VM_MT_POU_CASE_CART_DETAILS> lsttblItems = new List<VM_MT_POU_CASE_CART_DETAILS>();
            DataSet nonCartItem = new DataSet();
            //  List<VM_MT_POU_CASE_CART_DETAILS> nonCartItemDS = new List<VM_MT_POU_CASE_CART_DETAILS>();
            DataSet nonCartItemDS = new DataSet();
            // DataTable retTbl = new DataTable();
            DataSet quantityOnHandDS = new DataSet();
            try
            {
                VM_MT_POU_CASE_ITEMS lstPouCaseItemDetails = new VM_MT_POU_CASE_ITEMS();
                var lstUserAllocatedLocations = _postPickQARepository.GetPostPickQAItems(caseID, appID, deviceTokenEntry);
                //var lstPickedAndPartially = _postPickQARepository.GetPickedAndPartially(caseID);
                //var lstNonPickedItems = _postPickQARepository.GetNonPickedItems(caseID);
                //var lstPhysicians = _postPickQARepository.GetPhysicians(caseID);
                //var lstLotSerials = _postPickQARepository.GetLotSerials(caseID);
                lstPouCaseItemDetails.lstPouDeptCartAllocation = lstUserAllocatedLocations.lstPouDeptCartAllocation;
                lstPouCaseItemDetails.lstPouChargeCaptureDetails = lstUserAllocatedLocations.lstPouChargeCaptureDetails;
                lstPouCaseItemDetails.lstPouCaseCartDetails = lstUserAllocatedLocations.lstPouCaseCartAllocation;
                lstPouCaseItemDetails.lstPouPhysician = lstUserAllocatedLocations.lstPouPhysician;
                lstPouCaseItemDetails.lstPouAtParSerial = lstUserAllocatedLocations.lstPouLotSerial;
                var LOCATIONS = lstPouCaseItemDetails.lstPouDeptCartAllocation;
                var PICKEDITEMS = lstPouCaseItemDetails.lstPouChargeCaptureDetails.ToDataTable();
                var NONPICKEDITEMS = lstPouCaseItemDetails.lstPouCaseCartDetails.ToDataTable();
                var DESCRS = lstPouCaseItemDetails.lstPouPhysician.ToDataTable();
                // response.DataList = lstPouCaseItemDetails;
                //response.DataDictionary = new Dictionary<string, object> { { "lstPickedAndPartially", lstPickedAndPartially }, { "lstNonPickedItems", lstNonPickedItems }, { "lstPhysicians", lstPhysicians }, { "lstLotSerials", lstLotSerials }, { "lstUserAllocatedLocations", lstUserAllocatedLocations } };
                if (LOCATIONS.Count > 0)
                {
                    // MT_POU_DEPT_CART_ALLOCATIONS pouDeptCartAllocation = new MT_POU_DEPT_CART_ALLOCATIONS();
                    //VM_MT_POU_CASE_CART_DETAILS pouDeptCartAllocation = new VM_MT_POU_CASE_CART_DETAILS();
                    retTbl = new DataTable("LOOKUPITEMS");
                    retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                    retTbl.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));
                    retTbl.Columns.Add("CUST_ITEM_NO", Type.GetType("System.String"));
                    retTbl.Columns.Add("MANF_ID", Type.GetType("System.String"));
                    retTbl.Columns.Add("QUANTITY_ON_HAND", Type.GetType("System.String"));
                    retTbl.Columns.Add("CART_ID", Type.GetType("System.String"));
                    retTbl.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                    retTbl.Columns.Add("CART_DESCR", Type.GetType("System.String"));
                    retTbl.Columns.Add("COMPARTMENT", Type.GetType("System.String"));

                    for (int i = 0; i <= LOCATIONS.Count - 1; i++)
                    {
                        cartName = LOCATIONS[i].CART_ID;
                        businessUnit = LOCATIONS[i].BUSINESS_UNIT;
                        strLocType = LOCATIONS[i].LOCATION_TYPE;
                        strCartDescr = string.Empty;
                        DataSet detDS = new DataSet();
                        List<MT_POU_DEPT_CART_ALLOCATIONS> detDS1 = new List<MT_POU_DEPT_CART_ALLOCATIONS>();

                        //DataTable dsReportTable2 = Utils.ToDataTable(LOCATIONS);
                        //DataTable dsReportTable3 = Utils.ToDataTable(DESCRS);
                        //dsReportTable2.TableName = "Table";
                        //detDS.Tables.Add(dsReportTable2);
                        //dsReportTable3.TableName = "Table4";
                        //detDS.Tables.Add(dsReportTable3);

                        //Service Call for _GetCartDetails Tuple <statusCode,detDS > =
                        //var p= _PouSetUpService.GetCartDetails(cartName, businessUnit, detDS, deviceTokenEntry[(int)TokenEntry_Enum.OrgGrpID], deviceTokenEntry[(int)TokenEntry_Enum.SystemId], deviceTokenEntry[(int)TokenEntry_Enum.ProfileID], strLocType);

                        //var tupleResult = _PouSetUpService.GetCartDetails(cartName, businessUnit, detDS, deviceTokenEntry[(int)TokenEntry_Enum.OrgGrpID], deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId]);

                        Tuple<long, DataSet> data = _PouCommonService.GetCartDetails(cartName, businessUnit, detDS, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID], strLocType);
                        //var tupleResult = _PouSetUpService.GetCartDetails(cartName, businessUnit, detDS, "NOI", "NOI", "NOI", strLocType);
                        detDS = data.Item2;
                        statusCode = data.Item1;
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " : No Items found for the Cart : " + cartName + " : Bunit : " + businessUnit + " : ");
                                continue;
                            }
                            else if (statusCode == AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " : Cart does not exists : " + cartName + "");
                                continue;
                            }
                            else
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + ": Failed to get cart details : " + "StatusCode is : " + statusCode);
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + ":No Items found for the Cart : " + cartName + " : BUnit : " + businessUnit + "");
                                continue;
                            }

                        }

                        if (detDS.Tables[0].Rows.Count > 0)
                        {
                            // strCartDescr = detDS.Tables[0].Rows[0].Item[Get_Cart_Detail_Output_Header_Enum.DESCR].ToString();
                            strCartDescr = detDS.Tables[0].Rows[0][(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.DESCR].ToString();
                            if (detDS.Tables[1].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() != System.Type.GetType("System.String").ToString())
                            {
                                statusCode = ConvertColumnType(detDS);

                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + " Failed to convert column's data type: " + "Status Code is " + statusCode);
                                    // return statusCode;
                                    response.AtParNotOK(statusCode, _commonRepo, _log);
                                    return response;
                                }

                            }
                        }

                        if (strLocType == AtParWebEnums.LocationType.I.ToString())
                        {
                            try
                            {
                                var lstdatatbl = PopulateCartItems(detDS, cartName, strCartDescr, businessUnit, AtParWebEnums.YesNo_Enum.Y.ToString(), ref retTbl, strLocType, deviceTokenEntry);
                                statusCode = lstdatatbl.Item1;
                                retTbl = lstdatatbl.Item2;
                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed in populating inventory items :" + " StatusCode is : " + statusCode);
                                    // return AtparStatusCodes.E_SERVERERROR;
                                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                    return response;
                                }

                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed in populating inventory items :" + " Exception is : " + ex.ToString());
                                //return AtparStatusCodes.E_SERVERERROR;
                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                return response;
                            }

                        }
                        else
                        {
                            try
                            {
                                var lstItemQtyOnHand = _postPickQARepository.GetItemQuantityOnHand(businessUnit, cartName);
                                statusCode = lstItemQtyOnHand.Item1;
                                // quantityOnHandDS = lstItemQtyOnHand.Item2;
                                // DataTable dsQtyOnHand = lstItemQtyOnHand.Item2.ToDataTable();// Utils.ToDataTable(lstItemQtyOnHand.Item2);
                                //dsReportTable3.TableName = "PICKEDITEMS";
                                quantityOnHandDS = lstItemQtyOnHand.Item2.ToDataSet();
                                // quantityOnHandDS.Tables.Add(dsQtyOnHand);
                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + " Failed to get the quantity on " + "hand for the items : " + "StatusCode is : " + statusCode);
                                    //return AtparStatusCodes.E_SERVERERROR;
                                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                    return response;
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to get the quantity on " + "hand for the items : " + "Exception is : " + ex.ToString());
                                //return AtparStatusCodes.E_SERVERERROR;
                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                return response;
                            }

                            try
                            {
                                var lsttbldata = PopulateCartItems(detDS, cartName, strCartDescr, businessUnit, AtParWebEnums.YesNo_Enum.Y.ToString(), ref retTbl, strLocType, deviceTokenEntry, quantityOnHandDS);
                                statusCode = lsttbldata.Item1;
                                retTbl = lsttbldata.Item2;
                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed in populating ERP par items :" + " StatusCode is : " + statusCode);
                                    //   return AtparStatusCodes.E_SERVERERROR;
                                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                    return response;
                                }

                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed in populating ERP par items :" + " Exception is : " + ex.ToString());
                                //  return AtparStatusCodes.E_SERVERERROR;
                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                return response;
                            }

                            try
                            {
                                ///'''Searching the Item in Non Cart Items 
                                var lstNonCartItems = _postPickQARepository.GetNonCartItems(businessUnit, cartName);
                                statusCode = lstNonCartItems.Item1;
                                // nonCartItemDS = lstNonCartItems.Item2;
                                //  DataTable dsNonCart = lstNonCartItems.Item2.ToDataTable();//Utils.ToDataTable(lstNonCartItems.Item2);
                                //dsReportTable3.TableName = "PICKEDITEMS";
                                nonCartItemDS = lstNonCartItems.Item2.ToDataSet();
                                // nonCartItemDS.Tables.Add(dsNonCart);

                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to get the non cart " + "items : StatusCode is : " + statusCode);
                                    // return statusCode;
                                    response.AtParNotOK(statusCode, _commonRepo, _log);
                                    return response;
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to get the non cart " + "items : Exception is : " + ex.ToString());
                                // return AtparStatusCodes.E_SERVERERROR;
                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                return response;
                            }

                            try
                            {
                                var lstPopCartItems = PopulateCartItems(nonCartItemDS, cartName, strCartDescr, businessUnit, AtParWebEnums.YesNo_Enum.N.ToString(), ref retTbl, strLocType, deviceTokenEntry, quantityOnHandDS);

                                statusCode = lstPopCartItems.Item1;
                                retTbl = lstPopCartItems.Item2;
                                if (statusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed in populating non cart items :" + " StatusCode is : " + statusCode);
                                    // return AtparStatusCodes.E_SERVERERROR;
                                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                    return response;
                                }

                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed in populating non cart items :" + " Exception is : " + ex.ToString());
                                // return AtparStatusCodes.E_SERVERERROR;
                                response.AtParException(ex, _commonRepo, _log);
                                return response;
                            }

                        }
                    }
                }

                List<string> lstParameters = new List<string> { AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                strErpSystem = AtParWebEnums.EnumApps.StockIssue + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                tblItems = new DataTable("ITEMS");
                tblItems.Columns.Add("CASE_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("PREF_LIST_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("PROCEDURE_CODE", Type.GetType("System.String"));
                tblItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("ITEM_ID_BARCODE", Type.GetType("System.String"));
                tblItems.Columns.Add("ITEM_DESCR", Type.GetType("System.String"));
                tblItems.Columns.Add("PICK_QTY", Type.GetType("System.Double"));
                tblItems.Columns.Add("HOLD_QTY", Type.GetType("System.Double"));
                tblItems.Columns.Add("QTY", Type.GetType("System.Double"));
                tblItems.Columns.Add("MANF_ITEM_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("TOTAL_QTY", Type.GetType("System.Double"));
                tblItems.Columns.Add("SHORTAGE_QTY", Type.GetType("System.String"));
                tblItems.Columns.Add("ITEM", Type.GetType("System.String"));
                tblItems.Columns.Add("CART_ID", Type.GetType("System.String"));
                tblItems.Columns.Add("CART_ID_BARCODE", Type.GetType("System.String"));
                tblItems.Columns.Add("BARCODE", Type.GetType("System.String"));
                tblItems.Columns.Add("CART_DESCR", Type.GetType("System.String"));
                tblItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));

                //strErpSystem = _commonRepo.GetConfigData(deviceTokenEntry[(int)TokenEntry_Enum.SystemId], CONFIGFILE.ERP_SYS_DETAILS.ToString, ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                foreach (DataRow caseItem in NONPICKEDITEMS.Rows)
                {
                    strCustItemNo = string.Empty;
                    strItemID = string.Empty;
                    strPrefId = string.Empty;
                    strProcId = string.Empty;
                    strPrefId = caseItem["PREF_LIST_ID"].ToString();
                    strProcId = caseItem["PROCEDURE_CODE"].ToString();
                    if (strErpSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.PMM.ToString().ToUpper())
                    {
                        if (!Convert.IsDBNull(caseItem["CUST_ITEM_NO"]) && !string.IsNullOrEmpty(caseItem["CUST_ITEM_NO"].ToString()))
                        {
                            strCustItemNo = caseItem["CUST_ITEM_NO"].ToString();
                        }
                        sbItems.Append(" ");
                        sbItems.Append("NOT (CUST_ITEM_NO = '" + strCustItemNo + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "')");
                        sbItems.Append(" AND ");
                        strSearch = "CUST_ITEM_NO = '" + strCustItemNo + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "'";
                        strAllocSearch = "CUST_ITEM_NO = '" + strCustItemNo + "'";
                        //arrayOfPickedItem = PICKEDITEMS.Where(x => x.CUST_ITEM_NO == strCustItemNo && x.PREF_LIST_ID == strPrefId && x.PROCEDURE_CODE == strProcId).ToList();

                    }
                    else
                    {
                        strItemID = caseItem["ITEM_ID"].ToString();
                        sbItems.Append(" ");
                        sbItems.Append("NOT (ITEM_ID = '" + strItemID + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "')");
                        sbItems.Append(" AND ");
                        strSearch = "ITEM_ID = '" + strItemID + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "'";
                        strAllocSearch = "ITEM_ID = '" + strItemID + "'";
                        //arrayOfPickedItem = PICKEDITEMS.Where(x => x.ITEM_ID == strItemID && x.PREF_LIST_ID == strPrefId && x.PROCEDURE_CODE == strProcId).ToList();

                    }

                    drPickedItems = PICKEDITEMS.Select(strSearch);
                    if ((retTbl != null))
                    {
                        drAllocItems = retTbl.Select(strAllocSearch, "QUANTITY_ON_HAND DESC");
                    }
                    else
                    {
                        drAllocItems = null;
                    }
                    drItems = tblItems.NewRow();

                    if (drPickedItems.Length > 0)
                    {
                        drItems["CASE_ID"] = drPickedItems[0]["CASE_ID"].ToString();
                        drItems["PREF_LIST_ID"] = drPickedItems[0]["PREF_LIST_ID"].ToString();
                        drItems["PROCEDURE_CODE"] = drPickedItems[0]["PROCEDURE_CODE"].ToString();
                        drItems["ITEM_ID"] = drPickedItems[0]["ITEM_ID"].ToString();
                        drItems["ITEM_DESCR"] = caseItem["ITEM_DESCR"].ToString();
                        drItems["PICK_QTY"] = Convert.ToDouble(caseItem["PICK_QTY"]);
                        drItems["HOLD_QTY"] = Convert.ToDouble(caseItem["HOLD_QTY"]);
                        drItems["QTY"] = Convert.ToDouble(drPickedItems[0]["QTY"]);
                        drItems["TOTAL_QTY"] = Convert.ToDouble(caseItem["PICK_QTY"]) + Convert.ToDouble(caseItem["HOLD_QTY"]);
                        //drItems["ITEM_ID_BARCODE"] = createBarCode(drPickedItems[0]["ITEM_ID"].ToString());
                        if (Convert.ToDouble(caseItem["PICK_QTY"]) + Convert.ToDouble(caseItem["HOLD_QTY"]) - Convert.ToDouble(drPickedItems[0]["QTY"]) < 0)
                        {
                            drItems["SHORTAGE_QTY"] = 0;
                        }
                        else
                        {
                            drItems["SHORTAGE_QTY"] = Convert.ToDouble(caseItem["PICK_QTY"]) + Convert.ToDouble(caseItem["HOLD_QTY"]) - Convert.ToDouble(drPickedItems[0]["QTY"]);
                        }

                        if (drPickedItems[0]["CUST_ITEM_NO"] != DBNull.Value && !string.IsNullOrEmpty(drPickedItems[0]["CUST_ITEM_NO"].ToString()))
                        {
                            drItems["ITEM"] = drPickedItems[0]["CUST_ITEM_NO"];
                            drItems["BARCODE"] = drPickedItems[0]["CUST_ITEM_NO"];
                            drItems["ITEM_ID_BARCODE"] = createBarCode(drPickedItems[0]["CUST_ITEM_NO"].ToString());
                        }
                        else
                        {
                            drItems["ITEM"] = drPickedItems[0]["ITEM_ID"];
                            drItems["BARCODE"] = drPickedItems[0]["ITEM_ID"];
                            drItems["ITEM_ID_BARCODE"] = createBarCode(drPickedItems[0]["ITEM_ID"].ToString());
                        }
                        if (drAllocItems == null || drAllocItems.Length == 0)
                        {
                            drItems["CART_ID"] = string.Empty;
                            drItems["MANF_ITEM_ID"] = string.Empty;
                            drItems["COMPARTMENT"] = string.Empty;
                            drItems["CART_ID_BARCODE"] = string.Empty;
                        }
                        else
                        {
                            if (Convert.ToInt32(drItems["SHORTAGE_QTY"]) == 0)
                            {
                                drItems["CART_ID"] = string.Empty;
                                drItems["COMPARTMENT"] = string.Empty; 
                                drItems["CART_ID_BARCODE"] = string.Empty;

                            }
                            else
                            {
                                drItems["CART_ID"] = drAllocItems[0]["CART_ID"];
                                drItems["CART_DESCR"] = drAllocItems[0]["CART_DESCR"];
                                drItems["COMPARTMENT"] = drAllocItems[0]["COMPARTMENT"];
                                drItems["CART_ID_BARCODE"] = createBarCode(drAllocItems[0]["CART_ID"].ToString());
                            }
                            drItems["MANF_ITEM_ID"] = drAllocItems[0]["MANF_ID"];
                        }

                    }
                    else
                    {
                        //The item is not picked
                        drItems["CASE_ID"] = caseItem["CASE_ID"];
                        drItems["PREF_LIST_ID"] = caseItem["PREF_LIST_ID"];
                        drItems["PROCEDURE_CODE"] = caseItem["PROCEDURE_CODE"];
                        drItems["ITEM_ID"] = caseItem["ITEM_ID"];
                        //drItems["ITEM_ID_BARCODE"] = createBarCode(caseItem["ITEM_ID"].ToString());
                        drItems["ITEM_DESCR"] = caseItem["ITEM_DESCR"];
                        drItems["PICK_QTY"] = Convert.ToDouble(caseItem["PICK_QTY"]);
                        drItems["HOLD_QTY"] = Convert.ToDouble(caseItem["HOLD_QTY"]);
                        drItems["QTY"] = 0;
                        drItems["TOTAL_QTY"] = Convert.ToDouble(caseItem["PICK_QTY"]) + Convert.ToDouble(caseItem["HOLD_QTY"]);
                        drItems["SHORTAGE_QTY"] = Convert.ToDouble(caseItem["PICK_QTY"]) + Convert.ToDouble(caseItem["HOLD_QTY"]);

                        if (caseItem["CUST_ITEM_NO"] != DBNull.Value && !string.IsNullOrEmpty(caseItem["CUST_ITEM_NO"].ToString()))
                        {
                            drItems["ITEM"] = caseItem["CUST_ITEM_NO"];
                            drItems["BARCODE"] = caseItem["CUST_ITEM_NO"];
                            drItems["ITEM_ID_BARCODE"] = createBarCode(caseItem["CUST_ITEM_NO"].ToString());
                        }
                        else
                        {
                            drItems["ITEM"] = caseItem["ITEM_ID"];
                            drItems["BARCODE"] = caseItem["ITEM_ID"];
                            drItems["ITEM_ID_BARCODE"] = createBarCode(caseItem["ITEM_ID"].ToString());
                        }

                        if (drAllocItems == null || drAllocItems.Length == 0)
                        {
                            drItems["CART_ID"] = string.Empty;
                            drItems["MANF_ITEM_ID"] = string.Empty;
                            drItems["COMPARTMENT"] = string.Empty;
                            drItems["CART_ID_BARCODE"] = string.Empty;
                        }
                        else
                        {
                            if (Convert.ToInt32(drItems["SHORTAGE_QTY"]) == 0)
                            {
                                drItems["CART_ID"] = string.Empty;
                                drItems["COMPARTMENT"] = string.Empty;
                                drItems["CART_ID_BARCODE"] = string.Empty;
                            }
                            else
                            {
                                drItems["CART_ID"] = drAllocItems[0]["CART_ID"];
                                drItems["CART_DESCR"] = drAllocItems[0]["CART_DESCR"];
                                drItems["COMPARTMENT"] = drAllocItems[0]["COMPARTMENT"];
                                drItems["CART_ID_BARCODE"] = createBarCode(drAllocItems[0]["CART_ID"].ToString());
                            }
                            drItems["MANF_ITEM_ID"] = drAllocItems[0]["MANF_ID"];
                        }

                    }
                    tblItems.Rows.Add(drItems);
                }
                if (sbItems.Length > 0)
                {
                    sbItems = sbItems.Remove(sbItems.ToString().LastIndexOf("AND"), 3);

                    if (strErpSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.PMM.ToString().ToUpper())
                    {
                        drPickedItems = PICKEDITEMS.Select(sbItems.ToString());
                    }
                    else
                    {
                        drPickedItems = PICKEDITEMS.Select(sbItems.ToString());
                    }
                    if (drPickedItems.Length > 0)
                    {

                        foreach (DataRow _row in drPickedItems)
                        {
                            strCustItemNo = string.Empty;
                            strItemID = string.Empty;
                            if (strErpSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.PMM.ToString().ToUpper())
                            {
                                if (_row["CUST_ITEM_NO"] != DBNull.Value && !string.IsNullOrEmpty(_row["CUST_ITEM_NO"].ToString()))
                                {
                                    strCustItemNo = _row["CUST_ITEM_NO"].ToString();
                                }
                                if ((retTbl != null))
                                {
                                    drAllocItems = retTbl.Select("CUST_ITEM_NO = '" + strCustItemNo + "'", "QUANTITY_ON_HAND DESC");
                                }
                                else
                                {
                                    drAllocItems = null;
                                }

                            }
                            else
                            {
                                strItemID = _row["ITEM_ID"].ToString();
                                if ((retTbl != null))
                                {
                                    drAllocItems = retTbl.Select("ITEM_ID = '" + strItemID + "'", "QUANTITY_ON_HAND DESC");
                                }
                                else
                                {
                                    drAllocItems = null;
                                }

                            }

                            drItems = tblItems.NewRow();
                            drItems["CASE_ID"] = _row["CASE_ID"];
                            drItems["PREF_LIST_ID"] = _row["PREF_LIST_ID"];
                            drItems["PROCEDURE_CODE"] = _row["PROCEDURE_CODE"];
                            drItems["ITEM_ID"] = _row["ITEM_ID"];
                            drItems["ITEM_DESCR"] = _row["ITEM_DESCR"];
                            drItems["PICK_QTY"] = 0;
                            drItems["HOLD_QTY"] = 0;
                            drItems["QTY"] = Convert.ToDouble(_row["QTY"]);
                            drItems["TOTAL_QTY"] = 0;
                            drItems["SHORTAGE_QTY"] = 0;
                            //drItems["ITEM_ID_BARCODE"] = createBarCode(_row["ITEM_ID"].ToString());
                            if (_row["CUST_ITEM_NO"] != DBNull.Value && !string.IsNullOrEmpty(_row["CUST_ITEM_NO"].ToString()))
                            {
                                drItems["ITEM"] = _row["CUST_ITEM_NO"];
                                drItems["BARCODE"] = _row["CUST_ITEM_NO"];
                                drItems["ITEM_ID_BARCODE"] = createBarCode(_row["CUST_ITEM_NO"].ToString());

                            }
                            else
                            {                               
                                drItems["ITEM"] = _row["ITEM_ID"];
                                drItems["BARCODE"] = _row["ITEM_ID"];
                                drItems["ITEM_ID_BARCODE"] = createBarCode(_row["ITEM_ID"].ToString());
                            }
                            drItems["CART_ID"] = string.Empty;
                            drItems["COMPARTMENT"] = string.Empty;
                            drItems["CART_ID_BARCODE"] = string.Empty;
                            if (drAllocItems == null || drAllocItems.Length == 0)
                            {
                                drItems["MANF_ITEM_ID"] = string.Empty;
                            }
                            else
                            {
                                drItems["MANF_ITEM_ID"] = drAllocItems[0]["MANF_ID"];
                                drItems["COMPARTMENT"] = drAllocItems[0]["COMPARTMENT"];
                            }

                            tblItems.Rows.Add(drItems);
                        }

                    }
                }
                if (tblItems.Rows.Count > 0)
                {
                    DataView _dvItems = new DataView();
                    _dvItems = tblItems.DefaultView;
                    _dvItems.Sort = "CART_DESCR,COMPARTMENT,SHORTAGE_QTY DESC";

                    dsCaseItemsInfo.Tables.Add(_dvItems.ToTable().Copy());
                    dsCaseItemsInfo.Tables.Add(DESCRS.Copy());
                    dsCaseItemsInfo.Tables[1].TableName = "DESCRS";
                    dsCaseItemsInfo.AcceptChanges();
                }
                #region Code Converted by Minukuri Commented by Siva Reddy
                // foreach (var caseItem in NONPICKEDITEMS)
                //{

                //VM_MT_POU_CASE_CART_DETAILS tblItems = new VM_MT_POU_CASE_CART_DETAILS();
                //strCustItemNo = string.Empty;
                //strItemID = string.Empty;
                //strPrefId = string.Empty;
                //strProcId = string.Empty;
                //strPrefId = caseItem.PREF_LIST_ID.ToString();
                //strProcId = caseItem.PROCEDURE_CODE.ToString();
                //if (strErpSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.PMM.ToString().ToUpper())
                //{
                //    if (!Convert.IsDBNull(caseItem.CUST_ITEM_NO) && !string.IsNullOrEmpty(caseItem.CUST_ITEM_NO))
                //    {
                //        strCustItemNo = caseItem.CUST_ITEM_NO.ToString();
                //    }
                //    sbItems.Append(" ");
                //    sbItems.Append("NOT (CUST_ITEM_NO = '" + strCustItemNo + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "')");
                //    sbItems.Append(" AND ");
                //    strSearch = "CUST_ITEM_NO = '" + strCustItemNo + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "'";
                //    strAllocSearch = "CUST_ITEM_NO = '" + strCustItemNo + "'";
                //    arrayOfPickedItem = PICKEDITEMS.Where(x => x.CUST_ITEM_NO == strCustItemNo && x.PREF_LIST_ID == strPrefId && x.PROCEDURE_CODE == strProcId).ToList();

                //}
                //else
                //{
                //    strItemID = caseItem.ITEM_ID;
                //    sbItems.Append(" ");
                //    sbItems.Append("NOT (ITEM_ID = '" + strItemID + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "')");
                //    sbItems.Append(" AND ");
                //    strSearch = "ITEM_ID = '" + strItemID + "' AND PREF_LIST_ID = '" + strPrefId + "' AND PROCEDURE_CODE = '" + strProcId + "'";
                //    strAllocSearch = "ITEM_ID = '" + strItemID + "'";
                //    arrayOfPickedItem = PICKEDITEMS.Where(x => x.ITEM_ID == strItemID && x.PREF_LIST_ID == strPrefId && x.PROCEDURE_CODE == strProcId).ToList();

                //}
                //arrayCartAllocDetails = (from DataRow dr in retTbl.Rows
                //                         select new VM_MT_POU_CASE_CART_DETAILS()
                //                         {
                //                            // ACT_HOLD_QTY = Convert.ToDouble(dr["ACT_HOLD_QTY"]),
                //                            // ACT_OPEN_QTY = Convert.ToDouble(dr["ACT_OPEN_QTY"].ToString()),
                //                            // BARCODE = dr["BARCODE"].ToString(),

                //                             CART_DESCR = dr["CART_DESCR"].ToString(),                                                
                //                             CART_ID = dr["CART_ID"].ToString(),
                //                             COMPARTMENT = dr["COMPARTMENT"].ToString(),
                //                             CUST_ITEM_NO = dr["CUST_ITEM_NO"].ToString(),
                //                             //HOLD_QTY = Convert.ToDouble(dr["HOLD_QTY"]),
                //                             //ITEM = dr["ITEM"].ToString(),
                //                            // ITEM_DESCR = dr["ITEM_DESCR"].ToString(),
                //                             ITEM_DESCRIPTION = dr["ITEM_DESCRIPTION"].ToString(),
                //                             ITEM_ID = dr["ITEM_ID"].ToString(),
                //                             //ITEM_INVENTORY = dr["ITEM_INVENTORY"].ToString(),
                //                             //ITEM_PRICE = Convert.ToDouble(dr["ITEM_PRICE"]),
                //                             //ITEM_SOURCE = Convert.ToInt16(dr["ITEM_SOURCE"]),
                //                            // ITEM_STATUS = dr["ITEM_STATUS"].ToString(),
                //                             //ITEM_UOM = dr["ITEM_UOM"].ToString(),
                //                             MANF_ID = dr["MANF_ID"].ToString(),
                //                           //  MANF_ITEM_ID = dr["MANF_ITEM_ID"].ToString(),
                //                            // PICK_QTY = Convert.ToDouble(dr["PICK_QTY"]),
                //                            // PREF_LIST_ID = dr["PREF_LIST_ID"].ToString(),
                //                            // PROCEDURE_CODE = dr["PROCEDURE_CODE"].ToString(),
                //                            // QTY = Convert.ToDouble(dr["QTY"]),
                //                             QUANTITY_ON_HAND = dr["QUANTITY_ON_HAND"].ToString(),                                                 
                //                            // SHORTAGE_QTY = Convert.ToInt32(dr["SHORTAGE_QTY"]),
                //                            // STATUS = Convert.ToInt16(dr["STATUS"]),
                //                             //TOTAL_QTY = Convert.ToDouble(dr["TOTAL_QTY"])
                //                         }).ToList();

                //arrayCartAllocDetails = arrayCartAllocDetails.Where(x => x.ITEM_ID == strItemID).OrderByDescending(y => y.QUANTITY_ON_HAND).ToList();

                //if (retTbl != null || retTbl.Rows.Count != 0)
                //{

                //}
                //else
                //{
                //    arrayCartAllocDetails = null;
                //}

                //// MT_POU_CASE_CART_DETAILS drItems = new MT_POU_CASE_CART_DETAILS();
                //if (arrayOfPickedItem.Count() > 0)
                //{
                //    tblItems.CASE_ID = arrayOfPickedItem[0].CASE_ID.ToString();
                //    tblItems.PREF_LIST_ID = arrayOfPickedItem[0].PREF_LIST_ID.ToString();
                //    tblItems.PROCEDURE_CODE = arrayOfPickedItem[0].PROCEDURE_CODE.ToString();
                //    tblItems.ITEM_ID = arrayOfPickedItem[0].ITEM_ID.ToString();
                //    tblItems.ITEM_DESCR = caseItem.ITEM_DESCR.ToString();

                //    tblItems.PICK_QTY = Convert.ToDouble(caseItem.PICK_QTY);
                //    tblItems.HOLD_QTY = Convert.ToDouble(caseItem.HOLD_QTY);
                //    tblItems.QTY = Convert.ToDouble(arrayOfPickedItem[0].QTY);
                //    tblItems.TOTAL_QTY = Convert.ToDouble(caseItem.PICK_QTY) + Convert.ToDouble(caseItem.HOLD_QTY);

                //    if (Convert.ToDouble(caseItem.PICK_QTY) + Convert.ToDouble(caseItem.HOLD_QTY) - Convert.ToDouble(arrayOfPickedItem[0].QTY) < 0)
                //    {
                //        tblItems.SHORTAGE_QTY = 0;
                //    }
                //    else
                //    {
                //        tblItems.SHORTAGE_QTY = Convert.ToInt32(Convert.ToDouble(tblItems.PICK_QTY) + Convert.ToDouble(tblItems.HOLD_QTY) - Convert.ToDouble(tblItems.QTY));
                //    }

                //    if (!Convert.IsDBNull(arrayOfPickedItem[0].CUST_ITEM_NO) && !string.IsNullOrEmpty(arrayOfPickedItem[0].CUST_ITEM_NO))
                //    {
                //        tblItems.ITEM = arrayOfPickedItem[0].CUST_ITEM_NO.ToString();
                //        tblItems.BARCODE = arrayOfPickedItem[0].CUST_ITEM_NO.ToString();
                //    }
                //    else
                //    {
                //        tblItems.ITEM = arrayOfPickedItem[0].ITEM_ID.ToString();
                //        tblItems.BARCODE = arrayOfPickedItem[0].ITEM_ID.ToString();
                //    }
                //    if (arrayCartAllocDetails == null || arrayCartAllocDetails.Count == 0)
                //    {
                //        tblItems.CART_ID = string.Empty;
                //        tblItems.MANF_ITEM_ID = string.Empty;
                //        tblItems.COMPARTMENT = string.Empty;
                //    }
                //    else
                //    {
                //        if (tblItems.SHORTAGE_QTY == 0)
                //        {
                //            tblItems.CART_ID = string.Empty;
                //            tblItems.COMPARTMENT = string.Empty;
                //        }
                //        else
                //        {
                //            tblItems.CART_ID = arrayCartAllocDetails[0].CART_ID;
                //            tblItems.CART_DESCR = arrayCartAllocDetails[0].CART_DESCR;
                //            tblItems.COMPARTMENT = arrayCartAllocDetails[0].COMPARTMENT;
                //        }
                //        tblItems.MANF_ITEM_ID = arrayCartAllocDetails[0].MANF_ID;
                //    }

                //}
                //else
                //{
                //    //The item is not picked
                //    tblItems.CASE_ID = caseItem.CASE_ID.ToString();
                //    tblItems.PREF_LIST_ID = caseItem.PREF_LIST_ID.ToString();
                //    tblItems.PROCEDURE_CODE = caseItem.PROCEDURE_CODE.ToString();
                //    tblItems.ITEM_ID = caseItem.ITEM_ID.ToString();
                //    tblItems.ITEM_DESCR = caseItem.ITEM_DESCR.ToString();
                //    tblItems.PICK_QTY = Convert.ToDouble(caseItem.PICK_QTY);
                //    tblItems.HOLD_QTY = Convert.ToDouble(caseItem.HOLD_QTY);
                //    tblItems.QTY = 0;
                //    tblItems.TOTAL_QTY = Convert.ToDouble(caseItem.PICK_QTY) + Convert.ToDouble(caseItem.HOLD_QTY);
                //    tblItems.SHORTAGE_QTY = Convert.ToInt32(Convert.ToDouble(caseItem.PICK_QTY) + Convert.ToDouble(caseItem.HOLD_QTY));

                //    if (!Convert.IsDBNull(caseItem.CUST_ITEM_NO) && !string.IsNullOrEmpty(caseItem.CUST_ITEM_NO))
                //    {
                //        tblItems.ITEM = caseItem.CUST_ITEM_NO.ToString();
                //        tblItems.BARCODE = caseItem.CUST_ITEM_NO.ToString();
                //    }
                //    else
                //    {
                //        tblItems.ITEM = caseItem.ITEM_ID.ToString();
                //        tblItems.BARCODE = caseItem.ITEM_ID.ToString();
                //    }

                //    if (arrayCartAllocDetails == null || arrayCartAllocDetails.Count == 0)
                //    {
                //        tblItems.CART_ID = string.Empty;
                //        tblItems.MANF_ITEM_ID = string.Empty;
                //        tblItems.COMPARTMENT = string.Empty;
                //    }
                //    else
                //    {
                //        if (tblItems.SHORTAGE_QTY == 0)
                //        {
                //            tblItems.CART_ID = string.Empty;
                //            tblItems.COMPARTMENT = string.Empty;
                //        }
                //        else
                //        {
                //            tblItems.CART_ID = arrayCartAllocDetails[0].CART_ID.ToString();
                //            tblItems.CART_DESCR = arrayCartAllocDetails[0].CART_DESCR.ToString();
                //            tblItems.COMPARTMENT = arrayCartAllocDetails[0].COMPARTMENT.ToString();
                //        }
                //        tblItems.MANF_ITEM_ID = arrayCartAllocDetails[0].MANF_ID.ToString();
                //    }

                //}
                //lsttblItems.Add(tblItems);

                //  }
                //if (sbItems.Length > 0)
                //{

                //    sbItems = sbItems.Remove(sbItems.ToString().LastIndexOf("AND"), 3);
                //    DataSet ds1 = new DataSet();
                //    DataRow[] drPickedItems;

                //    //DataTable dsReportTable3 = PICKEDITEMS.ToDataTable();//Utils.ToDataTable(PICKEDITEMS);
                //    //dsReportTable3.TableName = "PICKEDITEMS";
                //    //ds1.Tables.Add(dsReportTable3);
                //    ds1 = PICKEDITEMS.ToDataSet();
                //    ds1.Tables[0].TableName = "PICKEDITEMS";
                //    if (strErpSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.PMM.ToString().ToUpper())
                //    {

                //        drPickedItems = ds1.Tables["PICKEDITEMS"].Select(sbItems.ToString());

                //    }
                //    else
                //    {
                //        drPickedItems = ds1.Tables["PICKEDITEMS"].Select(sbItems.ToString());


                //    }
                //    if (drPickedItems.Length > 0)
                //    {
                //        var dataPickTbl = drPickedItems.ToDataSet();
                //        arrayOfPickedItem = (from DataRow dr in dataPickTbl.Tables[0].Rows
                //                             select new VM_MT_POU_CHARGECAPTURE_DETAILS()
                //                             {
                //                                 CASE_ID = dr["CASE_ID"].ToString(),
                //                                 CHARGE_STATUS = dr["CHARGE_STATUS"].ToString(),
                //                                 CUST_ITEM_NO = dr["CUST_ITEM_NO"].ToString(),
                //                                 EXAM_ID = dr["EXAM_ID"].ToString(),
                //                                 ITEM_COUNT = Convert.ToUInt32(dr["ITEM_COUNT"].ToString()),
                //                                 ITEM_DESCR = dr["ITEM_DESCR"].ToString(),
                //                                 ITEM_DESCRIPTION = dr["ITEM_DESCRIPTION"].ToString(),
                //                                 ITEM_ID = dr["ITEM_ID"].ToString(),
                //                                 PREF_LIST_ID = dr["PREF_LIST_ID"].ToString(),
                //                                 PROCEDURE_CODE = dr["PROCEDURE_CODE"].ToString(),
                //                                 QTY = Convert.ToDouble(dr["QTY"].ToString()),
                //                                 TRANSACTION_ID = Convert.ToInt32(dr["TRANSACTION_ID"].ToString())
                //                             }).ToList();
                //    }
                //    if (arrayOfPickedItem.Count > 0)
                //    {
                //        foreach (var _row in arrayOfPickedItem)
                //        {
                //            VM_MT_POU_CASE_CART_DETAILS tblItems = new VM_MT_POU_CASE_CART_DETAILS();
                //            strCustItemNo = string.Empty;
                //            strItemID = string.Empty;
                //            if (strErpSystem.ToUpper() == AtParWebEnums.Enterprise_Enum.PMM.ToString().ToUpper())
                //            {
                //                if (!Convert.IsDBNull(_row.CUST_ITEM_NO) && !string.IsNullOrEmpty(_row.CUST_ITEM_NO))
                //                {
                //                    strCustItemNo = _row.CUST_ITEM_NO.ToString();
                //                }
                //                if (retTbl.Rows.Count != 0 || retTbl != null)
                //                {

                //                    var lstdrAllocItems = retTbl.Select("CUST_ITEM_NO = '" + strCustItemNo + "'", "QUANTITY_ON_HAND DESC");
                //                    var lstdataTbl = lstdrAllocItems.ToDataSet();
                //                    //arrayCartAllocDetails = Utils.ToList<VM_MT_POU_CASE_CART_DETAILS>(lstdataTbl);

                //                    arrayCartAllocDetails = (from DataRow dr in lstdataTbl.Tables[0].Rows
                //                                             select new VM_MT_POU_CASE_CART_DETAILS()
                //                                             {
                //                                                 ACT_HOLD_QTY = Convert.ToDouble(dr["ACT_HOLD_QTY"]),
                //                                                 ACT_OPEN_QTY = Convert.ToDouble(dr["ACT_OPEN_QTY"].ToString()),
                //                                                 BARCODE = dr["BARCODE"].ToString(),
                //                                                 CART_DESCR = dr["CART_DESCR"].ToString(),
                //                                                 CART_ID = dr["CART_ID"].ToString(),
                //                                                 CASE_ID = dr["CASE_ID"].ToString(),
                //                                                 COMPARTMENT = dr["COMPARTMENT"].ToString(),
                //                                                 CUST_ITEM_NO = dr["CUST_ITEM_NO"].ToString(),
                //                                                 HOLD_QTY = Convert.ToDouble(dr["HOLD_QTY"]),
                //                                                 ITEM = dr["ITEM"].ToString(),
                //                                                 ITEM_DESCR = dr["ITEM_DESCR"].ToString(),
                //                                                 ITEM_DESCRIPTION = dr["ITEM_DESCRIPTION"].ToString(),
                //                                                 ITEM_ID = dr["ITEM_ID"].ToString(),
                //                                                 ITEM_INVENTORY = dr["ITEM_INVENTORY"].ToString(),
                //                                                 ITEM_PRICE = Convert.ToDouble(dr["ITEM_PRICE"]),
                //                                                 ITEM_SOURCE = Convert.ToInt16(dr["ITEM_SOURCE"]),
                //                                                 ITEM_STATUS = dr["ITEM_STATUS"].ToString(),
                //                                                 ITEM_UOM = dr["ITEM_UOM"].ToString(),
                //                                                 MANF_ID = dr["MANF_ID"].ToString(),
                //                                                 MANF_ITEM_ID = dr["MANF_ITEM_ID"].ToString(),
                //                                                 PICK_QTY = Convert.ToDouble(dr["PICK_QTY"]),
                //                                                 PREF_LIST_ID = dr["PREF_LIST_ID"].ToString(),
                //                                                 PROCEDURE_CODE = dr["PROCEDURE_CODE"].ToString(),
                //                                                 QTY = Convert.ToDouble(dr["QTY"]),
                //                                                 QUANTITY_ON_HAND = dr["QUANTITY_ON_HAND"].ToString(),
                //                                                 SHORTAGE_QTY = Convert.ToInt32(dr["SHORTAGE_QTY"]),
                //                                                 STATUS = Convert.ToInt16(dr["STATUS"]),
                //                                                 TOTAL_QTY = Convert.ToDouble(dr["TOTAL_QTY"])
                //                                             }).ToList();
                //                }
                //                else
                //                {
                //                    arrayCartAllocDetails = null;
                //                }

                //            }
                //            else
                //            {
                //                strItemID = _row.ITEM_ID;
                //                if (retTbl.Rows.Count != 0 || retTbl != null)
                //                {
                //                    var drAllocItems = retTbl.Select("ITEM_ID = '" + strItemID + "'", "QUANTITY_ON_HAND DESC");
                //                    var lstdrAllocItems = drAllocItems.ToDataSet();
                //                    // arrayCartAllocDetails = Utils.ToList<VM_MT_POU_CASE_CART_DETAILS>(lstdrAllocItems);
                //                    arrayCartAllocDetails = (from DataRow dr in lstdrAllocItems.Tables[0].Rows
                //                                             select new VM_MT_POU_CASE_CART_DETAILS()
                //                                             {
                //                                                 ACT_HOLD_QTY = Convert.ToDouble(dr["ACT_HOLD_QTY"]),
                //                                                 ACT_OPEN_QTY = Convert.ToDouble(dr["ACT_OPEN_QTY"].ToString()),
                //                                                 BARCODE = dr["BARCODE"].ToString(),
                //                                                 CART_DESCR = dr["CART_DESCR"].ToString(),
                //                                                 CART_ID = dr["CART_ID"].ToString(),
                //                                                 CASE_ID = dr["CASE_ID"].ToString(),
                //                                                 COMPARTMENT = dr["COMPARTMENT"].ToString(),
                //                                                 CUST_ITEM_NO = dr["CUST_ITEM_NO"].ToString(),
                //                                                 HOLD_QTY = Convert.ToDouble(dr["HOLD_QTY"]),
                //                                                 ITEM = dr["ITEM"].ToString(),
                //                                                 ITEM_DESCR = dr["ITEM_DESCR"].ToString(),
                //                                                 ITEM_DESCRIPTION = dr["ITEM_DESCRIPTION"].ToString(),
                //                                                 ITEM_ID = dr["ITEM_ID"].ToString(),
                //                                                 ITEM_INVENTORY = dr["ITEM_INVENTORY"].ToString(),
                //                                                 ITEM_PRICE = Convert.ToDouble(dr["ITEM_PRICE"]),
                //                                                 ITEM_SOURCE = Convert.ToInt16(dr["ITEM_SOURCE"]),
                //                                                 ITEM_STATUS = dr["ITEM_STATUS"].ToString(),
                //                                                 ITEM_UOM = dr["ITEM_UOM"].ToString(),
                //                                                 MANF_ID = dr["MANF_ID"].ToString(),
                //                                                 MANF_ITEM_ID = dr["MANF_ITEM_ID"].ToString(),
                //                                                 PICK_QTY = Convert.ToDouble(dr["PICK_QTY"]),
                //                                                 PREF_LIST_ID = dr["PREF_LIST_ID"].ToString(),
                //                                                 PROCEDURE_CODE = dr["PROCEDURE_CODE"].ToString(),
                //                                                 QTY = Convert.ToDouble(dr["QTY"]),
                //                                                 QUANTITY_ON_HAND = dr["QUANTITY_ON_HAND"].ToString(),
                //                                                 SHORTAGE_QTY = Convert.ToInt32(dr["SHORTAGE_QTY"]),
                //                                                 STATUS = Convert.ToInt16(dr["STATUS"]),
                //                                                 TOTAL_QTY = Convert.ToDouble(dr["TOTAL_QTY"])
                //                                             }).ToList();

                //                }
                //                else
                //                {
                //                    arrayCartAllocDetails = null;
                //                }

                //            }

                //            // tblItems = lsttblItems.Add();
                //            tblItems.CASE_ID = _row.CASE_ID.ToString();
                //            tblItems.PREF_LIST_ID = _row.PREF_LIST_ID.ToString();
                //            tblItems.PROCEDURE_CODE = _row.PROCEDURE_CODE.ToString();
                //            tblItems.ITEM_ID = _row.ITEM_ID.ToString();
                //            tblItems.ITEM_DESCR = _row.ITEM_DESCR;
                //            tblItems.PICK_QTY = 0;
                //            tblItems.HOLD_QTY = 0;
                //            tblItems.QTY = Convert.ToDouble(_row.QTY);
                //            tblItems.TOTAL_QTY = 0;
                //            tblItems.SHORTAGE_QTY = 0;

                //            if (!Convert.IsDBNull(_row.CUST_ITEM_NO) && !string.IsNullOrEmpty(_row.CUST_ITEM_NO))
                //            {
                //                tblItems.ITEM = _row.CUST_ITEM_NO.ToString();
                //                tblItems.BARCODE = _row.CUST_ITEM_NO.ToString();
                //            }
                //            else
                //            {
                //                tblItems.ITEM = _row.ITEM_ID.ToString();
                //                tblItems.BARCODE = _row.ITEM_ID.ToString();
                //            }
                //            tblItems.CART_ID = string.Empty;
                //            tblItems.COMPARTMENT = string.Empty;
                //            if (arrayCartAllocDetails == null || arrayCartAllocDetails.Count == 0)
                //            {
                //                tblItems.MANF_ITEM_ID = string.Empty;
                //            }
                //            else
                //            {
                //                tblItems.MANF_ITEM_ID = arrayCartAllocDetails[0].MANF_ID.ToString();
                //                tblItems.COMPARTMENT = arrayCartAllocDetails[0].COMPARTMENT.ToString();
                //            }

                //            lsttblItems.Add(tblItems);
                //        }
                //    }
                //}
                ////if (lsttblItems.Count > 0)
                ////{
                ////    DataView _dvItems = new DataView();
                ////    _dvItems = lsttblItems.DefaultView;
                ////    _dvItems.Sort = "CART_DESCR,COMPARTMENT,SHORTAGE_QTY DESC";

                ////    pDsCaseItemsInfo.Tables.Add(_dvItems.ToTable.Copy);
                ////    pDsCaseItemsInfo.Tables.Add(_dsCaseItemsInfo.Tables("DESCRS").Copy);
                ////    pDsCaseItemsInfo.AcceptChanges();
                ////}

                #endregion


                response.AtParSuccess();
                response.DataDictionary = new Dictionary<string, object> { { "CaseItemsInfo", dsCaseItemsInfo } };
                return response;
                //return statusCode;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private long ConvertColumnType(DataSet pDS)
        {

            StackFrame stackFrame = new StackFrame();
            MethodBase methodBase = stackFrame.GetMethod();
            string methodBaseName = methodBase.Name;
            if (_log.IsDebugEnabled)
                _log.Debug(methodBaseName);

            if (_log.IsDebugEnabled)
                _log.Debug(methodBaseName + " Converting Inv Item ID column Data Type to String data type");

            DataTable _dtTemp = default(DataTable);
            try
            {
                _dtTemp = new DataTable();

                _dtTemp = pDS.Tables["Details"].Clone();
                //Cloning Details table
                _dtTemp.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType = System.Type.GetType("System.String");

                foreach (DataRow dr in pDS.Tables["Details"].Rows)
                {
                    _dtTemp.ImportRow(dr);
                }
                pDS.Tables.Remove("Details");
                pDS.Tables.Add(_dtTemp);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to convert Inv Item ID column data type: " + "Exception is: " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _dtTemp.Dispose();
            }
            return AtparStatusCodes.ATPAR_OK;
        }

        private Tuple<long, DataTable> PopulateCartItems(DataSet pDsItem, string pStrCartID, string pStrCartDescr, string pStrBunit, string pStrCartItemFlag, ref DataTable pTblItems, string pStrLocType, string[] pDeviceTokenEntry, DataSet pDsInventoryItems = null, bool pLotSerCntrld = false)
        {
            //DataTable pTblItems = new DataTable();
            // pStrLocType = "I";
            StackFrame stackFrame = new StackFrame();
            MethodBase methodBase = stackFrame.GetMethod();
            string methodBaseName = methodBase.Name;
            if (_log.IsDebugEnabled)
                _log.Debug(methodBaseName);
            // DataTable pTblItems = new DataTable();
            try
            {
                // DataRow _retRow = default(DataRow);
                DataRow retRow;

                bool blnCustItemColumnExists = false;
                bool blnMItmIdColumnExists = false;
                bool blnSrCtrlColumnExists = false;
                bool blnLotCtrlColumnExists = false;
                string strItemID = string.Empty;
                string strMfgItemID = string.Empty;
                string strCustItemID = string.Empty;
                string strItemDescr = string.Empty;
                DataRow[] drInvItems = null;
                double dblQtyOnHand = 0;
                DataTable dtItems = new DataTable();
                StringBuilder sbSearch = new StringBuilder();
                string strCompartment = string.Empty;
                string strLotControlled = AtParWebEnums.YesNo_Enum.N.ToString();
                string strSerialControlled = AtParWebEnums.YesNo_Enum.N.ToString();

                if (pStrCartItemFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                {

                    blnCustItemColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID).ToString()) ? true : false);
                    blnMItmIdColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID).ToString()) ? true : false);
                    blnSrCtrlColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED).ToString()) ? true : false);
                    blnLotCtrlColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED).ToString()) ? true : false);


                    //If the dataset is built with ERP items then we need to filter the Details table in the dataset
                    dtItems = pDsItem.Tables[1].Copy();
                }
                else
                {
                    dtItems = pDsItem.Tables[0].Copy();
                }


                foreach (DataRow dr in dtItems.Rows)
                {
                    strItemID = string.Empty;
                    strMfgItemID = string.Empty;
                    strCustItemID = string.Empty;
                    strItemDescr = string.Empty;
                    strCompartment = string.Empty;
                    strLotControlled = string.Empty;
                    strSerialControlled = string.Empty;
                    dblQtyOnHand = 0;


                    if (pStrCartItemFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString()))
                        {
                            strItemID = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString();
                        }

                        if (blnMItmIdColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID].ToString()))
                            {
                                strMfgItemID = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID].ToString();
                            }
                        }

                        if (blnCustItemColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString()))
                            {
                                strCustItemID = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString();
                            }
                        }

                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString()))
                        {
                            strItemDescr = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                        }

                        if (blnSrCtrlColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED].ToString()))
                            {
                                strSerialControlled = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED].ToString();
                            }
                        }

                        if (blnLotCtrlColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED].ToString()))
                            {
                                strLotControlled = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED].ToString();
                            }
                        }


                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(dr["ITEM_ID"].ToString()))
                        {
                            strItemID = dr["ITEM_ID"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["MANUFACTURE_ITEM_ID"].ToString()))
                        {
                            strMfgItemID = dr["MANUFACTURE_ITEM_ID"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["CUST_ITEM_ID"].ToString()))
                        {
                            strCustItemID = dr["CUST_ITEM_ID"].ToString();
                        }
                        if (!string.IsNullOrEmpty(dr["ITEM_DESCRIPTION"].ToString()))
                        {
                            strItemDescr = dr["ITEM_DESCRIPTION"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["LOT_CONTROLLED"].ToString()))
                        {
                            strLotControlled = dr["LOT_CONTROLLED"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["SERIALIZED"].ToString()))
                        {
                            strSerialControlled = dr["SERIALIZED"].ToString();
                        }

                    }

                    if (pStrLocType == AtParWebEnums.LocationType.I.ToString())
                    {
                        var with1 = sbSearch;
                        with1.Remove(0, with1.Length);
                        with1.Append("[" + pDsItem.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.BUSINESS_UNIT].ColumnName + "] = ");
                        //   with1.Append("[" + pDsItem.Tables[0].Columns["BUSINESS_UNIT"] + "] = ");
                        //AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString()
                        with1.Append("'" + pStrBunit + "' AND ");
                        with1.Append("[" + pDsItem.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CART_ID].ColumnName + "] = ");
                        // with1.Append("[" + pDsItem.Tables[0].Columns["CART_ID"] + "] = ");
                        with1.Append("'" + pStrCartID + "' AND ");
                        with1.Append("[" + pDsItem.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.ITEM_ID].ColumnName + "] = ");
                        // with1.Append("[" + pDsItem.Tables[0].Columns["ITEM_ID"] + "] = ");
                        with1.Append("'" + strItemID + "'");

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ":Search string for items is : " + sbSearch.ToString());

                        drInvItems = pDsItem.Tables[0].Select(sbSearch.ToString());
                    }
                    else
                    {
                        var with2 = sbSearch;
                        with2.Remove(0, with2.Length);
                        with2.Append("BUSINESS_UNIT ='" + pStrBunit + "'");
                        with2.Append(" AND CART_ID='" + pStrCartID + "'");
                        with2.Append(" AND ITEM_ID = '" + strItemID + "'");

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ":Search string for items is : " + sbSearch.ToString());

                        if (pDsInventoryItems.Tables.Count > 0)
                        {
                            drInvItems = pDsInventoryItems.Tables[0].Select(sbSearch.ToString());
                        }
                    }


                    if (drInvItems.Length > 0)
                    {
                        dblQtyOnHand = 0;
                        for (int intcnt = 0; intcnt <= drInvItems.Length - 1; intcnt++)
                        {
                            if (pStrLocType == AtParWebEnums.LocationType.I.ToString())
                            {
                                dblQtyOnHand = dblQtyOnHand + Convert.ToDouble(drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SYSTEM_QTY]);
                                if (!strCompartment.Contains(drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION].ToString()))
                                {
                                    strCompartment += ((strCompartment == string.Empty) ? drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION] : ", " + drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION].ToString());
                                }

                            }
                            else
                            {
                                dblQtyOnHand = dblQtyOnHand + Convert.ToDouble(drInvItems[intcnt]["QUANTITY_ON_HAND"]);
                                if (!strCompartment.Contains(drInvItems[intcnt]["COMPARTMENT"].ToString()))
                                {
                                    strCompartment += ((strCompartment == string.Empty) ? drInvItems[intcnt]["COMPARTMENT"] : ", " + drInvItems[intcnt]["COMPARTMENT"].ToString());
                                }

                            }
                        }
                        retRow = pTblItems.NewRow();
                        retRow["ITEM_ID"] = strItemID;
                        retRow["MANF_ID"] = strMfgItemID;
                        retRow["CUST_ITEM_NO"] = strCustItemID;
                        retRow["ITEM_DESCRIPTION"] = strItemDescr;
                        retRow["QUANTITY_ON_HAND"] = dblQtyOnHand;
                        retRow["CART_ID"] = pStrCartID;
                        retRow["BUSINESS_UNIT"] = pStrBunit;
                        if (string.IsNullOrEmpty(pStrCartDescr))
                        {
                            retRow["CART_DESCR"] = pStrCartID;
                        }
                        else
                        {
                            retRow["CART_DESCR"] = pStrCartDescr;
                        }
                        retRow["COMPARTMENT"] = strCompartment;

                        if (pLotSerCntrld == true)
                        {
                            retRow["LOTCONTROLLED"] = strLotControlled;
                            retRow["SERIALIZED"] = strSerialControlled;
                        }

                        pTblItems.Rows.Add(retRow);

                    }

                }
                return new Tuple<long, DataTable>(AtparStatusCodes.ATPAR_OK, pTblItems);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to generate a new row : Exception" + " is : " + ex.ToString());
                return new Tuple<long, DataTable>(AtparStatusCodes.E_SERVERERROR, null);
                //return AtparStatusCodes.E_SERVERERROR;
            }
            // return new Tuple<long, DataTable>(AtparStatusCodes.ATPAR_OK, pTblItems);
            // return AtparStatusCodes.ATPAR_OK;

        }

        #endregion

        #region GetCasesforQA
        public AtParWebApiResponse<VM_MT_POU_CASE_CART_HEADER> GetCasesforQA(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            //log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.USERNAME.ToString()] = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
            //log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.SYSTEMID.ToString()] = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString();

            startDate = startDate.ReplaceNullwithEmpty();
            endDate = endDate.ReplaceNullwithEmpty();
            deptId = deptId.ReplaceNullwithEmpty();
            serviceCode = serviceCode.ReplaceNullwithEmpty();
            CaseId = CaseId.ReplaceNullwithEmpty();

            var response = new AtParWebApiResponse<VM_MT_POU_CASE_CART_HEADER>();
            List<VM_MT_POU_CASE_DISCRIPTON> lstCaseCartDesr = null;
            List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseInfo = null;
            List<VM_MT_POU_CASE_DISCRIPTON> lstDescDistCase = null;
            List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseforQA = null;
            try
            {
                VM_MT_POU_CASE_CART_HEADER caseInfo = new VM_MT_POU_CASE_CART_HEADER();

                caseInfo = _postPickQARepository.GetCasesforQA(startDate, endDate, reviewType, deptId, serviceCode, CaseId, deviceTokenEntry);
                //caseInfo.lstCaseInfo = _postPickQARepository.GetCasesforQA1(startDate, endDate, reviewType, deptId, serviceCode, CaseId, deviceTokenEntry);
                //caseInfo.lstDescDistCase = _postPickQARepository.GetDistCasesCartHeader(startDate, endDate, reviewType, deptId, serviceCode, CaseId, deviceTokenEntry);
                lstCaseforQA = caseInfo.lstCaseforQA;
                lstCaseInfo = caseInfo.lstCaseInfo;
                lstDescDistCase = caseInfo.lstDescDistCase;
                if (lstCaseforQA.Count > 0)
                {
                    if (lstCaseInfo.Count > 0)
                    {
                        string strCaseDescr = string.Empty;
                        for (int i = 0; i < lstCaseforQA.Count; i++)
                        {
                            if (!string.IsNullOrEmpty(lstCaseforQA[i].PATIENTNAME))
                            {
                                if (lstCaseforQA[i].PATIENTNAME.Contains('-'))
                                {
                                    lstCaseforQA[i].PATIENT_BARCODE = createBarCode(lstCaseforQA[i].PATIENTNAME.Split('-')[0]);
                                }
                                else
                                {
                                    lstCaseforQA[i].PATIENT_BARCODE = createBarCode(lstCaseforQA[i].PATIENTNAME);
                                }
                            }
                                
                        }

                        for (int intcnt = 0; intcnt <= lstCaseInfo.Count - 1; intcnt++)
                        {
                            strCaseDescr = string.Empty;
                            List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseCartInfo = null;
                            //lstCaseCartInfo = lstCaseforQA.Select("CASE_ID ='" + lstCaseInfo[intcnt].CASE_ID + "'");
                            lstCaseCartInfo = lstCaseforQA.Where(x => x.CASE_ID == lstCaseInfo[intcnt].CASE_ID).ToList();
                            List<VM_MT_POU_CASE_CART_HEADER_TB> lstCasedstInfo = null;
                            // lstCasedstInfo = lstCaseInfo.Select("CASE_ID='" + lstCaseCartInfo[0].CASE_ID + "'");
                            lstCasedstInfo = lstCaseInfo.Where(x => x.CASE_ID == lstCaseCartInfo[0].CASE_ID).ToList();
                            // lstCaseCartDesr = lstDescDistCase.Select("CASE_ID='" + lstCaseCartInfo[0].CASE_ID + "'");
                            lstCaseCartDesr = lstDescDistCase.Where(x => x.CASE_ID == lstCaseCartInfo[0].CASE_ID).ToList();

                            if (lstCaseCartDesr.Count > 0)
                            {
                                //CASE_DESC
                                strCaseDescr = lstCaseCartDesr[0].CASE_DESCR.ToString();
                            }
                            if (lstCaseCartInfo.Count == 1)
                            {
                                lstCasedstInfo[0].DESCRIPTION = strCaseDescr;
                                lstCasedstInfo[0].PROCEDURE_CODE = lstCaseCartInfo[0].PROCEDURE_CODE;
                                lstCasedstInfo[0].PREF_LIST_ID = lstCaseCartInfo[0].PREF_LIST_ID;
                                lstCasedstInfo[0].PHYSICIAN = lstCaseCartInfo[0].PHYSICIAN;
                                lstCasedstInfo[0].PATIENT_ID = lstCaseCartInfo[0].PATIENT_ID;
                                lstCasedstInfo[0].STATUS = lstCaseCartInfo[0].STATUS;
                                lstCasedstInfo[0].EMERGENCY_CASE = lstCaseCartInfo[0].EMERGENCY_CASE;
                                lstCasedstInfo[0].PHYSICIAN_NAME = lstCaseCartInfo[0].PHYSICIAN_NAME;
                                lstCasedstInfo[0].PROCEDURENAME = lstCaseCartInfo[0].PROCEDURENAME;
                                lstCasedstInfo[0].PREFERENCENAME = lstCaseCartInfo[0].PREFERENCENAME;
                                lstCasedstInfo[0].PATIENTNAME = lstCaseCartInfo[0].PATIENTNAME;
                                lstCasedstInfo[0].DEPT_ID = lstCaseCartInfo[0].DEPT_ID;
                                lstCasedstInfo[0].SERVICE_CODE = lstCaseCartInfo[0].SERVICE_CODE;
                                lstCasedstInfo[0].DEPTNAME = lstCaseCartInfo[0].DEPTNAME;
                                lstCasedstInfo[0].SERVICENAME = lstCaseCartInfo[0].SERVICENAME;
                            }
                            else if (lstCaseCartInfo.Count > 1)
                            {
                                //lstCaseforQA = lstCaseInfo.Where("CASE_ID ='" + lstCaseInfo[intcnt].CASE_ID + "' AND EMERGENCY_CASE = '" + YesNo_Enum.Y.ToString() + "'");
                                lstCaseCartInfo = lstCaseforQA.Where(x => x.CASE_ID == lstCaseInfo[intcnt].CASE_ID && x.EMERGENCY_CASE == AtParWebEnums.YesNo_Enum.Y.ToString()).ToList();
                                if (lstCaseCartInfo.Count > 0)
                                {
                                    lstCasedstInfo[0].EMERGENCY_CASE = AtParWebEnums.YesNo_Enum.Y.ToString();
                                }
                                else
                                {
                                    lstCasedstInfo[0].EMERGENCY_CASE = AtParWebEnums.YesNo_Enum.N.ToString();
                                }
                                lstCasedstInfo[0].DESCRIPTION = strCaseDescr;
                            }
                        }
                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.Data = caseInfo;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
        #endregion
    }
}
