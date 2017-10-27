using AtPar.Service.Interfaces.CycleCount;
using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.Common;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;


namespace AtPar.CycleCount.Service
{
    public class AllocateEventsService : IAllocateEventsService
    {
        #region Private Variable
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        IAllocateEventsRepository _allocateRepo;
        #endregion

        #region Constructor
        public AllocateEventsService(ILog log,
                                    ICommonRepository commonRepository, ICommonService commonService, IAllocateEventsRepository allocateRepository)
        {
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _allocateRepo = allocateRepository;
            _log.SetLoggerType(typeof(AllocateEventsService));
        }

        #endregion

        #region GetEvents

        public AtParWebApiResponse<VM_CYCT_EVENT_HEADER_OUTPUT> GetAllocateEvents(string userID, string bUnit,
            string orgGroupID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_CYCT_EVENT_HEADER_OUTPUT>();

            DataSet inputParameters = new DataSet();
            DataSet outputParameters = new DataSet();

            DataTable cycle_br_dt = new DataTable();
            DataTable cycle_bu_dt = new DataTable();
            DataTable cycle_output = new DataTable();
            DataTable cycle_header_dt = new DataTable();
            DataTable cycle_businessunit_dt = new DataTable();


            try
            {

                cycle_header_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Header_Defns,
                        AtParWebEnums.DataSet_Type.HEADERS.ToString());

                DataRow cycle_header_dr = cycle_header_dt.NewRow();
                cycle_header_dr[(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] = "";
                cycle_header_dr[(int)AtParWebEnums.Get_Event_Header_Enum.USER_ID] = userID;
                cycle_header_dt.Rows.Add(cycle_header_dr);

                cycle_businessunit_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_BusinessUnits_Defns,
                        AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());

                if (!string.IsNullOrEmpty(bUnit))
                {
                    DataRow cycle_businessunit_dr = cycle_businessunit_dt.NewRow();
                    cycle_businessunit_dr[(int)AtParWebEnums.Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT] = bUnit;
                    cycle_businessunit_dt.Rows.Add(cycle_businessunit_dr);

                }
                else
                {
                    List<string> lstBunits = _commonRepo.GetOrgBusinessUnits(orgGroupID, (int)AtParWebEnums.BusinessType.Inventory);

                    if (lstBunits != null)
                    {
                        if (lstBunits.Count > 0)
                        {
                            //cycle_businessunit_dt = lstBunits.ToDataTable();

                            foreach (var item in lstBunits)
                            {
                                DataRow cycle_businessunit_dr = cycle_businessunit_dt.NewRow();
                                cycle_businessunit_dr[(int)AtParWebEnums.Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT] = item.ToString();
                                cycle_businessunit_dt.Rows.Add(cycle_businessunit_dr);
                            }
                        }
                    }
                }


                inputParameters.Tables.Add(cycle_header_dt);
                inputParameters.Tables.Add(cycle_businessunit_dt);

                cycle_br_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Params_Defns,
                        AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                if (!inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()))
                {
                    cycle_bu_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_BusinessUnits_Defns,
                   AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());
                }

                inputParameters.Tables.Add(cycle_br_dt);

                if (!inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()))
                {
                    inputParameters.Tables.Add(cycle_bu_dt);
                }

                cycle_output = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Header_Output_Header,
                        AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                outputParameters.Tables.Add(cycle_output);

                long StatusCode = Populate_GetHeader_Prerequisites(ref inputParameters, ref outputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(System.Environment.NewLine + methodBaseName + " No business units allocated for Org Grp Id" + System.Environment.NewLine);
                        response.StatusCode = AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
                        return response;
                    }
                    else
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(System.Environment.NewLine + methodBaseName + " Failed to Populate" + "_" + " Get Header Prerequisites " + System.Environment.NewLine);
                        response.StatusCode = AtparStatusCodes.E_SERVERERROR;
                        return response;
                    }
                }

                Tuple<long, DataSet> data = GetERPHeader(inputParameters, outputParameters, deviceTokenEntry);
                
                if (data.Item2 != null)
                {
                    outputParameters = data.Item2;
                    response.DataList = outputParameters.Tables[0].ToList<VM_CYCT_EVENT_HEADER_OUTPUT>();
                    response.DataList = response.DataList.OrderBy(x => x.EVENT_ID).OrderByDescending(x => x.STATUSALLOCATED == true).ToList();
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK<VM_CYCT_EVENT_HEADER_OUTPUT>(data.Item1, _commonRepo, _log);
                    return response;
                }
                // response.DataList = outputParameters.Tables[0].OrderByDescending(a => a.STATUSALLOCATED == true).Reverse().ToList< VM_CYCT_EVENT_HEADER_OUTPUT>();
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

        private long Populate_GetHeader_Prerequisites(ref DataSet pInputParams, ref DataSet pOutputParams, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _StatusCode = -1;
            SortedList<string, string> orgParams;
            string orgGroupID = string.Empty;
            List<MT_ATPAR_ORG_GROUP_BUNITS> lstBUnits = null;

            try
            {
                //' Add Parameters to PREREQDATA Table

                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_COUNTS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.EVENT_ALLOCATION.ToString()] = string.Empty;


                orgGroupID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.CycleCount, orgGroupID);


                DataRow dr = pInputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REVIEW_COUNTS] = orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_COUNTS.ToString()];

                //TODO: Need to decide on this
                //length for deviceid in devicetokenentry will be zero when the call is from webpage 
                //if the call is from webpage then the event allocation parameter should always be 'N'
                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].Length > 0)
                {
                    dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION] = orgParams[AtParWebEnums.AppParameters_Enum.EVENT_ALLOCATION.ToString()];
                }
                else
                {
                    dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION] = AtParWebEnums.YesNo_Enum.N.ToString();
                }

                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].Length > 0)
                {
                    dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL] = AtParWebEnums.YesNo_Enum.Y.ToString();
                }
                else
                {
                    dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.ERP_CALL] = AtParWebEnums.YesNo_Enum.N.ToString();
                }

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                dr[(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REMOTE_SCHEMA] = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();



                pInputParams.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);


                //Data gets populated in the Business Units table if call is from WebTrans
                //So do not populate the Business Units table again

                if (pInputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Count == 0)
                {
                    //' Add Parameters to BusinessUnits Table
                    DataSet dsBunit = null;

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] == "All")
                    {
                        lstBUnits = _commonRepo.GetBusinessUnits("", AtParDefns.BU_TYPE_INVENTORY);

                        // _StatusCode = _atparAppDataSecurity.GetBusinessUnits(_dsBunit, , BU_TYPE_INVENTORY);
                    }
                    else
                    {
                        lstBUnits = _commonRepo.GetBusinessUnits(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], AtParDefns.BU_TYPE_INVENTORY);
                        //_StatusCode = _atparAppDataSecurity.GetBusinessUnits(_dsBunit, pDeviceTokenEntry(TokenEntry_Enum.OrgGrpID), BU_TYPE_INVENTORY);
                    }
                    //need to do

                    //if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsWarnEnabled)
                    //        _log.Warn(methodBaseName + " Failed to Get Business Units " + System.Environment.NewLine);
                    //    return _StatusCode;
                    //}

                    if (lstBUnits.Count == 0)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + " Business Units have not been assigned to OrgGroup ID : " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + System.Environment.NewLine);

                        return AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
                    }

                    foreach (var item in lstBUnits)
                    {
                        DataRow _drBunit = default(DataRow);
                        _drBunit = pInputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].NewRow();
                        _drBunit[(int)AtParWebEnums.Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT] = item.BUSINESS_UNIT;
                        pInputParams.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Add(_drBunit);
                    }


                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString() + System.Environment.NewLine);
                return AtparStatusCodes.E_SERVERERROR;
            }

        }


        private Tuple<long, DataSet> GetERPHeader(DataSet inputParameters, DataSet outputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, DataSet> tupleOutput = null;
            DataTable cart_output = new DataTable();

            string remoteSchema = "";

            try
            {
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //Initializing 
                //GetConfigData();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;

                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() && x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                     .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {

                    if (_log.IsFatalEnabled)
                        _log.Fatal("Remote Object Failed ");

                    tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.CycleCount.ToString() + "_" + erpObjName;
                }

                className = "GetHeader";
                methodName = "GetHeader";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));


                if (StatusCode == AtparStatusCodes.ATPAR_OK || StatusCode == AtparStatusCodes.E_NORECORDFOUND)
                {
                    outputParameters = (DataSet)args[1];

                    if (outputParameters.Tables[0].Rows.Count >= 0)
                    {
                        outputParameters.Tables[0].Columns[(int)AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT].ColumnName = "BUSINESS_UNIT";

                        outputParameters.Tables[0].Columns[(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID].ColumnName = "EVENT_ID";

                        outputParameters.Tables[0].Columns[(int)AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC].ColumnName = "FROM_STOR_LOC";

                        outputParameters.Tables[0].Columns[(int)AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS].ColumnName = "NO_RECORDS";

                        outputParameters.Tables[0].Columns[(int)AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC].ColumnName = "TO_STOR_LOC";

                        outputParameters.Tables[0].Columns[(int)AtParWebEnums.Get_Event_Header_Output_Enum.COUNT_HDR_STATUS].ColumnName = "COUNT_HDR_STATUS";

                        outputParameters.Tables[0].AcceptChanges();
                        Tuple<DataSet, long> result = _allocateRepo.Get_SplitEvents(outputParameters, outputParameters);

                        StatusCode = GetUserAllocatedEvents(inputParameters, ref outputParameters);


                        if (outputParameters.Tables[0].Rows.Count == 0)
                        {
                            tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                            return tupleOutput;
                        }
                        else
                        {
                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                                return tupleOutput;
                            }
                        }


                    }

                }
                else
                {
                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + "Failed in the remote call : " + "StatusCode:" + tupleOutput.Item1 + System.Environment.NewLine);

                        if (StatusCode == AtparStatusCodes.E_REMOTEERROR)
                        {
                            tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                            return tupleOutput;
                        }
                        else
                        {
                            tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                            return tupleOutput;
                        }
                    }
                }


                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, outputParameters);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }



        #endregion

        /// <summary>
        /// To Initialize AtPar System
        /// </summary>
        //private void GetConfigData()
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}



        private long GetUserAllocatedEvents(DataSet inputParameter, ref DataSet outputParams)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int count;
            Tuple<DataSet, long> tupleOutput = null;
            StringBuilder sbSql = new StringBuilder();

            DataSet dsEventDetails = new DataSet();
            //DataSet dsUserEventDetails = new DataSet();
            DataRow drCancelEvent = null;
            string statCancel = "3";

            try
            {
                if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    DataColumn dc = new DataColumn("STATUSALLOCATED", System.Type.GetType("System.Boolean"));
                    dc.DefaultValue = false;
                    outputParams.Tables[0].Columns.Add(dc);


                    dc = new DataColumn("CHECKALLOCATED", System.Type.GetType("System.Boolean"));
                    dc.DefaultValue = false;
                    outputParams.Tables[0].Columns.Add(dc);


                    dc = new DataColumn("USER_ID", System.Type.GetType("System.String"));
                    outputParams.Tables[0].Columns.Add(dc);

                    dc = new DataColumn("ACTUAL_STATUSALLOCATED", System.Type.GetType("System.Boolean"));
                    dc.DefaultValue = false;
                    outputParams.Tables[0].Columns.Add(dc);

                    outputParams.Tables[0].AcceptChanges();

                    tupleOutput = _allocateRepo.GetEventDetails(inputParameter);
                    dsEventDetails = tupleOutput.Item1;
                    if (dsEventDetails.Tables[0].Rows.Count > 0)
                    {

                        for (int intRowCnt = 0; intRowCnt <= dsEventDetails.Tables[0].Rows.Count - 1; intRowCnt++)
                        {
                            DataRow[] dr = outputParams.Tables[0].Select("EVENT_ID='" + dsEventDetails.Tables[0].Rows[intRowCnt]["EVENT_ID"].ToString() + "' AND BUSINESS_UNIT='" + dsEventDetails.Tables[0].Rows[intRowCnt]["BUSINESS_UNIT"].ToString() + "'");
                            if ((dr.Length > 0))
                            {
                                dr[0]["STATUSALLOCATED"] = true;
                                dr[0]["CHECKALLOCATED"] = true;
                                dr[0]["ACTUAL_STATUSALLOCATED"] = true;
                                dr[0].AcceptChanges();
                                outputParams.Tables[0].AcceptChanges();
                            }
                            else
                            {
                                //To get canceled events from allocation table
                                drCancelEvent = outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();
                                drCancelEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT] = dsEventDetails.Tables[0].Rows[intRowCnt]["BUSINESS_UNIT"];
                                drCancelEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID] = dsEventDetails.Tables[0].Rows[intRowCnt]["EVENT_ID"];
                                drCancelEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS] = dsEventDetails.Tables[0].Rows[intRowCnt]["NO_RECORDS"];
                                drCancelEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC] = dsEventDetails.Tables[0].Rows[intRowCnt]["FROM_STOR_LOC"];
                                drCancelEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC] = dsEventDetails.Tables[0].Rows[intRowCnt]["TO_STOR_LOC"];
                                drCancelEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.COUNT_HDR_STATUS] = statCancel;
                                drCancelEvent["STATUSALLOCATED"] = true;
                                drCancelEvent["CHECKALLOCATED"] = true;
                                drCancelEvent["ACTUAL_STATUSALLOCATED"] = true;
                                outputParams.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(drCancelEvent);
                                outputParams.AcceptChanges();
                            }

                        }
                    }
                    tupleOutput = _allocateRepo.GetUserEventDetails(outputParams);
                    outputParams = tupleOutput.Item1;
                }

                // tupleOutput = new Tuple<DataSet, long>(outputParams, AtparStatusCodes.ATPAR_OK);
                return AtparStatusCodes.ATPAR_OK;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                // tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        #region AllocateEvents
        public AtParWebApiResponse<object> AllocateEvents(List<VM_CYCT_EVENT_HEADER_OUTPUT> lstEventDetails, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            try
            {
                Tuple<string, long> tpl = _allocateRepo.AllocateEvents(lstEventDetails); 

                response.StatusCode = tpl.Item2;
                response.DataVariable = tpl.Item1;
               
                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        //AtParWebApiResponse<object> IAllocateEventsService.AllocateEvents(List<VM_CYCT_EVENT_HEADER_OUTPUT> lstEventDetails, string strErrMsg, 
        //                                                                   string[] deviceTokenEntry)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    var response = new AtParWebApiResponse<object>();

        //    try
        //    {
        //        response.DataVariable = _allocateRepo.AllocateEvents(lstEventDetails, strErrMsg);
        //        response.AtParSuccess();
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
        //        return response;
        //    }
        //}

        //public AtParWebApiResponse<long> AllocateEvents(List<object> lstEventDetails, string[] deviceTokenEntry, string strErrMsg)
        //{
        //    throw new NotImplementedException();
        //}
        #endregion


    }
}
