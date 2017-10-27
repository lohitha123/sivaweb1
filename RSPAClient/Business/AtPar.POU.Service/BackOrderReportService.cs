using AtPar.Service.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Repository.Interfaces.Common;
using log4net;
using AtPar.Common.Service;
using System.Data;
using AtPar.ViewModel;
using AtPar.POCOEntities;

namespace AtPar.POU.Service
{
    public class BackOrderReportService : IBackOrderReportService
    {
        #region PrivateVariables

        IBackOrderReportRepository _backOrderReportReportRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonPOURepository _commonPOURepo;

        ICommonPOUService _commonPOUService;

        #endregion

        #region Constructor
        public BackOrderReportService(IBackOrderReportRepository backOrderReportReportRepo, ILog log, ICommonRepository commonRepository, ICommonPOURepository commonPOURepo, ICommonPOUService commonPOUService)
        {
            _backOrderReportReportRepo = backOrderReportReportRepo;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOURepo = commonPOURepo;
            _commonPOUService = commonPOUService;
        }
        #endregion

        #region  GetBackOrderReportData
        /// <summary>
        /// GetBackOrderReportData
        /// </summary>
        /// <param name="pStrBusinessUnit"></param>
        /// <param name="pStrCartId"></param>
        /// <param name="pStrUserId"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetBackOrderReportData(string pStrBusinessUnit, string pStrCartId, string pStrUserId, string pStrFromDate, string pStrToDate, string pOrgGrpID, int pAppID, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            pStrBusinessUnit = string.IsNullOrEmpty(pStrBusinessUnit) ? string.Empty : pStrBusinessUnit;
            pStrCartId = string.IsNullOrEmpty(pStrCartId) ? string.Empty : pStrCartId;
            var response = new AtParWebApiResponse<long>();
           
            try
            {
                var pBackOrderDS = _backOrderReportReportRepo.GetBackOrderReportData(pStrBusinessUnit, pStrCartId, pStrUserId, pStrFromDate, pStrToDate, pOrgGrpID, pAppID);
                if (pBackOrderDS.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(pBackOrderDS.Item1, _commonRepo, _log);
                    return response;
                }
                return  response = GetBackOrderItemDescr(pBackOrderDS.Item2, pStrUserId, pOrgGrpID, pStrBusinessUnit, pStrCartId, pAppID, deviceTokenEntry);
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                  _log.Fatal(methodBaseName + " Failed to get the Back Order report data" + " : Exception is : " + ex.ToString() + "\n");
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
           
        }
        #endregion

        #region GetBackOrderItemDescr
        /// <summary>
        /// GetBackOrderItemDescr
        /// </summary>
        /// <param name="pBackOrderDataDS"></param>
        /// <param name="pUserId"></param>
        /// <param name="pOrgGrpID"></param>
        /// <param name="pBUnit"></param>
        /// <param name="pCartID"></param>
        /// <param name="pAppID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetBackOrderItemDescr(DataSet pBackOrderDataDS,string pUserId,string pOrgGrpID,string pBUnit,string pCartID,int pAppID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();

            DataSet _AllocDS;
            DataSet _retDS = new DataSet();
            DataTable _retTbl;
            DataRow _retRow;
            int itemCntr;
            string _CartName;
            string _BusinessUnit;
            string _strLocType = String.Empty;
            DataSet _detDS;
            DataTable dDetTbl;
            string _strItemID;
            DataRow[] __selRows;
            //DataRow __selRow;
            DataRow[] _drCart;
            double orderedQty;
            double receivedQty;
            double backOrderQty;
            StringBuilder sbSearch;
           
            string _strCompartment;
            string _strUom = String.Empty;

            try
            {
                var AllocDS=_backOrderReportReportRepo.GetUserdepartmentsCarts(pUserId, pOrgGrpID);
                if (AllocDS.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AllocDS.Item1, _commonRepo, _log);
                    return response;
                }
                _AllocDS = AllocDS.Item2;
                if (((pBUnit != String.Empty)
                       && (pCartID != String.Empty)))
                {
                    _drCart = _AllocDS.Tables[0].Select(("BUSINESS_UNIT =\'"
                                    + (pBUnit + ("\' AND CART_ID =\'"
                                    + (pCartID + "\' AND LOCATION_TYPE <>\'I\'")))));
                }
                else if ((pBUnit != String.Empty))
                {
                    _drCart = _AllocDS.Tables[0].Select(("BUSINESS_UNIT =\'"
                                    + (pBUnit + "\' AND LOCATION_TYPE <>\'I\'")));
                }
                else
                {
                    _drCart = _AllocDS.Tables[0].Select("LOCATION_TYPE <>\'I\'");
                }

                _retTbl = new DataTable("BACK_ORDER_ITEMS");
                _retTbl.Columns.Add("ORDER_DATE_TIME", Type.GetType("System.DateTime"));
                _retTbl.Columns.Add("PTWY_DATE_TIME", Type.GetType("System.DateTime"));
                _retTbl.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                _retTbl.Columns.Add("CART_ID", Type.GetType("System.String"));
                _retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                _retTbl.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));
                _retTbl.Columns.Add("QUANTITY_ORDERED", Type.GetType("System.String"));
                _retTbl.Columns.Add("QUANTITY_RECEIVED", Type.GetType("System.String"));
                _retTbl.Columns.Add("BACK_ORDER_QUANTITY", Type.GetType("System.String"));
                //  _retTbl.Columns.Add("UOM", Type.GetType("System.String"))
                //  if there are any allocations
                _detDS = default(DataSet);
                if ((_drCart.Length > 0))
                {
                    foreach (DataRow _dr in _drCart)
                    {
                        _CartName = _dr["CART_ID"].ToString();
                        _BusinessUnit = _dr["BUSINESS_UNIT"].ToString();
                        _strLocType = _dr["LOCATION_TYPE"].ToString();
                        var dsgetCartDetails = _commonPOUService.GetCartDetails(_CartName, _BusinessUnit, _detDS, pOrgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), locationType: _strLocType);
                        if ((dsgetCartDetails.Item1 != AtparStatusCodes.ATPAR_OK))
                        {
                            response.AtParNotOK(dsgetCartDetails.Item1, _commonRepo, _log);
                            return response;
                        }
                       
                        else
                        {
                            _detDS = dsgetCartDetails.Item2;
                            //  look for the items in those tables
                            _detDS.Tables[1].TableName = "Details";
                            dDetTbl = new DataTable();
                            dDetTbl = _detDS.Tables["Details"];
                            //  look for all the items in the list 
                            for (itemCntr = 0; (itemCntr
                                        <= (pBackOrderDataDS.Tables[0].Rows.Count - 1)); itemCntr++)
                            {
                                if ((pBackOrderDataDS.Tables[0].Rows[itemCntr]["CART_ID"].ToString() != _CartName))
                                {
                                    // TODO: Continue For... Warning!!! not translated
                                    // Skipping the row if the cart id did not match
                                    continue;
                                }

                                _strItemID = pBackOrderDataDS.Tables[0].Rows[itemCntr]["ITEM_ID"].ToString();
                                _strCompartment = pBackOrderDataDS.Tables[0].Rows[itemCntr]["COMPARTMENT"].ToString().substituteString();
                                sbSearch = new System.Text.StringBuilder();
                                if (_strItemID.Length>0)
                                {
                                    sbSearch.Append(("["
                                                    + (dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + ("] = \'"
                                                    + (_strItemID + "\'")))));
                                }

                                if (_strCompartment.Length>0)
                                {
                                    sbSearch.Append((" AND ["
                                                    + (dDetTbl.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ColumnName + ("] = \'"
                                                    + (_strCompartment + "\'")))));
                                }

                                __selRows = dDetTbl.Select(sbSearch.ToString());
                                // HK-IT0001419
                                if ((__selRows.Length > 0))
                                {
                                    foreach (DataRow __selRow in __selRows)
                                    {
                                        orderedQty = ((double)(pBackOrderDataDS.Tables[0].Rows[itemCntr]["QUANTITY_ORDERED"]));
                                        receivedQty = ((double)(pBackOrderDataDS.Tables[0].Rows[itemCntr]["QUANTITY_RECEIVED"]));
                                        backOrderQty = (orderedQty - receivedQty);
                                        if ((backOrderQty > 0))
                                        {
                                            _retRow = _retTbl.NewRow();
                                            _retRow["ORDER_DATE_TIME"] = pBackOrderDataDS.Tables[0].Rows[itemCntr]["ORDER_DATE_TIME"];
                                            _retRow["PTWY_DATE_TIME"] = pBackOrderDataDS.Tables[0].Rows[itemCntr]["PTWY_DATE_TIME"];
                                            _retRow["BUSINESS_UNIT"] = _BusinessUnit;
                                            _retRow["CART_ID"] = _CartName;
                                            _retRow["ITEM_ID"] = __selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                                            _retRow["ITEM_DESCRIPTION"] = __selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR];
                                            _strUom = __selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                                            // Overwritting the _strUom variable based on the Conversion factor.
                                            if (__selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR]!=DBNull.Value)
                                            {
                                                if (!string.IsNullOrEmpty(__selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR].ToString()))
                                                {
                                                    if ((double.Parse(__selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR].ToString()) > 1))
                                                    {
                                                        if ((_strLocType == AtParWebEnums.LocationType.A.ToString()))
                                                        {
                                                            if (__selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC]!=DBNull.Value)
                                                            {
                                                                if (!string.IsNullOrEmpty(__selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC].ToString()))
                                                                {
                                                                    _strUom = __selRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC].ToString();
                                                                }

                                                            }

                                                        }

                                                    }

                                                }

                                            }

                                            _retRow["QUANTITY_ORDERED"] = (FormatAtParNumber(pBackOrderDataDS.Tables[0].Rows[itemCntr]["QUANTITY_ORDERED"].ToString(), 2) + (" " + _strUom));
                                            _retRow["QUANTITY_RECEIVED"] = (FormatAtParNumber(pBackOrderDataDS.Tables[0].Rows[itemCntr]["QUANTITY_RECEIVED"].ToString(), 2) + (" " + _strUom));
                                            _retRow["BACK_ORDER_QUANTITY"] = (FormatAtParNumber(backOrderQty.ToString(), 2) + (" " + _strUom));
                                            // _retRow("UOM") = __selRow(Get_Cart_Detail_Enum.UOM)
                                            _retTbl.Rows.Add(_retRow);
                                        }

                                    }

                                }

                            }

                        }

                    }
                   

                }
                _retDS.Tables.Add(_retTbl);

                var ds = new Dictionary<string, object> { { "_retDS", _retDS } };
                response.AtParSuccess();
                response.DataDictionary = ds;
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to get the Back Order report data" + " : Exception is : " + ex.ToString() + "\n");
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }
        #endregion

        #region GetBUnits_Carts
        /// <summary>
        /// GetBUnits_Carts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="appID"></param>
        /// <param name="locationType"></param>
        /// <param name="cartType"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string locationType = "", string cartType = "", params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS>();

            try
            {

                response.DataList = _backOrderReportReportRepo.GetBUnits_Carts(userID, appID, deviceTokenEntry, locationType, cartType);


                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region PrivateMethods
        /// <summary>
        /// FormatAtParNumber
        /// </summary>
        /// <param name="IP"></param>
        /// <param name="Length"></param>
        /// <returns></returns>
        private string FormatAtParNumber(string IP, int Length)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                var finalIP = string.Empty;
                //string strPad = string.Empty;
                var ipsplit = IP.Split('.');
                if(ipsplit.Length>1)
                {
                    if(ipsplit[1].Length==1)
                    {
                        finalIP = ipsplit[0] + "." + ipsplit[1] + "0";
                    }
                    else
                    {
                        finalIP = IP;
                    }
                }
                else
                {
                    finalIP= IP + ".00";
                }
                //var s = IP.Split('.').Length > 1 ? IP : IP + ".00";// Math.Truncate(Convert.ToDouble(IP) * Math.Pow(10, Length)) / Math.Pow(10, Length)), "0.".PadRight(Length, '0'));
                return finalIP;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":Failed to format the number: " + IP + System.Environment.NewLine + " :Exception is:" + ex.Message.ToString() + System.Environment.NewLine);
                return IP.ToString();
            }
        }
        #endregion

    }
}
