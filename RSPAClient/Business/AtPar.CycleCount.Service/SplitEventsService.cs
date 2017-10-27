using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.Service.Interfaces.CycleCount;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.CycleCount.Service;
using System.Xml.Linq;

namespace AtPar.CycleCount.Service
{
    public class SplitEventsService : ISplitEventsService
    {
        ISplitEventsRepository _splitEvents;
        ILog _log;
        private ICommonRepository _commonRepo;
        IGetDetailsService _getDetailsService;
        IGetHeaderService _getHeaderService;
        private const int standardConvFac = 1;


        public SplitEventsService(ISplitEventsRepository splitEvents, ILog log, ICommonRepository commonRepo, IGetDetailsService getDetailsService, IGetHeaderService getHeaderService)
        {
            _splitEvents = splitEvents;
            _log = log;
            _commonRepo = commonRepo;
            _getDetailsService = getDetailsService;
            _getHeaderService = getHeaderService;
        }
        public AtParWebApiResponse<bool> CheckForSplit(string eventID, string bUnit, bool checkSplit, string UserId, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            AtParWebApiResponse<bool> response = new AtParWebApiResponse<bool>();
            try
            {

                bool blnDoSplit = false;

                var intSplits = _splitEvents.CheckForSplit(eventID, bUnit, checkSplit, UserId, DeviceTokenEntry);
                if (intSplits == AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL)
                {
                    response.AtParNotOK(intSplits, _commonRepo, _log);
                    return response;
                }
                else
                {
                    if (intSplits == 0)
                    {
                        blnDoSplit = true;
                    }
                    else
                        blnDoSplit = false;
                }
                response.DataVariable = blnDoSplit;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        public AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> GetEventsList(string bUnit, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> response = new AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER>();

            try
            {
                DataTable _cycle_header_dt, _cycle_businessunit_dt;
                DataRow _cycle_header_dr, _cycle_businessunit_dr;
                DataSet _cycleHeader = new DataSet();
                _cycle_header_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                _cycle_businessunit_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_BusinessUnits_Defns,
                                                             AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());

                _cycle_businessunit_dr = _cycle_businessunit_dt.NewRow();
                _cycle_businessunit_dr[(int)AtParWebEnums.Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT] = bUnit;
                _cycle_businessunit_dt.Rows.Add(_cycle_businessunit_dr);
                _cycleHeader.Tables.Add(_cycle_header_dt);
                _cycleHeader.Tables.Add(_cycle_businessunit_dt);
                var lstEventsList = _getHeaderService.GetHeader(_cycleHeader, deviceTokenEntry);
                response = lstEventsList;
                return lstEventsList;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }


        }
        public AtParWebApiResponse<long> SplitEvent(string Bunit, string EventId, int NoOfSubEvents, string UserId, string ProfileId, string OrgGroupId, string OrderBy, string StrFromLoc, string StrToLoc, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long statuscode = -1;
            List<MT_CYCLECOUNT_SUBEVENTS> lstSubEvents = new List<MT_CYCLECOUNT_SUBEVENTS>();
            List<string> lstConfigVariables = new List<string>();
            AtParWebApiResponse<long> response = new AtParWebApiResponse<long>();
            try
            {
                List<string> lstParameters = new List<string> { AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() };
                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                string erpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString())
                    .Select(a => a.PARAMETER_VALUE).FirstOrDefault();

                lstSubEvents = GetSubEventNames(EventId, NoOfSubEvents, UserId);

                statuscode = _splitEvents.SplitEvent(Bunit, EventId, NoOfSubEvents, UserId, ProfileId, OrgGroupId, OrderBy, StrFromLoc, StrToLoc, erpObjName, lstSubEvents, DeviceTokenEntry);
                if (statuscode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + statuscode.ToString()); }
                }
                DataSet _dsEventDetails = new DataSet();
                _dsEventDetails = BuildDetailsInputDataset(Bunit, EventId, UserId);
                var outputXml = GetDetails(_dsEventDetails, DeviceTokenEntry);


                if (outputXml.Item1 != AtparStatusCodes.ATPAR_OK)
                {

                    if (outputXml.Item1 == AtparStatusCodes.E_NORECORDFOUND)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }


                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(methodBaseName + " Failed to get event details with statuscode " + outputXml.Item1);
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                       
                    }
                }

                var lstEventItems = _splitEvents.GetEventItems(Bunit, EventId, lstSubEvents, UserId, ProfileId, OrgGroupId, OrderBy, StrFromLoc, StrToLoc, outputXml.Item2, DeviceTokenEntry);
                if (lstEventItems != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(lstEventItems, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
            }
        }
        private List<MT_CYCLECOUNT_SUBEVENTS> GetSubEventNames(string EventId, int NoOfSubEvents, string UserId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int intRecCount, j, k, intCount;
            List<MT_CYCLECOUNT_SUBEVENTS> _lstSubevents = new List<MT_CYCLECOUNT_SUBEVENTS>();

            try
            {
                k = 0; j = 0;
                intCount = 0;

                if (NoOfSubEvents < 13)
                {
                    for (intCount = 0; intCount <= (NoOfSubEvents - 1); intCount++)
                    {
                        _lstSubevents.Add(new MT_CYCLECOUNT_SUBEVENTS { EVENT_ID = EventId, SUBEVENT_ID = EventId + char.ConvertFromUtf32(65 + intCount) });
                        k++;
                    }
                }
                else
                {
                    double count = NoOfSubEvents / 25;
                    for (intRecCount = 0; intRecCount <= Math.Round((double)NoOfSubEvents / 25); intRecCount++)
                    {
                        if (k < NoOfSubEvents)
                        {
                            if (intRecCount == 0)
                            {
                                for (j = 0; j <= 25; j++)
                                {
                                    if (k >= NoOfSubEvents)
                                    { break; }
                                    else
                                    {
                                        _lstSubevents.Add(new MT_CYCLECOUNT_SUBEVENTS { EVENT_ID = EventId, SUBEVENT_ID = EventId + char.ConvertFromUtf32(65 + j) });
                                        k++;
                                    }
                                }
                            }
                            else if (intRecCount < 27)
                            {
                                for (j = 0; j <= 25; j++)
                                {
                                    if (k >= NoOfSubEvents) { break; }
                                    else
                                    {
                                        _lstSubevents.Add(new MT_CYCLECOUNT_SUBEVENTS { EVENT_ID = EventId, SUBEVENT_ID = EventId + char.ConvertFromUtf32(65 + intRecCount - 1) + char.ConvertFromUtf32(65 + j) });
                                        k++;
                                    }
                                }
                            }
                            else if (intRecCount > 27)
                            {
                                for (int l = 0; l <= 25; l++)
                                {
                                    if (k >= NoOfSubEvents) { break; }
                                    else
                                    {
                                        _lstSubevents.Add(new MT_CYCLECOUNT_SUBEVENTS { EVENT_ID = EventId, SUBEVENT_ID = EventId + char.ConvertFromUtf32(65) + char.ConvertFromUtf32(65 + intCount) + char.ConvertFromUtf32(65 + l) });
                                        k++;
                                    }
                                }
                            }

                        }

                    }
                }
                return _lstSubevents;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return _lstSubevents;
            }

        }

        public Tuple<long, string> GetDetails(DataSet _dsEventDetails, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long StatusCode = -1;
            long transId;
            string resultxml = string.Empty;

            DataSet outputParameters = new DataSet();
            SortedList<string, string> orgParams;
            orgParams = new SortedList<string, string>();

            orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
            orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
            orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;


            //XmlDocument xmlDom = new XmlDocument();
            //XmlNode xmlRoot, xmlRecord, xmlItem, xmlItemChild;
            //DataRow itemRow;

          

            StatusCode = _getDetailsService.Check_GetDetails_InputParameters(_dsEventDetails, DeviceTokenEntry);

            if (StatusCode != AtparStatusCodes.ATPAR_OK)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + StatusCode.ToString()); }
                return new Tuple<long, string>(StatusCode, null);
            }

            StatusCode = _getDetailsService.Execute_GetDetails_PreProcessTasks(_dsEventDetails, outputParameters, DeviceTokenEntry,DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

            if (StatusCode != AtparStatusCodes.ATPAR_OK)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + StatusCode.ToString()); }
                return new Tuple<long, string>(StatusCode, null);
            }

            StatusCode = _getDetailsService.Execute_GetDetails_ProcessTasks(_dsEventDetails, outputParameters, DeviceTokenEntry);

            if (StatusCode != AtparStatusCodes.ATPAR_OK)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + StatusCode.ToString()); }
                return new Tuple<long, string>(StatusCode, null);

            }


            // Post Process - return dataset
            //Should not be called when call from server web page

            if ((DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.HHT).ToString() ||
                           DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.AHHT).ToString() ||
                           DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.IHHT).ToString() ||
                           DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WHHT).ToString()))
            {
                StatusCode = _getDetailsService.Execute_GetDetails_PostProcessTasks(_dsEventDetails, outputParameters, DeviceTokenEntry);
                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + StatusCode.ToString()); }
                }
            }

            resultxml = Build_GetDetails_OutputXML(_dsEventDetails, outputParameters, DeviceTokenEntry);

            //if (Resultxml != string.Empty)
            //{
            //    try
            //    {
            //        xmlDom.LoadXml(Resultxml);
            //        xmlRoot = xmlDom.FirstChild;

            //        for (int i = 0; i <= xmlRoot.ChildNodes.Count - 1; i++)
            //        {
            //            xmlRecord = xmlRoot.ChildNodes.Item(i);
            //            if (xmlRecord.Name == "DETAIL")
            //            {

            //            }
            //        }

            //    }
            //    catch (Exception)
            //    {

            //        throw;
            //    }
            //}


            return new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, resultxml);

        }

        public DataSet BuildDetailsInputDataset(string Bunit, string EventId, string UserID,string eventType="0")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet _dsCycleDetails = new DataSet();
            DataTable _cycle_details_dt = new DataTable();
            DataRow _cycle_details_dr;

            _cycle_details_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Details_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

            try
            {
                _cycle_details_dr = _cycle_details_dt.NewRow();
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT.ToString()] = Bunit;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.EVENT_ID.ToString()] = EventId;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.COUNT_AND_NEW.ToString()] = true;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.RECOUNT_AND_NEW.ToString()] = false;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.USER_ID.ToString()] = UserID;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.TRANSACTION.ToString()] = 0;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID.ToString()] = false;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID.ToString()] = false;
                _cycle_details_dr[AtParWebEnums.Get_Event_Details_Enum.EVENT_TYPE.ToString()] = eventType;

                _cycle_details_dt.Rows.Add(_cycle_details_dr);
                _dsCycleDetails.Tables.Add(_cycle_details_dt);
                return _dsCycleDetails;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        private string Build_GetDetails_OutputXML(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _outputXML = new StringBuilder();
            DataRow _drOutPutHeader;
            //DataRow _drOutPutDetails;
            //DataRow _drOutPutAltUOMs;
            try
            {
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ": Before Building the XML string: "); }

                _outputXML.Append("<ROOT>");
                _drOutPutHeader = outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];
                _outputXML.Append("<HEADER>");

                if (_drOutPutHeader[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.BUSINESS_UNIT] != DBNull.Value &&
                    _drOutPutHeader[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.BUSINESS_UNIT].ToString() != string.Empty)
                {
                    _outputXML.Append("<BUNIT>");
                    _outputXML.Append(_drOutPutHeader[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.BUSINESS_UNIT]);
                    _outputXML.Append("</BUNIT>");
                }
                if (_drOutPutHeader[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.EVENT_ID] != System.DBNull.Value &&
                     _drOutPutHeader[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.EVENT_ID].ToString() != string.Empty)
                {
                    _outputXML.Append("<EVEID>");
                    _outputXML.Append(_drOutPutHeader[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.EVENT_ID]);
                    _outputXML.Append("</EVEID>");
                }
                _outputXML.Append("<TRANID>");
                _outputXML.Append(_drOutPutHeader[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID]);
                _outputXML.Append("</TRANID>");

                _outputXML.Append("</HEADER>");

                foreach (DataRow _drOutPutDetails in outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows)
                {
                    _outputXML.Append("<DETAIL>");
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID] != System.DBNull.Value &&
                            _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<ITEMID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID]);
                        _outputXML.Append("</ITEMID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO] != System.DBNull.Value &&
                         _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO].ToString() != string.Empty)
                    {
                        _outputXML.Append("<CITMID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO]);
                        _outputXML.Append("</CITMID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<MITMID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID]);
                        _outputXML.Append("</MITMID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID] != System.DBNull.Value &&
                       _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<VITMID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID]);
                        _outputXML.Append("</VITMID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.GTIN] != System.DBNull.Value &&
                         _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.GTIN].ToString() != string.Empty)
                    {
                        _outputXML.Append("<r>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.GTIN]);
                        _outputXML.Append("</r>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<UPCID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID]);
                        _outputXML.Append("</UPCID>");
                    }

                    if ((outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1.ToString()))
                        && (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1].ToString() != string.Empty))
                    {
                        _outputXML.Append("<REPORT_FIELD_1>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1]);
                        _outputXML.Append("</REPORT_FIELD_1>");
                    }
                    if ((outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2.ToString()))
                        && (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2].ToString() != string.Empty))
                    {
                        _outputXML.Append("<REPORT_FIELD_2>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2]);
                        _outputXML.Append("</REPORT_FIELD_2>");
                    }
                    if ((outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3.ToString()))
                        && (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3].ToString() != string.Empty))
                    {
                        _outputXML.Append("<REPORT_FIELD_3>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3]);
                        _outputXML.Append("</REPORT_FIELD_3>");
                    }
                    if ((outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4.ToString()))
                        && (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4].ToString() != string.Empty))
                    {
                        _outputXML.Append("<REPORT_FIELD_4>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4]);
                        _outputXML.Append("</REPORT_FIELD_4>");
                    }
                    if ((outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING.ToString()))
                        && (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING].ToString() != string.Empty))
                    {
                        _outputXML.Append("<PACKAGING_STRING>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING]);
                        _outputXML.Append("</PACKAGING_STRING>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR].ToString() != string.Empty)
                    {
                        _outputXML.Append("<DESCR>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR]);
                        _outputXML.Append("</DESCR>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA].ToString() != string.Empty)
                    {
                        _outputXML.Append("<SAREA>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA]);
                        _outputXML.Append("</SAREA>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1] != System.DBNull.Value &&
                     _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1].ToString() != string.Empty)
                    {
                        _outputXML.Append("<STORL1>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1]);
                        _outputXML.Append("</STORL1>");
                    }

                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2] != System.DBNull.Value &&
                    _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2].ToString() != string.Empty)
                    {
                        _outputXML.Append("<STORL2>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2]);
                        _outputXML.Append("</STORL2>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3].ToString() != string.Empty)
                    {
                        _outputXML.Append("<STORL3>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3]);
                        _outputXML.Append("</STORL3>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4] != System.DBNull.Value &&
                     _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4].ToString() != string.Empty)
                    {
                        _outputXML.Append("<STORL4>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4]);
                        _outputXML.Append("</STORL4>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE].ToString() != string.Empty)
                    {
                        _outputXML.Append("<UOM>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE]);
                        _outputXML.Append("</UOM>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<CONTID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID]);
                        _outputXML.Append("</CONTID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE] != System.DBNull.Value &&
                     _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE].ToString() != string.Empty)
                    {
                        _outputXML.Append("<STAGDT>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE]);
                        _outputXML.Append("</STAGDT>");
                    }

                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID] != System.DBNull.Value &&
                    _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<SERID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID]);
                        _outputXML.Append("</SERID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<LOTID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID]);
                        _outputXML.Append("</LOTID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] != System.DBNull.Value &&
                     _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT].ToString() != string.Empty)
                    {
                        _outputXML.Append("<CNTQTY>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT]);
                        _outputXML.Append("</CNTQTY>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY].ToString() != string.Empty)
                    {
                        _outputXML.Append("<SYSQTY>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY]);
                        _outputXML.Append("</SYSQTY>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID].ToString() != string.Empty)
                    {
                        _outputXML.Append("<TAGID>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID]);
                        _outputXML.Append("</TAGID>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE] != System.DBNull.Value &&
                     _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE].ToString() != string.Empty)
                    {
                        _outputXML.Append("<PRICE>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE]);
                        _outputXML.Append("</PRICE>");
                    }

                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOCATION] != System.DBNull.Value &&
                    _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOCATION].ToString() != string.Empty)
                    {
                        _outputXML.Append("<LOC>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOCATION]);
                        _outputXML.Append("</LOC>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE].ToString() != string.Empty)
                    {
                        _outputXML.Append("<UOM_TYPE>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE]);
                        _outputXML.Append("</UOM_TYPE>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM] != System.DBNull.Value &&
                     _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM].ToString() != string.Empty)
                    {
                        _outputXML.Append("<STD_PACK_UOM>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM]);
                        _outputXML.Append("</STD_PACK_UOM>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED] != System.DBNull.Value &&
                         _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED].ToString() != string.Empty)
                    {
                        _outputXML.Append("<L_S_CONTROLLED>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED]);
                        _outputXML.Append("</L_S_CONTROLLED>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED] != System.DBNull.Value &&
                        _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED].ToString() != string.Empty)
                    {
                        _outputXML.Append("<LOT_CONTROLLED>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED]);
                        _outputXML.Append("</LOT_CONTROLLED>");
                    }
                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED] != System.DBNull.Value &&
                     _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED].ToString() != string.Empty)
                    {
                        _outputXML.Append("<SERIAL_CONTROLLED>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED]);
                        _outputXML.Append("</SERIAL_CONTROLLED>");
                    }

                    if (_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG] != System.DBNull.Value &&
                    _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG].ToString() != string.Empty)
                    {
                        _outputXML.Append("<CONSIGNED_FLAG>");
                        _outputXML.Append(_drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG]);
                        _outputXML.Append("</CONSIGNED_FLAG>");
                    }

                    foreach (DataRow _drOutPutAltUOMs in outputParameters.Tables[AtParWebEnums.DataSet_Type.ALTERNATEUOMS.ToString()].Rows)
                    {
                        if ((_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.INV_ITEM_ID].ToString() == _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID].ToString()) &&
                           (_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE].ToString() != _drOutPutDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE].ToString()))
                        {
                            _outputXML.Append("<ALTUOM>");
                            if (_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE] != System.DBNull.Value &&
                                    _drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE].ToString() != string.Empty)
                            {
                                _outputXML.Append("<UOM>");
                                _outputXML.Append(_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE]);
                                _outputXML.Append("</UOM>");
                            }
                            if (_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.CONVERSION_RATE] != System.DBNull.Value &&
                                _drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.CONVERSION_RATE].ToString() != string.Empty)
                            {
                                _outputXML.Append("<CONFAC>");
                                _outputXML.Append(_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.CONVERSION_RATE]);
                                _outputXML.Append("</CONFAC>");
                            }
                            if (_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE] != System.DBNull.Value &&
                                _drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE].ToString() != string.Empty)
                            {
                                _outputXML.Append("<UOM_TYPE>");
                                _outputXML.Append(_drOutPutAltUOMs[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE]);
                                _outputXML.Append("</UOM_TYPE>");
                            }
                            _outputXML.Append("</ALTUOM>");

                        }
                    }

                    _outputXML.Append("</DETAIL>");
                }
                _outputXML.Append("</ROOT>");
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION); }
                throw ex;
            }
            
            return _outputXML.ToString().ReplaceString().Replace("&","&amp;").Replace("'","''");
        }


    }
}
