using log4net;
using AtPar.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Service.Interfaces.CycleCount;
using AtPar_BusinessRules;
using AtPar.Repository.Interfaces.Common;
using System.Data.SqlClient;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.POCOEntities;
using AtPar.Common.Service;

namespace AtPar.CycleCount.Service
{
    partial class GetDetailsService : IGetDetailsService
    {

        ISplitEventsRepository _splitEvents;
        ILog _log;
        private ICommonRepository _commonRepo;


        public GetDetailsService(ISplitEventsRepository splitEvents, ILog log, ICommonRepository commonRepo)
        {
            _splitEvents = splitEvents;
            _log = log;
            _commonRepo = commonRepo;
           // GetConfigData();
        }


        public long Check_GetDetails_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                if (_log.IsDebugEnabled)
                {
                    // comented by uday nant build not working
                    // inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);
                    // check if the right number of tables are in there
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics( _log, deviceTokenEntry);
                    if (inputParameters.Tables.Count < 1 || inputParameters.Tables.Count > 2)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Incorrect InputParameters DataTable Count " + inputParameters.Tables.Count);
                        return AtparStatusCodes.E_INVALIDPARAMETER;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " row count is ... :" + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString() +
                                    ": for Cart :" + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] + ":");
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(" Exception thrown in " + methodBaseName + " is... " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }


        public long Execute_GetDetails_PreProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] DeviceTokenEntry, string OrgGroupId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                var inputParams = Populate_GetDetails_InputParameters(inputParameters);
                if (inputParams.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(methodBaseName + " Failed in Populating Input Parameters " +
                        "with StatusCode : " + inputParams.Item1 + ": and table Count is :" + inputParams.Item2.Tables.Count + ":");

                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
                var outputParams = Populate_GetDetails_OutputParameters(outputParameters);
                if (outputParams.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(methodBaseName + " Failed in Populating Output Parameters " +
                        "with StatusCode : " + outputParams.Item1 + ": and table Count is :" + outputParams.Item2.Tables.Count + ":");

                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
                var preRequisites = Populate_GetDetails_Prerequisites(inputParameters, DeviceTokenEntry, OrgGroupId);
                if (preRequisites.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    if (preRequisites.Item1 == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + " No business units assigned to the " + "org group : ");
                        return AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
                    }
                    else
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + " Failed to populate the Prerequisites : " + "status code : " + preRequisites.Item1);
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                    _log.Fatal(" Exception thrown in " + methodBaseName + " is... " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private Tuple<long, DataSet> Populate_GetDetails_InputParameters(DataSet inputParameters)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable cycle_preReq_dt = default(DataTable);
            DataTable _cycle_ListView_dt = default(DataTable);


            try
            {

                cycle_preReq_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Details_PreReqData_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " After Populating prerequisites " + "Input Parameters..." + "\n");

                inputParameters.Tables.Add(cycle_preReq_dt);

                _cycle_ListView_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_Detail_ListView_Defns, AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString());

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " After Populating listview required " + "Input Parameters...");

                inputParameters.Tables.Add(_cycle_ListView_dt);

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, inputParameters);

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " thrown an exception.. " + "\n" + ex.ToString());
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
            finally
            {
                cycle_preReq_dt = null;
                _cycle_ListView_dt = null;
            }



        }

        private Tuple<long, DataSet> Populate_GetDetails_OutputParameters(DataSet outputParameters)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable _dtEventOutputHeader = default(DataTable);
            DataTable _dtEventOutputDetail = default(DataTable);
            DataTable _dtEventOutputAlternateUOMs = default(DataTable);

            try
            {
                _dtEventOutputHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_DetailOutput_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " After Populating OutPut Parameters " + "Headers... ");

                outputParameters.Tables.Add(_dtEventOutputHeader);

                _dtEventOutputDetail = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_DetailOutput_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " After Populating OutPut Parameters " + "Details...");

                outputParameters.Tables.Add(_dtEventOutputDetail);

                _dtEventOutputAlternateUOMs = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Event_DetailOutput_AlternateUOMs_Defns, AtParWebEnums.DataSet_Type.ALTERNATEUOMS.ToString());

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " After Populating OutPut Parameters " + "Details...");

                outputParameters.Tables.Add(_dtEventOutputAlternateUOMs);

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, outputParameters);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "\n" + ex.ToString());
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
            finally
            {
                _dtEventOutputHeader = null;
                _dtEventOutputDetail = null;
                _dtEventOutputAlternateUOMs = null;
            }



        }

        private Tuple<long, DataSet> Populate_GetDetails_Prerequisites(DataSet inputParameters, string[] deviceTokenEntry, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataRow _drPreReq = null;
            DataRow _drListView = null;
            SortedList<string, string> orgParams;
            SortedList<string, string> profParams;

            try
            {
                _drPreReq = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.EVENT_ALLOCATION.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_COUNTS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.DISPLAY_ORDERING_UOM_TYPE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PERFORM_MANUAL_COUNTS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_MANUAL_COUNTS.ToString()] = string.Empty;

                //Call the GetOrgGroupParamValues to get the org parameter values to be 
                //added to the input parameters dataset
                _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.CycleCount, orgGroupID);

                //No check for allocation when call from server web page so value is set to N

                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.HHT).ToString() || deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.AHHT).ToString() ||
                    deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.IHHT).ToString() || deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WHHT).ToString())
                {
                    _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.EVENT_ALLOCATION.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.EVENT_ALLOCATION.ToString()];
                }
                else
                {
                    _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.EVENT_ALLOCATION.ToString()] = AtParWebEnums.YesNo_Enum.N.ToString();
                }


                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.REVIEW_COUNTS.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_COUNTS.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.ITEM_DESCR.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.ITEM_PRICE.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.DISPLAY_ORDERING_UOM_TYPE.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.DISPLAY_ORDERING_UOM_TYPE.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.PERFORM_MANUAL_COUNTS.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.PERFORM_MANUAL_COUNTS.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.REVIEW_MANUAL_COUNTS.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.REVIEW_MANUAL_COUNTS.ToString()];


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(" Exception thrown in " + methodBaseName + " in getting the org parameter values is... " + ex.ToString());
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);

            }

            try
            {
                profParams = new SortedList<string, string>();
                profParams[AtParWebEnums.AppParameters_Enum.DISPLAY_PREV_COUNT.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.COUNT_IN_DIFF_UOMS.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.DISP_ALT_UOM.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.DEFAULT_UNIT_OF_MEASURE.ToString()] = string.Empty;

                _commonRepo.GetProfileParamValues(profParams, (int)AtParWebEnums.EnumApps.CycleCount, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString());

                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.HHT).ToString() || deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.AHHT).ToString() ||
                   deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.IHHT).ToString() || deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WHHT).ToString())
                {
                    _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.DISPLAY_PREV_COUNT.ToString()] = profParams[AtParWebEnums.AppParameters_Enum.DISPLAY_PREV_COUNT.ToString()];
                    _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.COUNT_IN_DIFF_UOMS.ToString()] = profParams[AtParWebEnums.AppParameters_Enum.COUNT_IN_DIFF_UOMS.ToString()];
                }
                else
                {
                    _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.DISPLAY_PREV_COUNT.ToString()] = AtParWebEnums.YesNo_Enum.Y.ToString();
                    _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.COUNT_IN_DIFF_UOMS.ToString()] = AtParWebEnums.YesNo_Enum.Y.ToString();
                }

                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString()] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString()] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.DEFAULT_UNIT_OF_MEASURE.ToString()] = profParams[AtParWebEnums.AppParameters_Enum.DEFAULT_UNIT_OF_MEASURE.ToString()];
                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.DISP_ALT_UOM.ToString()] = profParams[AtParWebEnums.AppParameters_Enum.DISP_ALT_UOM.ToString()];

                List<string> lstSchemaParameters = new List<string>();
                lstSchemaParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                var lstSchemaConfigSectionDtls = _commonRepo.GetConfigData(lstSchemaParameters).ToList();
                var remoteSchema = lstSchemaConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.REMOTE_SCHEMA.ToString()] = remoteSchema;

                var lstDBTypeParameters = new List<string>();
                lstDBTypeParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                var lstDbTypeConfigSectionDtls = _commonRepo.GetConfigData(lstDBTypeParameters).ToList();
                var remoteDBType = lstDbTypeConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                _drPreReq[AtParWebEnums.Get_Event_Details_PreReqData_Enum.REMOTE_DB_TYPE.ToString()] = remoteDBType;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(" Exception thrown in " + methodBaseName + " in getting the org parameter values is... " + ex.ToString());
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }




            List<string> _reqdParams = _commonRepo.GetListViewDetails(((int)AtParWebEnums.EnumApps.CycleCount).ToString(),
                   /*"TRANSACTIONTABLES"*/"ITEM COUNTS", deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString());

            _drListView = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()].NewRow();


            //'Indicates call is from split screen
            if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WEB).ToString())
            {
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.VENDOR_ITEM_ID_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.CUST_ITEM_NO_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.UPC_ID_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STORAGE_AREA_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_1_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_2_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_3_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_4_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.CONTAINER_ID_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STAGED_DATE_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.SERIAL_ID_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.INV_LOT_ID_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.SYS_QTY_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.INV_TAG_ID_REQ.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_1.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_2.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_3.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_4.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.PRICE.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.PACKAGING_STRING.ToString()] = true;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STD_PACK_UOM.ToString()] = true;
            }
            else
            {
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.VENDOR_ITEM_ID_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.CUST_ITEM_NO_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.UPC_ID_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STORAGE_AREA_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_1_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_2_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_3_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_4_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.CONTAINER_ID_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STAGED_DATE_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.SERIAL_ID_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.INV_LOT_ID_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.SYS_QTY_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.INV_TAG_ID_REQ.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_1.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_2.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_3.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_4.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.PRICE.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.PACKAGING_STRING.ToString()] = false;
                _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STD_PACK_UOM.ToString()] = false;
            }

            inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()].Rows.Add(_drListView);

            if (_reqdParams.Count == 0)
            {
                if (_log.IsWarnEnabled)
                    _log.Warn(methodBaseName + " Screen Display Setup did not return any rows for screen name: ITEM COUNTS for Profile ID :" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID]);

            }
            else
            {
                foreach (var item in _reqdParams)
                {
                    switch (item)
                    {

                        case "VENDOR_ITEM_ID_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.VENDOR_ITEM_ID_REQ.ToString()] = true;
                            break;
                        case "CUST_ITEM_NO_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.CUST_ITEM_NO_REQ.ToString()] = true;
                            break;
                        case "UPC_ID_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.UPC_ID_REQ.ToString()] = true;
                            break;
                        case "STORAGE_AREA_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STORAGE_AREA_REQ.ToString()] = true;
                            break;
                        case "STOR_LEVEL_1_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_1_REQ.ToString()] = true;
                            break;
                        case "TOR_LEVEL_2_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_2_REQ.ToString()] = true;
                            break;
                        case "TOR_LEVEL_3_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_3_REQ.ToString()] = true;
                            break;
                        case "STOR_LEVEL_4_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STOR_LEVEL_4_REQ.ToString()] = true;
                            break;
                        case "CONTAINER_ID_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.CONTAINER_ID_REQ.ToString()] = true;
                            break;
                        case "SERIAL_ID_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.SERIAL_ID_REQ.ToString()] = true;
                            break;
                        case "INV_LOT_ID_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.INV_LOT_ID_REQ.ToString()] = true;
                            break;
                        case "SYS_QTY_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.SYS_QTY_REQ.ToString()] = true;
                            break;
                        case "INV_TAG_ID_REQ":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.INV_TAG_ID_REQ.ToString()] = true;
                            break;
                        case "REPORT_FIELD_1":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_1.ToString()] = true;
                            break;
                        case "REPORT_FIELD_2":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_2.ToString()] = true;
                            break;
                        case "REPORT_FIELD_3":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_3.ToString()] = true;
                            break;
                        case "REPORT_FIELD_4":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.REPORT_FIELD_4.ToString()] = true;
                            break;
                        case "PRICE":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.PRICE.ToString()] = true;
                            break;
                        case "PACKAGING_STRING":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.PACKAGING_STRING.ToString()] = true;
                            break;
                        case "STD_PACK_UOM":
                            _drListView[AtParWebEnums.Get_Event_Detail_ListView_Enum.STD_PACK_UOM.ToString()] = true;
                            break;
                        default: continue;
                    }
                }
            }
            inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(_drPreReq);
            return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, inputParameters);
        }


        public long Execute_GetDetails_ProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] DeviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var _rowData = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];
            bool blnEventAllocated = false;
            List<MT_ATPAR_TRANSACTION> lstAtparTran = new List<MT_ATPAR_TRANSACTION>();
            List<MT_CYCT_EVENT_HDR> lstCytEvHdr = new List<MT_CYCT_EVENT_HDR>();
            bool _blnSendOldEventTransaction = false;
            int _intStatus = 0;
            long _lngTransID;
            int _transStatus;
            long _statusCode = -1;
            bool _blnEventSplit = false;
            bool _blnRecountCheck = false;
            bool _blnInsertData = false;
            bool _blnIsEventItemsFromERP = false;

            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_PreReqData_Enum.EVENT_ALLOCATION].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
            {
                try
                {

                    var eventsCount = _splitEvents.CheckIfEventAllocated(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(),
                                         _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString(),
                                         DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());
                    if (eventsCount > 0)
                    {
                        blnEventAllocated = true;
                    }
                    else
                    {
                        blnEventAllocated = false;
                    }


                    if (!blnEventAllocated)
                    {
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + " Event " + _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString() + " not allocated to user " + DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                        //'TODO: Not sure if this is correct i.e will there be a entry in the transaction table 
                        //'when the transaction from client is NULL
                        try
                        {
                            if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION] != null)
                            {
                                lstAtparTran = _splitEvents.GetTransactionForEvent(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(),
                                                                    _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString(),
                                                                    DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                                _lngTransID = lstAtparTran.Select(x => x.TRANSACTION_ID).FirstOrDefault();
                                _transStatus = (int)lstAtparTran.Select(x => x.STATUS).FirstOrDefault();

                                _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION] = _lngTransID;
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + " Failed to get transaction id Exception is " + ex.ToString()); }
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();
                        if ((long)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION] > 0)
                        {
                            try
                            {
                                transactionDetails.TransactionId = (int)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION];
                                transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CycleCount;
                                transactionDetails.Status = AtParDefns.statCancel;
                                transactionDetails.UserId = DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(" Exception thrown in " + methodBaseName + " Failed to cancel the transaction " + ex.ToString());
                                return AtparStatusCodes.E_SERVERERROR;
                            }

                            _statusCode = _splitEvents.ExecuteTransactions(transactionDetails, (int)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION], AtParDefns.statCancel);

                            if (_statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + _statusCode.ToString()); }
                                return _statusCode;
                            }
                        }
                        // return AtparStatusCodes.S_NOPERMISSIONFOREVENT;//need to add in status codes
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(" Exception thrown in " + methodBaseName + " Failed to check if event allocated" + ex.ToString());

                }
            }

            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_PreReqData_Enum.REVIEW_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ||
                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_PreReqData_Enum.PERFORM_MANUAL_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ||
                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_PreReqData_Enum.REVIEW_MANUAL_COUNTS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
            {

                if (Convert.ToInt32(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION]) == 0)
                {
                    lstAtparTran = _splitEvents.GetTransactionForEvent(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(),
                                    _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString(),
                                    DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                    _lngTransID = lstAtparTran.Select(x => x.TRANSACTION_ID).FirstOrDefault();
                    if (lstAtparTran.Select(x => x.STATUS).FirstOrDefault() != null) { _transStatus = (int)lstAtparTran.Select(x => x.STATUS).FirstOrDefault(); }

                    if (_lngTransID > 0)
                    {
                        _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION] = _lngTransID;
                    }
                }

                lstCytEvHdr = _splitEvents.GetHeaderStatus((long)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION]);
                if (lstCytEvHdr.Select(x => x.EVENT_STATUS).FirstOrDefault() != null) { _intStatus = (int)lstCytEvHdr.Select(x => x.EVENT_STATUS).FirstOrDefault(); }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + ":Transaction status:" + _intStatus);

                if (_intStatus == AtParDefns.statDownloaded || _intStatus == AtParDefns.statEventCounting)
                    _blnSendOldEventTransaction = true;
                else if (_intStatus == AtParDefns.statSent || _intStatus == AtParDefns.statEventCountComplete)
                {
                    if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT] != System.DBNull.Value)
                    {
                        if (_intStatus == AtParDefns.statSent && _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT].ToString() == "true")
                            _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID] = true;
                        else
                            _blnSendOldEventTransaction = false;/* '(New Transaction)*/
                    }
                    else
                        _blnSendOldEventTransaction = false;/* (New Transaction)*/
                }
                else if (_intStatus == 0 || _intStatus == AtParDefns.statCancel) /*'Indicates there is no event with the specified transaction in the Header table*/
                {
                    if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT] != System.DBNull.Value)
                    {
                        if (_intStatus == AtParDefns.statCancel && _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT].ToString() == "true")
                        {
                            long intrecountexist = 0;
                            intrecountexist = _splitEvents.GetTransactionForRecountEvent(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(),
                                            _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString(),
                                             DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());
                            if (intrecountexist != AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL)
                            {
                                if (_log.IsWarnEnabled)
                                {
                                    _log.Warn(methodBaseName + " Failed to get the transaction for recount event " +
                                 _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID] +
                                 " in the business unit " +
                                 _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT] +
                                                     " status code : " + _statusCode);
                                }
                                return AtparStatusCodes.E_SERVERERROR;
                            }

                            if (intrecountexist == 0)
                                _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID] = true;
                            else
                                _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID] = true;
                        }
                        else if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT].ToString() == "true" && _intStatus == 0)
                        {
                            _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID] = true;
                        }
                        else
                            _blnSendOldEventTransaction = false;
                    }
                    else
                    {
                        _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID] = false;
                        _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID] = false;
                        _blnSendOldEventTransaction = false;
                    }
                }

                //Check for split only if we are not sending the old transaction
                //Should not be called when call from server web page


                if ((_blnSendOldEventTransaction == false) && (DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.HHT).ToString() ||
                     DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.AHHT).ToString() ||
                     DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.IHHT).ToString() ||
                     DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WHHT).ToString()))
                {
                    try
                    {
                        long count;
                        count = _splitEvents.CheckIfEventSplit(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(), _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString());

                        if (count == AtparStatusCodes.S_CYCT_SPLIT_EVNT_CANNOT_DL_PARENT)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Fatal(" Exception thrown in " + methodBaseName + " Failed to check if the event is split : status code : " + count);
                            return AtparStatusCodes.S_CYCT_SPLIT_EVNT_CANNOT_DL_PARENT;
                        }
                        if (count == AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL)
                        {
                            _log.Fatal(" Exception thrown in " + methodBaseName + " Failed to check if the event is split : status code : " + count);
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        if (count > 0)
                            _blnEventSplit = true;
                        else
                            _blnEventSplit = false;

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(" Exception thrown in " + methodBaseName + " Failed to check if the event is split : status code : " + ex.ToString());
                    }
                }

                if ((_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT] != System.DBNull.Value) && _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.RECOUNT].ToString() == "true")
                    _blnRecountCheck = false;


                if ((_blnSendOldEventTransaction) || (!_blnSendOldEventTransaction && _blnEventSplit) ||
                    (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID].ToString() == "true") ||
                    (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID].ToString() == "true"))
                {
                    try
                    {
                        if (_blnEventSplit)
                            _blnInsertData = true;

                        var tplEventData = GetEventData(_blnRecountCheck, _blnEventSplit, inputParameters, DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), outputParameters);
                        _statusCode = tplEventData.Item1;

                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                                return AtparStatusCodes.E_NORECORDFOUND;
                            else if (_statusCode == AtparStatusCodes.S_CYCT_RECOUNTS_EXIST)
                                return AtparStatusCodes.S_CYCT_RECOUNTS_EXIST;
                            else
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Fatal(methodBaseName + " Failed to get the event data from the middletier : status code : " + _statusCode);
                                return AtparStatusCodes.E_SERVERERROR;
                            }
                        }
                        outputParameters = tplEventData.Item2;
                        _blnRecountCheck = tplEventData.Item3;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(" Exception thrown in " + methodBaseName + " Failed to check if the event is split : status code : " + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
                else
                {
                    //Checking recounts for user
                    if (!_blnRecountCheck)
                    {
                        try
                        {
                            _statusCode = _splitEvents.CheckRecountsExist(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(), DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(),
                               _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString());

                            if (_statusCode == AtparStatusCodes.S_CYCT_RECOUNTS_EXIST)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Fatal(methodBaseName + " :Recounts exist for the user.And status code returned is: " + _statusCode);
                                return AtparStatusCodes.S_CYCT_RECOUNTS_EXIST;
                            }
                            else if (_statusCode != AtparStatusCodes.ATPAR_OK)
                            {

                                if (_log.IsFatalEnabled)
                                    _log.Fatal(" :Failed in " + methodBaseName + "  Status Code Returned is :  " + _statusCode);
                                return _statusCode;
                            }
                        }
                        catch (Exception ex)
                        {

                            if (_log.IsFatalEnabled)
                                _log.Fatal(" Exception thrown in " + methodBaseName + " :Failed to fetch the Recounts: count for user:" + ex.ToString());
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                    //End of Checking recounts for user


                    _blnInsertData = true;
                    _blnIsEventItemsFromERP = true;

                    if ((DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.HHT).ToString() ||
                            DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.AHHT).ToString() ||
                            DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.IHHT).ToString() ||
                            DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WHHT).ToString()) &&
                            (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_TYPE].ToString() == AtParWebEnums.EventType.Manual.ToString()))
                        return AtparStatusCodes.E_NORECORDFOUND;
                    else
                    {
                        try
                        {
                            List<string> lstParameters = new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };
                            var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                            var erpObjName = AtParWebEnums.EnumApps.CycleCount + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString())
                                .Select(a => a.PARAMETER_VALUE).FirstOrDefault();


                            string className = null;
                            object reflectObject = null;
                            className = "GetDetails";
                            var methodName = "GetDetails";
                            var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                            object[] args = { inputParameters, outputParameters, DeviceTokenEntry };
                            var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                            if (statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(" Exception thrown in " + methodBaseName + " :Failed in the remote call :" + statusCode);
                                if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                                {
                                    return statusCode;
                                }
                                else
                                {
                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                            }
                            var outPutParameters = args[1];
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(" Exception thrown in " + methodBaseName + " :Failed in the remote call :" + ex.ToString());
                            return AtparStatusCodes.E_SERVERERROR;

                        }
                    }
                }

            }
            else //ReviewCounts = N
            {
                _blnInsertData = true;
                _blnIsEventItemsFromERP = true;

                if ((DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.HHT).ToString() ||
                            DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.AHHT).ToString() ||
                            DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.IHHT).ToString()) &&
                            (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_TYPE].ToString() == AtParWebEnums.EventType.Manual.ToString()))
                    return AtparStatusCodes.E_NORECORDFOUND;
                else
                {
                    try
                    {
                        List<string> lstParameters = new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };
                        var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();
                        var erpObjName = AtParWebEnums.EnumApps.CycleCount + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                        string className = null;
                        object reflectObject = null;
                        className = ".GetDetails";
                        var methodName = ".GetDetails";
                        var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                        object[] args = { inputParameters, outputParameters, DeviceTokenEntry };
                        _statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(" Exception thrown in " + methodBaseName + " :Failed in the remote call :" + _statusCode);
                            if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                            {
                                return _statusCode;
                            }
                            else
                            {
                                return AtparStatusCodes.E_SERVERERROR;
                            }
                        }
                        var outputParams = args[1];
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(" Exception thrown in " + methodBaseName + " :Failed in the remote call :" + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }


                //TODO: Not sure if this is correct i.e will there be a entry in the transaction table 
                //when the transaction from client is NULL

                if (_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION] != System.DBNull.Value)
                {
                    lstAtparTran = _splitEvents.GetTransactionForEvent(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(),
                                     _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString(),
                                     DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                    _lngTransID = lstAtparTran.Select(x => x.TRANSACTION_ID).FirstOrDefault();
                    _transStatus = (int)lstAtparTran.Select(x => x.STATUS).FirstOrDefault();

                    if (_lngTransID > 0)
                        _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION] = _lngTransID;


                    if (_transStatus == AtParDefns.statDownloaded)
                    {
                        POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();

                        transactionDetails.TransactionId = (int)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION];
                        transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CycleCount;
                        transactionDetails.Status = AtParDefns.statCancel;
                        transactionDetails.UserId = DeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                        _statusCode = _commonRepo.UpdateTransaction(transactionDetails);
                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " :Failed to update the transaction for event " + (int)_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID] +
                                    " in the business unit " + _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString() + "status code :" + _statusCode);
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }

                    _statusCode = _splitEvents.DeleteEvents(_rowData[(int)AtParWebEnums.Get_Event_Details_Enum.BUSINESS_UNIT].ToString(),
                        _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_ID].ToString(), _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.TRANSACTION].ToString(), string.Empty, string.Empty);

                    if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " :Failed in deleting Events info from middle tier" + _statusCode);
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
            }


            _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.SEND_OLD_TRANSACTION] = _blnSendOldEventTransaction;
            _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_STATUS] = _intStatus;
            _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.INSERT_FLAG] = _blnInsertData;
            _rowData[(int)AtParWebEnums.Get_Event_Details_Enum.IS_ITEM_FROM_ERP] = _blnIsEventItemsFromERP;
            return AtparStatusCodes.ATPAR_OK;
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
        private Tuple<long, DataSet, bool> GetEventData(bool _blnRecountCheck, bool _blnEventSplit, DataSet inputParameters, string userID, DataSet outputParameters)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataRow _drEventDetails;
            DataSet _dsItemAltUomDetails;
            DataRow _drEventDetailsHdr;
            DataRow _drItemAltUomDetails;
            DataSet _dsEventDetails = new DataSet();
            bool pBlnEventSplit = false, _blnGetRecountTransID = false, pRecountCheck = false, _blnDisplayCnts = true, _blnGetRecountCancelTransID = false;
            try
            {


                var lstEventDetails = _splitEvents.GetEventData(_blnRecountCheck, _blnEventSplit, inputParameters, userID, outputParameters);
                _blnDisplayCnts = Convert.ToBoolean(lstEventDetails.Item3[0]);
                pBlnEventSplit = Convert.ToBoolean(lstEventDetails.Item3[1]);
                _blnGetRecountTransID = Convert.ToBoolean(lstEventDetails.Item3[2]);
                pRecountCheck = Convert.ToBoolean(lstEventDetails.Item3[3]);
                _blnGetRecountCancelTransID = Convert.ToBoolean(lstEventDetails.Item3[4]);
                string _strBunit = lstEventDetails.Item3[5].ToString();
                string _strEventID = lstEventDetails.Item3[6].ToString();
                long _lngTransID = Convert.ToInt64(lstEventDetails.Item3[7]);
                if (lstEventDetails.Item1 == AtparStatusCodes.ATPAR_OK)
                {
                    _dsEventDetails = lstEventDetails.Item2.ToDataSet();
                }
                if (_dsEventDetails.Tables[0].Rows.Count == 0)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " No data found");
                    return new Tuple<long, DataSet, bool>(AtparStatusCodes.E_NORECORDFOUND, null, pRecountCheck);
                }



                _drEventDetailsHdr = outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();
                //Build the header details
                _drEventDetailsHdr[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.BUSINESS_UNIT] = _strBunit;
                _drEventDetailsHdr[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.EVENT_ID] = _strEventID;
                _drEventDetailsHdr[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.PARENT_EVENT_ID] = _dsEventDetails.Tables[0].Rows[0]["PARENT_EVENT_ID"];
                //When getting data for the event already downloaded by the same user
                if (!pBlnEventSplit | _blnGetRecountTransID)
                {
                    _drEventDetailsHdr[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID] = _dsEventDetails.Tables[0].Rows[0]["TRANSACTION_ID"];
                }
                else if (_blnGetRecountCancelTransID & pBlnEventSplit)
                {
                    _drEventDetailsHdr[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID] = _lngTransID;
                }
                _drEventDetailsHdr[(int)AtParWebEnums.Get_Event_DetailOutput_Header_Enum.EVENT_TYPE] = _dsEventDetails.Tables[0].Rows[0]["EVENT_TYPE"];
                //Add the Details Header info to the output dataset HEADERS table
                outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(_drEventDetailsHdr);

                for (int intCnt = 0; intCnt <= _dsEventDetails.Tables[0].Rows.Count - 1; intCnt++)
                {

                    _drEventDetails = outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].NewRow();

                    var eventRows = _dsEventDetails.Tables[0].Rows[intCnt];

                    //Building the details for the event
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID] = eventRows["INV_ITEM_ID"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM] = eventRows["ITEM_REC_NUM"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID] = eventRows["MFG_ITEM_ID"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID] = eventRows["VEND_ITEM_ID"];
                    if (eventRows["DESCRIPTION"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["DESCRIPTION"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR] = AtParDefns.CleanString(eventRows["DESCRIPTION"].ToString());
                        }
                    }

                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA] = eventRows["STORAGE_AREA"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1] = eventRows["STOR_LEVEL_1"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2] = eventRows["STOR_LEVEL_2"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3] = eventRows["STOR_LEVEL_3"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4] = eventRows["STOR_LEVEL_4"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE] = eventRows["UNIT_OF_MEASURE"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG] = eventRows["RECOUNT_FLAG"];

                    //Check if the column exists , when event is split we do not have the column
                    if (_dsEventDetails.Tables[0].Columns.Contains("ITEM_PRICE"))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE] = eventRows["ITEM_PRICE"];
                    }

                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID] = eventRows["CONTAINER_ID"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE] = eventRows["STAGED_DATE"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID] = eventRows["SERIAL_ID"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID] = eventRows["INV_LOT_ID"];

                    if (_dsEventDetails.Tables[0].Columns.Contains("UOM_TYPE"))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE] = eventRows["UOM_TYPE"];
                    }

                    if (_dsEventDetails.Tables[0].Columns.Contains("STD_PACK_UOM"))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM] = eventRows["STD_PACK_UOM"];
                    }


                    if (_dsEventDetails.Tables[0].Columns.Contains("L_S_CONTROLLED"))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED] = eventRows["L_S_CONTROLLED"];
                    }

                    if (_dsEventDetails.Tables[0].Columns.Contains("CONSIGNED_FLAG"))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG] = eventRows["CONSIGNED_FLAG"];
                    }

                    if (_dsEventDetails.Tables[0].Columns.Contains("LOT_CONTROLLED"))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED] = eventRows["LOT_CONTROLLED"];
                    }
                    if (_dsEventDetails.Tables[0].Columns.Contains("SERIAL_CONTROLLED"))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED] = eventRows["SERIAL_CONTROLLED"];
                    }

                    //Display counts only when _blnDisplayCnts is true

                    if (_blnDisplayCnts)
                    {
                        //Check if the column exists , when event is split we do not have the column
                        if (_dsEventDetails.Tables[0].Columns.Contains("COUNT_QTY"))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] = eventRows["COUNT_QTY"];
                        }


                    }

                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] = eventRows["SYS_QTY"];

                    if (eventRows["INVENTORY_TAG_ID"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["INVENTORY_TAG_ID"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID] = eventRows["INVENTORY_TAG_ID"];

                        }
                    }
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.GTIN] = eventRows["GTIN"];
                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID] = eventRows["UPC_ID"];



                    //If event is split then CUSTOM_ITEM_NO will be from CUSTOM_ITEM_NO of MT_CYCT_EVENT_DETAIL_MASTER
                    //else it will be from  CUST_ITEM_NO of MT_CYCT_EVENT_DETAIL
                    if (pBlnEventSplit && (!_blnGetRecountTransID & !pRecountCheck))
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO] = eventRows["CUSTOM_ITEM_NO"];
                    }
                    else
                    {
                        _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO] = eventRows["CUST_ITEM_NO"];
                    }

                    var _strLoc = string.Empty;

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA] != DBNull.Value)
                    {
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA];
                    }

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1] != DBNull.Value)
                    {
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1];
                    }

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2] != DBNull.Value)
                    {
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2];
                    }

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3] != DBNull.Value)
                    {
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3];
                    }

                    if (_drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4] != DBNull.Value)
                    {
                        _strLoc = _strLoc + _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4];
                    }

                    if (Convert.ToBoolean(eventRows["REPORT_FIELD_1"]))
                    {
                        if (!string.IsNullOrEmpty(eventRows["REPORT_FIELD_1"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1] = eventRows["REPORT_FIELD_1"];
                        }
                    }

                    if (eventRows["REPORT_FIELD_2"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["REPORT_FIELD_2"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2] = eventRows["REPORT_FIELD_2"];
                        }
                    }

                    if (eventRows["REPORT_FIELD_3"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["REPORT_FIELD_3"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3] = eventRows["REPORT_FIELD_3"];
                        }
                    }

                    if (eventRows["REPORT_FIELD_4"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["REPORT_FIELD_4"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4] = eventRows["REPORT_FIELD_4"];
                        }
                    }

                    if (eventRows["PACKAGING_STRING"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["PACKAGING_STRING"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING] = eventRows["PACKAGING_STRING"];
                        }
                    }

                    if (eventRows["STD_PACK_UOM"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["STD_PACK_UOM"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM] = eventRows["STD_PACK_UOM"];
                        }
                    }
                    if (eventRows["L_S_CONTROLLED"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["L_S_CONTROLLED"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED] = eventRows["L_S_CONTROLLED"];
                        }
                    }

                    if (eventRows["CONSIGNED_FLAG"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["CONSIGNED_FLAG"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG] = eventRows["CONSIGNED_FLAG"];
                        }
                    }

                    if (eventRows["LOT_CONTROLLED"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["LOT_CONTROLLED"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED] = eventRows["LOT_CONTROLLED"];
                        }
                    }

                    if (eventRows["SERIAL_CONTROLLED"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(eventRows["SERIAL_CONTROLLED"].ToString()))
                        {
                            _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED] = eventRows["SERIAL_CONTROLLED"];
                        }
                    }

                    _drEventDetails[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOCATION] = _strLoc;


                    var inputParamRows = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0];


                    if (inputParamRows[(int)AtParWebEnums.Get_Event_Details_PreReqData_Enum.COUNT_IN_DIFF_UOMS].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ||
                        inputParamRows[(int)AtParWebEnums.Get_Event_Details_PreReqData_Enum.DISP_ALT_UOM].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        var lstUomMaster = _splitEvents.GetItemUomMaster(pBlnEventSplit, _dsEventDetails.Tables[0].Rows[intCnt]["ITEM_REC_NUM"].ToString(), _dsEventDetails.Tables[0].Rows[intCnt]["UNIT_OF_MEASURE"].ToString(), userID);
                        _dsItemAltUomDetails = lstUomMaster.ToDataSet();
                        if (_dsItemAltUomDetails.Tables.Count > 0)
                        {
                            DataTable _dtItemAltUomDetails = new DataTable();
                            DataRow[] _drAltUom;
                            DataRow _drUom;
                            for (int intRCnt = 0; intRCnt <= _dsItemAltUomDetails.Tables[0].Rows.Count - 1; intRCnt++)
                            {
                                string _strSearch = string.Empty;
                                _strSearch = "UNIT_OF_MEASURE  = '" + _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["UOM"] + "' AND INV_ITEM_ID = '" + _dsEventDetails.Tables[0].Rows[intCnt]["INV_ITEM_ID"] + "'";

                                _drAltUom = _dtItemAltUomDetails.Select(_strSearch);


                                if (_drAltUom.Length == 0)
                                {
                                    //Using a temporary table so that we can query on the datatable
                                    _drItemAltUomDetails = _dtItemAltUomDetails.NewRow();

                                    _drItemAltUomDetails[AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.INV_ITEM_ID.ToString()] = _dsEventDetails.Tables[0].Rows[intCnt]["INV_ITEM_ID"];
                                    _drItemAltUomDetails[AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE.ToString()] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["UOM"];
                                    _drItemAltUomDetails[AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.CONVERSION_RATE.ToString()] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["CONVERSION_RATE"];
                                    _drItemAltUomDetails[AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.ITEM_REC_NUM.ToString()] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["ITEM_REC_NUM"];
                                    _drItemAltUomDetails[AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE.ToString()] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["UOM_TYPE"];

                                    //Add the alternate UOM's for the item to the temp table
                                    _dtItemAltUomDetails.Rows.Add(_drItemAltUomDetails);

                                    //Add the alternate UOM's for the item to the output dataset AlternateUOM table
                                    _drUom = outputParameters.Tables[AtParWebEnums.DataSet_Type.ALTERNATEUOMS.ToString()].NewRow();
                                    _drUom[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.INV_ITEM_ID] = _dsEventDetails.Tables[0].Rows[intCnt]["INV_ITEM_ID"];
                                    _drUom[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["UOM"];
                                    _drUom[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.CONVERSION_RATE] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["CONVERSION_RATE"];
                                    _drUom[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.ITEM_REC_NUM] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["ITEM_REC_NUM"];
                                    if (!string.IsNullOrEmpty(_dsItemAltUomDetails.Tables[0].Rows[intRCnt]["UOM_TYPE"].ToString()))
                                    {
                                        _drUom[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE] = _dsItemAltUomDetails.Tables[0].Rows[intRCnt]["UOM_TYPE"];
                                    }
                                    else
                                    {
                                        _drUom[(int)AtParWebEnums.Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE] = string.Empty;
                                    }


                                    outputParameters.Tables[AtParWebEnums.DataSet_Type.ALTERNATEUOMS.ToString()].Rows.Add(_drUom);

                                }

                            }

                        }

                    }


                    //Add the item details to the output dataset DETAILS table
                    outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Add(_drEventDetails);

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed to populate the Event Data " + ex.ToString());
                return new Tuple<long, DataSet, bool>(AtparStatusCodes.E_SERVERERROR, null, pRecountCheck);
            }
            finally
            {
                _dsEventDetails = null;
                _dsItemAltUomDetails = null;
            }

            return new Tuple<long, DataSet, bool>(AtparStatusCodes.ATPAR_OK, outputParameters, pRecountCheck);
        }

        public long Execute_GetDetails_PostProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            bool _blnGetRecountTransID = false;
            bool _blnGetRecountCancelTransID = false;
            long transId = 0;
            DataRow _drEventOutputParams;
            long statuscode = -1;

            try
            {

                _drEventOutputParams = outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID] != System.DBNull.Value)
                    _blnGetRecountTransID = (bool)inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID];

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID] != System.DBNull.Value)
                    _blnGetRecountCancelTransID = (bool)inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID];
                if (!Convert.ToBoolean(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.SEND_OLD_TRANSACTION])
                    ||Convert.ToBoolean(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.SEND_OLD_TRANSACTION])
                    && Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Details_Enum.EVENT_STATUS].ToString()) ==AtParDefns.statEventCounting)

                {
                    transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.CartCount);

                    if (_log.IsDebugEnabled)
                        _log.Fatal(methodBaseName + "The new transaction Id is  : " + transId);

                    _drEventOutputParams[AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID.ToString()] = transId;
                }

                statuscode = _splitEvents.InsertHdrDetAndUpdateEventTran(inputParameters, outputParameters, deviceTokenEntry, transId, _blnGetRecountTransID, _blnGetRecountCancelTransID);


                POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();

                transactionDetails.TransactionId = Convert.ToInt32(outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID.ToString()].ToString());
                transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.CycleCount;
                transactionDetails.BusinessUnit = outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID.ToString()].ToString();
                transactionDetails.ID = outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.Get_Event_DetailOutput_Header_Enum.EVENT_ID.ToString()].ToString();
                transactionDetails.Status = AtParDefns.statDownloaded;
                transactionDetails.TotalRecordDownloaded = outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
                transactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.DownloadUserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                transactionDetails.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                statuscode = _commonRepo.UpdateTransaction(transactionDetails);

                if (statuscode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " :Failed toinsert the transaction for the event into TRANSACTION tables with statucode " + statuscode);
                    return AtparStatusCodes.E_SERVERERROR;
                }

                //Printing OutPut DataSet
                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(outputParameters, _log, deviceTokenEntry);
                    outputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(" Exception thrown in " + methodBaseName + " : with the exception :" + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }

            return AtparStatusCodes.ATPAR_OK;
        }

    }
}
