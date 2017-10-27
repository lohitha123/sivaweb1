using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.Service.Interfaces.CycleCount;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace AtPar.CycleCount.Service
{
    public class GetHeaderService : IGetHeaderService
    {
        ILog _log;
        ICommonRepository _commonRepo;
        IGetHeaderRepository _repo;
        public GetHeaderService(ILog log, ICommonRepository commonRepository, IGetHeaderRepository repo)
        {
            _log = log;
            _commonRepo = commonRepository;
            _repo = repo;
            //GetConfigData();
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
        public AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> GetHeader(DataSet inputParameters,string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            string _strValue = string.Empty;
           
            AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER> response = new AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER>();
            try
            {
                DataSet pOutputParams = null;
                Timer _timer = new Timer();
                _timer.Start();
                //var headerInParams =
                //HiPerfTimer _timer = new HiPerfTimer();
                //_timer.Start();
                if (inputParameters.Tables[0].Rows.Count == 1)
                {
                    if (inputParameters.Tables[0].Rows[0][0].ToString() == "" && inputParameters.Tables[0].Rows[0][1].ToString() == "" &&
                        inputParameters.Tables[0].Rows[0][2].ToString() == "" && inputParameters.Tables[0].Rows[0][3].ToString() == "")
                    {
                        inputParameters.Tables[0].Rows.RemoveAt(0);
                    }
                }
                
                statusCode = Check_GetHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled) { _log.Warn("\r\n" + methodBaseName + " : Failed to check the " + "Header input parameters " + "\r\n"); }
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }
                var preProcessTasks = Execute_GetHeader_PreProcessTasks(inputParameters, pOutputParams, deviceTokenEntry);
                if ((preProcessTasks.Item1 != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsWarnEnabled) { _log.Warn("\r\n" + methodBaseName + " : Failed in the " + "Header pre process tasks " + "\r\n"); }

                    if ((preProcessTasks.Item1 == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS))
                    {
                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, _commonRepo, _log);

                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);

                    }
                    return response;

                }
                var processTasks = Execute_GetHeader_ProcessTasks(preProcessTasks.Item2, preProcessTasks.Item3, deviceTokenEntry);
                if ((processTasks.Item1 != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsWarnEnabled) { _log.Warn("\r\n" + methodBaseName + " : Failed in the " + "Header process tasks " + "\r\n"); }

                    if ((processTasks.Item1 == AtparStatusCodes.E_NORECORDFOUND))
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);

                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);

                    }
                 
                    return response;
                }

                // Call the Post Process tasks only when Output dataset is built from ERP
                if ((processTasks.Item2.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString()))
                {
                    statusCode = Execute_GetHeader_PostProcessTasks(processTasks.Item2, processTasks.Item3, deviceTokenEntry);
                    if ((statusCode != AtparStatusCodes.ATPAR_OK))
                    {
                        if (_log.IsWarnEnabled) { _log.Warn(("\r\n" + methodBaseName + " : Failed in the " + "Header post process tasks " + "\r\n")); }

                        if ((statusCode == AtparStatusCodes.E_NORECORDFOUND))
                        {
                            response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        }
                        else
                        {
                            response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        }
                        return response;
                    }
                }
                //statusCode = Build_GetHeader_OutputXML(pOutputParams, _strValue);
                if ((statusCode != AtparStatusCodes.ATPAR_OK))
                {
                    if (_log.IsWarnEnabled) { _log.Warn(("\r\n" + methodBaseName + " : Failed to build the " + "Header output XML " + "\r\n")); }
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                }
                var eventsList = (from DataRow dr in processTasks.Item3.Tables[0].Rows
                                  select new MT_CYCT_EVENT_HDR_MASTER()
                                  {
                                      BUSINESS_UNIT = dr[(int)AtParWebEnums.Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT].ToString(),
                                      EVENT_ID = dr[(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID].ToString(),
                                      NO_OF_ITEMS = Convert.ToDouble(dr[(int)AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS].ToString()),
                                      FROM = dr[(int)AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC].ToString(),
                                      TO = dr[(int)AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC].ToString(),
                                      COUNT_HDR_STATUS = dr[(int)AtParWebEnums.Get_Event_Header_Output_Enum.COUNT_HDR_STATUS].ToString(),
                                      PARENT_EVENT_ID = dr[(int)AtParWebEnums.Get_Event_Header_Output_Enum.PARENT_EVENT_ID].ToString()
                                  }).ToList();
                response.DataList = eventsList;              
                _timer.Stop();
                // If perflog.IsInfoEnabled Then perflog.Info(vbCrLf & methodBaseName & " " & _timer.Duration & " seconds")
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + " Failed " + "\r\n" + ex.ToString() + "\r\n"); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        #region Common Functions
        public Tuple<long, DataSet, DataSet> Execute_GetHeader_PreProcessTasks(DataSet inputParams, DataSet pOutputParameters, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var headerInParams = new Tuple<long, DataSet>(0, null);
            var headerOutParams = new Tuple<long, DataSet>(0, null);
            var headerInOutParams = new Tuple<long, DataSet, DataSet>(0, null, null);
            try
            {
                try
                {
                    headerInParams = Populate_GetHeader_InputParameters(inputParams);
                    if ((headerInParams.Item1 != AtparStatusCodes.ATPAR_OK))
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn((methodBaseName + (" Failed to populate the Input parameters : " + ("status code : "
                                            + (headerInParams.Item1 + "\r\n")))));
                        }

                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal((methodBaseName + (" Populate_GetHeader_InputParameters failed " + ("\r\n"
                                        + (ex.ToString() + "\r\n")))));
                    }

                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }

                try
                {
                    headerOutParams = Populate_GetHeader_OutputParameters();
                    if ((headerOutParams.Item1 != AtparStatusCodes.ATPAR_OK))
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn((methodBaseName + (" Failed to populate the output parameters : " + ("status code : "
                                            + (headerOutParams.Item1 + "\r\n")))));
                        }

                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal((methodBaseName + (" Populate_GetHeader_OutputParameters failed " + ("\r\n"
                                        + (ex.ToString() + "\r\n")))));
                    }

                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }

                try
                {
                    headerInOutParams = Populate_GetHeader_Prerequisites(headerInParams.Item2, headerOutParams.Item2, deviceTokenEntry);
                    if ((headerInOutParams.Item1 != AtparStatusCodes.ATPAR_OK))
                    {
                        if ((headerInOutParams.Item1 == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS))
                        {
                            if (_log.IsWarnEnabled)
                            {
                                _log.Warn((methodBaseName + (" No business units assigned to the " + ("org group : " + "\r\n"))));
                            }
                            return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, null, null);
                        }
                        else
                        {
                            if (_log.IsWarnEnabled)
                            {
                                _log.Warn((methodBaseName + (" Failed to populate the Prerequisites : " + ("status code : "
                                                + (headerInOutParams.Item1 + "\r\n")))));
                            }

                            return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                        }

                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal((methodBaseName + (" Populate_GetHeader_Prerequisites failed " + ("\r\n"
                                        + (ex.ToString() + "\r\n")))));
                    }

                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }

                try
                {
                    int _lngTransId;

                    //  if there are previous transactions
                    if (!(headerInOutParams.Item2.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()] == null))
                    {
                        if ((headerInOutParams.Item2.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count > 0))
                        {
                            for (int _transIDsCnt = 0; (_transIDsCnt
                                        <= (inputParams.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count - 1)); _transIDsCnt++)
                            {
                                _lngTransId = Convert.ToInt32(inputParams.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()]
                                    .Rows[_transIDsCnt][(int)AtParWebEnums.Get_Cart_Header_Transactions_Enum.TRANSACTION_ID]);
                                try
                                {
                                    //  cancel the previous transactions 
                                    POCOEntities.AtPar_Transaction_Entity pTransactionDetails = new POCOEntities.AtPar_Transaction_Entity();
                                    if (((headerInOutParams.Item2.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REVIEW_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
                                                || ((headerInOutParams.Item2.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.PERFORM_MANUAL_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                                                && (headerInOutParams.Item2.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REVIEW_MANUAL_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.N.ToString()))))
                                    {
                                        pTransactionDetails.TransactionId = _lngTransId;
                                        pTransactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CycleCount;
                                        pTransactionDetails.Status = AtParDefns.statCancel;
                                        pTransactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];
                                        pTransactionDetails.StartDateTime = DateTime.Now;
                                        var statusCode = _commonRepo.UpdateTransaction(pTransactionDetails);
                                        if ((statusCode != AtparStatusCodes.ATPAR_OK))
                                        {
                                            if (_log.IsWarnEnabled)
                                            {
                                                _log.Warn((methodBaseName + (" Failed to cancel the transaction : "
                                                                + (_lngTransId + "\r\n"))));
                                            }

                                            return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                                        }

                                    }

                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal((methodBaseName + (" UpdateTransaction failed for " + ("transaction ID : "
                                                        + (_lngTransId + ("\r\n"
                                                        + (ex.ToString() + "\r\n")))))));
                                    }

                                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                                }

                            }

                        }

                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal((methodBaseName + (" UpdateTransaction failed " + ("\r\n"
                                        + (ex.ToString() + "\r\n")))));
                    }

                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }
                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.ATPAR_OK, headerInOutParams.Item2, headerInOutParams.Item3);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal((methodBaseName
                                    + (ex.ToString() + "\r\n")));
                }

                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
            }

        }

        //public virtual long Execute_GetHeader_PreProcessTasks(DataSet pInputParams, ref DataSet pOutputParameters, string[] deviceTokenEntry)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    long statusCode = -1;


        //    try
        //    {
        //        try
        //        {
        //            statusCode = Populate_GetHeader_InputParameters(ref pInputParams);
        //            if (statusCode != AtparStatusCodes.ATPAR_OK)
        //            {
        //                if (_log.IsWarnEnabled)
        //                    _log.Warn(methodBaseName + " Failed to populate the Input parameters : " + "status code : " + statusCode + "\n");
        //                return AtparStatusCodes.E_SERVERERROR;
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            if (_log.IsFatalEnabled)
        //                _log.Fatal(methodBaseName + " Populate_GetHeader_InputParameters failed " + "\n" + ex.ToString() + "\n");
        //            return AtparStatusCodes.E_SERVERERROR;
        //        }

        //        try
        //        {
        //            statusCode = Populate_GetHeader_OutputParameters(ref pOutputParameters);
        //            if (statusCode != AtparStatusCodes.ATPAR_OK)
        //            {
        //                if (_log.IsWarnEnabled)
        //                    _log.Warn(methodBaseName + " Failed to populate the output parameters : " + "status code : " + statusCode + "\n");
        //                return AtparStatusCodes.E_SERVERERROR;
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            if (_log.IsFatalEnabled)
        //                _log.Fatal(methodBaseName + " Populate_GetHeader_OutputParameters failed " + "\n" + ex.ToString() + "\n");
        //            return AtparStatusCodes.E_SERVERERROR;
        //        }

        //        try
        //        {
        //            statusCode = Populate_GetHeader_Prerequisites(ref pInputParams, ref pOutputParameters, deviceTokenEntry);
        //            if (statusCode != AtparStatusCodes.ATPAR_OK)
        //            {
        //                if (statusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS)
        //                {
        //                    if (_log.IsWarnEnabled)
        //                        _log.Warn(methodBaseName + " No business units assigned to the " + "org group : " + "\n");
        //                    return AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
        //                }
        //                else
        //                {
        //                    if (_log.IsWarnEnabled)
        //                        _log.Warn(methodBaseName + " Failed to populate the Prerequisites : " + "status code : " + statusCode + "\n");
        //                    return AtparStatusCodes.E_SERVERERROR;
        //                }
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            if (_log.IsFatalEnabled)
        //                _log.Fatal(methodBaseName + " Populate_GetHeader_Prerequisites failed " + "\n" + ex.ToString() + "\n");
        //            return AtparStatusCodes.E_SERVERERROR;
        //        }


        //        try
        //        {
        //            long _lngTransId = 0;
        //            //AtPar_Application_Transactions _atparTransaction = default(AtPar_Application_Transactions);

        //            //_atparTransaction = AtPar_Application_Transactions.CreateInstance(deviceTokenEntry(AtParWebEnums.TokenEntry_Enum.SystemId));

        //            // if there are previous transactions
        //            if ((pInputParams.Tables(AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString) != null))
        //            {

        //                if (pInputParams.Tables(AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString).Rows.Count > 0)
        //                {

        //                    for (int _transIDsCnt = 0; _transIDsCnt <= pInputParams.Tables(AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString).Rows.Count - 1; _transIDsCnt++)
        //                    {
        //                        _lngTransId = pInputParams.Tables(AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString).Rows(_transIDsCnt).Item(Get_Cart_Header_Transactions_Enum.TRANSACTION_ID);

        //                        try
        //                        {
        //                            // cancel the previous transactions 

        //                            AtPar_Transaction_Entity pTransactionDetails = default(AtPar_Transaction_Entity);


        //                            if (pInputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0].Item[Get_Event_Header_PreReqData_Enum.REVIEW_COUNTS] == AtParWebEnums.YesNo_Enum.N.ToString()
        //                                || (pInputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0].Item[Get_Event_Header_PreReqData_Enum.PERFORM_MANUAL_COUNTS] == AtParWebEnums.YesNo_Enum.Y.ToString()
        //                                && pInputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0].Item[Get_Event_Header_PreReqData_Enum.REVIEW_MANUAL_COUNTS] == AtParWebEnums.YesNo_Enum.N.ToString())
        //                            {
        //                                pTransactionDetails.TransactionId = _lngTransId;
        //                                pTransactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CycleCount;
        //                                pTransactionDetails.Status = statCancel;
        //                                pTransactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];
        //                                pTransactionDetails.StartDateTime = DateTime.Now;

        //                                statusCode = _atparTransaction.UpdateTransaction(pTransactionDetails);

        //                                if (statusCode != AtparStatusCodes.ATPAR_OK)
        //                                {
        //                                    if (_log.IsWarnEnabled)
        //                                        _log.Warn(methodBaseName + " Failed to cancel the transaction : " + _lngTransId + "\n");
        //                                    return AtparStatusCodes.E_SERVERERROR;
        //                                }
        //                            }

        //                        }
        //                        catch (Exception ex)
        //                        {
        //                            if (_log.IsFatalEnabled)
        //                                _log.Fatal(methodBaseName + " UpdateTransaction failed for " + "transaction ID : " + _lngTransId + "\n" + ex.ToString() + "\n");
        //                            return AtparStatusCodes.E_SERVERERROR;
        //                        }
        //                    }

        //                }
        //            }


        //        }
        //        catch (Exception ex)
        //        {
        //            if (_log.IsFatalEnabled)
        //                _log.Fatal(methodBaseName + " UpdateTransaction failed " + "\n" + ex.ToString() + "\n");
        //            return AtparStatusCodes.E_SERVERERROR;
        //        }

        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal(methodBaseName + ex.ToString() + "\n");
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }

        //}

        private Tuple<long, DataSet, DataSet> Populate_GetHeader_Prerequisites(DataSet inputParams, DataSet pOutputParams, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            //Atpar_Application_Parameters _atparParameters = default(Atpar_Application_Parameters);
            try
            {
                //' Add Parameters to PREREQDATA Table
                try
                {
                    SortedList<string, string> _orgParams = default(SortedList<string, string>);
                    _orgParams = new SortedList<string, string>();

                    try
                    {
                        _orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_COUNTS.ToString()] = string.Empty;
                        _orgParams[AtParWebEnums.AppParameters_Enum.EVENT_ALLOCATION.ToString()] = string.Empty;
                        _orgParams[AtParWebEnums.AppParameters_Enum.PERFORM_MANUAL_COUNTS.ToString()] = string.Empty;
                        _orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_MANUAL_COUNTS.ToString()] = string.Empty;
                        _commonRepo.GetOrgGroupParamValues(_orgParams, (int)AtParWebEnums.EnumApps.CycleCount, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to invoke " + "GetOrgGroupParamValues function " + "\n");
                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }

                    DataRow _dr = inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REVIEW_COUNTS] = _orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_COUNTS.ToString()];

                    //TODO: Need to decide on this
                    //length for deviceid in devicetokenentry will be zero when the call is from webpage 
                    //if the call is from webpage then the event allocation parameter should always be 'N'
                    //if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].Length > 0)
                    //{
                    //    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION] = _orgParams[AtParWebEnums.AppParameters_Enum.EVENT_ALLOCATION.ToString()];
                    //}
                    //else
                    //{
                    //    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION] = AtParWebEnums.YesNo_Enum.N.ToString();
                    //}

                    //if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].Length > 0)
                    //{
                    //    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL] = AtParWebEnums.YesNo_Enum.Y.ToString();
                    //}
                    //else
                    //{
                    //    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL] = AtParWebEnums.YesNo_Enum.N.ToString();
                    //}
                    List<string> lstParameters = new List<string>();
                    lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());

                    if ((Convert.ToInt32(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType]) == (int)AtParWebEnums.ClientType.HHT) ||
                        (Convert.ToInt32(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType]) == (int)AtParWebEnums.ClientType.AHHT) ||
                       (Convert.ToInt32(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType]) == (int)AtParWebEnums.ClientType.IHHT))
                    {
                        _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION] = _orgParams[AtParWebEnums.AppParameters_Enum.EVENT_ALLOCATION.ToString()];
                        _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL] = AtParWebEnums.YesNo_Enum.Y.ToString();
                    }
                    else
                    {
                        _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION] = AtParWebEnums.YesNo_Enum.N.ToString();
                        _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL] = AtParWebEnums.YesNo_Enum.N.ToString();
                    }
                    //deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString(), AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString();
                    var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                    var erpObjectName = /*AtParWebEnums.EnumApps.CycleCount + "_" +*/ lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REMOTE_SCHEMA] = erpObjectName;
                    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.PERFORM_MANUAL_COUNTS] = _orgParams[AtParWebEnums.AppParameters_Enum.PERFORM_MANUAL_COUNTS.ToString()];
                    _dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REVIEW_MANUAL_COUNTS] = _orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_MANUAL_COUNTS.ToString()];
                    inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(_dr);

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to populate pre-req data " + ex.ToString() + "\n");
                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }

                //Data gets populated in the Business Units table if call is from WebTrans
                //So do not populate the Business Units table again

                if (inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Count == 0)
                {
                    //' Add Parameters to BusinessUnits Table

                    List<MT_ATPAR_ORG_GROUP_BUNITS> bUnits = null;
                    try
                    {
                        if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] == "All")
                        {
                            bUnits = _commonRepo.GetBusinessUnits(AtParDefns.BU_TYPE_INVENTORY);
                        }
                        else
                        {
                            bUnits = _commonRepo.GetBusinessUnits(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], AtParDefns.BU_TYPE_INVENTORY);
                        }

                        if (bUnits.Count == 0)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + " Business Units have not been assigned to OrgGroup ID : " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "\n");
                            return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, null, null);
                        }

                        for (int intCnt = 0; intCnt <= bUnits.Count - 1; intCnt++)
                        {
                            DataRow _drBunit = default(DataRow);

                            _drBunit = inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].NewRow();
                            _drBunit[(int)AtParWebEnums.Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT] = bUnits[intCnt].BUSINESS_UNIT;

                            inputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Add(_drBunit);
                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to populate Business Units Table " + ex.ToString() + "\n");
                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }
                }
                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.ATPAR_OK, inputParams, pOutputParams);

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString() + "\n");
                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
            }

        }

        private Tuple<long, DataSet> Populate_GetHeader_InputParameters(DataSet pInputParams)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            try
            {
                DataTable cycle_br_dt = default(DataTable);
                DataTable cycle_bu_dt = null;

                //' Table to add Parameters
                try
                {
                    cycle_br_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " : Failed to create PREREQDATA table : " + ex.ToString() + "\n");
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                //add the bunits table only if the input dataset doesnot conatin the Bunits datatable

                if (!pInputParams.Tables.Contains(AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()))
                {
                    //' Table to add BusinessUnits
                    try
                    {
                        cycle_bu_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_BusinessUnits_Defns, AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " : Failed to create BUSINESS UNIT table : " + ex.ToString() + "\n");
                        return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    }

                }
                //' Add these tables to actual input parameters
                try
                {
                    pInputParams.Tables.Add(cycle_br_dt);
                    //add the bunits table only if the input dataset doesnot conatin the Bunits datatable
                    if (!pInputParams.Tables.Contains(AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()))
                    {
                        pInputParams.Tables.Add(cycle_bu_dt);
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " : Failed to add the PREREQDATA and " + "BUSINESS UNIT table to the inputparameters dataset : " + ex.ToString() + "\n");
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, pInputParams);

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : " + ex.ToString() + "\n");
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }

        }

        private Tuple<long, DataSet> Populate_GetHeader_OutputParameters()
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            try
            {
                var outputParams = new DataSet();

                // add in the Output Dataset
                DataTable _cycle_output = default(DataTable);

                //' Table to add Output Data
                try
                {
                    //_cycle_output = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Header_Output_Header, _
                    //

                    _cycle_output = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Header_Output_Header, AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to create OUTPUT table " + ex.ToString() + "\n");
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);

                }

                try
                {
                    outputParams.Tables.Add(_cycle_output);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to add OUTPUT table to dataset " + ex.ToString() + "\n");
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, outputParams);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString() + "\n");
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }

        }

        public long Check_GetHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            // Printing Input DataSet
            if (_log.IsDebugEnabled)
            {
                try
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);
                }
                catch (Exception ex)
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ": Error while calling PrintDatasetStatistics :" + ex.ToString());
                    return AtparStatusCodes.E_SERVERERROR;
                }
            }
            /// End of Printing InPut DataSet
            try
            {
                // check if the right number of tables are there
                if (inputParameters.Tables.Count != 2)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count + "\n");
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Number of rows in the header table : " + inputParameters.Tables[0].Rows.Count.ToString() + " Number of rows in the transaction table : " + inputParameters.Tables[1].Rows.Count.ToString() + "\n");

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString() + "\n");
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }

        }


        public Tuple<long, DataSet, DataSet> Execute_GetHeader_ProcessTasks(DataSet inputParams, DataSet pOutputParameters, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string remoteCycleObj = string.Empty;
            string _remoteSchema = string.Empty;
            string _className = null;
            object reflectObject = null;
            MethodInfo MethodName = default(MethodInfo);
            string methodName = string.Empty;
            long statusCode = -1;
            DataRow _drSplitEvent = default(DataRow);

            try
            {
                if (inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    var lstEventDetails = _repo.EVENT_ALLOCATION_Y_From_Execute_GetHeader_ProcessTasks(inputParams, deviceTokenEntry);

                    if (lstEventDetails.Count == 0)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + " No events allocated to user " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "\n");
                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null, null);
                    }
                    else
                    {
                        //Build the output dataset                      
                        foreach (var events in lstEventDetails)
                        {
                            DataRow drOutputRow = pOutputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();

                            drOutputRow[AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT.ToString()] = events.BUSINESS_UNIT;
                            drOutputRow[AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID.ToString()] = events.EVENT_ID;
                            drOutputRow[AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS.ToString()] = events.NO_RECORDS;
                            drOutputRow[AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC.ToString()] = events.FROM_STOR_LOC;
                            drOutputRow[AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC.ToString()] = events.TO_STOR_LOC;
                            drOutputRow[AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_TYPE.ToString()] = events.EVENT_TYPE;
                            pOutputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(drOutputRow);
                        }
                    }
                }

                else //Event allocation =N
                {
                    if (inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                    {
                        if (inputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] != null)
                        {
                            var lstEventSplitDetails = _repo.EVENT_ALLOCATION_N_From_Execute_GetHeader_ProcessTasks(inputParams, deviceTokenEntry);

                            foreach (var events in lstEventSplitDetails)
                            {
                                _drSplitEvent = pOutputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();

                                _drSplitEvent[AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT.ToString()] = events.BUSINESS_UNIT;
                                _drSplitEvent[AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID.ToString()] = events.EVENT_ID;
                                _drSplitEvent[AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS.ToString()] = events.NO_OF_ITEMS;
                                _drSplitEvent[AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC.ToString()] = events.FROM;
                                _drSplitEvent[AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC.ToString()] = events.TO;
                                _drSplitEvent[AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_TYPE.ToString()] = Convert.ToInt32(AtParWebEnums.EventType.Regular);

                                pOutputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(_drSplitEvent);

                            }
                            //Exit only if event split
                            if (lstEventSplitDetails.Count > 0)
                            {
                                //As the output dataset is built using the data from middle tier for the split event 
                                //there is no need for the ERP call
                                inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL] = AtParWebEnums.YesNo_Enum.N.ToString();
                                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.ATPAR_OK, inputParams, pOutputParameters);
                            }
                        }
                    }
                }
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                remoteCycleObj = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                List<string> lstSchemaParameters = new List<string>();
                lstSchemaParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                var lstSchemaConfigSectionDtls = _commonRepo.GetConfigData(lstSchemaParameters).ToList();
                _remoteSchema = lstSchemaConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (string.IsNullOrEmpty(remoteCycleObj))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }
                    return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                }
                else
                {
                    remoteCycleObj = AtParWebEnums.EnumApps.CycleCount.ToString() + "_" + remoteCycleObj;
                }

                inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REMOTE_SCHEMA] = _remoteSchema;
                _className = "GetHeader";
                methodName = "GetHeader";
                MethodName = Utils.CreateERPObjectInstance(remoteCycleObj, _className, methodName, out reflectObject);
                object[] args = { inputParams, pOutputParameters, deviceTokenEntry };
                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));
                pOutputParameters = (DataSet)args[1];

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + "Failed in the remote call : " + "StatusCode : " + statusCode + "\n");
                    if (statusCode == AtparStatusCodes.E_REMOTEERROR)
                    {
                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }
                    else if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                    {
                        //To Get manual events

                        if (inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.PERFORM_MANUAL_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            statusCode = GetManualEventHeader(inputParams, pOutputParameters, deviceTokenEntry);
                            if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                            {
                                return new Tuple<long, DataSet, DataSet>(statusCode, null, null);
                            }
                            else if (statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "\n" + statusCode);
                                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                            }
                        }
                        else
                        {
                            return new Tuple<long, DataSet, DataSet>(statusCode, null, null);
                        }
                    }
                    else
                    {
                        return new Tuple<long, DataSet, DataSet>(statusCode, null, null);
                    }
                }

                //To Get manual events

                if (inputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.PERFORM_MANUAL_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    statusCode = GetManualEventHeader(inputParams, pOutputParameters, deviceTokenEntry);

                    if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + " :No Manual events exist for user " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "\n");
                        //return new Tuple<long, DataSet, DataSet>(statusCode, null, null);
                    }
                    else if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + "\n" + statusCode);
                        return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
                    }
                }
                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.ATPAR_OK, inputParams, pOutputParameters);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString() + "\n");
                return new Tuple<long, DataSet, DataSet>(AtparStatusCodes.E_SERVERERROR, null, null);
            }
            finally
            {

                reflectObject = null;
                MethodName = null;
            }

        }


        long GetManualEventHeader(DataSet inputParams, DataSet outputParameters, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                var eventDetails = _repo.GetManualEventHeader(inputParams, deviceTokenEntry);
                if (eventDetails.Count == 0)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " No Manual events exist for user " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]);
                    return AtparStatusCodes.E_NORECORDFOUND;

                }
                else
                {
                    //Build the output dataset
                    foreach (var events in eventDetails)
                    {
                        DataRow _drOutputRow = outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();

                        _drOutputRow[(int)AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT] = events.BUSINESS_UNIT;
                        _drOutputRow[(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID] = events.EVENT_ID;
                        _drOutputRow[(int)AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS] = events.NO_RECORDS;
                        _drOutputRow[(int)AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC] = events.FROM_STOR_LOC;
                        _drOutputRow[(int)AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC] = events.TO_STOR_LOC;
                        _drOutputRow[(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_TYPE] = Convert.ToInt32(AtParWebEnums.EventType.Manual);

                        outputParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(_drOutputRow);
                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        public long Execute_GetHeader_PostProcessTasks(DataSet pInputParameters, DataSet pOutputParameters, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                var outPutParams = _repo.Execute_GetHeader_PostProcessTasks(pOutputParameters, deviceTokenEntry);


                ///// Printing OutPut DataSet ///'
                if (_log.IsDebugEnabled)
                {
                    try
                    {
                        //DataSetExtensions.PrintDatasetStatistics(outPutParams, _log, deviceTokenEntry);
                        outPutParams.PrintDatasetStatistics( _log, deviceTokenEntry);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ": Error while calling PrintDatasetStatistics :" + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                    ///// End of Printing OutPut DataSet ///'
                }
                return AtparStatusCodes.ATPAR_OK;
            }


            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + " : " + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }



        }
        #endregion
    }
}
