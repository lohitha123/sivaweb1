using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.Service.Interfaces.CycleCount;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Timers;
using System.Xml;
using System.Xml.Linq;

namespace AtPar.CycleCount.Service
{
    public class ProcessCountsService : IProcessCountsService
    {
        #region Private Variable
        ILog _log;
        ICommonRepository _commonRepo;
        IProcessCountsRepository _repo;
        ISplitEventsService _splitService;
        #endregion

        #region Constructor
        public ProcessCountsService(ILog log,
                                    ICommonRepository commonRepository,
                                    IProcessCountsRepository repo,
                                    ISplitEventsService splitService)
        {
            _log = log;
            _commonRepo = commonRepository;
            _repo = repo;
            _splitService = splitService;
            _log.SetLoggerType(typeof(ProcessCountsService));
            //GetConfigData();
        }

        #endregion

        #region Methods

      
        public AtParWebApiResponse<bool> CheckIfEventIsParentEvent(string bUnit, string eventID, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<bool>();
            bool isParentEvent = false;
            try
            {
                var transCount = _repo.CheckIfEventIsParentEvent(bUnit, eventID, userID, deviceTokenEntry);
                if (transCount > 0)
                {
                    isParentEvent = true;
                }
                else
                {
                    isParentEvent = false;
                }
                response.DataVariable = isParentEvent;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }

            #endregion
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
        public AtParWebApiResponse<bool> GetEventDetails(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<bool>();
            DataSet pDsEventDetails = new DataSet();
            //Timer timer = new Timer();
            SortedList<string, string> _orgParams = default(SortedList<string, string>);
            try
            {
                try
                {

                    // timer.Start();
                    var eventData = _repo.GetEventData(bUnit, eventID);
                    var eventDetails = eventData["eventDetails"] as List<MT_CYCT_EVENT_HDR>;
                    var getEventItems = eventData["getEventItems"] as List<MT_CYCT_EVENT_DETAIL>;
                    var getEventItemProperties = eventData["getEventItemProperties"] as List<MT_CYCT_EVENT_DETAIL>;
                    var splittedCount = eventData["splittedCount"] as List<MT_CYCT_EVENT_HDR_MASTER>;
                    var totalRecCount = eventData["totalRecCount"] as List<MT_CYCT_EVENT_DETAIL>;
                    var getEventDetails = eventData["getEventDetails"] as List<MT_CYCT_EVENT_DETAIL>;
                    DataTable dteventDetails = eventDetails.ToDataTable();
                    DataTable dtgetEventItems = getEventItems.ToDataTable();
                    DataTable dtgetEventItemProperties = getEventItemProperties.ToDataTable();
                    DataTable dtsplittedCount = splittedCount.ToDataTable();
                    DataTable dttotalRecCount = totalRecCount.ToDataTable();
                    DataTable dtgetEventDetails = getEventDetails.ToDataTable();
                    DataSet _dsEventDetails = new DataSet();
                    _dsEventDetails.Tables.Add(dteventDetails);
                    _dsEventDetails.Tables.Add(dtgetEventItems);
                    _dsEventDetails.Tables.Add(dtgetEventItemProperties);
                    _dsEventDetails.Tables.Add(dtsplittedCount);
                    _dsEventDetails.Tables.Add(dttotalRecCount);
                    _dsEventDetails.Tables.Add(dtgetEventDetails);

                    int intItemCount = 0;

                    if (Convert.ToInt32(_dsEventDetails.Tables[4].Rows[0]["TOTALREC"]) > 0)
                    {
                        intItemCount = Convert.ToInt32(_dsEventDetails.Tables[4].Rows[0]["TOTALREC"].ToString());
                    }

                    if (_dsEventDetails.Tables.Count > 0)
                    {
                        if (_dsEventDetails.Tables[1].Rows.Count >= 0)
                        {
                            //If intItemCount <> _dsEventDetails.Tables(1).Rows.Count Then
                            _dsEventDetails.Tables[1].Merge(_dsEventDetails.Tables[5]);
                            //End If
                        }
                    }
                    _dsEventDetails.Tables[0].TableName = "EVENT_TRANSACTIONS";
                    //contains all transactions for event
                    _dsEventDetails.Tables[1].TableName = "EVENT_DETAILS";
                    //contains the number of items in the event
                    _dsEventDetails.Tables[2].TableName = "EVENT_TRANSACTION_DETAILS";
                    //contains the items for the event in all transactions for the event
                    _dsEventDetails.Tables[3].TableName = "EVENT_SPLIT_DETAILS";
                    DataRow[] _drItemDetails = null;
                    DataRow[] _drLatestCount = null;
                    StringBuilder _sbSearch = new StringBuilder();
                    string[] _arrCountQty = null;

                    for (int intCnt = 0; intCnt <= _dsEventDetails.Tables["EVENT_DETAILS"].Rows.Count - 1; intCnt++)
                    {
                        //Append the required columns for binding the grid 
                        //columns needs to be created only once i.e when intCnt = 0 
                        if (intCnt == 0)
                        {
                            //_dsEventDetails.Tables("EVENT_DETAILS").Columns.Add("SELECTED_COUNT", Type.GetType("System.Double"))
                            //_dsEventDetails.Tables("EVENT_DETAILS").Columns.Add("FINAL_COUNT", Type.GetType("System.String"))
                            _dsEventDetails.Tables["EVENT_DETAILS"].Columns.Add("COUNT_DIFF", Type.GetType("System.Double"));
                            _dsEventDetails.Tables["EVENT_DETAILS"].Columns.Add("COUNT_DIFF_PER", Type.GetType("System.Double"));
                            _dsEventDetails.Tables["EVENT_DETAILS"].Columns.Add("VALUE_DIFF", Type.GetType("System.Double"));
                            _dsEventDetails.Tables["EVENT_DETAILS"].Columns.Add("EXT_VALUE", Type.GetType("System.Double"));
                            _dsEventDetails.Tables["EVENT_DETAILS"].Columns.Add("LATEST_SYSQTY", Type.GetType("System.Double"));
                        }


                        for (int intTransCnt = 0; intTransCnt <= _dsEventDetails.Tables["EVENT_TRANSACTIONS"].Rows.Count - 1; intTransCnt++)
                        {
                            //Append the required dynamic columns for binding the grid 
                            //columns needs to be created only once i.e when intCnt = 0 
                            if (intCnt == 0)
                            {
                                _dsEventDetails.Tables["EVENT_DETAILS"].Columns.Add("COUNT" + intTransCnt, Type.GetType("System.String"));
                            }

                            _sbSearch
                             .Append("INV_ITEM_ID = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["INV_ITEM_ID"].ToString()).Append("' ")
                             .Append("AND STORAGE_AREA = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STORAGE_AREA"].ToString().substituteString()).Append("' ")
                             .Append("AND STOR_LEVEL_1 = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_1"].ToString()).Append("' ")
                             .Append("AND STOR_LEVEL_2 = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_2"].ToString()).Append("' ")
                             .Append("AND STOR_LEVEL_3 = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_3"].ToString()).Append("' ")
                             .Append("AND STOR_LEVEL_4 = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_4"].ToString()).Append("' ")
                             .Append("AND CONTAINER_ID = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["CONTAINER_ID"].ToString()).Append("' ")
                             .Append("AND SERIAL_ID = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["SERIAL_ID"].ToString()).Append("' ")
                             .Append("AND INV_LOT_ID = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["INV_LOT_ID"].ToString()).Append("' ");

                            if (!string.IsNullOrEmpty(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["EVENT_TYPE"].ToString()) &&
                                   Convert.ToInt32(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["EVENT_TYPE"]) == (int)AtParWebEnums.EventType.Manual)
                            {
                                _sbSearch.Append("AND STD_PACK_UOM = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STD_PACK_UOM"].ToString()).Append("' ");
                            }
                            else
                            {
                                _sbSearch.Append("AND UNIT_OF_MEASURE = '").Append(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["UNIT_OF_MEASURE"].ToString()).Append("' ");
                            }


                            _sbSearch.Append("AND TRANSACTION_ID = '").Append(_dsEventDetails.Tables["EVENT_TRANSACTIONS"].Rows[intTransCnt]["TRANSACTION_ID"]).Append("' ");

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " The search string is " + _sbSearch.ToString());

                            _drItemDetails = _dsEventDetails.Tables["EVENT_TRANSACTION_DETAILS"].Select(_sbSearch.ToString());

                            var _with3 = _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt];

                            //Indicates item exists in the transaction
                            if (_drItemDetails.Length > 0)
                            {
                                _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT" + intTransCnt] = _drItemDetails[0]["COUNT_QTY"];
                                if (_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT_DIFF"] == System.DBNull.Value)
                                {
                                    _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT_DIFF"] = -9999;
                                }
                                if (_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT_DIFF_PER"] == System.DBNull.Value)
                                {
                                    _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT_DIFF_PER"] = -9999;
                                }
                                if (_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["VALUE_DIFF"] == System.DBNull.Value)
                                {
                                    _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["VALUE_DIFF"] = -9999;
                                }
                                if (_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["EXT_VALUE"] == System.DBNull.Value)
                                {
                                    _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["EXT_VALUE"] = -9999;
                                }
                                //Item does not exists in the transaction
                            }
                            else
                            {
                                _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT" + intTransCnt] = "N";
                            }

                            _sbSearch.Remove(0, _sbSearch.Length);                             
                            _sbSearch.Append("INV_ITEM_ID = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["INV_ITEM_ID"].ToString() + "' ");
                            _sbSearch.Append("AND STORAGE_AREA = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STORAGE_AREA"].ToString().substituteString() + "' ");
                            _sbSearch.Append("AND STOR_LEVEL_1 = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_1"].ToString() + "' ");
                            _sbSearch.Append("AND STOR_LEVEL_2 = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_2"].ToString() + "' ");
                            _sbSearch.Append("AND STOR_LEVEL_3 = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_3"].ToString() + "' ");
                            _sbSearch.Append("AND STOR_LEVEL_4 = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STOR_LEVEL_4"].ToString() + "' ");
                            _sbSearch.Append("AND CONTAINER_ID = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["CONTAINER_ID"].ToString() + "' ");
                            _sbSearch.Append("AND SERIAL_ID = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["SERIAL_ID"].ToString() + "' ");
                            _sbSearch.Append("AND INV_LOT_ID = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["INV_LOT_ID"].ToString() + "' ");

                            if (_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["EVENT_TYPE"] != DBNull.Value
                                && Convert.ToInt32(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["EVENT_TYPE"]) == (int)AtParWebEnums.EventType.Manual)
                            {
                                _sbSearch.Append("AND STD_PACK_UOM = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["STD_PACK_UOM"].ToString() + "' ");
                            }
                            else
                            {
                                _sbSearch.Append("AND UNIT_OF_MEASURE = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["UNIT_OF_MEASURE"].ToString() + "' ");
                            }

                            _sbSearch.Append("AND LATEST_UPDATE_DATE = '" + _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["LATEST_UPDATE_DATE"] + "' ");
                            _sbSearch.Append("AND TRANSACTION_ID = '" + _dsEventDetails.Tables["EVENT_TRANSACTIONS"].Rows[intTransCnt]["TRANSACTION_ID"] + "' ");

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " The search string is " + _sbSearch.ToString());

                            _drLatestCount = _dsEventDetails.Tables["EVENT_TRANSACTION_DETAILS"].Select(_sbSearch.ToString());

                            var _with5 = _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt];

                            //Indicates item exists in the transaction
                            if (_drLatestCount.Length > 0)
                            {
                                if (_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT_USER_ID"] != DBNull.Value)
                                {
                                    if (!string.IsNullOrEmpty(_dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["COUNT_USER_ID"].ToString()))
                                    {
                                        string strVal = _drLatestCount[0]["COUNT_QTY"].ToString();
                                        string strlatestCount = string.Empty;
                                        string[] strDrLatestCount = null;
                                        int i = 0;
                                        strDrLatestCount = strVal.Split(',');
                                        strDrLatestCount[5] = "Y";
                                        for (i = 0; i <= strDrLatestCount.Length - 1; i++)
                                        {
                                            if (i == 0)
                                            {
                                                if (strDrLatestCount[0] != null)
                                                {
                                                    strlatestCount = strDrLatestCount[0];
                                                }
                                            }
                                            else
                                            {
                                                if ((i == 0) && (strDrLatestCount[0] != null))
                                                {
                                                    strlatestCount = strDrLatestCount[0];
                                                }
                                                else
                                                {
                                                    strlatestCount = strlatestCount + "," + strDrLatestCount[i];
                                                }
                                            }
                                            //If strlatestCount = "" Then
                                            //    strlatestCount = strDrLatestCount(i)
                                            //Else
                                            //    strlatestCount = strlatestCount + "," + strDrLatestCount(i)
                                            //End If
                                        }
                                        if (strDrLatestCount[0] != null)
                                        {
                                            if (string.IsNullOrEmpty(strDrLatestCount[0]))
                                            {
                                                strDrLatestCount[0] = "0";
                                            }
                                        }
                                        _with5["COUNT" + intTransCnt] = strlatestCount.ToString();

                                        _with5["COUNT_DIFF"] = Math.Abs(Convert.ToDouble(strDrLatestCount[0]) - Convert.ToDouble(_with5["SYS_QTY"])).ToString("0.00", CultureInfo.InvariantCulture);
                                        if (Convert.ToInt32(_with5["SYS_QTY"]) == 0)
                                        {
                                            _with5["COUNT_DIFF_PER"] = 0.ToString("0.00", CultureInfo.InvariantCulture);
                                        }
                                        else
                                        {
                                            _with5["COUNT_DIFF_PER"] = Math.Abs(((Convert.ToDouble(strDrLatestCount[0]) - Convert.ToDouble(_with5["SYS_QTY"])) / Convert.ToDouble(_with5["SYS_QTY"])) * 100).ToString("0.00", CultureInfo.InvariantCulture);
                                        }
                                        _with5["VALUE_DIFF"] = Math.Abs(Convert.ToDouble(strDrLatestCount[0]) - Convert.ToDouble(_with5["SYS_QTY"]) * Convert.ToDouble(_with5["ITEM_PRICE"])).ToString("0.00", CultureInfo.InvariantCulture);
                                        _with5["EXT_VALUE"] = Math.Abs(Convert.ToDouble(strDrLatestCount[0]) * Convert.ToDouble(_with5["ITEM_PRICE"])).ToString("0.00", CultureInfo.InvariantCulture);

                                    }
                                }
                            }



                            _sbSearch.Remove(0, _sbSearch.Length);

                        }
                        _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["LATEST_SYSQTY"] = _dsEventDetails.Tables["EVENT_DETAILS"].Rows[intCnt]["SYS_QTY"];
                    }
                    pDsEventDetails.Tables.Add(_dsEventDetails.Tables["EVENT_DETAILS"].Copy());                   
                    _orgParams = new SortedList<string, string>();
                    _orgParams[AtParWebEnums.AppParameters_Enum.DISPLAY_CURRENT_SYS_QTY.ToString()] = string.Empty;
                    _commonRepo.GetOrgGroupParamValues(_orgParams, (int)AtParWebEnums.EnumApps.CycleCount, pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString());
                    if (_orgParams[AtParWebEnums.AppParameters_Enum.DISPLAY_CURRENT_SYS_QTY.ToString()] == AtParWebEnums.YesNo_Enum.Y.ToString())                   
                    {
                        DataTable dtItemsTable = new DataTable();
                        dtItemsTable = PrepareItemsData(_dsEventDetails.Tables["EVENT_TRANSACTION_DETAILS"]);
                        pDsEventDetails.Tables.Add(dtItemsTable);
                        GetEventItemsForSysQty(bUnit, eventID, pUserID, pDeviceTokenEntry,ref pDsEventDetails);
                    }

                    pDsEventDetails.Tables.Add(_dsEventDetails.Tables["EVENT_TRANSACTIONS"].Copy());
                    pDsEventDetails.Tables.Add(_dsEventDetails.Tables["EVENT_SPLIT_DETAILS"].Copy());                    
                }

                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to build the final dataset:" + " Exception is : " + ex.ToString());
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }                        
                var dynamicClass = pDsEventDetails.Tables["EVENT_DETAILS"].ToDynamicList("EventDetails");
                dynamicClass.Select(a => a.COMPLETED_DATE.ToString("MM/dd/yyyy hh:mm tt"));
                dynamicClass = dynamicClass.OrderBy(a => a.INV_ITEM_ID).ToList();
                var lstEventTrans = (from DataRow dr in pDsEventDetails.Tables["EVENT_TRANSACTIONS"].Rows
                                     select new MT_CYCT_EVENT_HDR
                                     {
                                         TRANSACTION_ID = (dr["TRANSACTION_ID"] != DBNull.Value) ? Convert.ToInt32(dr["TRANSACTION_ID"]) : 0,
                                         COMPLETED_DATE = (dr["COMPLETED_DATE"] != DBNull.Value) ? Convert.ToDateTime(dr["COMPLETED_DATE"].ToString()) : (DateTime?)null,
                                         EVENT_ID = dr["EVENT_ID"].ToString(),
                                         EVENT_STATUS = (dr["EVENT_STATUS"] != DBNull.Value) ? Convert.ToInt32(dr["EVENT_STATUS"]) : (int?)null,
                                         EVENTUSERS = dr["EVENTUSERS"].ToString(),
                                         USER_ID = dr["USER_ID"].ToString(),

                                     }).ToList();
                List<ITEM_LIST_TABLE> lstEventTransDtls = null;
                lstEventTrans.Select(a =>  Convert.ToDateTime(a.COMPLETED_DATE).ToString("MM/dd/yyyy hh:mm tt"));
                if (_orgParams[AtParWebEnums.AppParameters_Enum.DISPLAY_CURRENT_SYS_QTY.ToString()] == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    lstEventTransDtls = (from DataRow dr in pDsEventDetails.Tables["ITEMS_LIST_TABLE"].Rows
                                         select new ITEM_LIST_TABLE
                                         {
                                             ITEMS = dr["ITEMS"].ToString()
                                         }).ToList();
                }

                var lstEventSplitDtls = (from DataRow dr in pDsEventDetails.Tables["EVENT_SPLIT_DETAILS"].Rows
                                         select new MT_CYCT_EVENT_HDR_MASTER
                                         {
                                             ISSPLITTED = (dr["ISSPLITTED"] != DBNull.Value) ? Convert.ToInt32(dr["ISSPLITTED"]) : 0,
                                         }).ToList();
                Dictionary<string, object> result = new Dictionary<string, object>{ { "EVENT_DETAILS",dynamicClass },

                   { "ITEMS_LIST_TABLE",lstEventTransDtls }, { "EVENT_SPLIT_DETAILS", lstEventSplitDtls} ,{ "EVENT_TRANSACTIONS",lstEventTrans} };
                response.DataDictionary = result;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        public DataTable PrepareItemsData(DataTable details)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            DataTable _dtItemDetails = new DataTable();
            string _strItems = string.Empty;
            DataTable pItemDetails = new DataTable();

            try
            {
                pItemDetails.Columns.Add("ITEMS");
                DataRow dr = pItemDetails.NewRow();
                for (int j = 0; j <= details.Rows.Count - 1; j++)
                {
                    if (_strItems == string.Empty)
                    {
                        _strItems = "'" + details.Rows[j]["INV_ITEM_ID"].ToString() + "'";
                    }
                    else
                    {
                        _strItems = _strItems + ",'" + details.Rows[j]["INV_ITEM_ID"].ToString() + "'";
                    }
                }

                dr["ITEMS"] = _strItems;
                pItemDetails.Rows.Add(dr);
                pItemDetails.TableName = "ITEMS_LIST_TABLE";
                return pItemDetails;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to prepare items details Dataset" + ex.ToString());
                throw ex;
            }

        }

        public long GetEventItemsForSysQty(string bUnit, string eventID, string userID, string[] deviceTokenEntry,ref DataSet pDsDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long _StatusCode = 0;
            DataSet _dsParentEventIds = new DataSet();
            bool blnEventSplit = false;
            bool blnParentEvent = false;

            try
            {
                var transCount = _repo.CheckIfEventIsParentEvent(bUnit, eventID, userID, deviceTokenEntry);

                if (transCount == AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL)
                {
                    return transCount;
                }
                if (transCount > 0)
                {
                    blnParentEvent = true;
                }
                else
                {
                    blnParentEvent = false;
                }

                if (blnParentEvent)
                {
                    //pEventId passing as parent event id
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " Parent Event is : " + eventID);
                }
                else
                {
                    try
                    {
                        var lstParentEventIds = _repo.GetParentEventID(bUnit, eventID);

                        if (lstParentEventIds.Count > 0)
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + "Getting Parnet Event Id For : " + eventID);
                            eventID = lstParentEventIds[0].PARENT_EVENT_ID;
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + "Parnet Event Id  Is : " + eventID);
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to invoke " + "GetParentEventID function " + ex.Message);
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to check if event is Parent or" + " not : Status Code is : " + _StatusCode);
                return AtparStatusCodes.E_SERVERERROR;
            }
            string _strSQL = string.Empty;

            int intCntItems = 0;
            int intCntSplit = 0;
            int intItems = 0;
            int intItemSplit = 0;
            int intItemsRem = 0;
            XDocument xmlDom;
            long lngTransactionId = 0;
            string strItemrec = null;
            int intRecCount = 0;
            string descr = string.Empty;
            string defaultItem = string.Empty;
            string price = string.Empty;
            DataRow itemRow = default(DataRow);
            DataTable dtEvents = default(DataTable);
            DataView dvEvents = default(DataView);
            string strOrderby = string.Empty;
            int intOrderby = 0;
            string strUpdateSql = null;
            DataTable _dtItemAltUom = new DataTable();
            DataRow _drItemAltUom = default(DataRow);
            string _strItemId = null;
            DataSet _dsItemAltUom = new DataSet();
            DataRow[] _drAltUom = null;
            DataRow _dr = default(DataRow);
            StringBuilder _sbAltUom = new StringBuilder();
            DataRow[] _drUomExist = null;
            string _strUom = string.Empty;
            StringBuilder _sbStandardUom = new StringBuilder();
            DataSet pdsEvents = new DataSet();

            _dtItemAltUom.Columns.Add("UNIT_OF_MEASURE", Type.GetType("System.String"));
            _dtItemAltUom.Columns.Add("CONVERSION_RATE", Type.GetType("System.Double"));
            _dtItemAltUom.Columns.Add("INV_ITEM_ID", Type.GetType("System.String"));
            _dtItemAltUom.Columns.Add("UOM_TYPE", Type.GetType("System.String"));

            string strFromLoc = null;
            string strToLoc = null;
            dtEvents = new DataTable("EVENTS");
            dtEvents.Columns.Add("INV_ITEM_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("DESCRIPTION", Type.GetType("System.String"));
            dtEvents.Columns.Add("STORAGE_AREA", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_1", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_2", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_3", Type.GetType("System.String"));
            dtEvents.Columns.Add("STOR_LEVEL_4", Type.GetType("System.String"));
            dtEvents.Columns.Add("CONTAINER_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("STAGED_DATE", Type.GetType("System.String"));
            dtEvents.Columns.Add("SERIAL_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("INV_LOT_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("UNIT_OF_MEASURE", Type.GetType("System.String"));
            dtEvents.Columns.Add("SYS_QTY", Type.GetType("System.String"));
            dtEvents.Columns.Add("UPC_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("MFG_ITEM_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("VEND_ITEM_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("CUSTOM_ITEM_NO", Type.GetType("System.String"));
            dtEvents.Columns.Add("ITEM_PRICE", Type.GetType("System.String"));
            dtEvents.Columns.Add("INVENTORY_TAG_ID", Type.GetType("System.String"));
            dtEvents.Columns.Add("GTIN", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_1", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_2", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_3", Type.GetType("System.String"));
            dtEvents.Columns.Add("REPORT_FIELD_4", Type.GetType("System.String"));
            dtEvents.Columns.Add("PACKAGING_STRING", Type.GetType("System.String"));
            dtEvents.Columns.Add("UOM_TYPE", Type.GetType("System.String"));
            dtEvents.Columns.Add("STD_PACK_UOM", Type.GetType("System.String"));
            dtEvents.Columns.Add("L_S_CONTROLLED", Type.GetType("System.String"));
            dtEvents.Columns.Add("CONSIGNED_FLAG", Type.GetType("System.String"));


            //Changes when call from server web page
            DataSet _dsEventDetails = default(DataSet);
            string _strOutXML = null;


            try
            {
                string EventType = pDsDetails.Tables[0].AsEnumerable().Select(x => x.Field<int>("EVENT_TYPE")).FirstOrDefault().ToString();

                _dsEventDetails = _splitService.BuildDetailsInputDataset(bUnit, eventID, userID, EventType);

                //if (_StatusCode != ATPAR_OK)
                //{
                //    if (_log.IsWarnEnabled)
                //        _log.Warn(methodBaseName + " Failed to build the input dataset to " + "get details with statuscode " + _StatusCode);
                //    return AtparStatusCodes.E_SERVERERROR;
                //}

                try
                {
                    if (pDsDetails.Tables.Count > 1 && pDsDetails.Tables.Contains("ITEMS_LIST_TABLE"))
                    {
                        _dsEventDetails.Tables.Add(pDsDetails.Tables["ITEMS_LIST_TABLE"].DefaultView.ToTable());
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " : Failed : " + "Exception is: " + ex.ToString());

                    return AtparStatusCodes.E_SERVERERROR;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to build input dataset : " + "Exception is: " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }



            try
            {
                var outputXml = _splitService.GetDetails(_dsEventDetails, deviceTokenEntry);


                if (outputXml.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    if (outputXml.Item1 == AtparStatusCodes.E_NORECORDFOUND)
                    {
                        return AtparStatusCodes.E_NORECORDFOUND;
                    }

                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " Failed to get event details " + "with statuscode " + outputXml.Item1);
                    return AtparStatusCodes.E_SERVERERROR;
                }
                _strOutXML = outputXml.Item2;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to build get event details : " + "Exception is: " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }

            try
            {

                try
                {
                    xmlDom = XDocument.Parse(_strOutXML);
                }
                catch (Exception ex)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + "XML String Not Loaded " + ex);
                    return AtparStatusCodes.E_XMLSTRINGNOTLOADED;
                }

                var xmlRoot = xmlDom.Root;
                for (int i = 0; i <= xmlRoot.Descendants("HEADER").Count() + xmlRoot.Descendants("DETAIL").Count() - 1; i++)
                {
                    var xmlRecord = xmlRoot.Elements().ElementAt(i);
                    if (xmlRecord.Name == "DETAIL")
                    {
                        itemRow = dtEvents.NewRow();
                        _strItemId = string.Empty;
                        for (int j = 0; j <= xmlRecord.Descendants().Count() - 1; j++)
                        {
                            var xmlItem = xmlRecord.Descendants().ElementAt(j);
                            switch (xmlItem.Name.ToString())
                            {
                                case "ITEMID":
                                    itemRow["INV_ITEM_ID"] = xmlItem.Value;
                                    _strItemId = xmlItem.Value;
                                    break;
                                case "DESCR":
                                    itemRow["DESCRIPTION"] = xmlItem.Value;
                                    break;
                                case "SAREA":
                                    itemRow["STORAGE_AREA"] = xmlItem.Value;
                                    break;
                                case "STORL1":
                                    itemRow["STOR_LEVEL_1"] = xmlItem.Value;
                                    break;
                                case "STORL2":
                                    itemRow["STOR_LEVEL_2"] = xmlItem.Value;
                                    break;
                                case "STORL3":
                                    itemRow["STOR_LEVEL_3"] = xmlItem.Value;
                                    break;
                                case "STORL4":
                                    itemRow["STOR_LEVEL_4"] = xmlItem.Value;
                                    break;
                                case "CONTID":
                                    itemRow["CONTAINER_ID"] = xmlItem.Value;
                                    break;
                                case "STAGDT":
                                    itemRow["STAGED_DATE"] = xmlItem.Value;
                                    break;
                                case "SERID":
                                    itemRow["SERIAL_ID"] = xmlItem.Value;
                                    break;
                                case "LOTID":
                                    itemRow["INV_LOT_ID"] = xmlItem.Value;
                                    break;
                                case "UOM":
                                    itemRow["UNIT_OF_MEASURE"] = xmlItem.Value;
                                    break;
                                case "SYSQTY":
                                    itemRow["SYS_QTY"] = xmlItem.Value;
                                    break;
                                case "UPCID":
                                    itemRow["UPC_ID"] = xmlItem.Value;
                                    break;
                                case "MITMID":
                                    itemRow["MFG_ITEM_ID"] = xmlItem.Value;
                                    break;
                                case "VITMID":
                                    itemRow["VEND_ITEM_ID"] = xmlItem.Value;
                                    break;
                                case "CITMID":
                                    itemRow["CUSTOM_ITEM_NO"] = xmlItem.Value;
                                    break;
                                case "PRICE":
                                    itemRow["ITEM_PRICE"] = xmlItem.Value;
                                    break;
                                case "TAGID":
                                    itemRow["INVENTORY_TAG_ID"] = xmlItem.Value;
                                    break;
                                //NB-0004387
                                case "r":
                                    itemRow["GTIN"] = xmlItem.Value;
                                    break;
                                case "REPORT_FIELD_1":
                                    itemRow["REPORT_FIELD_1"] = xmlItem.Value;
                                    break;
                                case "REPORT_FIELD_2":
                                    itemRow["REPORT_FIELD_2"] = xmlItem.Value;
                                    break;
                                case "REPORT_FIELD_3":
                                    itemRow["REPORT_FIELD_3"] = xmlItem.Value;
                                    break;
                                case "REPORT_FIELD_4":
                                    itemRow["REPORT_FIELD_4"] = xmlItem.Value;
                                    break;
                                case "PACKAGING_STRING":
                                    itemRow["PACKAGING_STRING"] = xmlItem.Value;
                                    break;
                                case "UOM_TYPE":
                                    itemRow["UOM_TYPE"] = xmlItem.Value;
                                    break;
                                case "STD_PACK_UOM":
                                    itemRow["STD_PACK_UOM"] = xmlItem.Value;
                                    break;
                                case "L_S_CONTROLLED":
                                    itemRow["L_S_CONTROLLED"] = xmlItem.Value;
                                    break;
                                case "CONSIGNED_FLAG":
                                    itemRow["CONSIGNED_FLAG"] = xmlItem.Value;
                                    break;
                                case "ALTUOM":

                                    _drItemAltUom = _dtItemAltUom.NewRow();
                                    _strUom = string.Empty;

                                    for (int intUomCnt = 0; intUomCnt <= xmlItem.Descendants().Count() - 1; intUomCnt++)
                                    {
                                        var xmlItemChild = xmlItem.Descendants().ElementAt(intUomCnt);

                                        switch (xmlItemChild.Name.ToString())
                                        {
                                            case "UOM":
                                                _drItemAltUom["UNIT_OF_MEASURE"] = xmlItemChild.Value;
                                                _strUom = xmlItemChild.Value;
                                                break;
                                            case "CONFAC":
                                                _drItemAltUom["CONVERSION_RATE"] = xmlItemChild.Value;
                                                break;
                                            case "UOM_TYPE":
                                                _drItemAltUom["UOM_TYPE"] = xmlItemChild.Value;
                                                break;
                                        }

                                        _drItemAltUom["INV_ITEM_ID"] = _strItemId;

                                    }


                                    _drUomExist = _dtItemAltUom.Select("UNIT_OF_MEASURE = '" + _strUom + "' AND INV_ITEM_ID = '" + _strItemId + "'");

                                    if (_drUomExist.Length == 0)
                                    {
                                        _dtItemAltUom.Rows.Add(_drItemAltUom);
                                    }

                                    break;
                            }

                        }

                        dtEvents.Rows.Add(itemRow);

                    }
                }

                _dsItemAltUom.Tables.Add(_dtItemAltUom);
                dvEvents = dtEvents.DefaultView;
                dtEvents = dvEvents.ToTable();
                pdsEvents.Tables.Add(dtEvents);

                for (int j = 0; j <= pDsDetails.Tables[0].Rows.Count - 1; j++)
                {
                    string _strInvItemId = string.Empty;
                    string _strstorageArea = string.Empty;
                    string _strstrorelevel1 = string.Empty;
                    string _strstrorelevel2 = string.Empty;
                    string _strstrorelevel3 = string.Empty;
                    string _strstrorelevel4 = string.Empty;
                    string _strUnitOfMeasure = string.Empty;
                    string _strstageddate = string.Empty;
                    string _strcontainerid = string.Empty;
                    string _strserialid = string.Empty;
                    string _strinvlotid = string.Empty;
                    double _strErpSysQty = 0.0;
                    double _strExistSysQty = 0.0;
                    StringBuilder sbdsFilter = new StringBuilder();

                    _strInvItemId = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString()].ToString();
                    _strstorageArea = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString()].ToString();
                    _strstrorelevel1 = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1.ToString()].ToString();
                    _strstrorelevel2 = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2.ToString()].ToString();
                    _strstrorelevel3 = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3.ToString()].ToString();
                    _strstrorelevel4 = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4.ToString()].ToString();
                    _strUnitOfMeasure = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM.ToString()].ToString();
                    _strstageddate = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE.ToString()].ToString();
                    _strcontainerid = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID.ToString()].ToString();
                    _strserialid = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID.ToString()].ToString();
                    _strinvlotid = pDsDetails.Tables[0].Rows[j][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID.ToString()].ToString();
                    sbdsFilter.Append(" INV_ITEM_ID ='" + _strInvItemId + "' AND  STORAGE_AREA='" + _strstorageArea + "' AND ");
                    sbdsFilter.Append(" STOR_LEVEL_1='" + _strstrorelevel1 + "' AND  STOR_LEVEL_2='" + _strstrorelevel2 + "' ");
                    sbdsFilter.Append(" AND  STOR_LEVEL_3='" + _strstrorelevel3 + "' AND  STOR_LEVEL_4='" + _strstrorelevel4 + "' ");
                    sbdsFilter.Append(" AND UNIT_OF_MEASURE='" + _strUnitOfMeasure + "' AND STAGED_DATE='" + _strstageddate + "' ");
                    sbdsFilter.Append(" AND CONTAINER_ID='" + _strcontainerid + "' AND INV_LOT_ID='" + _strinvlotid + "' AND SERIAL_ID='" + _strserialid + "' ");
                    if (pDsDetails.Tables[0].Rows[j]["SYS_QTY"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(pDsDetails.Tables[0].Rows[j]["SYS_QTY"].ToString()))
                        {
                            _strExistSysQty = Convert.ToDouble(pDsDetails.Tables[0].Rows[j]["SYS_QTY"].ToString());
                        }
                    }
                    DataRow[] _drErpRow = null;
                    _drErpRow = pdsEvents.Tables[0].Select(sbdsFilter.ToString());
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "Qury for Filter dataset: " + "\n" + sbdsFilter.ToString());
                    if (_drErpRow.Length == 1)
                    {
                        foreach (DataRow _drr in _drErpRow)
                        {
                            if (_drr["SYS_QTY"] != DBNull.Value)
                            {
                                if (!string.IsNullOrEmpty(_drr["SYS_QTY"].ToString()))
                                {
                                    _strErpSysQty = Convert.ToDouble(_drr["SYS_QTY"]);
                                }
                            }
                        }
                    }

                    if ((_strErpSysQty != _strExistSysQty))
                    {
                        pDsDetails.Tables[0].Rows[j]["LATEST_SYSQTY"] = _strErpSysQty;
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + "System Quantity Mismatch For InvItemid: " + "\n" + _strInvItemId);
                    }
                    else
                    {
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + "\n" + " No  Mismatch For InvItemid: " + "\n" + _strInvItemId);

                    }

                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "XML parsing failed " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                xmlDom = null;
            }
            return AtparStatusCodes.ATPAR_OK;

        }

        public AtParWebApiResponse<bool> CheckIfAllEventsDownloaded(string eventID, string bUnit, string pUserID, string[] pDeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<bool>();

            long eventsInMasterCnt = 0;
            long eventsInHdrCnt = 0;
            bool pAllEventsDownloaded = false;
            try
            {
                eventsInMasterCnt = _repo.GetEventIDsFromMaster(eventID, bUnit);
                if (eventsInMasterCnt == AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL)
                {
                    response.AtParNotOK(eventsInMasterCnt, _commonRepo, _log);
                    return response;
                }
                eventsInHdrCnt = _repo.GetEventIDsFromHDR(eventID, bUnit);
                if (eventsInHdrCnt == AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL)
                {
                    response.AtParNotOK(eventsInHdrCnt, _commonRepo, _log);
                    return response;
                }

                if (eventsInMasterCnt == eventsInHdrCnt)
                {
                    pAllEventsDownloaded = true;
                }
                response.DataVariable = pAllEventsDownloaded;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }

        public AtParWebApiResponse<bool> CheckStatusOfEvents(string userID, string bUnit, string eventID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<bool>();

            long statusOfEvent = -1;
            bool pBlnCompleted = false;
            try
            {
                statusOfEvent = _repo.CheckStatusOfEvents(userID, bUnit, eventID);
                if (statusOfEvent == AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL)
                {
                    response.AtParNotOK(statusOfEvent, _commonRepo, _log);
                    return response;
                }

                if (statusOfEvent > 0)
                    pBlnCompleted = true;
                else
                    pBlnCompleted = false;

                response.DataVariable = pBlnCompleted;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }

        public AtParWebApiResponse<bool> CheckIfAllEventsCounted(string eventID, string bUnit, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<bool>();
            try
            {
                bool allEventsCounted = _repo.CheckIfAllEventsCounted(eventID, bUnit, userID, deviceTokenEntry);
                response.DataVariable = allEventsCounted;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;

            }


        }

        public AtParWebApiResponse<long> UpdateReviewer(string updateUser, List<VM_UPDATE_REVIEWER_DATA> lstUpdateReviewerData, string eventID, string bUnit, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                if (lstUpdateReviewerData.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                var statusCode = _repo.UpdateReviewer(updateUser, lstUpdateReviewerData, eventID, bUnit, deviceTokenEntry);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                }
                else
                {
                    response.AtParSuccess();
                }
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }

        public AtParWebApiResponse<long> UpdateHdrDetails(string updateUser, string bUnit, string eventID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                var statusCode = _repo.UpdateHdrDetails(updateUser, bUnit, eventID);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                }
                else
                {
                    response.AtParSuccess();
                }
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }
        public AtParWebApiResponse<bool> CheckIfStatusUpdatedForCountedEvent(string eventID, string bUnit, string pUserID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<bool>();

            try
            {
                var statusChanged = _repo.CheckIfStatusUpdatedForCountedEvent(eventID, bUnit, pUserID, deviceTokenEntry);
                response.DataVariable = statusChanged;
                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }

        public AtParWebApiResponse<long> SendEvent(string bUnit, string eventID, string userID, string profileID, string storeDetailHistory, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();


            long _StatusCode = 0;
            DataSet _dsEventItems = new DataSet();
            StringBuilder _sbERPInXml = new StringBuilder();
            long _erpStatusCode = -1;
            string sysCountPctDev = null;
            SortedList<string, string> _profileParams = default(SortedList<string, string>);
            string _strXml = string.Empty;
            string _strSQL = string.Empty;
            XmlDocument _xmlDoc = new XmlDocument();
            XmlNodeList _xmlNodeList = default(XmlNodeList);
            // SqlCommand _sqlCmd = default(SqlCommand);
            string _strErpObjName = string.Empty;
            string _strErpUserId = string.Empty;
            SortedList<string, string> _userParams = default(SortedList<string, string>);
            string pStrErrMessage = string.Empty;

            try
            {
                _profileParams = new SortedList<string, string>();
                _profileParams["SYS_COUNT_PCT_DEVIATION"] = string.Empty;


                //Get User Parameters  

                _userParams = new SortedList<string, string>();
                _userParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID.ToString()] = string.Empty;
                _commonRepo.GetUserParamValues(_userParams, (int)AtParWebEnums.EnumApps.CycleCount, userID);

                _strErpUserId = _userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];

                //Getting ProfileParam Values
                _commonRepo.GetProfileParamValues(_profileParams, (int)AtParWebEnums.EnumApps.CycleCount, profileID);
                sysCountPctDev = _profileParams["SYS_COUNT_PCT_DEVIATION"];

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to get the count percentage:" + " Exception is " + ex.ToString());
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }



            try
            {

                _dsEventItems = _repo.GetItemsToSendToERP(bUnit, eventID);
                try
                {
                    //LOGIC TO GET EVENT TYPE
                    int _intEventType =Convert.ToInt32( _dsEventItems.Tables[1].Rows[0]["EVENT_TYPE"].ToString());
                    string eventsXML = _dsEventItems.GetXml();
                    using (StringReader s = new StringReader(eventsXML))
                    {
                        _xmlDoc.Load(s);
                    }
                   
                    _xmlNodeList = _xmlDoc.SelectNodes("/NewDataSet");

                    _sbERPInXml
                      .Append("<ROOT>")
                      .Append("<HEADER>")
                      .Append("<BUSINESS_UNIT>" + bUnit + "</BUSINESS_UNIT>")
                      .Append("<EVENT_ID>" + eventID + "</EVENT_ID>")
                      .Append("<UPDATE_DT_TIME>" + DateTime.Now + "</UPDATE_DT_TIME>")
                      .Append("<ERP_USER_ID>" + _strErpUserId + "</ERP_USER_ID>")
                      .Append("<EVETYPE>" + _intEventType + "</EVETYPE>")
                      .Append("</HEADER>")
                      .Append(_xmlNodeList.Item(0).InnerXml)
                      .Append("</ROOT>");

                    _strXml = _sbERPInXml.ToString().Replace("'", "''");

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " Input xml for ERP is " + _strXml);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to build the input xml :" + " Exception is : " + ex.ToString());
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }
                finally
                {
                    _dsEventItems = null;
                    _xmlDoc = null;
                }

                object reflectObject = null;

                try
                {
                    //GetConfigData();

                    List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                    List<string> lstParameters = new List<string>();
                    lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());
                    lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                    _strErpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                    if (string.IsNullOrEmpty(_strErpObjName))
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                    }
                    else
                    {
                        _strErpObjName = AtParWebEnums.EnumApps.CycleCount.ToString() + "_" + _strErpObjName;
                    }



                    string _className = string.Empty;
                    string methodName = string.Empty;       
                    System.Reflection.MethodInfo MethodName = default(System.Reflection.MethodInfo);

                    try
                    {
                        _className = "sendEvent";
                        methodName = "sendEvent";
                        MethodName = Utils.CreateERPObjectInstance(_strErpObjName, _className, methodName, out reflectObject);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to Create ERP Object .... " + _strErpObjName + "Exception thrown is..." + ex.ToString());
                    } 
                    object[] args = {
                                _strXml,
                                deviceTokenEntry
                                    };



                    _erpStatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args)); 
                    _strXml = args[0].ToString();
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ": OutPut Xml string is : " + "\n" + _strXml.ToString());



                    if (_erpStatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + ": Failed to send the event. " + " StatusCode is :" + _erpStatusCode + "\n");

                        _xmlDoc = new XmlDocument();
                        XmlNode _xmlRoot = null;
                        using (StringReader s = new StringReader(_strXml))
                        {
                            _xmlDoc.Load(s);
                        }
                       
                        _xmlRoot = _xmlDoc.FirstChild;

                        if ((_xmlRoot.SelectSingleNode("//OUTPUT") != null))
                        {
                            if ((_xmlRoot.SelectSingleNode("//OUTPUT/ErrorDesc") != null))
                            {
                                if (!string.IsNullOrEmpty(_xmlRoot.SelectSingleNode("//OUTPUT/ErrorDesc").InnerText.ToString()))
                                {
                                    pStrErrMessage = _xmlRoot.SelectSingleNode("//OUTPUT/ErrorDesc").InnerText.ToString();
                                    response.ExceptionMessage = pStrErrMessage;
                                }
                            }
                        }

                        if (_erpStatusCode == AtparStatusCodes.S_EVENT_PROCESSED_INERP)
                        {
                            response.AtParNotOK(AtparStatusCodes.S_EVENT_PROCESSED_INERP, _commonRepo, _log);
                            return response;
                        }

                        response.AtParNotOK(_erpStatusCode, _commonRepo, _log);
                        return response;
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ": Erp call Failed with Exception : " + ex.ToString());

                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }
                finally
                {
                    _xmlDoc = null;
                }


                try
                {

                    _StatusCode = _repo.SendEvent(bUnit, eventID, sysCountPctDev, storeDetailHistory, deviceTokenEntry);

                    if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to insert the data in middle tier" + " tables: StatusCode is : " + _StatusCode + "\n");
                        response.AtParNotOK(_StatusCode, _commonRepo, _log);
                        return response;
                    }

                    if (_StatusCode == AtparStatusCodes.ATPAR_OK & _strErpObjName == AtParWebEnums.Enterprise_Enum.IMMS.ToString())
                    {
                        string _strOutputEventID = string.Empty;
                        string _filename = string.Empty;
                        string _strOutputBUnit = string.Empty;
                        string _strDirectoryPath = string.Empty;
                        string[] _dirFiles = null;
                        string _file = null;
                        string dt = string.Empty;
                        long _lngExLineNO = 0;
                        XmlDocument _xmlFile = new XmlDocument();

                        List<string> lstParams = new List<string>();
                        lstParams.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFILEPATH.ToString());
                        var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParams).ToList();
                        string m_strDownloadPath = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFILEPATH.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                        _strDirectoryPath = m_strDownloadPath + AtParWebEnums.EnumApps.CycleCount.ToString() + "\\";
                        string _strProcessPath = _strDirectoryPath + "PROCESSED\\";

                        try
                        {
                            _dirFiles = Directory.GetFiles(_strDirectoryPath);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " Failed to get the files from the" + " download path " + m_strDownloadPath + " Exception is : " + ex.ToString());
                            response.AtParException(ex, _commonRepo, _log);
                            return response;
                        }

                        //// Iterater through all files 
                        foreach (string _file_loopVariable in _dirFiles)
                        {
                            _file = _file_loopVariable;
                            try
                            {
                                _filename = _file.Substring(_file.LastIndexOf("\\") + 1);
                                using (StringReader s = new StringReader(_file))
                                {
                                    _xmlFile.Load(s);
                                }
                             
                            }
                            catch (XmlException ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to load the xml file :" + " Exception is : " + ex.ToString());

                                //String free from & and ' was loaded and if it contains other characters(< or >) then ReplaceSpecialChars() is called
                                FileStream fs = default(FileStream);
                                string xmlString = string.Empty;
                                fs = File.Open(_file, FileMode.Open, FileAccess.Read, FileShare.Delete | FileShare.Read);
                                byte[] buffer = new byte[fs.Length + 1];
                                fs.Read(buffer, 0, (int)fs.Length);

                                xmlString = Encoding.UTF8.GetString(buffer).Substring(0, (Encoding.UTF8.GetString(buffer)).IndexOf("</ROOT>")) + 6;

                                fs.Close();

                                xmlString = xmlString.substituteString();
                                StreamWriter writerFile = new StreamWriter(_file, false);
                                writerFile.WriteLine(xmlString);
                                writerFile.Close();
                                writerFile.Dispose();


                                try
                                {
                                    using (StringReader s = new StringReader(_file))
                                    {
                                        _xmlFile.Load(s);
                                    }
                                 

                                }
                                catch (XmlException ex1)
                                {
                                    _lngExLineNO = ex1.LineNumber;
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + " :After Error Loading Xml String @ Line No:" + _lngExLineNO + ":Error Message:" + "\n" + ex1.Message + ":");
                                    string[] lines = File.ReadAllLines(_file);
                                    _StatusCode = AtParDefns.Process_XML_SpecialChars(_lngExLineNO, _file, AtParWebEnums.EnumApps.CycleCount.ToString(), lines);
                                    if (_StatusCode == AtparStatusCodes.ATPAR_OK)
                                    {
                                        _xmlFile.Load(_file);
                                    }
                                }

                            }

                            XmlNodeList _nodeListEvents = default(XmlNodeList);


                            _nodeListEvents = _xmlFile.FirstChild.SelectNodes("//CART");

                            foreach (XmlNode _nodeHeader in _nodeListEvents)
                            {

                                _strOutputEventID = string.Empty;
                                _strOutputBUnit = string.Empty;
                                _strOutputEventID = _nodeHeader.Attributes["HEADER"].Attributes["CRTID"].InnerText;//.[0].InnerText; 
                                _strOutputBUnit = _nodeHeader.Attributes["HEADER"].Attributes["BUNIT"].InnerText;

                                if (_strOutputBUnit == bUnit & _strOutputEventID == eventID)
                                {
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(": In If condition : ");

                                    dt = DateTime.Now.Month + "-" + DateTime.Now.Day + "-" + DateTime.Now.Year + "-" + DateTime.Now.Hour + DateTime.Now.Minute + DateTime.Now.Second + "-";
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(": _strDirectoryPath & _file : " + _strDirectoryPath + _filename);
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(": _strProcessPath & dt & _file : " + _strProcessPath + dt + _filename);

                                    File.Move(_strDirectoryPath + _filename, _strProcessPath + dt + _filename);
                                    break; // TODO: might not be correct. Was : Exit For
                                }
                            }
                        }

                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to insert the data in middle tier" + " tables: Exception is : " + ex.ToString());
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to send the data to ERP: Exception" + " is : " + ex.ToString());
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
            response.AtParSuccess();
            return response;
        }

        public AtParWebApiResponse<bool> UpdateStatusForTransaction(string status, string transID, string userID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<bool>();
            bool blnNoCountsExists = false;
            try
            {
                var statusCode = _repo.UpdateStatusForTransaction(status, transID, userID, deviceTokenEntry);

               
                
                //if (statusCode == AtparStatusCodes.S_CYCT_RECOUNTS_EXIST)
                //{                   
                //    response.AtParNotOK(statusCode,_commonRepo,_log);
                //    return response;
                //}
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (statusCode != AtparStatusCodes.S_CYCT_RECOUNTEXISTS)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        response.StatType = AtParWebEnums.StatusType.Warn;
                        return response;
                    }                 
                }
                if (statusCode == AtparStatusCodes.S_CYCT_RECOUNTEXISTS)
                {
                    blnNoCountsExists = true;

                }
                else
                {
                    if (Convert.ToInt32(status) == AtParDefns.statCancel)
                    {

                        // cancel the transactions before deletion from HEADER, DETAILS, ITEM_UOM tables
                        POCOEntities.AtPar_Transaction_Entity pTransactionDetails = new POCOEntities.AtPar_Transaction_Entity();
                        long _StatusCode = -1;

                        pTransactionDetails.TransactionId = Convert.ToInt32(transID);
                        pTransactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CycleCount;
                        pTransactionDetails.Status = AtParDefns.statCancel;
                        pTransactionDetails.StartDateTime = DateTime.Now;

                        _StatusCode = _commonRepo.UpdateTransaction(pTransactionDetails);

                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, _commonRepo, _log);
                            return response;
                        }

                    }
                }
                response.DataVariable = blnNoCountsExists;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }

    }

    public class ITEM_LIST_TABLE
    {
        public string ITEMS { get; set; }
    }
}
