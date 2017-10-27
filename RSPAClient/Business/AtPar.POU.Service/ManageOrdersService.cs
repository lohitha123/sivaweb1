using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;

namespace AtPar.POU.Service
{
    public class ManageOrdersService : IManageOrdersService
    {
        private IManageOrdersRepository _repo;
        private ILog _log;
        private ICommonRepository _commonRepo;
        private ICommonPOURepository _commonPOURepo;
        private ICommonPOUService _commonPOUService;
        const string ITEM_PRICE = "ITEM_PRICE";
        public ManageOrdersService(IManageOrdersRepository repo, ILog log, ICommonRepository commonRepo, ICommonPOURepository commonPOURepo, ICommonPOUService commonPOUService)
        {
            _repo = repo;
            _log = log;
            _commonRepo = commonRepo;
            _commonPOURepo = commonPOURepo;
            _commonPOUService = commonPOUService;
        }

        /// <summary>
        /// Getting order details
        /// </summary>
        /// <param name="ordNo"></param>
        /// <param name="ordStatus"></param>
        /// <param name="cartID"></param>
        /// <param name="bUnit"></param>
        /// <param name="itemID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ORDER_DETAILS> GetOrderDetails_ManageOrders(string ordNo, string ordStatus, string cartID, string bUnit, string itemID, string orgGrpID, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ORDER_DETAILS>();

            DataSet dsOrders = default(DataSet);
            int intCnt = 0;
            DataTable retTbl = new DataTable();
            DataRow retRow = default(DataRow);
            DataSet detDS = default(DataSet);
            string strItemID = null;
            DataTable dDetTbl = new DataTable();
            DataRow[] selRows = null;
            string strDescr = null;
            string strPrice = null;
            bool blnPriceColumnExists = false;
            string pStrLocationType = null;
            DataSet pOrdDetails = new DataSet();
            List<PAR_MNGT_ORDER_DETAILS> lstOrderDetails = new List<PAR_MNGT_ORDER_DETAILS>();

            retTbl = new DataTable("ORDER_DETAILS");
            retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
            retTbl.Columns.Add("ORDER_NO", Type.GetType("System.String"));
            retTbl.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
            retTbl.Columns.Add("UOM", Type.GetType("System.String"));
            retTbl.Columns.Add("PRICE", Type.GetType("System.String"));
            retTbl.Columns.Add("REQUISITION_NO", Type.GetType("System.String"));
            retTbl.Columns.Add("QTY", Type.GetType("System.String"));
            retTbl.Columns.Add("QTY_RCVD", Type.GetType("System.String"));
            retTbl.Columns.Add("ORDER_STATUS", Type.GetType("System.String"));
            retTbl.Columns.Add("LINE_NO", Type.GetType("System.String"));
            retTbl.Columns.Add("BIN_LOC", Type.GetType("System.String"));
            retTbl.Columns.Add("TRANSACTION_ID", Type.GetType("System.String"));

            try
            {
                try
                {
                    List<PAR_MNGT_ORDER_DETAILS> resultOrderDetails = _repo.GetOrderDetails(ordNo, itemID, ordStatus);
                    dsOrders = resultOrderDetails.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    return response;
                }


                if (dsOrders.Tables[0].Rows.Count > 0)
                {
                    try
                    {
                        pStrLocationType = _commonPOURepo.GetLocationType(bUnit, cartID);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                        return response;
                    }

                    Tuple<long, DataSet> a = _commonPOUService.GetCartDetails(cartID, bUnit, detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], "", pStrLocationType, null, "", appID, "");

                    detDS = a.Item2;

                    if (detDS != null && detDS.Tables.Count > 0)
                    {
                        detDS.Tables[1].TableName = "Details";
                        dDetTbl = detDS.Tables["Details"];

                        for (int intColCnt = 0; intColCnt <= dDetTbl.Columns.Count - 1; intColCnt++)
                        {
                            switch (dDetTbl.Columns[intColCnt].Caption)
                            {

                                case ITEM_PRICE:
                                    blnPriceColumnExists = true;
                                    break;
                            }
                        }
                    }

                    for (intCnt = 0; intCnt <= dsOrders.Tables[0].Rows.Count - 1; intCnt++)
                    {
                        strItemID = string.Empty;
                        strDescr = string.Empty;
                        strPrice = string.Empty;

                        strItemID = dsOrders.Tables[0].Rows[intCnt]["ITEM_ID"].ToString();

                        selRows = dDetTbl.Select("[" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + "] = '" + strItemID + "'");

                        if (selRows.Length > 0)
                        {
                            strDescr = selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();

                            if (blnPriceColumnExists)
                            {
                                if (!string.IsNullOrEmpty(selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString()))
                                {
                                    strPrice = selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString();
                                }
                                else
                                {
                                    strPrice = "0.00";
                                }
                            }
                            else
                            {
                                strPrice = "0.00";
                            }
                        }
                        else
                        {
                            strDescr = string.Empty;
                            strPrice = "0.00";
                        }

                        retRow = retTbl.NewRow();

                        retRow["ITEM_ID"] = strItemID;
                        retRow["DESCRIPTION"] = strDescr;
                        retRow["UOM"] = dsOrders.Tables[0].Rows[intCnt]["UOM"].ToString();
                        retRow["PRICE"] = strPrice;
                        retRow["REQUISITION_NO"] = dsOrders.Tables[0].Rows[intCnt]["REQUISITION_NO"].ToString();
                        retRow["QTY"] = dsOrders.Tables[0].Rows[intCnt]["QTY"].ToString();
                        retRow["QTY_RCVD"] = dsOrders.Tables[0].Rows[intCnt]["QTY_RCVD"].ToString();
                        retRow["ORDER_STATUS"] = dsOrders.Tables[0].Rows[intCnt]["ORDER_STATUS"].ToString();
                        retRow["LINE_NO"] = dsOrders.Tables[0].Rows[intCnt]["LINE_NO"].ToString();
                        retRow["BIN_LOC"] = dsOrders.Tables[0].Rows[intCnt]["BIN_LOC"].ToString();
                        retRow["ORDER_NO"] = dsOrders.Tables[0].Rows[intCnt]["ORDER_NO"].ToString();
                        retRow["TRANSACTION_ID"] = dsOrders.Tables[0].Rows[intCnt]["TRANSACTION_ID"].ToString();
                        retTbl.Rows.Add(retRow);
                    }

                }

                pOrdDetails = new DataSet();
                pOrdDetails.Tables.Add(retTbl);

                if (pOrdDetails.Tables[0].Rows.Count > 0)
                {
                    lstOrderDetails = (from DataRow item in pOrdDetails.Tables[0].Rows
                                       select new PAR_MNGT_ORDER_DETAILS()
                                       {
                                           BIN_LOC = item["BIN_LOC"].ToString(),
                                           ITEM_ID = item["ITEM_ID"].ToString(),
                                           LINE_NO = item["LINE_NO"].ToString(),
                                           ORDER_NO = Convert.ToInt32(item["ORDER_NO"]),
                                           ORDER_STATUS = Convert.ToInt32(item["ORDER_STATUS"]),
                                           QTY = Convert.ToDouble(item["QTY"]),
                                           QTY_RCVD = Convert.ToDouble(item["QTY_RCVD"]),
                                           REQUISITION_NO = item["REQUISITION_NO"].ToString(),
                                           TRANSACTION_ID = string.IsNullOrEmpty(item["TRANSACTION_ID"].ToString()) ? 0 : Convert.ToInt32(item["TRANSACTION_ID"]),
                                           UOM = item["UOM"].ToString(),
                                           DESCRIPTION = item["DESCRIPTION"].ToString(),
                                           PRICE = item["PRICE"].ToString()
                                       }).ToList();
                }

                response.StatusCode = AtparStatusCodes.ATPAR_OK;
                response.DataList = lstOrderDetails;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }

        /// <summary>
        /// Getting order haders
        /// </summary>
        /// <param name="fromDate"></param>
        /// <param name="toDate"></param>
        /// <param name="compID"></param>
        /// <param name="locID"></param>
        /// <param name="deptID"></param>
        /// <param name="vendorID"></param>
        /// <param name="ordStatus"></param>
        /// <param name="reqNo"></param>
        /// <param name="itemID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<VM_POU_MNGT_ORDER_DETAILS> GetOrderHeaders(string fromDate, string toDate, string compID, string locID, string deptID, string vendorID, string ordStatus, string reqNo, string itemID,
string orgGrpID, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DateTime fDate = Convert.ToDateTime(fromDate);
            DateTime tDate = Convert.ToDateTime(toDate);
            DataSet dsOrdheader = default(DataSet);
            string strCartId = null;
            string strBUnit = null;
            string strLocType = null;
            string strvendorID = null;
            string strVendorName = null;
            DataTable retTbl = new DataTable();
            DataRow retRow = default(DataRow);
            DataSet detDS = default(DataSet);
            DataTable dDetTbl = new DataTable();
            DataRow[] selRows = null;
            long statusCode = -1;
            DataSet dsOrders = new DataSet();
            List<VM_POU_MNGT_ORDER_DETAILS> lstOrderDetails = new List<VM_POU_MNGT_ORDER_DETAILS>();
            var response = new AtParWebApiResponse<VM_POU_MNGT_ORDER_DETAILS>();

            if (compID != null) compID = compID.Replace("'", "''");
            if (locID != null) locID = locID.Replace("'", "''");
            if (deptID != null) deptID = deptID.Replace("'", "''");
            if (ordStatus != null) ordStatus = ordStatus.Replace("'", "''");

            retTbl = new DataTable("ORDER_HEADER");
            retTbl.Columns.Add("ORDER_NO", Type.GetType("System.String"));
            retTbl.Columns.Add("VENDOR_ID", Type.GetType("System.String"));
            retTbl.Columns.Add("ORDER_DATE", Type.GetType("System.DateTime"));
            retTbl.Columns.Add("ORG_ID", Type.GetType("System.String"));
            retTbl.Columns.Add("PAR_LOC_ID", Type.GetType("System.String"));
            retTbl.Columns.Add("DEPARTMENT_ID", Type.GetType("System.String"));
            retTbl.Columns.Add("REQUISITION_NO", Type.GetType("System.String"));

            try
            {
                try
                {
                    List<VM_POU_MNGT_ORDER_DETAILS> resultOrderDetails = _repo.GetDistinctOrderDetails(appID, orgGrpID, compID, locID, deptID, ordStatus, reqNo, itemID, fDate, tDate);
                    dsOrdheader = resultOrderDetails.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    return response;
                }

                //GetConfigData();
                if (dsOrdheader.Tables[0].Rows.Count > 0)
                {
                    DataView dv = new DataView(dsOrdheader.Tables[0]);
                    dv.Sort = "PAR_LOC_ID,ORG_ID,VENDOR_ID,LOCATION_TYPE DESC";
                    for (int intRecCnt = 0; intRecCnt <= dv.Count - 1; intRecCnt++)
                    {
                        if (detDS == null)
                        {
                            strCartId = dv[intRecCnt]["PAR_LOC_ID"].ToString();
                            strBUnit = dv[intRecCnt]["ORG_ID"].ToString();
                            strvendorID = dv[intRecCnt]["VENDOR_ID"].ToString();
                            strLocType = dv[intRecCnt]["LOCATION_TYPE"].ToString();

                            Tuple<long, DataSet> a = _commonPOUService.GetCartDetails(strCartId, strBUnit, detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], "", strLocType, null, "", appID, "");
                            detDS = a.Item2;
                            statusCode = a.Item1;
                        }
                        else if(strCartId!= dv[intRecCnt]["PAR_LOC_ID"].ToString() || strBUnit!= dv[intRecCnt]["ORG_ID"].ToString() || strvendorID!= dv[intRecCnt]["VENDOR_ID"].ToString() || strLocType!= dv[intRecCnt]["LOCATION_TYPE"].ToString())
                        {
                            strCartId = dv[intRecCnt]["PAR_LOC_ID"].ToString();
                            strBUnit = dv[intRecCnt]["ORG_ID"].ToString();
                            strvendorID = dv[intRecCnt]["VENDOR_ID"].ToString();
                            strLocType = dv[intRecCnt]["LOCATION_TYPE"].ToString();

                            Tuple<long, DataSet> a = _commonPOUService.GetCartDetails(strCartId, strBUnit, detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], "", strLocType, null, "", appID, "");

                            detDS = a.Item2;
                            statusCode = a.Item1;
                        }
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (response.StatusMessage == null)
                            {
                                response.StatusMessage = "Internal Server Error";
                            }
                            response.StatType = AtParWebEnums.StatusType.Error;
                            response.StatusCode = statusCode;

                            return response;
                        }

                        if (!string.IsNullOrEmpty(strvendorID))
                        {
                            if (detDS.Tables.Count > 0)
                            {
                                detDS.Tables[1].TableName = "Details";
                                dDetTbl = detDS.Tables["Details"];
                            }

                            selRows = dDetTbl.Select("[" + dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ID].ColumnName + "] = '" + strvendorID + "'");

                            if (selRows.Length > 0)
                            {
                                strVendorName = "-" + selRows[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_NAME];
                            }
                            else
                            {
                                strVendorName = string.Empty;
                            }
                        }
                        else
                        {
                            strVendorName = string.Empty;
                        }

                        retRow = retTbl.NewRow();

                        retRow["ORDER_NO"] = dv[intRecCnt]["ORDER_NO"].ToString();
                        retRow["VENDOR_ID"] = dv[intRecCnt]["VENDOR_ID"].ToString() + strVendorName;
                        retRow["ORDER_DATE"] = dv[intRecCnt]["ORDER_DATE"].ToString();
                        retRow["ORG_ID"] = dv[intRecCnt]["ORG_ID"].ToString();
                        retRow["PAR_LOC_ID"] = dv[intRecCnt]["PAR_LOC_ID"].ToString();
                        retRow["DEPARTMENT_ID"] = dv[intRecCnt]["DEPARTMENT_ID"].ToString();
                        retRow["REQUISITION_NO"] = dv[intRecCnt]["REQUISITION_NO"].ToString();

                        if (!string.IsNullOrEmpty(vendorID))
                        {
                            strvendorID = strvendorID.ToUpper();
                            strVendorName = strVendorName.ToUpper();
                            vendorID = vendorID.ToUpper();

                            if (strvendorID.Contains(vendorID) | strVendorName.Contains(vendorID))
                            {
                                retTbl.Rows.Add(retRow);
                            }
                        }
                        else
                        {
                            retTbl.Rows.Add(retRow);
                        }
                    }
                   
                }
                dsOrders = new DataSet();

                dsOrders.Tables.Add(retTbl);

                if (dsOrders.Tables[0].Rows.Count > 0)
                {
                    lstOrderDetails = (from DataRow item in dsOrders.Tables[0].Rows
                                       select new VM_POU_MNGT_ORDER_DETAILS()
                                       {
                                           DEPARTMENT_ID = item["DEPARTMENT_ID"].ToString(),
                                           ORDER_DATE = Convert.ToDateTime(item["ORDER_DATE"]),
                                           ORDER_NO = Convert.ToInt32(item["ORDER_NO"]),
                                           ORG_ID = item["ORG_ID"].ToString(),
                                           PAR_LOC_ID = item["PAR_LOC_ID"].ToString(),
                                           REQUISITION_NO = item["REQUISITION_NO"].ToString(),
                                           VENDOR_ID = item["VENDOR_ID"].ToString()
                                       }).ToList();
                }

                response.StatusCode = AtparStatusCodes.ATPAR_OK;
                response.DataList = lstOrderDetails.OrderBy(x=>x.ORDER_NO).ToList();
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }

        //private void GetConfigData()
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
        //        throw ex;
        //    }
        //}
    }
}
