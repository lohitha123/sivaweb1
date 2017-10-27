using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CycleCount;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CycleCount.Repos
{
    public class GetHeaderRepository : IGetHeaderRepository
    {
        ILog _log;
        public GetHeaderRepository(ILog log)
        {
            _log = log;
        }
        //Executed When Event Allocation True
        public List<MT_CYCT_EVENT_ALLOCATION> EVENT_ALLOCATION_Y_From_Execute_GetHeader_ProcessTasks(DataSet inputParams, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            string[] columns = new[] { "BUSINESS_UNIT", "EVENT_ID", "NO_RECORDS", "FROM_STOR_LOC", "TO_STOR_LOC", "EVENT_TYPE"};
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    _sbSQL.Append("SELECT BUSINESS_UNIT, EVENT_ID, NO_RECORDS, FROM_STOR_LOC, TO_STOR_LOC,EVENT_TYPE ");
                    _sbSQL.Append("FROM MT_CYCT_EVENT_ALLOCATION ");
                    _sbSQL.Append("WHERE EVENT_TYPE=0 AND USER_ID ='" + deviceTokenEntry[0] + "' ");

                    if (inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                    {
                        if ((inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID]) != null)
                        {
                            _sbSQL.Append("AND EVENT_ID = '" + inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] + "'");
                        }
                    }

                    _sbSQL.Append(" UNION ");
                    _sbSQL.Append("SELECT ALC.BUSINESS_UNIT, ALC.EVENT_ID, ALC.NO_RECORDS, ALC.FROM_STOR_LOC, ALC.TO_STOR_LOC,ALC.EVENT_TYPE ");
                    _sbSQL.Append("FROM MT_CYCT_EVENT_ALLOCATION ALC ");
                    _sbSQL.Append("JOIN ");
                    _sbSQL.Append("MT_CYCT_EVENT_HDR HDR ON ALC.EVENT_ID=HDR.EVENT_ID AND ALC.BUSINESS_UNIT=HDR.BUSINESS_UNIT ");
                    _sbSQL.Append("WHERE ALC.EVENT_TYPE=1 AND ALC.USER_ID ='" + deviceTokenEntry[0] + "' AND HDR.EVENT_STATUS<>13 ");

                    if (inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                    {
                        if ((inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID]) != null)
                        {
                            _sbSQL.Append("AND ALC.EVENT_ID = '" + inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] + "'");
                        }
                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + " \nGetting Allocated Events from localdb with the following sql...\n " + _sbSQL.ToString())); }
                    }

                    var eventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_ALLOCATION>(columns,_sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + eventDetails.Count + "  events allocated to user  " + deviceTokenEntry[0]); }

                    return eventDetails;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        //Executed When Event Allocation False
        public List<MT_CYCT_EVENT_HDR_MASTER> EVENT_ALLOCATION_N_From_Execute_GetHeader_ProcessTasks(DataSet inputParams, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL = new StringBuilder();

                    _sbSQL.Append("SELECT BUSINESS_UNIT, EVENT_ID, PARENT_EVENT_ID, ");
                    _sbSQL.Append("NO_OF_ITEMS,[FROM],[TO]  ");
                    _sbSQL.Append("FROM MT_CYCT_EVENT_HDR_MASTER ");
                    _sbSQL.Append("WHERE EVENT_ID = '" + inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] + "'");
                  
                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType] == AtParWebEnums.ClientType.WEB.ToString())
                    {
                        if (inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Count == 1)
                        {
                            _sbSQL.Append("AND BUSINESS_UNIT ='" + inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT] + " ' ");
                        }

                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + " \n Checking if the specified event split in the " + "localdb with the following sql... " + "\n" + _sbSQL.ToString())); }
                    }
                    string[] columns = { "BUSINESS_UNIT", "EVENT_ID", "PARENT_EVENT_ID", "NO_OF_ITEMS", "FROM", "TO" };

                    var eventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns,_sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "  events allocated to user  " + eventDetails.Count); }

                    return eventDetails;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public List<MT_CYCT_EVENT_ALLOCATION> GetManualEventHeader(DataSet inputParams,string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL = new StringBuilder();
                    _sbSQL.Append("SELECT DISTINCT EA.BUSINESS_UNIT, EA.EVENT_ID, EA.NO_RECORDS, EA.FROM_STOR_LOC, EA.TO_STOR_LOC ");
                    _sbSQL.Append("FROM MT_CYCT_EVENT_ALLOCATION EA JOIN MT_CYCT_EVENT_HDR EH  ON EA.EVENT_ID = EH.EVENT_ID ");
                    _sbSQL.Append("AND EA.BUSINESS_UNIT = EH.BUSINESS_UNIT WHERE EA.USER_ID ='" + deviceTokenEntry[0] + "' AND EA.USER_ID=EH.USER_ID AND EH.EVENT_TYPE = 1 ");



                    if (inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                    {
                        if ((inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID]) != null)
                        {
                            _sbSQL.Append("AND EVENT_ID = '" + inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] + "'");
                        }
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + " \nManual Events from localdb with the following sql...\n " + _sbSQL.ToString())); }
                    }
                    string[] columns = { "BUSINESS_UNIT", "EVENT_ID", "NO_RECORDS", "FROM_STOR_LOC", "TO_STOR_LOC", "EVENT_ID" };
                    var lstEventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_ALLOCATION>(columns,_sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + lstEventDetails.Count + "   Manual events allocated to user  " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]); }

                    return lstEventDetails;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

            finally
            {
                _sbSQL = null;
            }


        }

        public DataSet Execute_GetHeader_PostProcessTasks(DataSet outputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = null;
            int intCnt = 0;
            DataRow _drSplitEvent = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    while (intCnt < outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Count)
                    {
                        _sbSQL = new StringBuilder();
                        _sbSQL.Append("SELECT BUSINESS_UNIT, EVENT_ID, PARENT_EVENT_ID, NO_OF_ITEMS, [FROM], [TO] ");
                        _sbSQL.Append("FROM MT_CYCT_EVENT_HDR_MASTER WHERE ");
                        _sbSQL.Append("PARENT_EVENT_ID = '" + outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows[intCnt][(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID] + "' ");
                        _sbSQL.Append(" AND BUSINESS_UNIT= '" + outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows[intCnt][(int)AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT] + "'");
                        _sbSQL.Append(" ORDER BY EVENT_ID");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + " Checking if the event split in the localdb with the following sql... " + _sbSQL.ToString())); }
                        }
                        string[] columns = { "BUSINESS_UNIT", "EVENT_ID", "PARENT_EVENT_ID", "NO_OF_ITEMS", "FROM", "TO"};
                        var _dsEventSplitDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns,_sbSQL.ToString()).ToList();
                        if (_dsEventSplitDetails.Count > 0)
                        {
                            outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows[intCnt].Delete();


                            for (int intRowCnt = 0; intRowCnt <= _dsEventSplitDetails.Count - 1; intRowCnt++)
                            {
                                _drSplitEvent = outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();

                                _drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT] = _dsEventSplitDetails[intRowCnt].BUSINESS_UNIT;
                                _drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID] = _dsEventSplitDetails[intRowCnt].EVENT_ID;
                                _drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS] = _dsEventSplitDetails[intRowCnt].NO_OF_ITEMS;
                                _drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC] = _dsEventSplitDetails[intRowCnt].FROM;
                                _drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC] = _dsEventSplitDetails[intRowCnt].TO;

                                outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.InsertAt(_drSplitEvent, intCnt + intRowCnt);

                            }


                        }
                        intCnt = intCnt + 1;
                    }
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + outputParameters.Tables[0].Rows.Count + "   Manual events allocated to user  " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]); }

                    return outputParameters;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

            finally
            {
                _sbSQL = null;
            }


        }
    }
}
